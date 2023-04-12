import { Component, OnInit } from '@angular/core';
import { Department } from '../shared-model/department.model';
import { Employee } from '../shared-model/employee.model';
import { Subscription } from 'rxjs';
import { departmentsService } from '../shared-services/department.services';
import { employeesService } from '../shared-services/employee.service';

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
export class FwaAnalyticsComponent implements OnInit{
  listDepartments = JSON.parse(localStorage.getItem('Departments'));
  listEmployees = JSON.parse(localStorage.getItem('Employees'));
  user = sessionStorage.getItem('user');
  supervisor: Employee;
  departmentName: Department;

  flexCount: number = 0;
  hybridCount: number = 0;
  homeCount: number = 0;

  departmentcount: departmentCount;
  departmentCount: departmentCount[] = [];

  employee: Employee[] = [];
  department: Department[] = [];



  private depSub: Subscription | undefined
  private empSub: Subscription | undefined

  constructor( public depService: departmentsService, public empService: employeesService){}

  ngOnInit(){
    //if logged in as supervisor only display the supervisor's department
    this.depService.getDepartments();
    this.empService.getEmployees();

    this.depSub = this.depService.getDepartmentUpdateListener()
    .subscribe((departments: Department[]) => {
      this.department = departments;

        this.empSub = this.empService.getEmployeesUpdateListener()
        .subscribe((employees: Employee[]) => {

          this.employee = employees;

          this.supervisor = this.employee.find(x=> x.email == this.user);

          if (this.supervisor.position == 'Supervisor'){
            this.departmentCount = []

            console.log('this is not admin')
            this.departmentName = this.department.find(x => x.departmentID == this.supervisor.departmentID)
            Object.values(this.employee).forEach(emp => {
              if(emp['departmentID'] == this.supervisor.departmentID){
                if (emp['FWAstatus'] == 'home'){
                  this.homeCount += 1;
                } else if (emp['FWAstatus'] == 'flex'){
                  this.flexCount += 1;
                } else if (emp['FWAstatus'] == 'hybrid'){
                  this.hybridCount += 1;
                }
              }
            })
            this.departmentcount = {
              departmentID: this.supervisor.departmentID,
              departmentName: this.departmentName.departmentName,
              flexCount: this.flexCount,
              homeCount: this.homeCount,
              hybridCount: this.hybridCount
            }
            this.departmentCount.push(this.departmentcount);
            this.flexCount = 0;
            this.homeCount = 0;
            this.hybridCount = 0;

          } else if (this.supervisor.position == 'admin'){
            this.departmentCount = []

            console.log('this is admin')
            //if logged in as admin display all departments

            Object.values(this.department).forEach(dep => {
              Object.values(this.employee).forEach(emp => {
                if(dep['departmentID'] == emp['departmentID']){
                  if (emp['FWAstatus'] == 'home'){
                    this.homeCount += 1;
                  } else if (emp['FWAstatus'] == 'flex'){
                    this.flexCount += 1;
                  } else if (emp['FWAstatus'] == 'hybrid'){
                    this.hybridCount += 1;
                  }
                }
              })
              this.departmentcount = {
                departmentID: dep['departmentID'],
                departmentName: dep['departmentName'],
                flexCount: this.flexCount,
                homeCount: this.homeCount,
                hybridCount: this.hybridCount
              }
              this.departmentCount.push(this.departmentcount);
              this.flexCount = 0;
              this.homeCount = 0;
              this.hybridCount = 0;
              console.log(this.departmentCount.length)
            })
          }

        }) // get employees
    }) //get departments
}
}
