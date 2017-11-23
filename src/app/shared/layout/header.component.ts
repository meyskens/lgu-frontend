import {Component} from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
    selector: 'layout-header',
    templateUrl: 'header.component.html'
})
export class HeaderComponent {

    constructor(private auth: AuthenticationService,
                private route: ActivatedRoute,
                private authenticationService: AuthenticationService,
                private router: Router) {
    }

    isLoggedIn() {
        return this.auth.isLoggedIn();
    }

    logout() {
        this.route.url.subscribe(data => {
            // Set a title for the page
            // this.title = 'Inloggen';
            this.authenticationService.logout();
            this.router.navigate(['/']);
        });
    }
}