// import { Component, OnInit } from '@angular/core';
// import { DistributionCenter, MapviewService } from '../mapview.service';
// import { Division } from '../mapview.service';
// import { Circle } from '../mapview.service';

// @Component({
//   selector: 'app-dashboard',
//   templateUrl: './dashboard.component.html',
//   styleUrls: ['./dashboard.component.css']
// })
// export class DashboardComponent implements OnInit {

//   regionDisplayMap: { [key: string]: string } = {
//     '1': 'Indore',
//     '2': 'Ujjain'
//   };

//   regions = ['1','2'];
//   circles: Circle[] = [];     // changed from string[] to Circle[]
//   divisions: Division[] = [];
//   dcs: {name:string, code:string}[]=[];

//   selectedRegion = '';
//   selectedCircle = '';        // stores circleCode or circleId based on what you prefer
//   selectedDivision = '';
//   selectedDC = '';

//   constructor(private mapview: MapviewService) {}

//   ngOnInit(): void {}

//   onRegionChange(): void {
//     this.resetBelow('circle');
//     this.mapview.getCircles(this.selectedRegion).subscribe((data: Circle[]) => {
//       this.circles = data.filter(circle => circle.regionCode === this.selectedRegion);
//       console.log('Filtered Circles:', this.circles);
//     });
//   }

//   onCircleChange(): void {
//     this.resetBelow('division');

//     this.mapview.getDivisionsByCircle(this.selectedCircle).subscribe(data => {
//       this.divisions = data.filter(division => division.circleCode === this.selectedCircle);
//       console.log('Filtered Divisions:', this.divisions);
//     });
//   }

//   onDivisionChange(): void {
//     this.resetBelow('dc');

//     this.mapview.getDC(this.selectedDivision).subscribe(data => {
//       this.dcs = data
//         .filter(dc => dc.divisionCode=== this.selectedDivision)
//         .map(dc => ({
//           name:dc.distributionCenterName,
//           code:dc.distributionCenterCode})
//         );

//       console.log('Selected Division Code:', this.selectedDivision);
//       console.log('All DCs from API:', data);
//       console.log('Filtered DC names:', this.dcs);
//     });
//   }

//   resetBelow(level: 'circle' | 'division' | 'dc'): void {
//     if (level === 'circle') {
//       this.selectedCircle = '';
//       this.selectedDivision = '';
//       this.selectedDC = '';
//       this.circles = [];
//       this.divisions = [];
//       this.dcs = [];
//     } else if (level === 'division') {
//       this.selectedDivision = '';
//       this.selectedDC = '';
//       this.divisions = [];
//       this.dcs = [];
//     } else if (level === 'dc') {
//       this.selectedDC = '';
//       this.dcs = [];
//     }
//   }

//   // For Feeder Chart
// feederSSCount: number = 0;
// feeder33kvCount: number = 0;
// feeder11kvCount: number = 0;

// // For Line Length Chart
// lineLength33kv: number = 0;
// lineLength11kv: number = 0;
// lineLengthLT: number = 0;

// // For Job Chart
// jobCreated: number = 0;
// jobAssigned: number = 0;
// jobInProgress: number = 0;
// jobCompleted: number = 0;


//   // Feeder Chart
//   totalTransformer = 0;
//   feederChartLabels: string[] = ['33/11 kv S/S', '33 KV FEEDER', '11 KV Feeder'];
//   feederChartData = {
//     labels: this.feederChartLabels,
//     datasets: [
//       {
//         label: 'feeder',
//         data: [0, 0, 0],
//         backgroundColor: ['#42A5F5', '#66BB6A', '#FFA726']
//       }
//     ]
//   };

//   // Electrical Line Pie Chart
//   lineChartLabels = [
//     `33KV FEEDER (${this.lineLength33kv} km)`,
//     `11KV FEEDER (${this.lineLength11kv} km)`,
//     `LT LINE (${this.lineLengthLT} km)`
//   ];
//   // lineChartLabels: string[] = ['33KV FEEDER', '11KV FEEDER', 'LT LINE'];
//   lineChartData = {
//     labels: this.lineChartLabels,
//     datasets: [
//       {
//         data: [0, 0, 0], // in km maybe
//         backgroundColor: ['#29B6F6', '#66BB6A', '#FC0303']
//       }
//     ]
//   };

//   dtrChartLabels: string[] = ['10KVA', '16 KVA', '25 KVA','63 KVA', '100 KVA'];
//   dtrChartData = {
//     labels: this.dtrChartLabels,
//     datasets: [
//       {
//         label: 'Number of DTR',
//         data: [0, 0, 0, 0, 0],
//         backgroundColor: ['#42A5F5', '#66BB6A', '#CFA726', '#3D7094', '#FC0303']
//       }
//     ]
//   };

//   jobChartLabels: string[] = ['Created', 'Assigned', 'In Progress', 'Completed'];
//   jobChartData = {
//     labels: this.jobChartLabels,
//     datasets: [
//       {
//         label: 'feeder',
//         data: [0, 0, 0, 0],
//         backgroundColor: ['#42A5F5', '#66BB6A', '#AFA726', '#65FB48']
//       }
//     ]
//   };

//   getdashboard(): void {
//     console.log('Dashboard search request payload:', {
//       code_of_region: this.selectedRegion || null,
//       code_of_circle: this.selectedCircle || null,
//       code_of_division: this.selectedDivision || null,
//       code_of_distribution_center: this.selectedDC || null
//     });

//     // if (!this.selectedRegion || !this.selectedCircle || !this.selectedDivision || !this.selectedDC) {
//     //   console.warn('One or more required parameters are missing!');
//     //   return; // Stop the request if any parameter is missing
//     // }

//     this.mapview.getDashboardSearch(
//       this.selectedRegion || '',
//       this.selectedCircle || '',
//       this.selectedDivision || '',
//       this.selectedDC || ''
//     ).subscribe((data: any) => {
//       console.log('Location map data:', data);

//       if (data.length > 0) {
//         const dashboardData = data[0];

//          // Feeder chart numbers
//   this.feederSSCount = +dashboardData.ss_33_11kv_count || 0;
//   this.feeder33kvCount = +dashboardData.feeder_33kv_count || 0;
//   this.feeder11kvCount = +dashboardData.feeder_11kv_count || 0;

//   // Line Length chart numbers
//   this.lineLength33kv = +dashboardData.length_33kv_existing || 0;
//   this.lineLength11kv = +dashboardData.length_11kv_existing || 0;
//   this.lineLengthLT = +dashboardData.length_lt_existing || 0;

//   // Job chart numbers
//   this.jobCreated = +dashboardData.job_created || 0;
//   this.jobAssigned = +dashboardData.job_assigned || 0;
//   this.jobInProgress = +dashboardData.job_started_execution || 0;
//   this.jobCompleted = +dashboardData.job_completed || 0;

//   // (your charts also update here, as you already wrote)


//         // Update total transformer count
//         this.totalTransformer = +dashboardData.total_dtr || 0;



//         // Update Feeder chart data
//         this.feederChartData = {
//           labels: this.feederChartLabels,
//           datasets: [
//             {
//               label: 'feeder',
//               data: [
//                 +dashboardData.ss_33_11kv_count || 0,
//                 +dashboardData.feeder_33kv_count || 0,
//                 +dashboardData.feeder_11kv_count || 0
//               ],
//               backgroundColor: ['#42A5F5', '#66BB6A', '#FFA726']
//             }
//           ]
//         };

//         // Update Electrical Line chart data
//         this.lineChartData = {
//           labels: this.lineChartLabels,
//           datasets: [
//             {
//               data: [
//                 +dashboardData.length_33kv_existing || 0,
//                 +dashboardData.length_11kv_existing || 0,
//                 +dashboardData.length_lt_existing || 0,
//               ],
//               backgroundColor: ['#29B6F6', '#66BB6A', '#FC0303']
//             }
//           ]
//         };

//         // Update Job chart data
//         this.jobChartData = {
//           labels: this.jobChartLabels,
//           datasets: [
//             {
//               label: 'feeder',
//               data: [
//                 +dashboardData.job_created || 0,
//                 +dashboardData.job_assigned || 0,
//                 +dashboardData.job_started_execution || 0,
//                 +dashboardData.job_completed || 0
//               ],
//               backgroundColor: ['#42A5F5', '#66BB6A', '#AFA726', '#65FB48']
//             }
//           ]
//         };

//         console.log('Mapped data:', this.feederChartData, this.lineChartData, this.jobChartData);
//       }
//     }, (error) => {
//       console.error('Error fetching data:', error);
//     });
//   }
// }



import { Component, OnInit } from '@angular/core';
import { DistributionCenter, MapviewService } from '../mapview.service';
import { Division } from '../mapview.service';
import { Circle } from '../mapview.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  regionDisplayMap: { [key: string]: string } = {
    '1': 'Indore',
    '2': 'Ujjain'
  };

  regions = ['1', '2'];
  circles: Circle[] = [];
  divisions: Division[] = [];
  
  dcs:DistributionCenter[]=[];

  selectedRegion = '';
  selectedCircle = '';
  selectedDivision = '';
  selectedDC = '';


  constructor(private mapview: MapviewService) { }

  ngOnInit(): void { }

  onRegionChange(): void {
    this.resetBelow('circle');
    this.mapview.getCircles(this.selectedRegion).subscribe((data: Circle[]) => {
      this.circles = data;
      console.log('Circles from API:', this.circles);
    });
  }

  // onCircleChange(): void {
  //   this.resetBelow('division');
  //   this.mapview.getDivisionsByCircle(this.selectedCircle).subscribe(data => {
  //     this.divisions = data.filter(division => division.circleCode === this.selectedCircle);
  //     console.log('Filtered Divisions:', this.divisions);
  //   });
  // }

  onCircleChange(): void {
    this.resetBelow('division');
    this.mapview.getDivisionsByCircle(this.selectedCircle).subscribe((data: Division[]) => {
      this.divisions = data;
      console.log('Divisions from API:', this.divisions);
    })
  }

  // onDivisionChange(): void {
  //   this.resetBelow('dc');
  //   this.mapview.getDC(this.selectedDivision).subscribe(data => {
  //     this.dcs = data
  //       .filter(dc => dc.divisionCode === this.selectedDivision)
  //       .map(dc => ({
  //         name: dc.distributionCenterName,
  //         code: dc.distributionCenterCode
  //       }));
  //     console.log('Selected Division Code:', this.selectedDivision);
  //     console.log('All DCs from API:', data);
  //     console.log('Filtered DC names:', this.dcs);
  //   });
  // }

  onDivisionChange() : void{
    this.resetBelow('dc');
    this.mapview.getDC(this.selectedDivision).subscribe((data:DistributionCenter[])=>{
      this.dcs=data;
      console.log("Distribution Centre from API:",this.dcs);
    })
  }

  resetBelow(level: 'circle' | 'division' | 'dc'): void {
    if (level === 'circle') {
      this.selectedCircle = '';
      this.selectedDivision = '';
      this.selectedDC = '';
      this.circles = [];
      this.divisions = [];
      this.dcs = [];
    } else if (level === 'division') {
      this.selectedDivision = '';
      this.selectedDC = '';
      this.divisions = [];
      this.dcs = [];
    } else if (level === 'dc') {
      this.selectedDC = '';
      this.dcs = [];
    }
  }

  // Feeder Chart
  feederSSCount: number = 0;
  feeder33kvCount: number = 0;
  feeder11kvCount: number = 0;

  // Line Length Chart
  lineLength33kv: number = 0;
  lineLength11kv: number = 0;
  lineLengthLT: number = 0;

  // Job Chart
  jobCreated: number = 0;
  jobAssigned: number = 0;
  jobInProgress: number = 0;
  jobCompleted: number = 0;

  // DTR
  totalTransformer = 0;
  dtr10kva: number = 0;
  dtr16kva: number = 0;
  dtr25kva: number = 0;
  dtr63kva: number = 0;
  dtr100kva: number = 0;

  // Initial labels 
  feederChartLabels: string[] = ['33/11 KV S/S:', '33 KV FEEDER:', '11 KV FEEDER:'];
  lineChartLabels: string[] = ['33KV FEEDER:', '11KV FEEDER:', 'LT LINE:'];
  dtrChartLabels: string[] = ['10KVA:', '16 KVA:', '25 KVA:', '63 KVA:', '100 KVA:', '150KVA', '200KVA', '315KVA', '500KVA', '630KVA', '1000KVA'];
  jobChartLabels: string[] = ['Created:', 'Assigned:', 'In Progress:', 'Completed:'];

  // Chart Data
  feederChartData = {
    labels: this.feederChartLabels,
    datasets: [
      {
        label: '',
        data: [0, 0, 0],
        backgroundColor: ['#42A5F5', '#66BB6A', '#FFA726']
      }
    ]
  };

  lineChartData = {
    labels: this.lineChartLabels,
    datasets: [
      {
        data: [0, 0, 0],
        backgroundColor: ['#29B6F6', '#66BB6A', '#FC0303']
      }
    ]
  };

  dtrChartData = {
    labels: this.dtrChartLabels,
    datasets: [
      {
        label: 'Number of DTR',
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        backgroundColor: ['#42A5F5', '#66BB6A', '#CA6F26', '#A2c8f5', '#65FB48', '#4287f5', '#b642f5', '#a86632', '#c2372b', '#1710a1', '#a14310']
      }
    ]
  };

  jobChartData = {
    labels: this.jobChartLabels,
    datasets: [
      {
        label: 'Jobs',
        data: [0, 0, 0, 0],
        backgroundColor: ['#42A5F5', '#66BB6A', '#AFA726', '#65FB48']
      }
    ]
  };

  getdashboard(): void {
    console.log('Dashboard payload:', {
      code_of_region: this.selectedRegion || null,
      code_of_circle: this.selectedCircle || null,
      code_of_division: this.selectedDivision || null,
      code_of_distribution_center: this.selectedDC || null
    });



    this.mapview.getDashboardSearch(
      this.selectedRegion || '',
      this.selectedCircle || '',
      this.selectedDivision || '',
      this.selectedDC || ''
    ).subscribe(({ dashboard, dtrCapacity }) => {
      console.log('Location map data:', dashboard);
      console.log('DTR capacity data', dtrCapacity)

      if (dashboard.length > 0) {
        const dashboardData = dashboard[0];
        const dtrData = Array.isArray(dtrCapacity) ? dtrCapacity : [];


        // const dtrData=dtrCapacity[0];

        // Update data
        this.feederSSCount = +dashboardData.ss_33_11kv_count || 0;
        this.feeder33kvCount = +dashboardData.feeder_33kv_count || 0;
        this.feeder11kvCount = +dashboardData.feeder_11kv_count || 0;

        // 

        this.lineLength33kv = +dashboardData.length_33kv_existing || 0;
        this.lineLength11kv = +dashboardData.length_11kv_existing || 0;
        this.lineLengthLT = +dashboardData.length_lt_existing || 0;

        this.jobCreated = +dashboardData.job_created || 0;
        this.jobAssigned = +dashboardData.job_assigned || 0;
        this.jobInProgress = +dashboardData.job_started_execution || 0;
        this.jobCompleted = +dashboardData.job_completed || 0;

        // this.totalTransformer = +dashboardData.total_dtr || 0;

        // this.dtr10kva=+dtrData.dtr10kva ||0;
        // this.dtr16kva=+dtrData.dtr16kva ||0;
        // this.dtr25kva=+dtrData.dtr25kva ||0;
        // this.dtr63kva=+dtrData.dtr63kva ||0;
        // this.dtr100kva=+dtrData.dtr100kva ||0;




        //  Update labels dynamically based on data
        this.feederChartLabels = [
          `33/11 KV S/S :${this.feederSSCount}`,
          `33 KV FEEDER :${this.feeder33kvCount}:`,
          `11 KV FEEDER :${this.feeder11kvCount}`
        ];

        this.lineChartLabels = [
          `33KV FEEDER : ${this.lineLength33kv} km`,
          `11KV FEEDER : ${this.lineLength11kv} km`,
          `LT LINE : ${this.lineLengthLT} km`
        ];

        this.jobChartLabels = [
          `Created (${this.jobCreated})`,
          `Assigned (${this.jobAssigned})`,
          `In Progress (${this.jobInProgress})`,
          `Completed (${this.jobCompleted})`
        ];



        // Update chart data

        this.feederChartData = {
          labels: this.feederChartLabels,
          datasets: [
            {
              label: '',
              data: [this.feederSSCount, this.feeder33kvCount, this.feeder11kvCount],
              backgroundColor: ['#42A5F5', '#66BB6A', '#FFA726']
            }
          ]
        };

        this.lineChartData = {
          labels: this.lineChartLabels,
          datasets: [
            {
              data: [this.lineLength33kv, this.lineLength11kv, this.lineLengthLT],
              backgroundColor: ['#29B6F6', '#66BB6A', '#FC0303']
            }
          ]
        };

        this.jobChartData = {
          labels: this.jobChartLabels,
          datasets: [
            {
              label: 'JOB',
              data: [this.jobCreated, this.jobAssigned, this.jobInProgress, this.jobCompleted],
              backgroundColor: ['#42A5F5', '#66BB6A', '#AFA726', '#65FB48']
            }
          ]
        };
        if (dtrData.length > 0) {
          const dtrLabels = dtrData.map(item => item.name);
          const dtrValues = dtrData.map(item => item.value);

          console.log(dtrLabels);

          // Create a summary of DTR count and capacity
          const dtrSummary = dtrData.map(item => `${item.name} KVA: ${item.value}`).join(', ');



          this.dtrChartData = {
            labels: dtrLabels,
            datasets: [
              {
                label: 'DTR CAPACITY',
                data: dtrValues,
                backgroundColor: ['#42A5F5', '#66BB6A', '#FC6F26', '#A2c8f5', '#65FB48', '#4287f5', '#b642f5', '#a86632', '#c2372b', '#1710a1', '#a14310']
              }
            ]
          };


          console.log('Mapped Chart Data:', this.feederChartData, this.lineChartData, this.jobChartData);
          console.log("DTR capacity", dtrCapacity);

          document.getElementById('dtrSummary').innerText = `DTR Summary: ${dtrSummary}`;
        }
      };
    }, (error) => {
      console.error('Error fetching dashboard data:', error);
    });
  }

}

