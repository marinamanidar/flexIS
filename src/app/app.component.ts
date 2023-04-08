import { Component } from '@angular/core';
import { Schedule } from './shared-model/daily-schedule.model';
import { Department } from './shared-model/department.model';
import { Employee } from './shared-model/employee.model';
import { FWARequest } from "./shared-model/request.model";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'assignment';
  public employee: Employee;
  public department: Department;
	public schedule: Schedule;
	public request: FWARequest;

  constructor() {
    localStorage.clear();
    this.schedule = new Schedule();
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
    //this.employee = new Employee();
    this.employee = {
      employeeID: "A100",
      password: "admin",
      name : "admin",
      position: "Admin",
      email: "admin@admin.com",
      FWAstatus: null,
      supervisorID: null,
      departmentID: null,
      status: 'New'
    }
    this.addEmployee(this.employee);
    this.employee = {
      employeeID: "S100",
      password: "super",
      name : "supervisor",
      position: "Supervisor",
      email: "supervisor@supervisor.com",
      FWAstatus: "WFH",
      supervisorID: null,
      departmentID: "D1",
      status: 'New'
    }
    this.addEmployee(this.employee);
    this.employee = {
      employeeID: "S200",
      password: "super2",
      name : "supervisor2",
      position: "Supervisor",
      email: "supervisor2@supervisor.com",
      FWAstatus: "WFH",
      supervisorID: null,
      departmentID: "D2",
      status: 'New'
    }
    this.addEmployee(this.employee);
    this.employee = {
      employeeID: "E100",
      password: "employee",
      name : "employee",
      position: "Employee",
      email: "employee@employee.com",
      FWAstatus: "pending",
      supervisorID: "S100",
      departmentID: "D1",
      status: 'New'
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

  addSchedule(schedule){
    let schedules = [];
    if (localStorage.getItem('Schedules')){
      schedules = JSON.parse(localStorage.getItem('Schedules'));
      schedules = [...schedules, schedule]
    }else{
      schedules = [schedule];
    }
    localStorage.setItem('Schedules', JSON.stringify(schedules));
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

  addRequest(request){
    let requests = [];
    if (localStorage.getItem('Requests')){
      requests = JSON.parse(localStorage.getItem('Requests'));
      requests = [...requests, request]
    }else{
      requests = [request];
    }
    localStorage.setItem('Requests', JSON.stringify(requests));
  }


}

