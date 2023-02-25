import { Component } from '@angular/core';
import { Department } from './shared-model/department.model';
import { Employee } from './shared-model/employee.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'assignment';
  public employee: Employee;
  public department: Department;

  constructor() {
    localStorage.clear();
    this.department = new Department();
    this.department = {
      departmentID: "D1",
      departmentName: "Finance"
    }
    this.addDepartment(this.department);
    this.department = new Department();
    this.department = {
      departmentID: "D2",
      departmentName: "Marketing"
    }
    this.addDepartment(this.department);
    this.department = new Department();
    this.department = {
      departmentID: "D3",
      departmentName: "Production"
    }
    this.addDepartment(this.department);
    this.employee = new Employee();
    this.employee = {
      employeeID: "A100",
      password: "admin",
      name : "admin",
      position: "admin",
      email: "admin@admin.com",
      FWAstatus: null,
      supervisorID: null,
      departmentID: null
    }
    this.addEmployee(this.employee);
    this.employee = {
      employeeID: "S100",
      password: "super",
      name : "supervisor",
      position: "supervisor",
      email: "supervisor@supervisor.com",
      FWAstatus: "WFH",
      supervisorID: null,
      departmentID: "D3"
    }
    this.addEmployee(this.employee);
    this.employee = {
      employeeID: "E100",
      password: "employee",
      name : "employee",
      position: "employee",
      email: "employee@employee.com",
      FWAstatus: "flexible",
      supervisorID: "S100",
      departmentID: "D3"
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

  addDepartment(department){
    let departments = [];
    if (localStorage.getItem('Departments')){
      departments = JSON.parse(localStorage.getItem('Departments'));
      departments = [...departments, department]
    }else{
      departments = [department];
    }
    localStorage.setItem('Departments', JSON.stringify(departments));
  }

}

