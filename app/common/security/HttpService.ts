/**
 * @author iRevThis
 */

import {Injectable} from "angular2/core";
import {Http, Headers, Response, Request, RequestOptions, RequestOptionsArgs, RequestMethod} from "angular2/http";
import {Observable} from "rxjs/Observable";
import {API_PREFIX, AUTH_CONFIG} from "../../main";
import {Router} from "angular2/router";

export interface IAuthConfig {
    headerName: string;
    headerPrefix: string;
    tokenName: string;
    tokenGetter: any;
    tokenRemover: any;
}

export interface ApiMetadataWrapper<X> {
    status: number,
    content?: X;
    errorMessage?: string;
}

export interface ListResponseWrapper<X> {
    items: X[];
    offset: number;
    limit: number;
    total: number;
}

export class AuthConfig {

    config:any;
    headerName:string;
    headerPrefix:string;
    tokenName:string;
    tokenGetter:any;
    tokenRemover:any;

    constructor(config?:any) {
        this.config = config || {};
        this.headerName = this.config.headerName || 'Authorization';
        this.headerPrefix = this.config.headerPrefix ? this.config.headerPrefix + ' ' : '';
        this.tokenName = this.config.tokenName || 'auth_token';
        this.tokenGetter = this.config.tokenGetter || (() => localStorage.getItem(this.tokenName));
        this.tokenRemover = this.config.tokenRemover || (() => localStorage.removeItem(this.tokenName));
    }

    getConfig() {
        return {
            headerName: this.headerName,
            headerPrefix: this.headerPrefix,
            tokenName: this.tokenName,
            tokenGetter: this.tokenGetter,
            tokenRemover: this.tokenRemover
        }
    }
}

@Injectable()
export class HttpService {

    private _config:IAuthConfig;

    constructor(private _router:Router, private http:Http) {
        this._config = AUTH_CONFIG.getConfig();
    }

    get<X>(url:string, options?:RequestOptionsArgs):Observable<ApiMetadataWrapper<X>> {
        return this.buildRequest<X>({url: HttpService.prepareUrl(url), method: RequestMethod.Get}, options);
    }

    post<X>(url:string, body:string, options?:RequestOptionsArgs):Observable<ApiMetadataWrapper<X>> {
        return this.buildRequest<X>({url: HttpService.prepareUrl(url), body: body, method: RequestMethod.Post}, options);
    }

    put<X>(url:string, body:string, options ?:RequestOptionsArgs):Observable<ApiMetadataWrapper<X>> {
        return this.buildRequest<X>({url: HttpService.prepareUrl(url), body: body, method: RequestMethod.Put}, options);
    }

    delete<X>(url:string, options ?:RequestOptionsArgs):Observable<ApiMetadataWrapper<X>> {
        return this.buildRequest<X>({url: HttpService.prepareUrl(url), method: RequestMethod.Delete}, options);
    }

    patch<X>(url:string, body:string, options?:RequestOptionsArgs):Observable<ApiMetadataWrapper<X>> {
        return this.buildRequest<X>({url: HttpService.prepareUrl(url), body: body, method: RequestMethod.Patch}, options);
    }

    head<X>(url:string, options?:RequestOptionsArgs):Observable<ApiMetadataWrapper<X>> {
        return this.buildRequest<X>({url: HttpService.prepareUrl(url), method: RequestMethod.Head}, options);
    }

    private buildRequest<X>(requestArgs:RequestOptionsArgs, additionalOptions:RequestOptionsArgs):Observable<ApiMetadataWrapper<X>> {
        let options = new RequestOptions(requestArgs);

        if (additionalOptions) {
            options = options.merge(additionalOptions)
        }

        return this._request(new Request(options))
            .map(r => HttpService.responseMapper<X>(r))
            .catch(r => this.handleError<X>(r));
    }

    private _request(url: Request):Observable<Response> {
        let headers = url.headers || new Headers();

        headers.set('Content-Type', 'application/json');
        let token = this._config.tokenGetter();
        if (token) {
            headers.set(this._config.headerName, this._config.headerPrefix + this._config.tokenGetter());
        }

        url.headers = headers;

        return this.http.request(url);
    }

    private static responseMapper<X>(r:Response): ApiMetadataWrapper<X> {
        return {
            status: r.status,
            content: r.json().content,
            errorMessage: r.json().errorMessage
        };
    }

    private handleError<X>(r:Response): Observable<ApiMetadataWrapper<X>> {
        if (r.status == 401) {
            console.warn("Invalid auth token");
            this._config.tokenRemover();
            this._router.parent.navigateByUrl("/signIn");
        }

        return Observable.throw(HttpService.responseMapper(r));
    }

    private static prepareUrl(url: String) {
        return API_PREFIX + url;
    }
}