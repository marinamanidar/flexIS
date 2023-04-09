import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from '../shared-model/employee.model';
import { Schedule } from '../shared-model/daily-schedule.model';
import { employeesService } from '../shared-services/employee.service';
import { schedulesService } from '../shared-services/schedule.services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-review-schedules',
  templateUrl: './review-schedules.component.html',
  styleUrls: ['./review-schedules.component.css']
})
export class ReviewSchedulesComponent {

  constructor(private router: Router, public employeesService: employeesService , public schedulesService: schedulesService) {}

  user = sessionStorage.getItem('user');
  private employeesSub : Subscription | undefined;
  private schedulesSub : Subscription | undefined;
  employees : Employee[] = [] ;
  schedules : Schedule[] = [] ;
  filterSchedule : Schedule[] = [];
  supervisor : String;
  // myEmployees = this.listEmployees.find(i => i.supervisorID == this.user);
  // mySchedules = this.listSchedules.filter(i => i.employeeID == this.myEmployees.employeeID);
  curr = new Date()
  week = []
  selectedValue: any;

  
  ngOnInit(){
    this.employeesService.getEmployees();
    this.schedulesService.getSchedules();
    this.employeesSub = this.employeesService.getEmployeesUpdateListener()
    .subscribe((employees:Employee[])=> {
      this.employees = employees.filter(i => i.supervisorID == this.employeesService.getEmployeeByEmail(this.user).employeeID);
    });
    this.schedulesSub = this.schedulesService.getSchedulesUpdateListener()
    .subscribe((schedules:Schedule[])=> {
      this.schedules = schedules

      Object.values(this.employees).forEach(emp => {
        Object.values(this.schedules).forEach(sch => {
          if(sch['employeeID'] == emp.employeeID){
            this.filterSchedule.push(sch)
          }
        })
      }
    )
    });

    for (let i = 1; i <= 7; i++) {
      let first = this.curr.getDate() - this.curr.getDay() + i 
      let day = new Date(this.curr.setDate(first)).toISOString().slice(0, 10)
      this.week.push(day)
    }
  }

  onChange(value: any) {
    this.selectedValue = value.target.value;
  }

  review(data) {
    this.router.navigate(['/sidebar/view-emp-sch', data.id]);
  }


}

