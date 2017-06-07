"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var progress_service_1 = require("./services/progress.service");
var http_1 = require("@angular/http");
var view_vehicle_1 = require("./components/view-vehicle/view-vehicle");
var pagination_component_1 = require("./components/shared/pagination.component");
var vehicle_list_1 = require("./components/vehicle-list/vehicle-list");
var vehicle_form_component_1 = require("./components/vehicle-form/vehicle-form.component");
var Raven = require("raven-js");
var forms_1 = require("@angular/forms");
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var ng2_toasty_1 = require("ng2-toasty");
var angular2_universal_1 = require("angular2-universal");
var app_component_1 = require("./components/app/app.component");
var vehicle_service_1 = require("./services/vehicle.service");
var app_error_handler_1 = require("./app.error-handler");
var navmenu_component_1 = require("./components/navmenu/navmenu.component");
var home_component_1 = require("./components/home/home.component");
var fetchdata_component_1 = require("./components/fetchdata/fetchdata.component");
var counter_component_1 = require("./components/counter/counter.component");
var photo_service_1 = require("./services/photo.service");
Raven
    .config('https://a2bcc6c4ad14410c9dc8fa71540b6986@sentry.io/167727')
    .install();
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        bootstrap: [app_component_1.AppComponent],
        declarations: [
            app_component_1.AppComponent,
            navmenu_component_1.NavMenuComponent,
            counter_component_1.CounterComponent,
            fetchdata_component_1.FetchDataComponent,
            home_component_1.HomeComponent,
            vehicle_form_component_1.VehicleFormComponent,
            vehicle_list_1.VehicleListComponent,
            pagination_component_1.PaginationComponent,
            view_vehicle_1.ViewVehicleComponent,
        ],
        imports: [
            forms_1.FormsModule,
            ng2_toasty_1.ToastyModule.forRoot(),
            angular2_universal_1.UniversalModule,
            router_1.RouterModule.forRoot([
                { path: '', redirectTo: 'vehicles', pathMatch: 'full' },
                { path: 'home', component: home_component_1.HomeComponent },
                { path: 'vehicles/new', component: vehicle_form_component_1.VehicleFormComponent },
                { path: 'vehicles/edit/:id', component: vehicle_form_component_1.VehicleFormComponent },
                { path: 'vehicles/:id', component: view_vehicle_1.ViewVehicleComponent },
                { path: 'vehicles', component: vehicle_list_1.VehicleListComponent },
                { path: 'counter', component: counter_component_1.CounterComponent },
                { path: 'fetch-data', component: fetchdata_component_1.FetchDataComponent },
                { path: '**', redirectTo: 'home' }
            ])
        ],
        providers: [
            { provide: core_1.ErrorHandler, useClass: app_error_handler_1.AppErrorHandler },
            { provide: http_1.BrowserXhr, useClass: progress_service_1.BrowserXhrWithProgress },
            vehicle_service_1.VehicleService,
            photo_service_1.PhotoService,
            progress_service_1.ProgressService
        ]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map