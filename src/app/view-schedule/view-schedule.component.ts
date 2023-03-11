import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-schedule',
  templateUrl: './view-schedule.component.html',
  styleUrls: ['./view-schedule.component.css']
})
export class ViewScheduleComponent {
  user = sessionStorage.getItem('user');
  listSchedules = JSON.parse(localStorage.getItem('Schedules'));

  constructor(private router: Router){}

  review(data) {
    this.router.navigate(['/sidebar/update', data.id]);
  }
  
}
