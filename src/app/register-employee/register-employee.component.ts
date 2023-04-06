import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Employee } from '../shared-model/employee.model';
import { Router } from "@angular/router";
import { employeesService } from '../shared-services/employee.service';

@Component({
  selector: 'app-register-employee',
  templateUrl: './register-employee.component.html',
  styleUrls: ['./register-employee.component.css']
})

export class RegisterEmployeeComponent {

  listDepartments = JSON.parse(localStorage.getItem('Departments'));
  listEmployees = JSON.parse(localStorage.getItem('Employees'));
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


  constructor(public empService: employeesService ,private router: Router) {
   }

  onSubmit(){
    if(this.employeeForm.value.position == "Employee"){
      this.empService.addEmployee(this.employeeForm.value.name + "123", this.employeeForm.value.name, "Employee", this.employeeForm.value.email, "New", this.employeeForm.value.supervisorID, 'department id', 'New');
    }else{
      this.employee = {
        employeeID: this.employeeForm.value.id,
        password: this.employeeForm.value.id + "123",
        name : this.employeeForm.value.name,
        position: this.employeeForm.value.position,
        email: this.employeeForm.value.email,
        FWAstatus: "New",
        supervisorID: null,
        departmentID: this.employeeForm.value.departmentID,
        status: 'New'
      }
    }


    this.addEmployee(this.employee);
    this.router.navigate(['/sidebar/view-emp']);
  }

  get id(){
    return this.employeeForm.get('id');
  }

  get name(){
    return this.employeeForm.get('name');
  }

  get email(){
    return this.employeeForm.get('email');
  }

  get departmentID(){
    return this.employeeForm.get('departmentID')
  }

  get position(){
    return this.employeeForm.get('position')
  }

  addEmployee(employee){
    let employees = [];
    if (localStorage.getItem('Employees')){
      employees = JSON.parse(localStorage.getItem('Employees'));
      employees = [...employees, employee]
    }else{
      employees = [employee];
    }
    localStorage.setItem('Employees', JSON.stringify(employees));
  }


}

