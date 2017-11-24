import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

import {Room} from "../../models/room";
import {RoomService} from "../../services/room.service";


@Component({
    //modelId: module.id,
    selector: 'room-info-page',
    templateUrl: 'info.component.html'
})
export class RoomInfoComponent implements OnInit {
    room: Room[] = [];


    model: any = {};
    error = '';
    title: String = '';
    isSubmitting: boolean = false;
    authForm: FormGroup;

    constructor(private route: ActivatedRoute,
                private roomService: RoomService,
                private fb: FormBuilder) {}

    ngOnInit() {
        this.route.url.subscribe(data => {
            // Set a title for the page
            this.title = 'User Info';

            this.roomService.getRoomInfo()
                .subscribe(room => {
                    this.room = room;
                });
        });
    }
}
