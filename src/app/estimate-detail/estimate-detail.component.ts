import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { EstimateService } from '../estimate.service';

@Component({
  selector: 'app-estimate-detail',
  templateUrl: './estimate-detail.component.html',
  styleUrls: ['./estimate-detail.component.css']
})
export class EstimateDetailComponent implements OnInit {
  estimateNumber: string = '';
  private map!: L.Map;
  private markers: L.Marker[] = [];

  constructor(private estimate: EstimateService) { }

  ngOnInit(): void {
    this.InitMap();
  }

  InitMap(): void {
    this.map = L.map('map').setView([22.9734, 78.6569], 8);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        attribution: '© OpenStreetMap contributors'
      }).addTo(this.map)
  }

  searchEstimate(): void {
    if (!this.estimateNumber.trim()) {
      alert('Please enter valid Estimate number');
      return;
    }

    // this.estimate.getEstimateLocation(this.estimateNumber).subscribe({
    //   next:(data)=>{
    //     const lat = Number(data.latitude);
    //     const lng = Number(data.longitude);
    //     console.log(data);

    //     if (!isNaN(lat) && !isNaN(lng)) {
    //       this.showMarker(lat, lng);
    //     }
    //      else {
    //       alert('Invalid lat/long data received.');
    //     }
    //   },



    this.estimate.getEstimateLocation(this.estimateNumber).subscribe({
      next: (data) => {
        this.clearMarkers();
        if (Array.isArray(data) && data.length > 0) {
          const latLngs: [number, number][] = [];
          data.forEach(item => {
            const lat = Number(item.latitude);
            const lng = Number(item.longitude);
            console.log(data);

            if (!isNaN(lat) && !isNaN(lng)) {
              this.showMarker(lat, lng, item.estimateno);
              latLngs.push([lat, lng]);
            }
          });

          if (latLngs.length > 0) {
            this.map.fitBounds(latLngs, { padding: [30, 30] });
          }
          error: (err: any) => {
            console.error('Error fetching estimate location:', err);
            alert('Estimate not found or API error.');
          }
        }
      }
    });
  }

  //    showMarker(lat: number, lng: number,): void {
  //     if (this.marker) {
  //       this.map.removeLayer(this.marker);
  //     }

  //     this.marker = L.marker([lat, lng])
  //       .addTo(this.map)
  //       .bindPopup(`<b>Estimate:</b> ${this.estimateNumber}<br><b>Lat:</b>`)
  //       .openPopup();

  //       this.map.setView([lat,lng],15)

  // }

  showMarker(lat: number, lng: number, estimateNo: string): void {
    const marker = L.marker([lat, lng])
      .addTo(this.map)
      .bindPopup(`<b>Estimate:</b> ${estimateNo}<br><b>Lat:</b> ${lat}<br><b>Lng:</b> ${lng}`);

    this.markers.push(marker);
  }
  clearMarkers(): void {
    this.markers.forEach(marker => {
      this.map.removeLayer(marker);
    });
    this.markers = [];
  }


}


