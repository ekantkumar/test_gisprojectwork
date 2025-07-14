import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
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
export class ShowmapService {

  
  private apiUrl2 = 'http://10.98.7.167:8080/allsubstation';  // API URL
  
  constructor(private http: HttpClient) { }



  getLocationsMap(region: string, circle: string, division: string): Observable<Location[]> {
    const payload = {
      code_of_region: region || null,
      code_of_circle: circle || null,
      code_of_division: division || null
    };

    return this.http.post<Location[]>('http://10.98.7.167:8080/getsubstation',payload);
  };
  
}