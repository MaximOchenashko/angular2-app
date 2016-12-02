/**
 * @author iRevThis
 */

import {Component} from 'angular2/core';
import {Router} from "angular2/router";
import {ROUTER_DIRECTIVES} from "angular2/router";

@Component({
    selector: 'page-sidebar',
    directives: [ROUTER_DIRECTIVES],
    templateUrl: 'app/pages/doctor/components/sidebar.html'
})
export class SidebarComponent {
    constructor(router:Router) {

    }
}