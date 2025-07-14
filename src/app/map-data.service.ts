import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface Location {
  serialNo: number;
  circleName: string;
  divisionName: string | null;
  subStationName: string;
  latitude: number;
  longitude: number;
  capacityInjectable: number;
}

@Injectable({
  providedIn: 'root'
})
export class MapDataService {

  private apiUrl = 'assets/locations.json';  // Path to your JSON file
  // private apiUrl2 = 'http://10.98.7.167:8080/allsubstation';  // API URL
  private apiUrl2 = 'http://10.98.7.167:8080/allsubstation';
  
  constructor(private http: HttpClient) { }

  // Correct the return type and syntax
  getLocations(): Observable<Location[]> {
    return this.http.get<Location[]>(this.apiUrl);  // Return the correct observable
  }

  getLocationsApi(): Observable<Location[]> {
    return this.http.get<Location[]>(this.apiUrl2);  // Return the correct observable
  }

  getLocationsMap(region: string, circle: string, division: string, dc: string): Observable<Location[]> {
    const payload = {
      code_of_region: region || null,
      code_of_circle: circle || null,
      code_of_division: division || null,
      code_of_distribution_center: dc || null
    };
  
    return this.http.get<Location[]>('http://10.98.7.167:8080/allsubstation');
  }
  
}

// Define the Location interface outside any method or function

// export interface Location {
//   serialNo:string;
//   circleName: string;
//   divisionName:string;
//   subStationName: string;
//   latitude: number;
//   longitude: number;
//   capacityInjectable: number;
// }

