import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared';
import { jqxSchedulerComponent } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxscheduler';

import { SchedulerComponent } from './scheduler.component'


const schedulerRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'reserveren',
    component: SchedulerComponent
  }
]);

@NgModule({
  imports: [
    schedulerRouting,
    SharedModule
  ],
  declarations: [
    SchedulerComponent,
    jqxSchedulerComponent
  ],

  providers: []
})
export class SchedulerModule {}
