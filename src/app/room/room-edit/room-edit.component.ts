import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'room-edit-page',
    templateUrl: './room-edit.component.html',
})
export class RoomEditComponent {

    @Input() room = {};

    @Output() clear = new EventEmitter();
    @Output() save = new EventEmitter();

    onSave() {
        this.save.emit(this.room);
    }

    onClear() {
        this.clear.emit();
    }

}
