import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

import {AuthenticationService} from '../services/index';


@Component({
    //modelId: module.id,
    selector: 'app-auth-page',
    templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit {
    model: any = {};
    error = '';
    title: String = '';
    isSubmitting: boolean = false;
    authForm: FormGroup;

    constructor(private router: Router,
                private authenticationService: AuthenticationService,
                private fb: FormBuilder) {
        // use FormBuilder to create a form group
        this.authForm = this.fb.group({
            'email': ['', Validators.required],
            'password': ['', Validators.required]
        });
    }

    ngOnInit() {

    }

    submitForm() {
        const credentials = this.authForm.value;

        this.isSubmitting = true;
        this.authenticationService.login(credentials.email, credentials.password)
            .subscribe(result => {
                if (result === true) {
                    this.router.navigate(['/']);
                } else {
                    this.error = 'Username or password is incorrect';
                    this.isSubmitting = false;
                }
            }, error => this.error = error);
    }
}

