import { Component } from '@angular/core';

@Component({
  selector: 'app-view-employees',
  templateUrl: './view-employees.component.html',
  styleUrls: ['./view-employees.component.css']
})
export class ViewEmployeesComponent {
  listEmployees = JSON.parse(localStorage.getItem('Employees'));
  listDepartments = JSON.parse(localStorage.getItem('Departments'));
}
