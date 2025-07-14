// import { Component, OnInit, OnDestroy } from '@angular/core';
// import { MapDataService } from '../map-data.service';
// import * as L from 'leaflet';

// @Component({
//   selector: 'app-mapline',
//   templateUrl: './mapline.component.html',
//   styleUrls: ['./mapline.component.css']
// })
// export class MaplineComponent implements OnInit, OnDestroy {

//   private map: L.Map | undefined;
//   private locations: any[] = [];  // To store location data from the JSON file

//   constructor(private mapDataService: MapDataService) { }

//   ngOnInit(): void {
//     this.initMap();
//     this.loadLocations();
//   }

//   ngOnDestroy(): void {
//     if (this.map) {
//       this.map.remove();
//     }
//   }

//   private initMap(): void {
//     this.map = L.map('map', {
//       center: [22.738, 75.858],  // Set initial center of the map
//       zoom: 12  // Set initial zoom level
//     });

//     // Add OpenStreetMap tile layer
//     L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//       attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//     }).addTo(this.map);
//   }

//   // Method to load location data from the service
//   private loadLocations(): void {
//     this.mapDataService.getLocations().subscribe(data => {
//       this.locations = data;

//       if (this.map) {
//         // Add markers for each location
//         this.locations.forEach(location => {
//           const { latitude, longitude, name } = location;
//           L.marker([latitude, longitude]).addTo(this.map)
//             .bindPopup(name);
//         });

//         // Create an array of LatLng tuples for polyline
//         const latLngs: L.LatLngTuple[] = this.locations.map(location => [location.latitude, location.longitude]);

//         // Draw a polyline to connect all points
//         L.polyline(latLngs, { color: 'blue' }).addTo(this.map);

//         // Fit map bounds to the location points
//         const bounds = L.latLngBounds(latLngs);
//         this.map.fitBounds(bounds);  // Ensure `this.map` is defined before calling this method
//       }
//     });
//   }
// }


import { Component, OnInit, OnDestroy } from '@angular/core';
import { MapDataService } from '../map-data.service';
import * as L from 'leaflet';

@Component({
  selector: 'app-mapline',
  templateUrl: './mapline.component.html',
  styleUrls: ['./mapline.component.css']
})
export class MaplineComponent implements OnInit, OnDestroy {

  private map: L.Map | undefined;
  private locations: any[] = [];  // To store location data from the JSON file

  constructor(private mapDataService: MapDataService) { }

  ngOnInit(): void {
    this.initMap();
    this.loadLocations();
  }

  ngOnDestroy(): void {
    if (this.map) {
      console.log("Removing map");
      this.map.remove();
    }
  }

  private initMap(): void {
    console.log("Initializing map...");
    this.map = L.map('map', {
      center: [22.738, 75.858],  // Set initial center of the map
      zoom: 12  // Set initial zoom level
    });

    // Add OpenStreetMap tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    console.log("Map initialized:", this.map);
  }

  // Method to load location data from the service
  private loadLocations(): void {
    this.mapDataService.getLocations().subscribe(data => {
      console.log("Data loaded:", data);
      // this.locations = data.Sheet1;  // Get data from Sheet1

      this.locations=data;

      // Ensure map is initialized before interacting with it
      if (this.map) {
        console.log("Adding markers to map...");
        
        // Add markers for each location
        this.locations.forEach(location => {
          const circle=location['NAME OF CIRCLE'];
          const latitude = location.LATTIITUDE;
          const longitude = location.LONGITUDE;
          const name = location['NAME OF SUBSTATION'];
          const capacity=location['Final\nInjectable'];

          const popupContent = `<b>Circle:</b>${circle} <br><b>Substation:</b>${name} <br><b>Capacity:</b>${capacity}`;

          L.marker([latitude, longitude]).addTo(this.map!)
            .bindPopup(popupContent);
          console.log(`Added marker: ${name} at [${latitude}, ${longitude}]`);
        });

        // Create an array of LatLng tuples for polyline
        const latLngs: L.LatLngTuple[] = this.locations.map(location => [location.LATTIITUDE, location.LONGITUDE]);

        // Draw a polyline to connect all points
        L.polyline(latLngs, { color: 'blue' }).addTo(this.map!);
        console.log("Polyline added with points:", latLngs);

        // Fit map bounds to the location points
        const bounds = L.latLngBounds(latLngs);
        this.map.fitBounds(bounds);
        console.log("Map bounds adjusted:", bounds);
      } else {
        console.error("Map is not initialized yet.");
      }
    }, (error) => {
      console.error("Error loading data:", error);
    });
  }
}
