import {BrowserModule} from '@angular/platform-browser';
import {NgModule, ModuleWithProviders} from '@angular/core';
import {RouterModule} from '@angular/router';

import {jqxSchedulerComponent} from 'jqwidgets-framework/jqwidgets-ts/angular_jqxscheduler';

import {AppComponent} from './app.component';
import {AuthModule} from './auth/auth.module';
import {HomeModule} from './home/home.module';
import {
    SharedModule,
    FooterComponent,
    HeaderComponent,
} from './shared';
import {AuthenticationService, UserService} from "./services/index";
import {InfoModule} from "./auth/info/info.module";
import {SchedulerModule} from "./scheduler/scheduler.module";
import {RoomModule} from "./room/room.module";
import {RoomService} from "./services/room.service";

const rootRouting: ModuleWithProviders = RouterModule.forRoot([], { useHash: true });

@NgModule({
    declarations: [
        AppComponent,
        FooterComponent,
        HeaderComponent
    ],
    imports: [
        BrowserModule,
        SharedModule,
        HomeModule,
        rootRouting,
        InfoModule,
        AuthModule,
        RoomModule,
        SchedulerModule
    ],
    providers: [AuthenticationService, UserService, RoomService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
