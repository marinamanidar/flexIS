import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../shared-model/employee.model';
import { Schedule } from '../shared-model/daily-schedule.model';
import { employeesService } from '../shared-services/employee.service';
import { schedulesService } from '../shared-services/schedule.services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-view-emp-sch',
  templateUrl: './view-emp-sch.component.html',
  styleUrls: ['./view-emp-sch.component.css']
})
export class ViewEmpSchComponent implements OnInit {
  sub: any;
  public schedule: Schedule;
  reqID: string;
  requestArray: Schedule[] = [];
  private employeesSub : Subscription | undefined;
  private schedulesSub : Subscription | undefined;

  employees : Employee[] = [] ;
  schedules : Schedule[] = [] ;
  filterSchedule: Schedule[] = [];

  constructor(private route: ActivatedRoute, private router: Router, public employeesService: employeesService , public schedulesService: schedulesService) {}
  user = sessionStorage.getItem('user');
  scheduleForm = new FormGroup({
    date: new FormControl(null, Validators.required),
    workLocation: new FormControl(null, Validators.required),
    workHours: new FormControl(null, Validators.required),
    workReport: new FormControl(null, Validators.required),
    comments: new FormControl(null)
  });

  ngOnInit(){
    this.employeesService.getEmployees();
    this.schedulesService.getSchedules();
    this.employeesSub = this.employeesService.getEmployeesUpdateListener()
    .subscribe((employees:Employee[])=> {
      this.employees = employees.filter(i => i.supervisorID == this.employeesService.getEmployeeByEmail(this.user).employeeID);
    });
    this.schedulesSub = this.schedulesService.getSchedulesUpdateListener()
    .subscribe((schedules:Schedule[])=> {
      this.schedules = schedules;
    });


    this.sub = this.route.params.subscribe(params => {
      if(params['id'] != undefined){
        this.reqID = params['id'];

        this.schedulesSub = this.schedulesService.getSchedulesUpdateListener()
        .subscribe((schedules:Schedule[])=> {
          this.schedules = schedules;
          this.schedule = this.schedules.find(x => x.id == this.reqID);
          console.log(this.schedule);
          this.scheduleForm.patchValue({
            date : this.schedule.date,
            workLocation : this.schedule.workLocation,
            workHours : this.schedule.workHours, 
            workReport : this.schedule.workReport 
           })
        });

      document.getElementById("date").setAttribute('style', 'pointer-events: none');
      document.getElementById("workLocation").setAttribute('style', 'pointer-events: none');
      document.getElementById("workHours").setAttribute('style', 'pointer-events: none');
      document.getElementById("workReport").setAttribute('style', 'pointer-events: none');
      }
    });
  }

  reject(){
    this.schedules[Number(this.reqID) - 1].status = "Rejected"
    this.schedules[Number(this.reqID) - 1].supervisorComments = this.scheduleForm.value.comments
    localStorage.setItem('Schedules', JSON.stringify(this.schedules));
    this.scheduleForm.reset();
    this.router.navigate(['/sidebar/review']);
  }

  approve(){
    this.schedules[Number(this.reqID) - 1].status = "Approved"
    this.schedules[Number(this.reqID) - 1].supervisorComments = this.scheduleForm.value.comments
    localStorage.setItem('Schedules', JSON.stringify(this.schedules));
    this.scheduleForm.reset();
    this.router.navigate(['/sidebar/review']);
  }

  formatDate(date) {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
  }


}

