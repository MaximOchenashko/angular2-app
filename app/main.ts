/**
 * @author iRevThis
 */
///<reference path="../node_modules/angular2/typings/browser.d.ts"/>

import 'rxjs/Rx';

import {bootstrap} from 'angular2/platform/browser'
import {AppComponent} from './app.component'
import {ROUTER_PROVIDERS} from "angular2/router";
import {provide} from "angular2/core";
import {HTTP_PROVIDERS} from "angular2/http";
import {AuthConfig} from "./common/security/httpService";
import {PLATFORM_DIRECTIVES} from "angular2/core";
import {LocationStrategy, APP_BASE_HREF} from "angular2/src/platform/browser/location/location_strategy";
import {PathLocationStrategy} from "angular2/src/platform/browser/location/path_location_strategy";
import {HashLocationStrategy} from "angular2/src/platform/browser/location/hash_location_strategy";
//import {enableProdMode} from 'angular2/core';

//enableProdMode();

export var API_PREFIX = '/api/v1';
export var TOKEN_STORAGE_KEY = 'auth_token';
export var USER_NAME_STORAGE_KEY = 'user_name';
export var USER_ROLE_STORAGE_KEY = 'user_role';
export var AUTH_CONFIG: AuthConfig = new AuthConfig({ tokenName: TOKEN_STORAGE_KEY });

bootstrap(AppComponent, [
    HTTP_PROVIDERS,
    ROUTER_PROVIDERS,
  // provide(PLATFORM_DIRECTIVES, {useValue: [ROUTER_PROVIDERS], multi: true}),
    provide(LocationStrategy, {useClass: HashLocationStrategy}),
    provide(APP_BASE_HREF, {useValue: '/'})
]);