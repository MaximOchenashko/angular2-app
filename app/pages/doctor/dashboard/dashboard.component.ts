/**
 * @author iRevThis
 */

import {Component} from 'angular2/core';
import {NgForm}    from 'angular2/common';
import {ROUTER_DIRECTIVES} from "angular2/router";
import {HttpService} from "../../../common/security/httpService";
import {AUTH_CONFIG, TOKEN_STORAGE_KEY, USER_NAME_STORAGE_KEY} from "../../../main";
import {AuthorizedComponent} from "../../../common/components/authorized.component";
import {Router} from "angular2/router";
import {PageHeaderComponent} from "../components/pageHeader.component";
import {SidebarComponent} from "../components/sidebar.component";

@Component({
    selector: "dashboard",
    providers: [HttpService],
    directives: [ROUTER_DIRECTIVES, PageHeaderComponent, SidebarComponent],
    templateUrl: 'app/pages/doctor/dashboard/dashboard.html'
})
export class DoctorDashboardComponent extends AuthorizedComponent {
    constructor(_router: Router, private httpService:HttpService) {
        super(_router);
    }

}