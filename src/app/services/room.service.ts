import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'

import { AuthenticationService } from '../services/authentication.service';
import { User } from '../models/index';
import {_BACK_END_URL} from "../app.constants";

@Injectable()
export class UserService {
    constructor(
        private http: Http,
        private authenticationService: AuthenticationService) {
    }

    getUsers(): Observable<User[]> {
        // add authorization header with jwt token
        let headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
        let options = new RequestOptions({ headers: headers });

        // get users from api
        //noinspection TypeScriptValidateTypes
        return this.http.get(_BACK_END_URL + '/v1/user/', options)
            .map((response: Response) => response.json());
    }

    getUserInfo(): Observable<User[]> {
        let headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
        let options = new RequestOptions({ headers: headers });

        return this.http.get(_BACK_END_URL + '/v1/user/info', options)
            .map((response: Response) => response.json());
    }
}