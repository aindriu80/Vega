
import { Component, OnInit } from '@angular/core';
import { VehicleService } from './../../services/vehicle.service';
import { Vehicle, KeyValuePair } from './../../models/vehicle';

@Component({
    templateUrl: 'vehicle-list.html'
})

export class VehicleListComponent implements OnInit {
    vehicles: Vehicle[];
    makes: KeyValuePair[];

    constructor(private vehicleService: VehicleService){ }

    ngOnInit(){
        this.vehicleService.getMakes()
        .subscribe(makes => this.makes = makes);
        
        this.vehicleService.getVehicles()
        .subscribe(vehicles => this.vehicles = vehicles);
    }
}