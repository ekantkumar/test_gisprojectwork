import { Component, OnInit, OnDestroy } from '@angular/core';
// import { MapDataService } from '../map-data.service';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, OnDestroy {

  private map: L.Map | undefined;

  // constructor(private mapDataService:MapDataService){}

  ngOnInit(): void {
    this.initMap();
    // this.loadMapData();
  }

  ngOnDestroy(): void {
    if (this.map) {
      this.map.remove();
    }
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [22.738, 75.858], // Set initial center of the map
      zoom: 11 // Set initial zoom level
    });

    // Add OpenStreetMap tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    // Add a marker
   

    const pointA: L.LatLngTuple = [22.738, 75.858]; // LatLngTuple type
    const pointB: L.LatLngTuple = [22.698, 75.878]; // LatLngTuple type


    L.marker(pointA).addTo(this.map)
      .bindPopup('MPPKVVCL INDORE')

      L.marker(pointB).addTo(this.map)
      .bindPopup('MPPKVVCL NAVLAKHA')
      .openPopup();

      const polyline = L.polyline([pointA, pointB], {
        color: 'blue',  // You can change the color of the line
        weight: 4,      // Thickness of the line
        opacity: 0.7    // Transparency of the line
      }).addTo(this.map);
  
      // Optionally, zoom to the bounds of the polyline
      this.map.fitBounds(polyline.getBounds());
    }
  }


