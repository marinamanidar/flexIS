import { Component } from '@angular/core';

export class departmentCount{
  departmentID: string
  departmentName: string
  flexCount: number
  homeCount: number
  hybridCount: number
}

@Component({
  selector: 'app-fwa-analytics',
  templateUrl: './fwa-analytics.component.html',
  styleUrls: ['./fwa-analytics.component.css']
})
export class FwaAnalyticsComponent {
  listDepartments = JSON.parse(localStorage.getItem('Departments'));
  listEmployees = JSON.parse(localStorage.getItem('Employees'));
  flexCount: number = 0;
  hybridCount: number = 0;
  homeCount: number = 0;

  department: departmentCount;
  departmentCount: departmentCount[] = [];

  ngOnInit(){
    Object.values(this.listDepartments).forEach(dep => {
      Object.values(this.listEmployees).forEach(emp => {
        if(dep['departmentID'] == emp['departmentID']){
          if (emp['FWAstatus'] == 'WFH'){
            this.homeCount += 1;
          } else if (emp['FWAstatus'] == 'flexi-hour'){
            this.flexCount += 1;
          } else if (emp['FWAstatus'] == 'hybrid'){
            this.hybridCount += 1;
          }
        }
      })
      this.department = {
        departmentID: dep['departmentID'],
        departmentName: dep['departmentName'],
        flexCount: this.flexCount,
        homeCount: this.homeCount,
        hybridCount: this.hybridCount
      }
      this.departmentCount.push(this.department);
      this.flexCount = 0;
      this.homeCount = 0;
      this.hybridCount = 0;
    })
}
}
