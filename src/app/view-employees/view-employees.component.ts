import { Component } from '@angular/core';
import { employeesService } from '../shared-services/employee.service';
import { departmentsService } from '../shared-services/department.services';
import { Employee } from '../shared-model/employee.model';
import { Department } from '../shared-model/department.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-view-employees',
  templateUrl: './view-employees.component.html',
  styleUrls: ['./view-employees.component.css']
})
export class ViewEmployeesComponent {

  private employeesSub : Subscription | undefined;
  private departmentsSub : Subscription | undefined;

  employees : Employee[] = [] ;
  departments : Department[] = [] ;

  constructor(public employeesService: employeesService, public departmentsService: departmentsService){
  }

  ngOnInit(){
    this.employeesService.getEmployees();
    this.departmentsService.getDepartments();
    this.employeesSub = this.employeesService.getEmployeesUpdateListener()
    .subscribe((employees:Employee[])=> {
      this.employees = employees;
      console.log(this.employees)
    });
    this.departmentsSub = this.departmentsService.getDepartmentUpdateListener()
    .subscribe((departments:Department[])=> {
      this.departments = departments;
    });
  }
}
