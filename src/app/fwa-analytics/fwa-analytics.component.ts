import { Component } from '@angular/core';
import { Department } from '../shared-model/department.model';
import { Employee } from '../shared-model/employee.model';

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
  user = sessionStorage.getItem('user');
  supervisor: Employee;
  departmentName: Department;

  flexCount: number = 0;
  hybridCount: number = 0;
  homeCount: number = 0;

  department: departmentCount;
  departmentCount: departmentCount[] = [];

  ngOnInit(){
    //if logged in as supervisor only display the supervisor's department
    if( Array.from(this.user)[0] == 'S'){
      this.supervisor = this.listEmployees.find(x => x.employeeID == this.user);
      this.departmentName = this.listDepartments.find(x => x.departmentID == this.supervisor.departmentID)
        Object.values(this.listEmployees).forEach(emp => {
          if(emp['departmentID'] == this.supervisor.departmentID){
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
          departmentID: this.supervisor.departmentID,
          departmentName: this.departmentName.departmentName,
          flexCount: this.flexCount,
          homeCount: this.homeCount,
          hybridCount: this.hybridCount
        }
        this.departmentCount.push(this.department);
        this.flexCount = 0;
        this.homeCount = 0;
        this.hybridCount = 0;

    } else {
      //if logged in as admin display all departments
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
}
