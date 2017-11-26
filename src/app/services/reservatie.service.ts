import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions, Response} from '@angular/http';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map';

import {AuthenticationService} from '../services/authentication.service';
import {_BACK_END_URL} from "../app.constants";
import {Reservatie} from "../models/reservatie";

@Injectable()
export class ReservatieService {
  errorHandler = error => console.error('ReservatieService error', error);
  error: string = '';

  constructor(private http: Http,
              private authenticationService: AuthenticationService) {
  }

  getAllReservaties() {
    let headers = new Headers({'Authorization': 'Bearer ' + this.authenticationService.token});
    // let headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
    let options = new RequestOptions({headers: headers});


    //noinspection TypeScriptUnresolvedFunction
    return this.http.get(_BACK_END_URL + '/v1/reservations/', options)
      .toPromise()
      .then(response => response.json())
      .catch(error => this.error = error)
  }

  getReservaties(): Observable<Reservatie[]> {
    // add authorization header with jwt token
    let headers = new Headers({'Authorization': 'Bearer ' + this.authenticationService.token});
    // let headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
    let options = new RequestOptions({headers: headers});

    // get users from api
    //noinspection TypeScriptValidateTypes
    return this.http.get(_BACK_END_URL + '/v1/reservations/', options)
      .map((response: Response) => response.json());
  }


  getReservatieInfo(): Observable<Reservatie[]> {
    let headers = new Headers({'Authorization': 'Bearer ' + this.authenticationService.token});
    let options = new RequestOptions({headers: headers});

    //noinspection TypeScriptValidateTypes
    return this.http.get(_BACK_END_URL + '/v1/reservations/info', options)
      .map((response: Response) => response.json());
  }

  addReservatie(reservatie) {
    let headers = new Headers({'Authorization': 'Bearer ' + this.authenticationService.token});
    let options = new RequestOptions({headers: headers});

    const json = (reservatie);
    //noinspection TypeScriptUnresolvedFunction
    return this.http.post(_BACK_END_URL + `/v1/user/reservations`, json, options)
      .toPromise()
      .catch(this.errorHandler);
  }

  updateReservatie(reservatie) {
    let headers = new Headers({'Authorization': 'Bearer ' + this.authenticationService.token});
    let options = new RequestOptions({headers: headers});

    const json = ({
      _id: reservatie._id,
      reason: reservatie.reason,
      user: reservatie.user,
      room: reservatie.room,
      from: reservatie.from,
      to: reservatie.to,
      feedback: reservatie.feedback,
      confirmed: reservatie.confirmed
    });
    //noinspection TypeScriptUnresolvedFunction
    return this.http.put(_BACK_END_URL + `/v1/admin/reservations`, json, options)
      .toPromise()
      .catch(this.errorHandler);
  }

  removeReservatie(reservatie) {
    let headers = new Headers({'Authorization': 'Bearer ' + this.authenticationService.token});
    let options = new RequestOptions({headers: headers});

    // const json = (room);
    //noinspection TypeScriptUnresolvedFunction
    return this.http.delete(_BACK_END_URL + `/v1/admin/reservations/${reservatie._id}`, options)
      .toPromise()
      .catch(this.errorHandler);
  }
}
