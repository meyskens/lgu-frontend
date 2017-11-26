import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'reservatie-edit',
  templateUrl: './reservatie-edit.component.html',
})
export class ReservatieEditComponent {

  @Input() reservatie = {};
  @Input() rooms = [];
  @Output() clear = new EventEmitter();
  @Output() save = new EventEmitter();

  // user = JSON.parse(localStorage.getItem('currentUser'));

  onClear() {
    this.clear.emit();
  }

  onSave() {
    this.save.emit(this.reservatie);
  }

}
