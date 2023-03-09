import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Schedule } from '../shared-model/daily-schedule.model';

@Component({
  selector: 'app-view-emp-sch',
  templateUrl: './view-emp-sch.component.html',
  styleUrls: ['./view-emp-sch.component.css']
})
export class ViewEmpSchComponent implements OnInit {
  listOfSchedules = JSON.parse(localStorage.getItem("Schedules"));
  sub: any;
  public schedule: Schedule;
  reqID: string;
  requestArray: Schedule[] = [];

  constructor(private route: ActivatedRoute, private router: Router) {}

  scheduleForm = new FormGroup({
    date: new FormControl(null, Validators.required),
    workLocation: new FormControl(null, Validators.required),
    workHours: new FormControl(null, Validators.required),
    workReport: new FormControl(null, Validators.required),
    comments: new FormControl(null)
  });

  ngOnInit(){
    this.sub = this.route.params.subscribe(params => {
      if(params['id'] != undefined){
        this.reqID = params['id'];
        this.requestArray = Object.values(this.listOfSchedules);
        this.schedule = this.requestArray.find(x => x.id == this.reqID);
        const date = new Date(this.schedule.date);
        this.formatDate(date);
        this.scheduleForm.patchValue({
        date : this.formatDate(date),
        workLocation : this.schedule.workLocation,
        workHours : this.schedule.workHours, 
        workReport : this.schedule.workReport 
       })
      document.getElementById("date").setAttribute('style', 'pointer-events: none');
      document.getElementById("workLocation").setAttribute('style', 'pointer-events: none');
      document.getElementById("workHours").setAttribute('style', 'pointer-events: none');
      document.getElementById("workReport").setAttribute('style', 'pointer-events: none');
      }
    });
  }

  reject(){
    this.listOfSchedules[Number(this.reqID) - 1].status = "Rejected"
    this.listOfSchedules[Number(this.reqID) - 1].supervisorComments = this.scheduleForm.value.comments
    localStorage.setItem('Schedules', JSON.stringify(this.listOfSchedules));
    this.scheduleForm.reset();
    this.router.navigate(['/sidebar/review']);
  }

  approve(){
    this.listOfSchedules[Number(this.reqID) - 1].status = "Approved"
    this.listOfSchedules[Number(this.reqID) - 1].supervisorComments = this.scheduleForm.value.comments
    localStorage.setItem('Schedules', JSON.stringify(this.listOfSchedules));
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

