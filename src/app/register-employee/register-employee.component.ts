import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Employee } from '../shared-model/employee.model';

@Component({
  selector: 'app-register-employee',
  templateUrl: './register-employee.component.html',
  styleUrls: ['./register-employee.component.css']
})

export class RegisterEmployeeComponent {

  listDepartments = JSON.parse(localStorage.getItem('Departments'));
  public employee: Employee;
  selected = "";

  employeeForm = new FormGroup({
    id: new FormControl(null, Validators.required),
    name: new FormControl(null, Validators.required),
    position: new FormControl(null, Validators.required),
    email: new FormControl(null, [Validators.required, Validators.email]),
    supervisorID: new FormControl(null)
  });

  constructor() { }

  onSubmit(){
    if(this.employeeForm.valid){
      this.employee = {
        employeeID: this.employeeForm.value.id,
        password: this.employeeForm.value.id + "123",
        name : this.employeeForm.value.name,
        position: this.employeeForm.value.position,
        email: this.employeeForm.value.email,
        FWAstatus: this.employeeForm.value.name,
        supervisorID: this.employeeForm.value.supervisorID,
        departmentID: this.employeeForm.value.supervisorID
      }
    }

    this.addEmployee(this.employee);
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
  
