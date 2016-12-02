/**
 * @author iRevThis
 */

import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES} from "angular2/router";
import {HttpService} from "../../../common/security/httpService";
import {AuthorizedComponent} from "../../../common/components/authorized.component";
import {Router} from "angular2/router";
import {PageHeaderComponent} from "../components/pageHeader.component";
import {SidebarComponent} from "../components/sidebar.component";
import {FormBuilder} from "angular2/common";
import {Validators} from "angular2/common";
import {ControlGroup} from "angular2/common";
import {Control} from "angular2/common";
import {USER_NAME_STORAGE_KEY} from "../../../main";

interface ProfileResponse {
    firstName: string,
    lastName: string,
    email: string
}

interface MedicalCardResponse {
    birthDate: string,
    weight: number,
    height: number
}

@Component({
    selector: "patient-device",
    providers: [HttpService],
    directives: [ROUTER_DIRECTIVES, PageHeaderComponent, SidebarComponent],
    templateUrl: 'app/pages/patient/profile/profile.html',
})
export class PatientProfileComponent extends AuthorizedComponent {

    profileForm:ControlGroup;
    healthForm:ControlGroup;

    constructor(_router:Router, private httpService:HttpService, private _formBuilder:FormBuilder) {
        super(_router);
        this.profileForm = this._formBuilder.group({
            'firstName': ['', Validators.compose([Validators.required, Validators.maxLength(25)])],
            'lastName': ['', Validators.compose([Validators.required, Validators.maxLength(25)])],
            'email': ['']
        });
        this.healthForm = this._formBuilder.group({
            'birthDate': ['', Validators.required],
            'weight': ['', Validators.required],
            'height': ['', Validators.required]
        });
    }

    ngOnInit() {
        super.ngOnInit();
        var _this = this;
        this.httpService.get<ProfileResponse>("/profile").subscribe(
            success => {
                (<Control> _this.profileForm.controls['firstName']).updateValue(success.content.firstName, {});
                (<Control> _this.profileForm.controls['lastName']).updateValue(success.content.lastName, {});
                (<Control> _this.profileForm.controls['email']).updateValue(success.content.email, {});
            },
            error => { },
            () => {}
        );
        this.httpService.get<MedicalCardResponse>("/medicalCard").subscribe(
            success => {
                (<Control> _this.healthForm.controls['birthDate']).updateValue(success.content.birthDate, {});
                (<Control> _this.healthForm.controls['weight']).updateValue(success.content.weight, {});
                (<Control> _this.healthForm.controls['height']).updateValue(success.content.height, {});
            },
            error => { },
            () => {}
        );
    }

    showSpinner = false;
    showHealthSpinner = false;

    onSubmit() {
        this.showSpinner = true;
        var _this = this;
        this.httpService.post<any>("/profile", JSON.stringify(this.profileForm.value))
            .subscribe(
                success => {
                    localStorage.setItem(USER_NAME_STORAGE_KEY, _this.profileForm.value.firstName + ' ' + _this.profileForm.value.lastName);
                    _this._router.navigate(['/PatientDashboard']);
                },
                error => {
                    _this.showSpinner = false;
                },
                () => _this.showSpinner = false
            );
    };

    onSubmitHealthInfo() {
        this.showHealthSpinner = true;
        var _this = this;
        this.httpService.post<any>("/medicalCard", JSON.stringify(this.healthForm.value))
            .subscribe(
                success => {
                    _this._router.navigate(['/PatientDashboard']);
                },
                error => {
                    _this.showHealthSpinner = false;
                },
                () => _this.showHealthSpinner = false
            );
    };
}

