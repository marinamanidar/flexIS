import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../shared-model/employee.model';
import { FWARequest } from "../shared-model/request.model";

@Component({
  selector: 'app-review-request',
  templateUrl: './review-request.component.html',
  styleUrls: ['./review-request.component.css']
})
export class ReviewRequestComponent {
  // test: string;
  // constructor(private route: ActivatedRoute) {
  //   this.route.queryParams.subscribe(params => {
  //     console.log(params['id'])
  //   });

  listEmployees = JSON.parse(localStorage.getItem('Employees'));
  listRequests = JSON.parse(localStorage.getItem('Requests'));
  requests = Object.values(this.listRequests);

  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  emp: Employee;
  empTable: Employee[] = [];

  sub: any;

  constructor(private route: ActivatedRoute) { }

  reqID: string;
  name: string;
  request: FWARequest;

  requestArray: FWARequest[] = [];

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.reqID = params['id'];
      Object.values(this.listEmployees).forEach(val => {
        this.emp = new Employee;
        this.emp.employeeID = val['employeeID'];
        this.emp.name = val['name'];
        this.empTable.push(this.emp);
      })
      this.requestArray = Object.values(this.listRequests);
      this.request = this.requestArray.find(x => x.requestID == this.reqID);
      const empName = this.empTable.find(x => x.employeeID == this.request.employeeID);
      this.name = empName['name'];
    });
  }

  onSubmit(event) :void
  {
    if (event == 'reject'){
      alert('rejected')
    }

  }

}
