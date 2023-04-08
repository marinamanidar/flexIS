import { Component } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import { MatRadioChange } from '@angular/material/radio';
import { FWARequest } from "../shared-model/request.model";
import { Router } from "@angular/router";
import { requestService } from '../shared-services/request.service';
import { Subscription } from 'rxjs';
import { employeesService } from '../shared-services/employee.service';
import { Employee } from '../shared-model/employee.model';

@Component({
  selector: 'app-submit-request',
  templateUrl: './submit-request.component.html',
  styleUrls: ['./submit-request.component.css']
})
export class SubmitRequestComponent {
  constructor(

    public reqService: requestService, public empService: employeesService, private formBuilder: FormBuilder,   private router: Router) {}




  private requestSub : Subscription | undefined;
  private empSub : Subscription | undefined;

  user = sessionStorage.getItem('user');

  //form
  firstFormGroup: FormGroup = this.formBuilder.group({firstCtrl: ['']});
  secondFormGroup: FormGroup = this.formBuilder.group({secondCtrl: ['']});
  thirdFormGroup: FormGroup = this.formBuilder.group({thirdCtrl: ['']});

  request: FWARequest;
  type: string = "flex";
  today: string;
  requests: FWARequest[] = [];
  employees: Employee[] = [];
  employeeID: string;
  listRequests = JSON.parse(localStorage.getItem('Requests'));
  pastReq: any;
  isLinear = true;
  reqEmp: Employee;
  userID: string;

  ngOnInit(){

    this.empService.getEmployees();
    this.empSub = this.empService.getEmployeesUpdateListener()
    .subscribe((employee: Employee[]) => {
      this.employees = employee;

      this.userID = this.employees.find(x => x.email == this.user).employeeID;
      this.reqEmp = this.employees.find(x => x.email == this.user);

      this.reqService.getRequests();
      this.requestSub = this.reqService.getRequestUpdateListener()
      .subscribe((request: FWARequest[])=> {
      this.requests = request;
      this.pastReq = this.requests.find(x => x.employeeID == this.reqEmp.employeeID && x.requestDate == new Date().toLocaleDateString());

    });
    })
  }

  radioChange(event: MatRadioChange){ //select work type
    this.type = event.value;
    console.log(this.pastReq)
  }

 submit() { //submit request
  const count = this.requests.length;
  this.request = new FWARequest();
  this.today = new Date().toLocaleDateString();
  this.request.employeeID = this.user
  this.request.requestID = 'R'+ count ;
  this.request.requestDate = this.today;
  this.request.workType = this.type;
  this.request.description = this.secondFormGroup.get('secondCtrl').value;
  this.request.reason = this.thirdFormGroup.get('thirdCtrl').value;
  this.request.status = 'Pending';
  this.request.comment = '';


  this.reqService.addRequest(
    this.userID, this.today, this.type, this.secondFormGroup.get('secondCtrl').value, this.thirdFormGroup.get('thirdCtrl').value, 'Pending', ''
  );
  this.reqService.getRequestUpdateListener();
  this.addRequest(this.request);

  alert('Your request has been submitted');
  this.listRequests = JSON.parse(localStorage.getItem('Requests'));
  this.router.navigate(['/sidebar/home']);
}

addRequest(request){ //adds the request into local storage
  let requests = [];
  if (localStorage.getItem('Requests')){
    requests = JSON.parse(localStorage.getItem('Requests'));
    requests = [...requests, request]
  }else{
    requests = [request];
  }
  localStorage.setItem('Requests', JSON.stringify(requests));
}
 }

