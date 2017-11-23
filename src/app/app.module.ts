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

const rootRouting: ModuleWithProviders = RouterModule.forRoot([], { useHash: true });

@NgModule({
    declarations: [
        AppComponent,
        FooterComponent,
        HeaderComponent
    ],
    imports: [
        BrowserModule,
        AuthModule,
        SharedModule,
        HomeModule,
        rootRouting,
        InfoModule,
        SchedulerModule
    ],
    providers: [AuthenticationService, UserService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
