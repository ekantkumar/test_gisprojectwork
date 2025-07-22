import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loginUrl = 'http://10.98.7.167:8083/auth/login'; 

  constructor(private http: HttpClient) {}

 login(username: string, password: string): Observable<{ token: string }> {
    const params = new HttpParams()
      .set('username', username)
      .set('password', password);

    return this.http.post<{ token: string }>(this.loginUrl,null, { params });
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
  }
}
