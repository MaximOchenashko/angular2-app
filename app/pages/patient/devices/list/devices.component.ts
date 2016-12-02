/**
 * @author iRevThis
 */

import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES} from "angular2/router";
import {HttpService} from "../../../../common/security/httpService";
import {Router} from "angular2/router";
import {PageHeaderComponent} from "../../components/pageHeader.component";
import {SidebarComponent} from "../../components/sidebar.component";
import {PaginatePipe, PaginationControlsCmp, PaginationService} from 'ng2-pagination';
import {deviceType} from "../../../../common/enums/enums";
import {TableComponent} from "../../../../common/components/tableComponent";

interface Device {
    uuid: string,
    name: string,
    deviceType: number
}

@Component({
    selector: "devices",
    providers: [HttpService, PaginationService],
    directives: [ROUTER_DIRECTIVES, PageHeaderComponent, SidebarComponent, PaginationControlsCmp],
    templateUrl: 'app/pages/patient/devices/list/devices.html',
    pipes: [PaginatePipe]
})
export class DevicesComponent extends TableComponent<Device> {

    deviceTypes = deviceType;

    constructor(_router:Router, httpService:HttpService) {
        super(_router, httpService, "/devices");
    }

}

