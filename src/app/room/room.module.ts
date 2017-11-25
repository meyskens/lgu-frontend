import {ModuleWithProviders, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../shared';

import {RoomComponent} from './room.component';
import {RoomEditComponent} from "./room-edit/room-edit.component";
import {RoomEditModule} from "./room-edit/room-edit.module";
import {RoomListComponent} from "./room-list/room-list.component";


const roomRouting: ModuleWithProviders = RouterModule.forChild([
    {
        path: 'room',
        component: RoomComponent
    }
]);

@NgModule({
    imports: [
        roomRouting,
        // RoomEditModule,
        SharedModule
    ],
    declarations: [
        RoomComponent,
        RoomEditComponent,
        RoomListComponent
    ],

    providers: [RoomEditModule]
})
export class RoomModule {
}
