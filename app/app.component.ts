/**
 * @author iRevThis
 */

import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES, Router} from 'angular2/router';
import {AuthComponent} from './pages/auth/auth.component';
import {OnInit} from "angular2/core";
import {HttpService} from "./common/security/httpService";
import {AuthorizedComponent} from "./common/components/authorized.component";
import {PatientDashboardComponent} from "./pages/patient/dashboard/dashboard.component";
import {SignUpComponent} from "./pages/signUp/signUp.component";
import {DoctorDashboardComponent} from "./pages/doctor/dashboard/dashboard.component";
import {DoctorsComponent} from "./pages/patient/doctors/doctors.component";
import {MyDoctorsComponent} from "./pages/patient/myDoctors/doctors.component";
import {DevicesComponent} from "./pages/patient/devices/list/devices.component";
import {EditDeviceComponent} from "./pages/patient/devices/edit/editDevice.component";
import {PatientProfileComponent} from "./pages/patient/profile/profile.component";

@Component({
    selector: 'my-app',
    directives: [ROUTER_DIRECTIVES],
    template: `<router-outlet></router-outlet>`
})

@RouteConfig([
    {path: '/', name: 'Home', redirectTo: ['SignIn']},
    {path: '/signIn', name: 'SignIn', component: AuthComponent},
    {path: '/signUp', name: 'SignUp', component: SignUpComponent},
    {path: '/patient/dashboard', name: 'PatientDashboard', component: PatientDashboardComponent},
    {path: '/patient/profile', name: 'PatientProfile', component: PatientProfileComponent},
    {path: '/patient/doctors', name: 'MyDoctors', component: MyDoctorsComponent},
    {path: '/doctor/dashboard', name: 'DoctorDashboard', component: DoctorDashboardComponent},
    {path: '/doctors', name: 'Doctors', component: DoctorsComponent},
    {path: '/devices', name: 'Devices', component: DevicesComponent},
    {path: '/devices/new', name: 'NewDevice', component: EditDeviceComponent}
])

export class AppComponent extends AuthorizedComponent {

    constructor(_router:Router) {
        super(_router);
    }

}
