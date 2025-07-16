import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { MaplineComponent } from './mapline/mapline.component';
import { MapDataService } from './map-data.service';
import { MaplineApiComponent } from './maplineapi/maplineapi.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';
import { MapdashboardComponent } from './mapdashboard/mapdashboard.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { HomeComponent } from './home/home.component';
import { Feeder11Component } from './feeder11/feeder11.component';
import { TestComponent } from './test/test.component';
import { WorkdetailsComponent } from './workdetails/workdetails.component';
import { EmbdataComponent } from './embdata/embdata.component';
import { LoginComponent } from './login/login.component';
import { PoleEstimateUpdateComponent } from './pole-estimate-update/pole-estimate-update.component';
import { Feeder33Component } from './feeder33/feeder33.component';
import { EstimateDetailComponent } from './estimate-detail/estimate-detail.component';





@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    MaplineComponent,
    MaplineApiComponent,
    DashboardComponent,
    MapdashboardComponent,
    HomeComponent,
    Feeder11Component,
    TestComponent,
    WorkdetailsComponent,
    EmbdataComponent,
    LoginComponent,
    PoleEstimateUpdateComponent,
    Feeder33Component,
    EstimateDetailComponent
  ],
  
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    NgChartsModule,
    GoogleMapsModule
  ],
  providers: [MapDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
