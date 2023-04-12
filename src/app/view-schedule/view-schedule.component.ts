import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { employeesService } from '../shared-services/employee.service';
import { Employee } from '../shared-model/employee.model';
import { Schedule } from '../shared-model/daily-schedule.model';
import { schedulesService } from '../shared-services/schedule.services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-view-schedule',
  templateUrl: './view-schedule.component.html',
  styleUrls: ['./view-schedule.component.css']
})
export class ViewScheduleComponent {
  private schedulesSub : Subscription | undefined;
  user = sessionStorage.getItem('user');
  employee : Employee;
  schedules : Schedule[] = [];
  id: String;

  constructor(private router: Router, public employeesService : employeesService, public schedulesService : schedulesService){}

  ngOnInit(){
    this.employee = this.employeesService.getEmployeeByEmail(this.user);
    this.id = this.employee.employeeID;
    this.schedulesService.getSchedules();
    this.schedulesSub = this.schedulesService.getSchedulesUpdateListener()
    .subscribe((schedules:Schedule[])=> {
      this.schedules = schedules;
    });


  }

  review(data) {
    this.router.navigate(['/sidebar/update', data.id]);
  }
  
}
