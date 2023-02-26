import { Component } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import { MatRadioChange } from '@angular/material/radio';

@Component({
  selector: 'app-submit-request',
  templateUrl: './submit-request.component.html',
  styleUrls: ['./submit-request.component.css']
})
export class SubmitRequestComponent {
  constructor(private formBuilder: FormBuilder) {}

  firstFormGroup: FormGroup = this.formBuilder.group({firstCtrl: ['']});
  secondFormGroup: FormGroup = this.formBuilder.group({secondCtrl: ['']});
  thirdFormGroup: FormGroup = this.formBuilder.group({thirdCtrl: ['']});

  type: string = "flex";


  radioChange(event: MatRadioChange){
    this.type = event.value;
  }

 submit() {
  alert(this.type + " and " + this.secondFormGroup.get('secondCtrl').value
  +  " and " + this.thirdFormGroup.get('thirdCtrl').value);

 }
}
