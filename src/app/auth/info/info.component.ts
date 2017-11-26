import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

import {User} from "../../models/user";
import {UserService} from "../../services/user.service";


@Component({
    //modelId: module.id,
    selector: 'app-auth-page',
    templateUrl: 'info.component.html'
})
export class InfoComponent implements OnInit {
    user: User[] = [];

    today: number = Date.now();

    model: any = {};
    error = '';
    title: String = '';
    isSubmitting: boolean = false;
    authForm: FormGroup;

    constructor(private route: ActivatedRoute,
                private userService: UserService,
                private fb: FormBuilder) {
        // use FormBuilder to create a form group
        this.authForm = this.fb.group({
            'email': ['', Validators.required],
            'password': ['', Validators.required]
        });
    }

    ngOnInit() {
        this.route.url.subscribe(data => {
            // Set a title for the page
            this.title = 'User Info';

            this.userService.getUserInfo()
                .subscribe(user => {
                    this.user = user;
                });
        });
    }
}
