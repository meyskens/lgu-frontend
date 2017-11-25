import {Component, OnInit, EventEmitter, Output} from '@angular/core';
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
    roomss: Room[] = [];
    editableRoom = {};

    @Output() remove = new EventEmitter();

    model: any = {};
    error = '';
    title: String = 'Room Management';
    isSubmitting: boolean = false;
    authForm: FormGroup;

    constructor(private route: ActivatedRoute,
                private roomService: RoomService,
                private fb: FormBuilder) {

        this.reloadRoomss();
    }

    ngOnInit() {
        this.route.url.subscribe(data => {
            // Set a title for the page
            this.title = 'Room Management';

            // this.reloadRoomss();
            this.roomService.getRooms()
                .subscribe(rooms => {
                    this.rooms = rooms;
                });
        });
    }

    save(room) {
        if (room.id) {
            this.roomService.updateRoom(room)
                .then(() => this.reloadRoomss());
        } else {
            this.roomService.addRoom(room)
                .then(() => this.reloadRoomss());
        }
        this.clear();
    }

    clear() {
        this.editableRoom = {};
    }

    private reloadRoomss() {
        return this.roomService.getRoomss()
            .then(roomss => this.roomss = roomss);
        // .then(rooms => console.info(rooms));
    }


    removeRoom(room) {
        this.roomService.removeRoom(room)
            .then(() => this.reloadRoomss());
    }

    onRemoveRoom(room) {
        this.remove.emit(room);
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

