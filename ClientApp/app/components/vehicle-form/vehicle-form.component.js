"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("underscore");
var Observable_1 = require("rxjs/Observable");
var router_1 = require("@angular/router");
var vehicle_service_1 = require("./../../services/vehicle.service");
var core_1 = require("@angular/core");
var ng2_toasty_1 = require("ng2-toasty");
require("rxjs/add/Observable/forkJoin");
var VehicleFormComponent = (function () {
    function VehicleFormComponent(route, router, vehicleService, toastyService) {
        var _this = this;
        this.route = route;
        this.router = router;
        this.vehicleService = vehicleService;
        this.toastyService = toastyService;
        this.vehicle = {
            id: 0,
            makeId: 0,
            modelId: 0,
            isRegistered: false,
            features: [],
            contact: {
                name: '',
                email: '',
                phone: '',
            }
        };
        route.params.subscribe(function (p) {
            _this.vehicle.id = +p['id'] || 0;
        });
    }
    VehicleFormComponent.prototype.ngOnInit = function () {
        var _this = this;
        var sources = [
            this.vehicleService.getMakes(),
            this.vehicleService.getFeatures(),
        ];
        if (this.vehicle.id)
            sources.push(this.vehicleService.getVehicle(this.vehicle.id));
        Observable_1.Observable.forkJoin(sources).subscribe(function (data) {
            _this.makes = data[0];
            _this.features = data[1];
            if (_this.vehicle.id) {
                _this.setVehicle(data[2]);
                _this.populateModels();
            }
        }, function (err) {
            if (err.status == 404)
                _this.router.navigate(['/home']);
        });
    };
    VehicleFormComponent.prototype.setVehicle = function (v) {
        this.vehicle.id = v.id;
        this.vehicle.makeId = v.make.id;
        this.vehicle.modelId = v.model.id;
        this.vehicle.isRegistered = v.isRegistered;
        this.vehicle.contact = v.contact;
        this.vehicle.features = _.pluck(v.features, 'id');
    };
    VehicleFormComponent.prototype.onMakeChange = function () {
        this.populateModels();
        delete this.vehicle.modelId;
    };
    VehicleFormComponent.prototype.populateModels = function () {
        var _this = this;
        var selectedMake = this.makes.find(function (m) { return m.id == _this.vehicle.makeId; });
        this.models = selectedMake ? selectedMake.models : [];
    };
    VehicleFormComponent.prototype.onFeatureToggle = function (featureId, $event) {
        if ($event.target.checked)
            this.vehicle.features.push(featureId);
        else {
            var index = this.vehicle.features.indexOf(featureId);
            this.vehicle.features.splice(index, 1);
        }
    };
    VehicleFormComponent.prototype.submit = function () {
        var _this = this;
        if (this.vehicle.id) {
            this.vehicleService.update(this.vehicle)
                .subscribe(function (x) {
                _this.toastyService.success({
                    title: 'Success',
                    msg: 'The vehicle was sucessfully updated.',
                    theme: 'bootstrap',
                    showClose: true,
                    timeout: 5000
                });
            });
        }
        else {
            this.vehicleService.create(this.vehicle)
                .subscribe(function (x) { return console.log(x); });
        }
    };
    return VehicleFormComponent;
}());
VehicleFormComponent = __decorate([
    core_1.Component({
        selector: 'app-vehicle-form',
        templateUrl: './vehicle-form.component.html',
        styleUrls: ['./vehicle-form.component.css']
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute,
        router_1.Router,
        vehicle_service_1.VehicleService,
        ng2_toasty_1.ToastyService])
], VehicleFormComponent);
exports.VehicleFormComponent = VehicleFormComponent;
//# sourceMappingURL=vehicle-form.component.js.map