import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapComponent } from './map/map.component';
import { MaplineComponent } from './mapline/mapline.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MaplineApiComponent } from './maplineapi/maplineapi.component';
import { MapdashboardComponent } from './mapdashboard/mapdashboard.component';
import { Feeder11Component } from './feeder11/feeder11.component';
import { TestComponent } from './test/test.component';
import { WorkdetailsComponent } from './workdetails/workdetails.component';
import { EmbdataComponent } from './embdata/embdata.component';
import { LoginComponent } from './login/login.component';
import { PoleEstimateUpdateComponent } from './pole-estimate-update/pole-estimate-update.component';


const routes: Routes = [
  {
    path: 'app-map',
    component: MapComponent
  },
  {
    path: 'app-mapline',
    component: MaplineComponent
  },
  {
    path: 'app-maplineapi',
    component: MaplineComponent
  },
  {
    path: 'app-dashboard',
    component: DashboardComponent
  },
  {
    path: 'app-mapdashboard',
    component: MapdashboardComponent
  },
  {
    path: 'app-feeder11',
    component: Feeder11Component
  },
  {
    path: 'app-test',
    component: TestComponent
  },
  {
    path: 'app-workdetails',
    component: WorkdetailsComponent
  },
  {
    path: 'app-embdata',
    component: EmbdataComponent
  },
  {
    path:'app-login',
    component:LoginComponent
  },
  {
    path:'app-pole-estimate-update',
    component:PoleEstimateUpdateComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
