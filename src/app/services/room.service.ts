import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'

import { AuthenticationService } from '../services/authentication.service';
import {_BACK_END_URL} from "../app.constants";
import {Room} from "../models/room";

@Injectable()
export class RoomService {
    constructor(
        private http: Http,
        private authenticationService: AuthenticationService) {
    }

    getRooms(): Observable<Room[]> {
        // add authorization header with jwt token
        let headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
        // let headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
        let options = new RequestOptions({ headers: headers });

        // get users from api
        //noinspection TypeScriptValidateTypes
        return this.http.get(_BACK_END_URL + '/v1/rooms/', options)
            .map((response: Response) => response.json());
    }

    getRoomInfo(): Observable<Room[]> {
        let headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
        let options = new RequestOptions({ headers: headers });

        //noinspection TypeScriptValidateTypes
        return this.http.get(_BACK_END_URL + '/v1/room/info', options)
            .map((response: Response) => response.json());
    }
}