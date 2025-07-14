// import { Component,OnInit,OnDestroy } from '@angular/core';
// import { MapDataService } from '../map-data.service';
// import * as L from 'leaflet';

// @Component({
//   selector: 'app-maplineapi',
//   templateUrl: './maplineapi.component.html',
//   styleUrls: ['./maplineapi.component.css']
// })

// export class MaplineapiComponent implements OnInit,OnDestroy{

//   private map: L.Map | undefined;
  
//   constructor(private mapdataserviceapi: MapDataService){}

//   ngOnInit(): void {
//       this.initMap();
//       this.loadLocations();
//   }

//   ngOnDestroy(): void {
//       if(this.map){
//         this.map.remove();
//       }
//   }

//   private initMap():void
//   {
//     this.map=L.map('map',{
//       center:[22.258,75.9658],
//       zoom:12
//     });

//     L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//       attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//     }).addTo(this.map);
//   }

//   private loadLocations(): void
//   {
//     this.mapdataserviceapi.getLocationsApi().subscribe(locations=>{

//     if(this.map){
//       locations.forEach(location =>{
//         const latitude=location.LATTITUDE;
//         const longitude=location.LONGITUDE;
//         const substationName=location['NAME OF SUBSTATION'];
//         const circle=location["NAME OF CIRCLE"];
//         const capacity=location['Final\nInjectable'];

//         const popupContent=`<b>Circle:</b> ${circle} <br> <b>S/s:</b> ${substationName} <br><b>Capacity:</b> ${capacity}`;
        
//         L.marker([latitude,longitude]).addTo(this.map!)
//         .bindPopup(popupContent);

//       });

//       const latLngs: L.LatLngTuple[] = locations.map(location => [location.LATTIITUDE, location.LONGITUDE]);
//         L.polyline(latLngs, { color: 'blue' }).addTo(this.map!);

//         const bounds = L.latLngBounds(latLngs);
//         this.map.fitBounds(bounds);
//     }},
    
//       (error)=>{
//         console.error("Error loading data from API:",error);
//       });
    
//   }
//   }



// import { Component, OnInit, OnDestroy } from '@angular/core';
// import { MapDataService } from '../map-data.service';  // Import the service
// import { Location } from '../map-data.service';  // Ensure the interface is correctly imported
// import * as L from 'leaflet';

// @Component({
//   selector: 'app-maplineapi',
//   templateUrl: './maplineapi.component.html',
//   styleUrls: ['./maplineapi.component.css']
// })

// export class MaplineApiComponent implements OnInit, OnDestroy {

//    private map: L.Map | undefined;
  
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

//   private loadLocations(): void {
//     this.mapDataService.getLocationsApi().subscribe(
//       (locations: Location[]) => {
//         if (this.map) {
//           // locations.forEach((location: Location) => {
//           //   const serial= location.serialNo;
//           //   const latitude = location.latitude;
//           //   const longitude = location.longitude;
//           //   const substationName = location['subStationName'];
//           //   const circleName = location['circleName'];
//           //   const capacity = location['capacityInjectable'];

//           locations.forEach((location: Location) => {
//             const { latitude, longitude, subStationName, circleName, capacityInjectable } = location;
            
//             const popupContent = `<b>Circle:</b> ${circleName}<br><b>Substation:</b> ${subStationName}<br><b>Capacity:</b> ${capacityInjectable} MW`;

//             L.marker([latitude, longitude]).addTo(this.map!)
//               .bindPopup(popupContent);
//           });

          
//           const latLngs: L.LatLngTuple[] = locations.map((location: Location) => [location.latitude, location.longitude]);
//           L.polyline(latLngs, { color: 'blue' }).addTo(this.map);

//           const bounds = L.latLngBounds(latLngs);
//           this.map?.fitBounds(bounds);
//         }
//       },
//       (error: any) => {
//         console.error('Error loading locations:', error);
//       }
//     );
//   }
// }


// old code 

import { Component, OnInit, OnDestroy } from '@angular/core';
import { MapDataService } from '../map-data.service';  // Import the service
import { Location } from '../map-data.service';  // Ensure the interface is correctly imported
import * as L from 'leaflet';

@Component({
  selector: 'app-maplineapi',
  templateUrl: './maplineapi.component.html',
  styleUrls: ['./maplineapi.component.css']
})

export class MaplineApiComponent implements OnInit, OnDestroy {

   private map: L.Map | undefined;
  
  constructor(private mapDataService: MapDataService) { }

  ngOnInit(): void {
    this.initMap();
    this.loadLocations();
  }

  ngOnDestroy(): void {
    if (this.map) {
      this.map.remove();
    }
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [22.738, 75.858],  // Set initial center of the map
      zoom: 12  // Set initial zoom level
    });

    // Add OpenStreetMap tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
  }

  private loadLocations(): void {
    this.mapDataService.getLocationsApi().subscribe(
      (locations: Location[]) => {
        if (this.map) {
          locations.forEach((location: Location) => {
            const { latitude, longitude, subStationName, circleName, capacityInjectable } = location;
  
            // Validate if latitude and longitude are numbers and not undefined
            if (this.isValidCoordinate(latitude) && this.isValidCoordinate(longitude)) {
              const popupContent = `
                <b>Circle:</b> ${circleName}<br>
                <b>Substation:</b> ${subStationName}<br>
                <b>Capacity:</b> ${capacityInjectable} MW
              `;
  
              // Add a marker for each valid location
              L.marker([latitude, longitude])
                .addTo(this.map!)
                .bindPopup(popupContent);
            } else {
              console.warn(`Invalid coordinates for substation ${subStationName}: (${latitude}, ${longitude})`);
            }
          });
  
          // Create a polyline connecting the substations (with valid coordinates)
          const latLngs: L.LatLngTuple[] = locations
            .filter(location => this.isValidCoordinate(location.latitude) && this.isValidCoordinate(location.longitude))
            .map(location => [location.latitude, location.longitude]);
  
          // Only add polyline if we have valid coordinates
          if (latLngs.length > 0) {
            L.polyline(latLngs, { color: 'blue' }).addTo(this.map!);
  
            // Adjust map bounds to fit the polyline
            const bounds = L.latLngBounds(latLngs);
            this.map!.fitBounds(bounds);
          }
        }
      },
      (error: any) => {
        console.error('Error loading locations:', error);
      }
    );
  }
  
  // Helper method to validate coordinates
  private isValidCoordinate(value: any): boolean {
    return typeof value === 'number' && !isNaN(value) && value !== undefined;
  }
}
  

