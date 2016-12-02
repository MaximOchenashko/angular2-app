/**
 * @author iRevThis
 */

import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES, Router} from "angular2/router";
import {AUTH_CONFIG, TOKEN_STORAGE_KEY, USER_NAME_STORAGE_KEY} from "../../main";
import {HttpService} from "../../common/security/httpService";
import {UnauthorizedComponent} from "../../common/components/unauthorized.component";
import {FormBuilder, Validators} from "angular2/common";
import {ValidationService} from "../../common/forms/validationService";
import {ControlMessage} from "../../common/forms/controlMessage";
import {userRole} from "../../common/enums/enums";

@Component({
    selector: "signUp",
    providers: [HttpService],
    directives: [ROUTER_DIRECTIVES, ControlMessage],
    templateUrl: 'app/pages/signUp/signUp.html',
})
export class SignUpComponent extends UnauthorizedComponent {

    signUpForm: any;
    constructor(_router:Router, private httpService:HttpService, private _formBuilder: FormBuilder) {
        super(_router);
        this.signUpForm = this._formBuilder.group({
            'firstName': ['', Validators.compose([Validators.required, Validators.maxLength(25)])],
            'lastName': ['', Validators.compose([Validators.required, Validators.maxLength(25)])],
            'email': ['', Validators.compose([Validators.required, ValidationService.emailValidator])],
            'role': [''],
            'password': ['', Validators.compose([Validators.required, ValidationService.passwordValidator])],
            'confirmPassword': ['', Validators.compose([Validators.required, ValidationService.passwordValidator])],
        })
    }

    roles = userRole.values;

    errorMessage = null;
    showSpinner = false;

    onSubmit() {
        this.showSpinner = true;
        var _this = this;
        this.httpService.post<any>("/signUp", JSON.stringify(this.signUpForm.value))
            .subscribe(
                success => {
                    _this._router.parent.navigateByUrl('/signIn');
                },
                error => {
                    _this.showSpinner = false;
                    _this.errorMessage = error.errorMessage;
                },
                () => _this.showSpinner = false
            );
    };

}