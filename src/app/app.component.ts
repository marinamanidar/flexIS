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



}

