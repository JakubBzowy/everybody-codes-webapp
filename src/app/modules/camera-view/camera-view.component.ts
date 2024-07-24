import { Component, OnInit } from '@angular/core';
import { CameraApiService } from '../../core/services/api/camera.api.service';
import { HttpClient } from '@angular/common/http';
import { Camera } from '../../core/services/models/camera.model';
import { CommonModule } from '@angular/common';
import * as L from 'leaflet';

@Component({
  selector: 'app-camera-view',
  standalone: true,
  imports: [CommonModule],
  providers: [HttpClient],
  templateUrl: './camera-view.component.html',
  styleUrl: './camera-view.component.css'
})
export class CameraViewComponent implements OnInit {
  private map: any;
  allCameras: Camera[] = [];
  column15: Camera[] = [];
  column5: Camera[] = [];
  column4: Camera[] = [];
  column3: Camera[] = [];

  constructor(private cameraApiService: CameraApiService){}

  ngOnInit(){
    this.cameraApiService.getCameras().subscribe({
      next: res => {
        this.allCameras = res;
        this.populateTableData(this.allCameras);
        this.initMap(this.allCameras);
      }
    })
  }

  private populateTableData(cameras: Camera[]) {
    cameras.forEach(camera => {
      if(camera.number % 3 === 0 && camera.number % 5 === 0) {
        this.column15.push(camera);
      }
      else if(camera.number % 3 === 0) {
        this.column3.push(camera);
      }
      else if(camera.number % 5 === 0) {
        this.column5.push(camera);
      }
      else {
        this.column4.push(camera);
      }
    })
  }

  private initMap(cameras: Camera[]) {
    this.map = L.map('map', {
      center: [ 52.0914, 5.1115 ],
      zoom: 12
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    cameras.forEach(camera => {
      L.marker([camera.latitude, camera.longitude])
      .bindPopup(camera.name)
      .addTo(this.map);
    })

    tiles.addTo(this.map);
  }
}
