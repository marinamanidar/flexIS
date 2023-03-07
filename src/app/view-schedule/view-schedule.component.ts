import { Component } from '@angular/core';

@Component({
  selector: 'app-view-schedule',
  templateUrl: './view-schedule.component.html',
  styleUrls: ['./view-schedule.component.css']
})
export class ViewScheduleComponent {
  listSchedules = JSON.parse(localStorage.getItem('Schedules'));
}
