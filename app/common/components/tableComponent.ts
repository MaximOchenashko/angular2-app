/**
 * @author iRevThis
 */

import {Observable} from 'rxjs';
import {AuthorizedComponent} from "./authorized.component";
import {Router} from "angular2/router";
import {HttpService} from "../security/HttpService";
import {Input} from "angular2/core";
import {IPaginationInstance} from "ng2-pagination/index";
import {URLSearchParams} from "angular2/http";
import {ListResponseWrapper} from "../security/HttpService";

export class TableComponent<X> extends AuthorizedComponent {

    @Input('data') tableData:X[] = [];
    asyncTableData:Observable<X[]>;

    public config:IPaginationInstance;

    constructor(_router:Router,
                protected httpService:HttpService,
                private requestPath:string,
                protected conf?:IPaginationInstance) {
        super(_router);
        this.config = conf || {
                id: 'custom',
                itemsPerPage: 10,
                currentPage: 1,
                totalItems: 0
            };
    }

    ngOnInit() {
        super.ngOnInit();
        this.getPage(1);
    }

    public firstItem() {
        return Math.min((this.config.currentPage - 1) * this.config.itemsPerPage + 1, this.config.totalItems);
    }

    public showItemsCount() {
        return Math.min(this.config.itemsPerPage, this.config.totalItems);
    }

    public getPage(page:number) {
        let params:URLSearchParams = new URLSearchParams();
        params.set('offset', ((page - 1) * this.config.itemsPerPage).toString());
        params.set('limit', this.config.itemsPerPage.toString());
        this.asyncTableData = this.httpService.get<ListResponseWrapper<X>>(this.requestPath, {search: params})
            .do(res => {
                this.config.totalItems = res.content.total;
                this.config.currentPage = page;
            })
            .map(res => res.content.items);
    }
}