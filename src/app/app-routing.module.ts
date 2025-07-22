import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapComponent } from './map/map.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MapdashboardComponent } from './mapdashboard/mapdashboard.component';
import { Feeder11Component } from './feeder11/feeder11.component';
import { TestComponent } from './test/test.component';
import { WorkdetailsComponent } from './workdetails/workdetails.component';
import { EmbdataComponent } from './embdata/embdata.component';
import { LoginComponent } from './login/login.component';
import { PoleEstimateUpdateComponent } from './pole-estimate-update/pole-estimate-update.component';
import { EstimateDetailComponent } from './estimate-detail/estimate-detail.component';
import { Feeder33Component } from './feeder33/feeder33.component';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  {
    path:'app-login',
    component:LoginComponent
  },
  {
    path:'app-home',
    component:HomeComponent,
    children:[
      {
        path:'app-dashboard',
        component:DashboardComponent
      },
      {
        path: 'app-mapdashboard',
    component: MapdashboardComponent
      },
      {
    path: 'app-test',
    component: TestComponent
  },
  {
    path:'app-feeder33',
    component:Feeder33Component
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
    path:'app-pole-estimate-update',
    component:PoleEstimateUpdateComponent
  },
  {
    path:'app-estimate-detail',
    component:EstimateDetailComponent
  }
    ]
  },
  {
    path: 'app-map',
    component: MapComponent
  },

  // {
  //   path: 'app-dashboard',
  //   component: DashboardComponent
  // },
  // {
  //   path: 'app-mapdashboard',
  //   component: MapdashboardComponent
  // },
  // {
  //   path: 'app-feeder11',
  //   component: Feeder11Component
  // },
  // {
  //   path: 'app-test',
  //   component: TestComponent
  // },
  // {
  //   path: 'app-workdetails',
  //   component: WorkdetailsComponent
  // },
  // {
  //   path: 'app-embdata',
  //   component: EmbdataComponent
  // },
  // {
  //   path:'app-pole-estimate-update',
  //   component:PoleEstimateUpdateComponent
  // },
  // {
  //   path:'app-estimate-detail',
  //   component:EstimateDetailComponent
  // },
  // {
  //   path:'app-feeder33',
  //   component:Feeder33Component
  // },
  {
    path:'',redirectTo:'app-login', pathMatch:'full'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
