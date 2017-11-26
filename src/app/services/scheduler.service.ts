import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import {_BACK_END_URL} from "../app.constants";
import {Reservatie} from "../models/reservatie";
import {AuthenticationService} from "./authentication.service";

@Injectable()
export class SchedulerService {
  errorHandler = error => console.error('BookmarkService error', error);
  error: string = '';

  constructor(
    private http: Http,
    private authenticationService: AuthenticationService) {
  }

  getReservaties(): Observable<Reservatie[]> {
    // add authorization header with jwt token
    let headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
    let options = new RequestOptions({ headers: headers });

    // get reservations from api
    //noinspection TypeScriptValidateTypes
    return this.http.get(_BACK_END_URL + '/v1/reservations/', options)
      .map((response: Response) => response.json());
  }

  getAllReservaties() {
    let headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
    // let headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
    let options = new RequestOptions({ headers: headers });


    //noinspection TypeScriptUnresolvedFunction
    return this.http.get(_BACK_END_URL + '/v1/reservations/', options)
      .toPromise()
      .then(response => response.json())
      .catch(error => this.error = error)
  }
}
