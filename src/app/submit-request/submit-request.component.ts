import { Component } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import { MatRadioChange } from '@angular/material/radio';
import { formatDate } from "@angular/common";
import { FWARequest } from "../shared-model/request.model";
import { Router } from "@angular/router";

@Component({
  selector: 'app-submit-request',
  templateUrl: './submit-request.component.html',
  styleUrls: ['./submit-request.component.css']
})
export class SubmitRequestComponent {
  constructor(
    private formBuilder: FormBuilder,
    private router: Router
    ) {}


  firstFormGroup: FormGroup = this.formBuilder.group({firstCtrl: ['']});
  secondFormGroup: FormGroup = this.formBuilder.group({secondCtrl: ['']});
  thirdFormGroup: FormGroup = this.formBuilder.group({thirdCtrl: ['']});

  request: FWARequest;
  type: string = "flex";
  today: string;
  requests: FWARequest[] = [];
  employeeID: string;
  listRequests = JSON.parse(localStorage.getItem('Requests'));


  radioChange(event: MatRadioChange){
    this.type = event.value;
  }

 submit() {
  this.request = new FWARequest();
  this.today = formatDate(new Date(), 'yyyy/MM/dd', 'en');
  this.request.employeeID = 'E100';
  this.request.requestDate = this.today;
  this.request.requestID = 'R001';
  this.request.workType = this.type;
  this.request.description = this.secondFormGroup.get('secondCtrl').value;
  this.request.reason = this.thirdFormGroup.get('thirdCtrl').value;
  this.request.status = 'pending';
  this.request.comment = '';

  // this.requests.push(this.request);
  // localStorage.setItem('Requests', JSON.stringify(this.requests));

  this.addRequest(this.request);

  alert('Your request has been submitted');
}

addRequest(request){
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

