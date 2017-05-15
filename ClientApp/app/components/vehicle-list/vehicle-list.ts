
import { Component, OnInit } from '@angular/core';
import { VehicleService } from './../../services/vehicle.service';
import { Vehicle, KeyValuePair } from './../../models/vehicle';

@Component({
    templateUrl: 'vehicle-list.html'
})

export class VehicleListComponent implements OnInit {
    vehicles: Vehicle[];
    makes: KeyValuePair[];
    query: any = {};

    constructor(private vehicleService: VehicleService){ }

    ngOnInit(){
        this.vehicleService.getMakes()
        .subscribe(makes => this.makes = makes);
        this.populateVehicles();
    }    

    private populateVehicles(){                
        this.vehicleService.getVehicles(this.query)
        .subscribe(vehicles => this.vehicles = vehicles);
    }

    onFilterChange(){
    this.query.modelId=2;
    this.populateVehicles();
    }

    resetFilter(){
        this.query ={};
        this.onFilterChange();
    }

    sortBy(columnName){
        if (this.query.sortBy === columnName){
            this.query.isSortAscending = false;
        } else{
            this.query.sortBy = columnName;
            this.query.isSortAscending = true;        
        }
        this.populateVehicles;
    }
}