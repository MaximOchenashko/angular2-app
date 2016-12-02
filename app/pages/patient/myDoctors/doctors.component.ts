/**
 * @author iRevThis
 */

import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES} from "angular2/router";
import {HttpService} from "../../../common/security/httpService";
import {Router} from "angular2/router";
import {PageHeaderComponent} from "../components/pageHeader.component";
import {SidebarComponent} from "../components/sidebar.component";
import {PaginatePipe, PaginationControlsCmp, PaginationService} from 'ng2-pagination';
import {TableComponent} from "../../../common/components/tableComponent";

interface User {
    uuid: string,
    name: string
}

@Component({
    selector: "my-doctors",
    providers: [HttpService, PaginationService],
    directives: [ROUTER_DIRECTIVES, PageHeaderComponent, SidebarComponent, PaginationControlsCmp],
    templateUrl: 'app/pages/patient/myDoctors/doctors.html',
    pipes: [PaginatePipe]
})
export class MyDoctorsComponent extends TableComponent<User> {

    constructor(_router:Router, httpService:HttpService) {
        super(_router, httpService, "/users/myDoctors");
    }

}

