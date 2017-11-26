import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared';

import { ReservatieComponent } from './reservatie.component'
import {ReservatieEditComponent} from "./reservatie-edit.component";
import {ReservatieListComponent} from "./reservatie-list.component";

const reservatieRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'reservaties',
    component: ReservatieComponent
  }
]);

@NgModule({
  imports: [
    reservatieRouting,
    SharedModule
  ],
  declarations: [
    ReservatieComponent,
    ReservatieEditComponent,
    ReservatieListComponent
  ],

  providers: []
})
export class ReservatieModule {
}
