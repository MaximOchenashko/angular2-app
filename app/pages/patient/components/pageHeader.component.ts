/**
 * @author iRevThis
 */

import {Component} from 'angular2/core';
import {USER_NAME_STORAGE_KEY} from "../../../main";
import {HttpService} from "../../../common/security/httpService";
import {Router} from "angular2/router";
import {ROUTER_DIRECTIVES} from "angular2/router";

@Component({
    selector: 'page-header',
    providers: [HttpService],
    directives: [ROUTER_DIRECTIVES],
    templateUrl: 'app/pages/patient/components/pageHeader.html'
})
export class PageHeaderComponent {
    constructor(private router:Router, private httpService:HttpService) {

    }

    userName = localStorage.getItem(USER_NAME_STORAGE_KEY);

    logout() {
        this.httpService.post("/logout", JSON.stringify({})).subscribe(s => {}, e => {}, () => {});
        localStorage.clear();
        this.router.navigate(['SignIn']);
    }

}