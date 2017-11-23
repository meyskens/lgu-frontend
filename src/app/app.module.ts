import {BrowserModule} from '@angular/platform-browser';
import {NgModule, ModuleWithProviders} from '@angular/core';
import {RouterModule} from '@angular/router';


import {AppComponent} from './app.component';
import {RegisterComponent} from './account/register/register.component';
import {HomeModule} from './home/home.module';

import {
    SharedModule,
    FooterComponent,
    HeaderComponent,
} from './shared';

const rootRouting: ModuleWithProviders = RouterModule.forRoot([], { useHash: true });

@NgModule({
    declarations: [
        AppComponent,
        RegisterComponent,
        FooterComponent,
        HeaderComponent
    ],
    imports: [
        BrowserModule,
        SharedModule,
        HomeModule,
        rootRouting,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
