import {ModuleWithProviders, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
// import 'rxjs/add/operator/toPromise';

import {SharedModule} from '../shared';
import {RoomComponent} from './room.component';
import {RoomEditComponent} from "./room-edit.component";
import {RoomListComponent} from "./room-list.component";


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

    providers: []
})
export class RoomModule {
}
