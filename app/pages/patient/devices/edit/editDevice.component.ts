/**
 * @author iRevThis
 */

import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES} from "angular2/router";
import {HttpService} from "../../../../common/security/httpService";
import {AuthorizedComponent} from "../../../../common/components/authorized.component";
import {Router} from "angular2/router";
import {PageHeaderComponent} from "../../components/pageHeader.component";
import {SidebarComponent} from "../../components/sidebar.component";
import {FormBuilder} from "angular2/common";
import {Validators} from "angular2/common";
import {deviceType} from "../../../../common/enums/enums";

@Component({
    selector: "edit-device",
    providers: [HttpService],
    directives: [ROUTER_DIRECTIVES, PageHeaderComponent, SidebarComponent],
    templateUrl: 'app/pages/patient/devices/edit/editDevice.html',
})
export class EditDeviceComponent extends AuthorizedComponent {

    deviceForm:any;

    constructor(_router:Router, private httpService:HttpService, private _formBuilder:FormBuilder) {
        super(_router);
        this.deviceForm = this._formBuilder.group({
            'name': ['', Validators.compose([Validators.required, Validators.maxLength(25)])],
            'deviceType': ['']
        });
    }

    deviceTypes = deviceType.values;

    showSpinner = false;

    onSubmit() {
        this.showSpinner = true;
        var _this = this;
        this.httpService.post<any>("/devices", JSON.stringify(this.deviceForm.value))
            .subscribe(
                success => {
                    _this._router.navigate(['/Devices']);
                },
                error => {
                    _this.showSpinner = false;
                },
                () => _this.showSpinner = false
            );
    };
}

