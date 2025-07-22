
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
  message:string='';


  regionDisplayMap: { [key: string]: string } = {
    '1': 'Indore',
    '2': 'Ujjain'
  };

  regions = ['1', '2'];
  circles: Circle[] = [];
  divisions: Division[] = [];
  dcs: { name: string, code: string }[] = [];

  selectedRegion = '';
  selectedCircle = '';
  selectedDivision = '';
  selectedDC = '';


  constructor(private mapview: MapviewService) { }

  ngOnInit(): void { }

  getapitoken() {
{
  this.mapview.callHelloApi().subscribe(
    (res)=>{
      console.log('API response:', res);
      this.message=res;
    },
    (err) => {
        console.error('Error:', err);
        this.message = 'API call failed!';
      }
  );
}
}

  // onRegionChange(): void {
  //   this.resetBelow('circle');
  //   this.mapview.getCircles(this.selectedRegion).subscribe((data: Circle[]) => {
  //     this.circles = data.filter(circle => circle.regionCode === this.selectedRegion);
  //     console.log('Filtered Circles:', this.circles);
  //   });
  // }

  // onCircleChange(): void {
  //   this.resetBelow('division');
  //   this.mapview.getDivisionsByCircle(this.selectedCircle).subscribe(data => {
  //     this.divisions = data.filter(division => division.circleCode === this.selectedCircle);
  //     console.log('Filtered Divisions:', this.divisions);
  //   });
  // }

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


    onRegionChange(): void {
    this.resetBelow('circle');
    this.mapview.getCircles(this.selectedRegion).subscribe((data: Circle[]) => {
      this.circles = data.filter(circle => circle.regionCode === this.selectedRegion);
    });
  }

  onCircleChange(): void {
    this.resetBelow('division');
    this.mapview.getDivisionsByCircle(this.selectedCircle).subscribe(data => {
      this.divisions = data.filter(division => division.circleCode === this.selectedCircle);
    });
  }

  onDivisionChange(): void {
    this.resetBelow('dc');
    this.mapview.getDC(this.selectedDivision).subscribe(data => {
      this.dcs = data
        .filter(dc => dc.divisionCode === this.selectedDivision)
        .map(dc => ({
          name: dc.distributionCenterName,
          code: dc.distributionCenterCode
        }));
    });
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

 

  // Initial labels 
  feederChartLabels: string[] = ['33/11 KV S/S:', '33 KV FEEDER:', '11 KV FEEDER:'];
  lineChartLabels: string[] = ['33KV FEEDER:', '11KV FEEDER:', 'LT LINE:'];
  dtrChartLabels: string[] = ['10KVA:', '16 KVA:', '25 KVA:', '63 KVA:', '100 KVA:','150KVA','200KVA','315KVA','500KVA','630KVA','1000KVA'];
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
        backgroundColor: ['#42A5F5', '#66BB6A','#CA6F26', '#A2c8f5', '#65FB48','#4287f5','#b642f5','#a86632','#c2372b','#1710a1','#a14310']
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
    ).subscribe(({dashboard,dtrCapacity}) => {
      console.log('Location map data:', dashboard);
      console.log('DTR capacity data',dtrCapacity)


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

        if (dtrData.length > 0) {
        const dtrLabels=dtrData.map(item=> `${item.name} KVA: ${item.value}`); 
        const dtrValues=dtrData.map(item=> +item.value); // "+" is used to convert value to number  

        console.log(dtrLabels);
        
        // Create a summary of DTR count and capacity
        const dtrSummary = dtrData.map(item => `${item.name} kVA: ${item.value}`).join(', ');


         this.dtrChartData = {
          labels: dtrLabels,
          datasets: [ 
            {
              label: 'DTR CAPACITY',
              data: dtrValues,
              backgroundColor: ['#42A5F5', '#66BB6A','#FC6F26', '#A2c8f5', '#65FB48','#4287f5','#b642f5','#a86632','#c2372b','#1710a1','#a14310']
            }
          ]
        };


        console.log('Mapped Chart Data:', this.feederChartData, this.lineChartData, this.jobChartData);
        console.log("DTR capacity",dtrCapacity);

        document.getElementById('dtrSummary').innerText = `DTR Summary: ${dtrSummary}`;
        console.log('DTR Raw Data:', dtrCapacity);
        
      }};
    }, (error) => {
      console.error('Error fetching dashboard data:', error);
    });
  }

}

