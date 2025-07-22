import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { HttpClient } from '@angular/common/http';
import { DistributionCenter, MapviewService } from '../mapview.service';
import { Division } from '../mapview.service';
import { Circle } from '../mapview.service';
import { Feeder11Service } from '../feeder11.service';


@Component({
  selector: 'app-feeder11',
  templateUrl: './feeder11.component.html',
  styleUrls: ['./feeder11.component.css']
})

export class Feeder11Component implements OnInit {
addEstimate(_t93: any) {
throw new Error('Method not implemented.');
}


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
  summary: any[] = [];
  feederCounts: any;
  feederDashboardData: any[];
  private map: L.Map | undefined;
  private markers: L.Marker[] = [];



  constructor(private mapview: MapviewService, private http: HttpClient, private feeder11: Feeder11Service) { }

  ngOnInit(): void {
    this.initMap();
  }



  initMap(): void {
    this.map = L.map('map').setView([22.7196, 75.8577], 7);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);
  }

  clearMarkers(): void {
    this.markers.forEach(marker => this.map?.removeLayer(marker));
    this.markers = [];
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
  getdashboard() {
    const body = {
      code_of_region: this.selectedRegion,
      code_of_circle: this.selectedCircle,
      code_of_division: this.selectedDivision,
      code_of_distribution_center: this.selectedDC
    };

    // // this.http.post<any>('http://10.98.7.167:8080/getdashboardsearch', body).subscribe(data => {
    // //   this.summary = data;
    // //   console.log('Dashboard Summary:', data);
    // });

    this.feeder11.getFeederCountDashboard(body).subscribe(countData => {
      this.feederCounts = countData;
      console.log('Feeder Count Dashboard:', countData);
    });

      // this.http.post<any[]>('http://10.98.7.167:8080/getfeederdashbaord', body).subscribe(dashboardData => {
      //   this.feederDashboardData = dashboardData;
      //   console.log('Feeder Dashboard Table Data:', dashboardData);
      // });
    // 
  }

  viewMap(feeder: any): void {
    const body = {

      code_of_region: this.selectedRegion,
      code_of_circle: this.selectedCircle,
      code_of_division: this.selectedDivision,
      code_of_distribution_center: this.selectedDC,
      code_of_feeder: feeder.kv_11_feeder_code,
      type_of_feeder: 1

    };

    this.feeder11.getRapdrpDTRMapview(body).subscribe(response => {
      const geoJsonStr = response[0]?.get_dtr_11_04_kv;
      if (geoJsonStr) {
        const geoJson = JSON.parse(geoJsonStr);
        const features = geoJson.features || [];
        this.clearMarkers();


        const pointMap = new Map<string, any>();
        features.forEach(feature => {
          const poleCode = feature.properties.pole_code;
          pointMap.set(poleCode, feature);
          console.log(features);
        });

        features.forEach((feature: any) => {
          const [lng, lat] = feature.geometry.coordinates;
          const marker = L.marker([lat, lng]).addTo(this.map!)
            .bindPopup(`<b>${feature.properties.dtr_name}</b><br>Capacity: ${feature.properties.dtr_capacity} ,<br> Polecode:${feature.properties.pole_code}`);
          this.markers.push(marker);

          const parentCode = feature.properties.parent_pole_code;
          const parentFeature = pointMap.get(parentCode);
          if (parentFeature) {
            const [parentLng, parentLat] = parentFeature.geometry.coordinates;
            L.polyline([[parentLat, parentLng], [lat, lng]], { color: 'blue' }).addTo(this.map!);
          }
        });
        if (features.length > 0) {
          const [lng, lat] = features[0].geometry.coordinates;
          this.map?.setView([lat, lng], 15);
        }
      }
    });
  }


}

