import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';


export interface Circle {
  circleId: number;
  stateId: number;
  circleName: string;
  regionId: number;
  circleCode: string;
  regionCode: string;
}

export interface Division {
  divisionId: number;
  divisionName: string;
  divisionCode: string;
  circleCode: string;
  circleId: number;
}

export interface DistributionCenter {
  distributionCenterId: number;
  divisionId: number;
  distributionCenterName: string;
  distributionCenterCode: string;
  divisionCode: string;
  extent: string;
  centroid: string;
  active: boolean;
}

export interface PoleData {
  id: number;
  feederId: string;
  devPoleId: string;
  fdrName: string;
  poleLat: string;
  poleLong: string;
  schNo: string;
}

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
export class MapviewService {

  url = "http://10.98.7.167:8080/newcircles";
  url2 = "http://10.98.7.167:8080/newdivisions";
  url3 = "http://10.98.7.167:8080/allsubstation";
  url4 = "http://10.98.7.167:8080/dc";
  private baseUrl = 'http://10.98.7.167:8080';

  private helloUrl = 'http://10.98.7.167:8083/hello';

  constructor(private http: HttpClient) { }


  getCircles(region: string): Observable<Circle[]> {
    return this.http.get<Circle[]>(`http://10.98.7.167:8080/circles?regionCode=${region}`);
  }


  getDivisionsByCircle(circleCode: string): Observable<Division[]> {
    return this.http.get<Division[]>(`http://10.98.7.167:8080/divisions?circleCode=${circleCode}`);
  }

  getDC(divisionCode: string): Observable<DistributionCenter[]> {
    return this.http.get<DistributionCenter[]>(`http://10.98.7.167:8080/dc?divisionCode=${divisionCode}`);
  }


  searchLocationMap(payload: any): Observable<any> {
    return this.http.post(`/url3/location-map`, payload);
  }

  getDashboardSearch(region: string, circle: string, division: string, dc: string): Observable<any> {
    const body = {
      code_of_region: region || '',
      code_of_circle: circle || '',
      code_of_division: division || '',
      code_of_distribution_center: dc || '',
    };
    console.log(body);

    return forkJoin({
      dashboard: this.http.post<[any]>(`${this.baseUrl}/getdashboardsearch`, body),
      dtrCapacity: this.http.post<any[]>(`${this.baseUrl}/getdtrcapacitywisecount`, body)

    });

  }

    getSubStaionMap(region: string, circle: string, division: string): Observable<Location[]> {
      const body = {
        code_of_region: region || null,
        code_of_circle: circle || null,
        code_of_division: division || null
      };
  
      return this.http.post<Location[]>('http://10.98.7.167:8080/getsubstation',body);
    };

  getEMBDataMap(payload: any) {
    return this.http.post<PoleData[]>('http://10.98.7.167:8080/getembdata', payload);
  }

  callHelloApi(): Observable<string> {
    return this.http.get('/api/hello', { responseType: 'text' });
  }


}
