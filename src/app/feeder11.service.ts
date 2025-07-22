import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Feeder11Service {

  private baseUrl = 'http://10.98.7.167:8080';

  constructor(private http: HttpClient) { }

  getFeederCountDashboard(body: {
    code_of_region: string;
    code_of_circle: string;
    code_of_division: string;
    code_of_distribution_center: string;
  }): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/getfeedercountdashboard_11kv`, body);
  }

  getRapdrpPole11kvMapview(body: any): Observable<any[]> {
    return this.http.post<any[]>(`${this.baseUrl}/getRapdrpPole11kvMapview`, body);
  }

  getRapdrpDTRMapview(body: any): Observable<any[]> {
    return this.http.post<any[]>('http://10.98.7.167:8080/getRapdrpDTRMapview', body);
  }

  updatePoleEstimate(body: { code_of_feeder: string, pole_code: string, estimateno: string }): Observable<any> {
    return this.http.put<any>('http://10.98.7.167:8080/updateestimateno', body);
  }
}
