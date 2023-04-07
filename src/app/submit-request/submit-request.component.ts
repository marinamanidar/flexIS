import { Component } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import { MatRadioChange } from '@angular/material/radio';
import { FWARequest } from "../shared-model/request.model";
import { Router } from "@angular/router";
import { requestService } from '../shared-services/request.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-submit-request',
  templateUrl: './submit-request.component.html',
  styleUrls: ['./submit-request.component.css']
})
export class SubmitRequestComponent {
  constructor(
    private formBuilder: FormBuilder,  public reqService: requestService, private router: Router) {}




  private requestSub : Subscription | undefined;

  user = sessionStorage.getItem('user');

  //form
  firstFormGroup: FormGroup = this.formBuilder.group({firstCtrl: ['']});
  secondFormGroup: FormGroup = this.formBuilder.group({secondCtrl: ['']});
  thirdFormGroup: FormGroup = this.formBuilder.group({thirdCtrl: ['']});

  request: FWARequest;
  type: string = "flex";
  today: string;
  requests: FWARequest[] = [];
  employeeID: string;
  listRequests = JSON.parse(localStorage.getItem('Requests'));
  pastReq: any;
  isLinear = true;

  ngOnInit(){
    this.reqService.getRequests()
    this.requestSub = this.reqService.getRequestUpdateListener()
    .subscribe((request: FWARequest[])=> {
      this.requests = request;
    });

    this.pastReq = this.requests.find(x => x.employeeID == this.user && x.requestDate == new Date().toLocaleDateString());
    console.log(new Date().toLocaleDateString())
    console.log(this.pastReq)

  }


  radioChange(event: MatRadioChange){ //select work type
    this.type = event.value;
  }
 submit() { //submit request
  const count = this.listRequests.length;
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
    this.user, this.today, this.type, this.secondFormGroup.get('secondCtrl').value, this.thirdFormGroup.get('thirdCtrl').value, 'Pending', ''
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

