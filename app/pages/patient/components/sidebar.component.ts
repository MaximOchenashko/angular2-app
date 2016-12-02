/**
 * @author iRevThis
 */

import {Component} from 'angular2/core';
import {Router} from "angular2/router";
import {ROUTER_DIRECTIVES} from "angular2/router";

@Component({
    selector: 'page-sidebar',
    directives: [ROUTER_DIRECTIVES],
    templateUrl: 'app/pages/patient/components/sidebar.html'
})
export class SidebarComponent {
    constructor(private router:Router) {

    }

    isRouteActive(route) {
        return this.router.parent.isRouteActive(this.router.parent.generate(route));
    }
}