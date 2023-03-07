import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Schedule } from '../shared-model/daily-schedule.model';

@Component({
  selector: 'app-update-schedule',
  templateUrl: './update-schedule.component.html',
  styleUrls: ['./update-schedule.component.css']
})
export class UpdateScheduleComponent implements OnInit {
    today = new Date(Date.now() + (3600 * 1000 * 24));
    max = new Date(Date.now() + (3600 * 1000 * 168));
    public schedule: Schedule;
    listOfSchedules = JSON.parse(localStorage.getItem("Schedules"));
    arrayLength = this.listOfSchedules.length + 1;

  scheduleForm = new FormGroup({
    date: new FormControl(null, Validators.required),
    workLocation: new FormControl(null, Validators.required),
    workHours: new FormControl(null, Validators.required),
    workReport: new FormControl(null, Validators.required)
  });

  ngOnInit(){
    document.getElementById("date").setAttribute("min", this.today.toISOString().split('T')[0]);
    document.getElementById("date").setAttribute("max", this.max.toISOString().split('T')[0]);
  }

  constructor(private router: Router) {}

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

  onSubmit(){
    if(this.scheduleForm.valid){
      this.schedule = {
        id : this.arrayLength,
        employeeID: "E100",
        date: this.scheduleForm.value.date,
        workLocation : this.scheduleForm.value.workLocation,
        workHours: this.scheduleForm.value.workHours,
        workReport: this.scheduleForm.value.workReport,
        supervisorComments: null,
        status: "Pending"
      }
    }
    this.addSchedule(this.schedule);
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


