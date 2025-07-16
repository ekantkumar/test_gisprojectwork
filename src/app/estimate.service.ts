import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface EstimateLocation {
  estimateno: string;
  latitude: number;
  longitude: number;
  jobid?: string;
  comments?: string;
  
}
@Injectable({
  providedIn: 'root'
})
export class EstimateService {
  private baseUrl='http://10.98.7.167:8080';

  constructor(private http:HttpClient) { }

  getEstimateLocation(estimateno:string):Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/getdataestimate?estimateno=${estimateno}`);
  }
}
