import {ModuleWithProviders, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../../shared';

import {RoomEditComponent} from "./room-edit.component";


const roomEditRouting: ModuleWithProviders = RouterModule.forChild([
    {
        path: 'room',
        component: RoomEditComponent
    }
]);

@NgModule({
    imports: [
        roomEditRouting,
        SharedModule
    ],
    declarations: [
        // RoomEditComponent
    ],

    providers: []
})
export class RoomEditModule {
}
