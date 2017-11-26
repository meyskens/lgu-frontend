import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
    selector: 'room-list',
    templateUrl: './room-list.component.html',
})
export class RoomListComponent {

    @Input() rooms = [];
    @Output() edit = new EventEmitter();
    @Output() remove = new EventEmitter();

    onEdit(room) {
        this.edit.emit(room);
    }

    onRemove(room) {
        this.remove.emit(room);
    }

}
