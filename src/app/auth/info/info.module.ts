import {ModuleWithProviders, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../../shared';

import {InfoComponent} from './info.component';


const infoRouting: ModuleWithProviders = RouterModule.forChild([
    {
        path: 'user/info',
        component: InfoComponent
    }
]);

@NgModule({
    imports: [
        infoRouting,
        SharedModule
    ],
    declarations: [
        InfoComponent
    ],

    providers: []
})
export class InfoModule {
}
