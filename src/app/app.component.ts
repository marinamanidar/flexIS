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
    this.employee = new Employee();
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
	    this.employee = {
      employeeID: "E101",
      password: "employee",
      name : "employee1",
      position: "Employee",
      email: "employee@employee.com",
      FWAstatus: "pending",
      supervisorID: "S100",
      departmentID: "D2",
      status: 'New'
    }
    this.addEmployee(this.employee);
    this.employee = {
      employeeID: "E102",
      password: "employee",
      name : "employee2",
      position: "Employee",
      email: "employee@employee.com",
      FWAstatus: "flexi-hour",
      supervisorID: "S200",
      departmentID: "D2",
      status: 'None'
    }
    this.addEmployee(this.employee);
    this.employee = {
      employeeID: "E103",
      password: "employee",
      name : "employee3",
      position: "Employee",
      email: "employee@employee.com",
      FWAstatus: "Rejected",
      supervisorID: "S200",
      departmentID: "D1",
      status: 'New'
    }
    this.addEmployee(this.employee);
    this.request = {
      employeeID: "E100",
      requestID: "R001",
      requestDate: "12/03/2022",
      workType: "hybrid",
      description: "I would like to work from home on the weekdays and in the office on the weekends",
      reason: "I do not have transportation",
      status: "Accepted",
      comment: "Please procure a mode of transportation by next year",
    }
    this.addRequest(this.request);
    this.request = {
      employeeID: "E100",
      requestID: "R002",
      requestDate: "01/02/2023",
      workType: "flexi-hour",
      description: "I would like to work from the office full time",
      reason: "I have bought a car",
      status: "Pending",
      comment: "",
    }
    this.addRequest(this.request);
    this.request = {
      employeeID: "E101",
      requestID: "R003",
      requestDate: "14/01/2023",
      workType: "work-from-home",
      description: "I would like to work form home full time",
      reason: "I need to take care of my mother",
      status: "Pending",
      comment: "",
    }
    this.addRequest(this.request);
    this.request = {
      employeeID: "E102",
      requestID: "R004",
      requestDate: "03/02/2023",
      workType: "flexi-hour",
      description: "I will work in the office most of the time",
      reason: "no reason",
      status: "Accepted",
      comment: "Looking forward to seeing you",
    }
    this.addRequest(this.request);
    this.request = {
      employeeID: "E103",
      requestID: "R005",
      requestDate: "15/1/2023",
      workType: "Hybrid",
      description: "I will mostly be working from home",
      reason: "Lazy to commute",
      status: "Rejected",
      comment: "Please try to make it to the office",
    }
    this.addRequest(this.request);


	this.schedule = {
      id: '1',
      employeeID: "E100",
      date: '2023-03-11',
      workLocation : "Home",
      workHours: "1",
      workReport: "I will be having meetings and code review",
      supervisorComments: null,
      status: "Approved"
    }
    this.addSchedule(this.schedule);

    this.schedule = {
      id: '2',
      employeeID: "E101",
      date: "4/4/2023",
      workLocation : "Home",
      workHours: "1",
      workReport: "I will be having meetings and code review",
      supervisorComments: null,
      status: "Pending"
    }
    this.addSchedule(this.schedule);

    this.schedule = {
      id: '3',
      employeeID: "E103",
      date: "1/2/2023",
      workLocation : "Office",
      workHours: "1",
      workReport: "I will be having meetings and code review",
      supervisorComments: null,
      status: "Pending"
    }
    this.addSchedule(this.schedule);

    this.schedule = {
      id: '4',
      employeeID: "E102",
      date: "12/21/2023",
      workLocation : "Home",
      workHours: "1",
      workReport: "I will be having meetings and code review",
      supervisorComments: null,
      status: "Pending"
    }
    this.addSchedule(this.schedule);

    this.schedule = {
      id: '5',
      employeeID: "E103",
      date: "4/11/2023",
      workLocation : "Home",
      workHours: "1",
      workReport: "I will be having meetings and code review",
      supervisorComments: null,
      status: "Pending"
    }
    this.addSchedule(this.schedule);

    this.schedule = {
      id: '6',
      employeeID: "E101",
      date: "4/11/2023",
      workLocation : "Office",
      workHours: "1",
      workReport: "I will be having meetings and code review",
      supervisorComments: null,
      status: "Pending"
    }
    this.addSchedule(this.schedule);

    this.schedule = {
      id: '7',
      employeeID: "E102",
      date: "4/6/2023",
      workLocation : "Home",
      workHours: "1",
      workReport: "I will be having meetings and code review",
      supervisorComments: null,
      status: "Pending"
    }
    this.addSchedule(this.schedule);
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

