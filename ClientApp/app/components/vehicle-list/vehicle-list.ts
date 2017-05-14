
import { Component, OnInit } from '@angular/core';
import { VehicleService } from './../../services/vehicle.service';
import { Vehicle, KeyValuePair } from './../../models/vehicle';

@Component({
    templateUrl: 'vehicle-list.html'
})

export class VehicleListComponent implements OnInit {
    vehicles: Vehicle[];
    makes: KeyValuePair[];
    filter: any = {};

    constructor(private vehicleService: VehicleService){ }

    ngOnInit(){
        this.vehicleService.getMakes()
        .subscribe(makes => this.makes = makes);
        this.populateVehicles();
    }    

    private populateVehicles(){                
        this.vehicleService.getVehicles(this.filter)
        .subscribe(vehicles => this.vehicles = vehicles);
    }

    onFilterChange(){
    this.filter.modelId=2;
    this.populateVehicles();
    }

    resetFilter(){
        this.filter ={};
        this.onFilterChange();
    }
}