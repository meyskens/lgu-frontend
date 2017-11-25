import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
    selector: 'room-list-page',
    templateUrl: './room-list.component.html',
})
export class RoomListComponent {

    @Input() rooms = [];
    @Output() edit = new EventEmitter();
    @Output() remove = new EventEmitter();

    onEditRoom(room) {
        this.edit.emit(room);
    }

    onRemoveRoom(room) {
        this.remove.emit(room);
    }

}
