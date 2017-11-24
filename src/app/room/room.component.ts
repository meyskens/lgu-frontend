import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

import {RoomService} from "../services/room.service";
import {Room} from "../models/room";


@Component({
    //modelId: module.id,
    selector: 'room-page',
    templateUrl: './room.component.html'
})
export class RoomComponent implements OnInit {
    rooms: Room[] = [];
    model: any = {};
    error = '';
    title: String = 'Room Management';
    isSubmitting: boolean = false;
    authForm: FormGroup;

    constructor(private route: ActivatedRoute,
                private roomService: RoomService,
                private fb: FormBuilder) {
    }

    ngOnInit() {
        this.route.url.subscribe(data => {
            // Set a title for the page
            this.title = 'Room Management';

            this.roomService.getRooms()
                .subscribe(rooms => {
                    this.rooms = rooms;
                });
        });
    }

    // submitForm() {
    //     const credentials = this.authForm.value;
    //
    //
    //     this.isSubmitting = true;
    //     this.authenticationService.login(credentials.email, credentials.password)
    //         .subscribe(result => {
    //             if (result === true) {
    //                 this.router.navigate(['/']);
    //             } else {
    //                 this.error = 'Username or password is incorrect';
    //                 this.isSubmitting = false;
    //             }
    //         });
    // }
}

