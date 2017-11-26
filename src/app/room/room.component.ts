import { Component } from '@angular/core';
import {RoomService} from "../services/room.service";

@Component({
    selector: 'room-app',
    templateUrl: './room.component.html',

})
export class RoomComponent {

    rooms = [];
    editableRoom = {};

    constructor(private roomService: RoomService) {
        roomService.errorHandler = error =>
            window.alert('Oops! The server request failed.');
        this.reload();
    }

    clear() {
        this.editableRoom = {};
    }

    edit(room) {
        //noinspection TypeScriptUnresolvedFunction
        this.editableRoom = Object.assign({}, room);
    }

    remove(room) {
        this.roomService.removeRoom(room)
            .then(() => this.reload());
    }

    save(room) {
        if (room._id) {
            this.roomService.updateRoom(room)
                .then(() => this.reload());
        } else {
            this.roomService.addRoom(room)
                .then(() => this.reload());
        }
        this.clear();
    }

    private reload() {
        //noinspection TypeScriptUnresolvedFunction
        return this.roomService.getRoomss()
            .then(rooms => this.rooms = rooms);
    }

}
