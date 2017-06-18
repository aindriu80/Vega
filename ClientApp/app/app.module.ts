import { AdminAuthGuard } from './services/admin-auth-guard.service';
import { AuthGuard } from './services/auth-guard.service';
import { AdminComponent } from './admin/admin.component';
import { Auth } from './services/auth.service';
import { BrowserXhrWithProgress, ProgressService } from './services/progress.service';
import { BrowserXhr } from '@angular/http';
import { ViewVehicleComponent } from './components/view-vehicle/view-vehicle';
import { PaginationComponent } from './components/shared/pagination.component';
import { VehicleListComponent } from './components/vehicle-list/vehicle-list';
import { VehicleFormComponent } from './components/vehicle-form/vehicle-form.component';
import * as Raven from 'raven-js';

import { FormsModule} from '@angular/forms';
import { NgModule, ErrorHandler } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastyModule } from 'ng2-toasty';
import { UniversalModule } from 'angular2-universal';

import { AppComponent } from './components/app/app.component'

import { VehicleService } from "./services/vehicle.service";
import { AppErrorHandler } from './app.error-handler';

import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { FetchDataComponent } from './components/fetchdata/fetchdata.component';
import { CounterComponent } from './components/counter/counter.component';
import { PhotoService } from "./services/photo.service";
import { AUTH_PROVIDERS } from "angular2-jwt/angular2-jwt";


   
 
Raven
  .config('https://a2bcc6c4ad14410c9dc8fa71540b6986@sentry.io/167727')
  .install();


@NgModule({
    bootstrap: [ AppComponent ],
    declarations: [
        AppComponent,
        NavMenuComponent,
        CounterComponent,
        FetchDataComponent,
        HomeComponent,        
        VehicleFormComponent,        
        VehicleListComponent,                
        PaginationComponent,
        ViewVehicleComponent,
        AdminComponent
    ],
    
    imports: [
        FormsModule,
        ToastyModule.forRoot(),
        UniversalModule, // Must be first import. This automatically imports BrowserModule, HttpModule, and JsonpModule too.
        RouterModule.forRoot([
            { path: '', redirectTo: 'vehicles', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'vehicles/new', component:VehicleFormComponent },
            { path: 'vehicles/edit/:id', component:VehicleFormComponent },
            { path: 'vehicles/:id', component:ViewVehicleComponent },
            { path: 'vehicles', component:VehicleListComponent },
            { path: 'admin', component: AdminComponent, canActivate: [ AdminAuthGuard ] },
            { path: 'counter', component: CounterComponent },
            { path: 'fetch-data', component: FetchDataComponent },
            { path: '**', redirectTo: 'home' }
        ])
    ],
    providers: [
        { provide: ErrorHandler, useClass: AppErrorHandler},        
        Auth,
        AuthGuard,
        AUTH_PROVIDERS,
        AdminAuthGuard,
        VehicleService,
        PhotoService,
        
        
    ]
})
export class AppModule {
}
