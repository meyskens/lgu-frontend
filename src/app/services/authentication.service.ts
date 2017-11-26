import {Injectable} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map'
import {_BACK_END_URL} from '../app.constants';

@Injectable()
export class AuthenticationService {
    public token: string;

    constructor(private http: Http) {
        // set token if saved in local storage
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
    }

    login(username: string, password: string): Observable<boolean> {
        //noinspection TypeScriptValidateTypes
        return this.http.post(_BACK_END_URL + '/v1/login', ({email: username, password: password}))
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let token = response.json() && response.json().token;
                let isAdmin = response.json().isAdmin;
                // let isAdmin = response.json().isAdmin;
                if (token) {
                    // set token property
                    this.token = token;

                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify({email: username, token: token}));
                    localStorage.setItem('isAdmin', isAdmin);
                    localStorage.setItem('currentUserName', JSON.stringify(username));

                    // return true to indicate successful login
                    return true;
                } else {
                    // return false to indicate failed login
                    return false;
                }
            });
    }

    logout(): void {
        // clear token remove user from local storage to log user out
        this.token = null;
        localStorage.removeItem('currentUser');
        localStorage.removeItem('isAdmin');
        localStorage.removeItem('currentUserName');
    }

    isLoggedIn() {
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        return currentUser != null;
    }

    isAdmin() {
        let isAdmin = JSON.parse(localStorage.getItem('isAdmin'));
        return isAdmin;
    }
}
