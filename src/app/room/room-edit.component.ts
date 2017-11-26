import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
    selector: 'room-edit',
    templateUrl: './room-edit.component.html',
})
export class RoomEditComponent {

    @Input() room = {};
    @Output() clear = new EventEmitter();
    @Output() save = new EventEmitter();

    onClear() {
        this.clear.emit();
    }

    onSave() {
        this.save.emit(this.room);
    }

}
