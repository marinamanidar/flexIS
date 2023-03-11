import { NgFor } from '@angular/common';
import { Component, Input, EventEmitter, Output, ANALYZE_FOR_ENTRY_COMPONENTS } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Employee } from '../shared-model/employee.model';
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  hide = true;
  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  Employees = JSON.parse(localStorage.getItem('Employees'));
  inputID: string;
  inputPassword: string;

  keys = Object.values(this.Employees);

  flag = 0;

  constructor (
    private router: Router
  ) {}

  login() {
    if (this.form.valid) {
      //this.submitEM.emit(this.form.value);

      //alert(this.form.get('password').value)
      this.inputID = this.form.get('username').value;
      this.inputPassword = this.form.get('password').value;
      // console.log(this.inputID);
      // console.log(this.inputPassword);


      //console.log(this.keys)

      // this.keys.forEach((key, index) =>{
      //   console.log(`${key}: ${this.Employees[index]}`)
      // })

    //   Object.entries(this.Employees).forEach(([key, value]) => {
    //     console.log(value['name'])
    //     //console.log(`${key}: ${value}`)
    // });
    //console.log(this.keys)
    const BreakError = {};
    try {
      Object.values(this.Employees).forEach(val => {

        if (this.inputID == val['employeeID'] && this.inputPassword == val['password'] ){

          if (val['position'] == "Employee" && val['status'] == "New"){
            this.flag = 1;
            throw BreakError
          } else if (val['position'] == "Supervisor" && val['status'] == "New"){
            this.flag = 2;
            throw BreakError
          } else if(val['position'] == "Employee"){
            this.flag = 3;
            throw BreakError
          } else if (val['position'] == "Supervisor"){
            this.flag = 4;
            throw BreakError
          } else {
            this.flag = 5;
            console.log(this.flag)
            throw BreakError
          }
        } else {
          //console.log(val)
          this.flag = 0;
        }
      })
    } catch (error) {
      if (error !== BreakError) throw error;
    }


    if (this.flag == 0){
      console.log(this.flag)
      alert('wrong ID or password')
    } else {
      if (this.flag == 1){
        alert('welcome new employee');
        this.router.navigate(['/reset']);
      } else if (this.flag == 2){
        alert('welcome new supervisor');
        this.router.navigate(['/reset']);
      } else {
        alert('welcome back')
        this.router.navigate(['/sidebar/home']);
      }
      sessionStorage.setItem('user', this.inputID);
    }

    }
  }


  //@Output() submitEM = new EventEmitter();
}