import {ModuleWithProviders, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../../shared';

import {RoomInfoComponent} from './room-info.component';


const roomInfoRouting: ModuleWithProviders = RouterModule.forChild([
    {
        path: 'room/info',
        component: RoomInfoComponent
    }
]);

@NgModule({
    imports: [
        roomInfoRouting,
        SharedModule
    ],
    declarations: [
        RoomInfoComponent
    ],

    providers: []
})
export class InfoModule {
}
