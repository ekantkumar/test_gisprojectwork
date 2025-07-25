
import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { Circle, Division,Location, MapviewService } from '../mapview.service';


@Component({
  selector: 'app-mapdashboard',
  templateUrl: './mapdashboard.component.html',
  styleUrls: ['./mapdashboard.component.css']
})
export class MapdashboardComponent implements OnInit {
  regionDisplayMap: { [key: string]: string } = {
    '1': 'Indore',
    '2': 'Ujjain'
  };

  regions = ['1', '2'];
  circles: Circle[] = [];
  divisions: Division[] = [];
  dcs: { name: string, code: string }[] = [];

  selectedRegion = '';
  selectedCircle = '';
  selectedDivision = '';
  selectedDC = '';

  private map: L.Map | undefined;
  private markers: L.Marker[] = [];

  constructor(private mapview: MapviewService) { }

  ngOnInit(): void {
    this.initMap();
  }

  initMap(): void {
    this.map = L.map('map').setView([22.7196, 75.8577], 7);  // Default: Indore

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);
  }

  clearMarkers(): void {
    this.markers.forEach(marker => this.map?.removeLayer(marker));
    this.markers = [];
  }

  displayMarkers(locations: Location[]): void {
    this.clearMarkers();

    locations.forEach(location => {
      const marker = L.marker([location.latitude, location.longitude])
        .addTo(this.map!)
  //       .on('click', () => {
  //   window.open(`https://www.google.com/maps?q=${location.latitude},${location.longitude}`, '_blank');
  // });
        .bindPopup(`
          <strong>${location.subStationName}</strong><br>
          Circle: ${location.circleName}<br>
          Division: ${location.divisionName || 'N/A'}<br>
          Capacity: ${location.capacityInjectable} MVA
        `);
      this.markers.push(marker);
    });

    if (locations.length > 0) {
      this.map?.setView([locations[0].latitude, locations[0].longitude], 10);
    }
  }

  onRegionChange(): void {
    this.resetBelow('circle');
    this.mapview.getCircles(this.selectedRegion).subscribe((data: Circle[]) => {
      this.circles = data.filter(circle => circle.regionCode === this.selectedRegion);
    });
  }

  onCircleChange(): void {
    this.resetBelow('division');
    this.mapview.getDivisionsByCircle(this.selectedCircle).subscribe(data => {
      this.divisions = data.filter(division => division.circleCode === this.selectedCircle);
    });
  }

  onDivisionChange(): void {
    this.resetBelow('dc');
    this.mapview.getDC(this.selectedDivision).subscribe(data => {
      this.dcs = data
        .filter(dc => dc.divisionCode === this.selectedDivision)
        .map(dc => ({
          name: dc.distributionCenterName,
          code: dc.distributionCenterCode
        }));
    });
  }

  resetBelow(level: 'circle' | 'division' | 'dc'): void {
    if (level === 'circle') {
      this.selectedCircle = '';
      this.selectedDivision = '';
      this.selectedDC = '';
      this.circles = [];
      this.divisions = [];
      this.dcs = [];
    } else if (level === 'division') {
      this.selectedDivision = '';
      this.selectedDC = '';
      this.divisions = [];
      this.dcs = [];
    } else if (level === 'dc') {
      this.selectedDC = '';
      this.dcs = [];
    }
  }

  getmapsubstation(): void {
    this.mapview.getSubStaionMap(
      this.selectedRegion || '0',
      this.selectedCircle || '0',
      this.selectedDivision || '0'
      // this.selectedDC || ''
    ).subscribe((data: Location[]) => {
      console.log('Location map data:', data);
      this.displayMarkers(data);
    });
  }
}
