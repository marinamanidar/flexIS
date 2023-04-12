import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Employee } from '../shared-model/employee.model';
import { Department } from '../shared-model/department.model';
import { Router } from "@angular/router";
import { employeesService } from '../shared-services/employee.service';
import { departmentsService } from '../shared-services/department.services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register-employee',
  templateUrl: './register-employee.component.html',
  styleUrls: ['./register-employee.component.css']
})

export class RegisterEmployeeComponent {

  private employeesSub : Subscription | undefined;
  private departmentsSub : Subscription | undefined;

  employees : Employee[] = [] ;
  departments : Department[] = [] ;
  emp : Employee;
  dep : Department;

  constructor(public employeesService: employeesService , public departmentsService: departmentsService, private router: Router) {
  }

  ngOnInit(){
    this.employeesService.getEmployees();
    this.departmentsService.getDepartments();
    this.employeesSub = this.employeesService.getEmployeesUpdateListener()
    .subscribe((employees:Employee[])=> {
      this.employees = employees;
    });
    this.departmentsSub = this.departmentsService.getDepartmentUpdateListener()
    .subscribe((departments:Department[])=> {
      this.departments = departments;
    });
  }

  public employee: Employee;
  selectedTeam = '';
  btn = document.querySelector('button')

	onSelected(value:string): void {
		this.selectedTeam = value;
    if(value == "Supervisor"){
      document.getElementById('condition').classList.add('d-none');
      document.getElementById('dep').classList.remove('d-none');
    }else{
      document.getElementById('condition').classList.remove('d-none');
      document.getElementById('dep').classList.add('d-none');
    }
	}

  employeeForm = new FormGroup({
    id: new FormControl(null, Validators.required),
    name: new FormControl(null, Validators.required),
    position: new FormControl(null, Validators.required),
    email: new FormControl(null, [Validators.required, Validators.email]),
    supervisorID: new FormControl(null),
    departmentID: new FormControl(null)
  });

  onSubmit(){
    if(this.employeeForm.value.position == "Employee"){
      this.emp = this.employeesService.getEmployee(this.employeeForm.value.supervisorID);
      this.dep = this.departmentsService.getDepartment(this.emp.departmentID);
      this.employeesService.addEmployee(this.employeeForm.value.name + "123", this.employeeForm.value.name, "Employee", this.employeeForm.value.email, "New", this.employeeForm.value.supervisorID, this.dep.departmentID, 'New');
    }else{
      this.employeesService.addEmployee(this.employeeForm.value.name + "123", this.employeeForm.value.name, "Supervisor", this.employeeForm.value.email, "New", " ", this.employeeForm.value.departmentID, 'New');
    }
    // this.addEmployee(this.employee);
    this.router.navigate(['/sidebar/view-emp']);
  }

  get position(){
    return this.employeeForm.get('position')
  }

}

