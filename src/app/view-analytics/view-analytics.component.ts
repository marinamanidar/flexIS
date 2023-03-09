import { Component } from '@angular/core';

@Component({
  selector: 'app-view-analytics',
  templateUrl: './view-analytics.component.html',
  styleUrls: ['./view-analytics.component.css']
})
export class ViewAnalyticsComponent {
  listDepartments = JSON.parse(localStorage.getItem('Departments'));
}
