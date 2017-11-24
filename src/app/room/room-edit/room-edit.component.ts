import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'room-edit-page',
    templateUrl: './room-edit.component.html',
})
export class RoomEditComponent {

    @Input() room = {};

    @Output() save = new EventEmitter();
    @Output() clear = new EventEmitter();

    onSave() {
        this.save.emit(this.room);
    }

    onClear() {
        this.clear.emit();
    }

}
