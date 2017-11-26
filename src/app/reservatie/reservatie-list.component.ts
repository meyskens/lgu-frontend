import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'reservatie-list',
  templateUrl: './reservatie-list.component.html',
})
export class ReservatieListComponent {

  @Input() reservaties = [];
  @Output() edit = new EventEmitter();
  @Output() remove = new EventEmitter();

  onEdit(reservatie) {
    this.edit.emit(reservatie);
  }

  onRemove(reservatie) {
    this.remove.emit(reservatie);
  }

}
