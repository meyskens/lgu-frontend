import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
    selector: 'room-edit',
    template: `
    <div class="panel panel-primary">
      <div class="panel-body">
            <input type="text" [(ngModel)]="room.name"
                   placeholder="Room Name" >
            <input type="text" [(ngModel)]="room.description"
                   placeholder="Room Description" >
            <input type="number" [(ngModel)]="room.width"
                   placeholder="Room Width" >
            <input type="number" [(ngModel)]="room.height"
                   placeholder="Room Height" >
            <input type="number" [(ngModel)]="room.length"
                   placeholder="Room Length" >
          
        <button (click)="onSave()" class="btn btn-primary">
          <span class="glyphicon glyphicon-ok"></span>
          <span class="hidden-xs">Save</span>
        </button>
        <button (click)="onClear()" class="btn btn-warning">
          <span class="glyphicon glyphicon-remove"></span>
          <span class="hidden-xs">Clear</span>
        </button>
      </div>
    </div>
  `,
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
