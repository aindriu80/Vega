
import { Component, OnInit } from '@angular/core';
import { VehicleService } from './../../services/vehicle.service';
import { Vehicle, KeyValuePair } from './../../models/vehicle';

@Component({
    templateUrl: 'vehicle-list.html'
})

export class VehicleListComponent implements OnInit {
    vehicles: Vehicle[];
    allVehicles: Vehicle[];
    makes: KeyValuePair[];
    filter: any = {};

    constructor(private vehicleService: VehicleService){ }

    ngOnInit(){
        this.vehicleService.getMakes()
        .subscribe(makes => this.makes = makes);
        
        this.vehicleService.getVehicles()
        .subscribe(vehicles => this.vehicles = this.allVehicles= vehicles);
    }
    onFilterChange(){
    var vehicles = this.allVehicles;

    if (this.filter.makeId)
        vehicles = vehicles.filter(v => v.make.id == this.filter.makeId)

        if (this.filter.modelId)
        vehicles = vehicles.filter(v => v.model.id == this.filter.modelId)

        this.vehicles = vehicles;
    }
    resetFilter(){
        this.filter ={};
        this.onFilterChange();
    }
}