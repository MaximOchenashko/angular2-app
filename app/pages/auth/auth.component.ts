/**
 * @author iRevThis
 */

import {Component} from 'angular2/core';
import {NgForm}    from 'angular2/common';
import {TOKEN_STORAGE_KEY, USER_NAME_STORAGE_KEY} from "../../main";
import {HttpService} from "../../common/security/httpService";
import {Router} from "angular2/router";
import {UnauthorizedComponent} from "../../common/components/unauthorized.component";
import {ROUTER_DIRECTIVES} from "angular2/router";
import {USER_ROLE_STORAGE_KEY} from "../../main";

export class Credentials {
    constructor(public email:string,
                public password:string,
                public rememberMe:boolean) {
    }
}

interface AuthResponse {
    tokenKey: string,
    name: string,
    role: number
}

@Component({
    selector: 'auth',
    providers: [HttpService],
    templateUrl: 'app/pages/auth/auth.html',
    directives: [ROUTER_DIRECTIVES],
    styleUrls:['app/pages/auth/auth.css'],
})
export class AuthComponent extends UnauthorizedComponent {
    constructor(_router: Router, private httpService:HttpService) {
        super(_router);
    }

    errorMessage = null;
    successMessage = null;
    credentials = new Credentials("", "", false);
    showSpinner = false;

    onSubmit() {
        this.showSpinner = true;
        var _this = this;
        this.httpService.post<AuthResponse>("/signIn", JSON.stringify(this.credentials))
            .subscribe(
                success => {
                    localStorage.setItem(TOKEN_STORAGE_KEY, success.content.tokenKey);
                    localStorage.setItem(USER_NAME_STORAGE_KEY, success.content.name);
                    localStorage.setItem(USER_ROLE_STORAGE_KEY, success.content.role.toString());

                    _this.homeByRole();
                },
                error => {
                    _this.showSpinner = false;
                    _this.errorMessage = error.errorMessage;
                },
                () => _this.showSpinner = false
            );
    };

}