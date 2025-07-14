
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-workdetails',
  templateUrl: './workdetails.component.html',
  styleUrls: ['./workdetails.component.css']
})
export class WorkdetailsComponent implements OnInit {
  workDetails: any = [];
  loading = false;
  error: string | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  fetchWorkDetails(): void {
    this.loading = true;
    this.error = null;

    this.http.get<any>('http://localhost:8080/fetchWorkDetails')
      .subscribe({
        next: (data) => {
          this.workDetails = data;
          this.loading = false;
          console.log('Work Details:', data);
          console.log(Response);
        },
        error: (err) => {
          this.error = 'Failed to fetch work details.';
          this.loading = false;
          console.error(err);
        }
      });
  }
}
