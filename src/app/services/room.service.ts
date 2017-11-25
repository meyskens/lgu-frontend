import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions, Response} from '@angular/http';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map';

import {AuthenticationService} from '../services/authentication.service';
import {_BACK_END_URL} from "../app.constants";
import {Room} from "../models/room";

@Injectable()
export class RoomService {
    errorHandler = error => console.error('RoomService error', error);
    error: string = '';

    constructor(private http: Http,
                private authenticationService: AuthenticationService) {
    }

    getRoomss() {
        let headers = new Headers({'Authorization': 'Bearer ' + this.authenticationService.token});
        // let headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
        let options = new RequestOptions({headers: headers});


        //noinspection TypeScriptUnresolvedFunction
        return this.http.get(_BACK_END_URL + '/v1/rooms/', options)
            .toPromise()
            .then(response => response.json())
            .catch(error => this.error = error)
    }

    getRooms(): Observable<Room[]> {
        // add authorization header with jwt token
        let headers = new Headers({'Authorization': 'Bearer ' + this.authenticationService.token});
        // let headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
        let options = new RequestOptions({headers: headers});

        // get users from api
        //noinspection TypeScriptValidateTypes
        return this.http.get(_BACK_END_URL + '/v1/rooms/', options)
            .map((response: Response) => response.json());
    }


    getRoomInfo(): Observable<Room[]> {
        let headers = new Headers({'Authorization': 'Bearer ' + this.authenticationService.token});
        let options = new RequestOptions({headers: headers});

        //noinspection TypeScriptValidateTypes
        return this.http.get(_BACK_END_URL + '/v1/room/info', options)
            .map((response: Response) => response.json());
    }

    addRoom(room) {
        let headers = new Headers({'Authorization': 'Bearer ' + this.authenticationService.token});
        let options = new RequestOptions({headers: headers});

        const json = (room);
        //noinspection TypeScriptUnresolvedFunction
        return this.http.post(_BACK_END_URL + `/v1/admin/rooms`, json, options)
            .toPromise()
            .catch(this.errorHandler);
    }

    updateRoom(room) {
        let headers = new Headers({'Authorization': 'Bearer ' + this.authenticationService.token});
        let options = new RequestOptions({headers: headers});

        const json = ({
            _id: room._id,
            name: room.name,
            width: room.width,
            height: room.height,
            length: room.length,
            location: room.location,
            description: room.description
        });
        //noinspection TypeScriptUnresolvedFunction
        return this.http.put(_BACK_END_URL + `/v1/admin/rooms`, json, options)
            .toPromise()
            .catch(this.errorHandler);
    }

    removeRoom(room) {
        let headers = new Headers({'Authorization': 'Bearer ' + this.authenticationService.token});
        let options = new RequestOptions({headers: headers});

        // const json = (room);
        //noinspection TypeScriptUnresolvedFunction
        return this.http.delete(_BACK_END_URL + `/v1/admin/rooms/${room._id}`, options)
            .toPromise()
            .catch(this.errorHandler);
    }
}