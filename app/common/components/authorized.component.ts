/**
 * @author iRevThis
 */

import {OnInit} from "angular2/core";
import {Router} from "angular2/router";
import {TOKEN_STORAGE_KEY} from "../../main";

export class AuthorizedComponent implements OnInit {
    constructor(protected _router:Router) {
    }

    ngOnInit() {
        if (!localStorage.getItem(TOKEN_STORAGE_KEY)) {
            this._router.navigate(['SignIn']);
        }
    }
}