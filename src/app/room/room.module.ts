import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared';

import { RoomComponent } from './room.component';


const roomRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'room',
    component: RoomComponent
  }
]);

@NgModule({
  imports: [
    roomRouting,
    SharedModule
  ],
  declarations: [
    RoomComponent
  ],

  providers: []
})
export class RoomModule {}
