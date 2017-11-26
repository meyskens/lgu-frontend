import { Component } from '@angular/core';
import {ReservatieService} from "../services/reservatie.service";
import {RoomService} from "../services/room.service";

@Component({
  selector: 'reservatie-app',
  templateUrl: './reservatie.component.html'
})
export class ReservatieComponent {

  reservaties = [];
  editableReservatie = {};
  rooms = [];

  constructor(private reservatieService: ReservatieService,
              private roomService: RoomService) {
    reservatieService.errorHandler = error =>
      window.alert('Oops! The server request failed.');
    this.reload();
    this.loadRooms();
  }

  clear() {
    this.editableReservatie = {};
  }

  edit(reservatie) {
    //noinspection TypeScriptUnresolvedFunction
    this.editableReservatie = Object.assign({}, reservatie);
  }

  remove(reservatie) {
    this.reservatieService.removeReservatie(reservatie)
      .then(() => this.reload());
  }

  save(reservatie) {
    if (reservatie._id) {
      this.reservatieService.updateReservatie(reservatie)
        .then(() => this.reload());
    } else {
      this.reservatieService.addReservatie(reservatie)
        .then(() => this.reload());
    }
    this.clear();
  }

  private reload() {
    //noinspection TypeScriptUnresolvedFunction
    return this.reservatieService.getAllReservaties()
      .then(reservaties => this.reservaties = reservaties);
  }

  private loadRooms() {
    return this.roomService.getRoomss()
      .then(rooms => this.rooms = rooms);
  }

}
