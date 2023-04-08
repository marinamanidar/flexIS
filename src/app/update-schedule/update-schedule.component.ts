import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Schedule } from '../shared-model/daily-schedule.model';
import { Employee } from '../shared-model/employee.model';
import { employeesService } from '../shared-services/employee.service';
import { schedulesService } from '../shared-services/schedule.services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-update-schedule',
  templateUrl: './update-schedule.component.html',
  styleUrls: ['./update-schedule.component.css']
})
export class UpdateScheduleComponent implements OnInit {
    requestArray: Schedule[] = [];
    today = new Date(Date.now());
    max = new Date(Date.now() + (3600 * 1000 * 168));
    public schedule: Schedule;
    arrayLength: any;
    sub: any;
    reqID: string;
    exist : boolean = false;
    id: number;
    curr = new Date()
    week = []
    user = sessionStorage.getItem('user');
    private employeesSub : Subscription | undefined;
    private schedulesSub : Subscription | undefined;
    employees : Employee[] = [] ;
    schedules : Schedule[] = [] ;
    emp: Employee;
  

    constructor(private router: Router, private route: ActivatedRoute, public employeesService: employeesService , public schedulesService: schedulesService) {}

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
      this.employees = employees;
    });
    this.schedulesSub = this.schedulesService.getSchedulesUpdateListener()
    .subscribe((schedules:Schedule[])=> {
      this.schedules = schedules;
    });

    this.arrayLength = this.schedules.length + 1;

    for (let i = 1; i <= 7; i++) {
      let first = this.curr.getDate() - this.curr.getDay() + i 
      let day = new Date(this.curr.setDate(first)).toISOString().slice(0, 10)
      this.week.push(day)
    }

    document.getElementById("date").setAttribute("min", this.today.toISOString().split('T')[0]);
    document.getElementById("date").setAttribute("max", this.week[6]);

    this.sub = this.route.params.subscribe(params => {
      if(params['id'] != undefined){
        document.getElementById("button").innerHTML = "Update";
        this.exist = true;
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
            workReport : this.schedule.workReport,
            comments: this.schedule.supervisorComments 
           })

        });
        document.getElementById("comments").setAttribute('style', 'pointer-events: none');
        document.getElementById('condition').classList.remove('d-none');
        this.schedulesSub = this.schedulesService.getSchedulesUpdateListener()
        .subscribe((schedules:Schedule[])=> {
          this.schedules = schedules;

          if(this.schedule.status == 'Approved'){
            document.getElementById("date").setAttribute('style', 'pointer-events: none');
            document.getElementById("workLocation").setAttribute('style', 'pointer-events: none');
            document.getElementById("workHours").setAttribute('style', 'pointer-events: none');
            document.getElementById("workReport").setAttribute('style', 'pointer-events: none');
            document.getElementById("button").innerHTML = "Back";
           }
        });
      }
    });
  }

  get date(){
    return this.scheduleForm.get('date');
  }

  get workLocation(){
    return this.scheduleForm.get('workLocation');
  }

  get workHours(){
    return this.scheduleForm.get('workHours');
  }

  get workReport(){
    return this.scheduleForm.get('workReport')
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

  onSubmit(){
    if(this.exist == true && this.scheduleForm.valid){
      this.sub = this.route.params.subscribe(params => {
        this.schedulesService.updateSchedule(params['id'], this.employeesService.getEmployeeByEmail(this.user).employeeID, this.scheduleForm.value.date, this.scheduleForm.value.workLocation, this.scheduleForm.value.workHours, this.scheduleForm.value.workReport, " ", "Pending");
      });
      this.router.navigate(['/sidebar/view-sch']);
      //localStorage.setItem('Schedules', JSON.stringify(this.listOfSchedules));
    }
    if(this.scheduleForm.valid && this.exist == false){
      this.schedulesService.addSchedules(this.employeesService.getEmployeeByEmail(this.user).employeeID, this.scheduleForm.value.date, this.scheduleForm.value.workLocation, this.scheduleForm.value.workHours, this.scheduleForm.value.workReport, " ", "Pending")
    }
    this.scheduleForm.reset();
    this.router.navigate(['/sidebar/view-sch']);
  }  
}


