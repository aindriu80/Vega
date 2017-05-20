import { ProgressService } from './../../services/progress.service';
import { ToastyService } from 'ng2-toasty';
import { VehicleService } from './../../services/vehicle.service';
import { Component, OnInit, ElementRef, ViewChild, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PhotoService } from '../../services/photo.service';

@Component({
  templateUrl: 'view-vehicle.html'
})
export class ViewVehicleComponent implements OnInit {
  @ViewChild('fileInput') fileInput: ElementRef;
  vehicle: any;
  vehicleId: number; 
  photos: any[];
  progress:any;

  constructor(
    private zone: NgZone,
    private route: ActivatedRoute, 
    private router: Router,
    private toasty: ToastyService,
    private progressService: ProgressService,
    private photoService: PhotoService,
    
    private vehicleService: VehicleService) { 

    route.params.subscribe(p => {
      this.vehicleId = +p['id'];
      if (isNaN(this.vehicleId) || this.vehicleId <= 0) {
        router.navigate(['/vehicles']);
        return; 
      }
    });
  }

  ngOnInit() { 
    this.photoService.getPhotos(this.vehicleId)
      .subscribe(photos => this.photos = photos);


    this.vehicleService.getVehicle(this.vehicleId)
      .subscribe(
        v => this.vehicle = v,
        err => {
          if (err.status == 404) {
            this.router.navigate(['/vehicles']);
            return; 
          }
        });
  }

  delete() {
    if (confirm("Are you sure?")) {
      this.vehicleService.delete(this.vehicle.id)
        .subscribe(x => {
          this.router.navigate(['/vehicles']);
        });
    }
  }

  uploadPhoto(){
  var nativeElement: HTMLInputElement = this.fileInput.nativeElement;

  this.progressService.startTracking()
  .subscribe(progress => {
    console.log(progress);
    this.zone.run(() => {
       this.progress = progress;
    });   
  },
  null,
  ()=> { this.progress = null; });
  
  this.photoService.upload(this.vehicleId, nativeElement.files[0])
  .subscribe(photo => {
    this.photos.push(photo);
  
});
  }
}