import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
    selector: 'room-list',
    template: `
    <div class="panel panel-primary">
      <table class="table table-striped">
        <tr *ngFor="let room of rooms">
            <td>
                {{ room.name }}
            </td>              
            <td>
                {{ room.location }}
            </td> 
            <td>
                {{ room.width }}
            </td>  
            <td>
                {{ room.height }}
            </td>  
            <td>
                {{ room.length }}
            </td>     
            <td>
                {{room.description}}
            </td>
          
          <td>
            <button (click)="onEdit(room)" class="btn btn-primary">
              <span class="glyphicon glyphicon-pencil"></span>
              <span class="hidden-xs">Edit</span>
            </button>
            <button (click)="onRemove(room)" class="btn btn-danger">
              <span class="glyphicon glyphicon-trash"></span>
              <span class="hidden-xs">Delete</span>
            </button>
          </td>
        </tr>
      </table>
    </div>
  `,
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
