import { Component } from '@angular/core';
import { employeesService } from '../shared-services/employee.service';
import { Employee } from '../shared-model/employee.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-view-employees',
  templateUrl: './view-employees.component.html',
  styleUrls: ['./view-employees.component.css']
})
export class ViewEmployeesComponent {

  private employeesSub : Subscription | undefined;

  employees : Employee[] = [] ;

  constructor(public employeesService: employeesService){
  }

  ngOnInit(){
    this.employeesService.getEmployees();
    this.employeesSub = this.employeesService.getEmployeesUpdateListener()
    .subscribe((employees:Employee[])=> {
      this.employees = employees;
      console.log(this.employees)
    });
  }
}
