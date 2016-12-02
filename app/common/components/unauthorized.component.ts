/**
 * @author iRevThis
 */

import {OnInit} from "angular2/core";
import {Router} from "angular2/router";
import {TOKEN_STORAGE_KEY} from "../../main";
import {USER_ROLE_STORAGE_KEY} from "../../main";

export class UnauthorizedComponent implements OnInit {
    constructor(protected _router:Router) {
    }

    ngOnInit() {
        if (localStorage.getItem(TOKEN_STORAGE_KEY)) {
            this.homeByRole();
        }
    }

    homeByRole() {
        var role = localStorage.getItem(USER_ROLE_STORAGE_KEY);
        switch (parseInt(role)) {
            case 0:
                this._router.navigate(['PatientDashboard']);
                break;
            case 1:
                this._router.navigate(['DoctorDashboard']);
                break;
            default:
                console.error("Unknown role");
                localStorage.clear();
                this._router.navigate(['Home']);
                break;
        }
    }
}