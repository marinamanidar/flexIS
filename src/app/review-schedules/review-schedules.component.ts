import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-review-schedules',
  templateUrl: './review-schedules.component.html',
  styleUrls: ['./review-schedules.component.css']
})
export class ReviewSchedulesComponent {
  listSchedules = JSON.parse(localStorage.getItem('Schedules'));
  curr = new Date()
  week = []
  selectedValue: any;

  constructor(private router: Router) {}
  
  ngOnInit(){
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

