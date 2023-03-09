import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Schedule } from '../shared-model/daily-schedule.model';

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
    listOfSchedules = JSON.parse(localStorage.getItem("Schedules"));
    arrayLength = this.listOfSchedules.length + 1;
    sub: any;
    reqID: string;
    exist : boolean = false;
    id: number;
    curr = new Date()
    week = []

    constructor(private router: Router, private route: ActivatedRoute) {}

  scheduleForm = new FormGroup({
    date: new FormControl(null, Validators.required),
    workLocation: new FormControl(null, Validators.required),
    workHours: new FormControl(null, Validators.required),
    workReport: new FormControl(null, Validators.required),
    comments: new FormControl(null)
  });

  ngOnInit(){
    for (let i = 1; i <= 7; i++) {
      let first = this.curr.getDate() - this.curr.getDay() + i 
      let day = new Date(this.curr.setDate(first)).toISOString().slice(0, 10)
      this.week.push(day)
    }

    document.getElementById("date").setAttribute("min", this.today.toISOString().split('T')[0]);
    document.getElementById("date").setAttribute("max", this.week[6]);

    this.sub = this.route.params.subscribe(params => {
      if(params['id'] != undefined){
        this.exist = true;
        this.reqID = params['id'];
        this.requestArray = Object.values(this.listOfSchedules);
        this.schedule = this.requestArray.find(x => x.id == this.reqID);
        const date = new Date(this.schedule.date);
        this.formatDate(date);
        document.getElementById("button").innerHTML = "Update";
        this.scheduleForm.patchValue({
        date : this.formatDate(date),
        workLocation : this.schedule.workLocation,
        workHours : this.schedule.workHours, 
        workReport : this.schedule.workReport,
        comments: this.schedule.supervisorComments 
       })
       document.getElementById("comments").setAttribute('style', 'pointer-events: none');
        document.getElementById('condition').classList.remove('d-none');
       if(this.schedule.status == 'Approved'){
        document.getElementById("date").setAttribute('style', 'pointer-events: none');
        document.getElementById("workLocation").setAttribute('style', 'pointer-events: none');
        document.getElementById("workHours").setAttribute('style', 'pointer-events: none');
        document.getElementById("workReport").setAttribute('style', 'pointer-events: none');
        document.getElementById("button").innerHTML = "Back";
       }
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
      this.listOfSchedules[Number(this.reqID) - 1].date = this.scheduleForm.value.date
      this.listOfSchedules[Number(this.reqID) - 1].workLocation = this.scheduleForm.value.workLocation
      this.listOfSchedules[Number(this.reqID) - 1].workHours = this.scheduleForm.value.workHours
      this.listOfSchedules[Number(this.reqID) - 1].workReport = this.scheduleForm.value.workReport
      localStorage.setItem('Schedules', JSON.stringify(this.listOfSchedules));
    }
    if(this.scheduleForm.valid && this.exist == false){
      this.schedule = {
        id : this.arrayLength.toString(),
        employeeID: "E100",
        date: this.scheduleForm.value.date,
        workLocation : this.scheduleForm.value.workLocation,
        workHours: this.scheduleForm.value.workHours,
        workReport: this.scheduleForm.value.workReport,
        supervisorComments: null,
        status: "Pending"
      }
      this.addSchedule(this.schedule);
    }
    this.scheduleForm.reset();
    this.router.navigate(['/sidebar/view-sch']);
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

  
}


