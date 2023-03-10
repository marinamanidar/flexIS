import { Component} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
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

        if (this.inputID == val['employeeID'] && this.inputPassword ==
        val['password'] ){

          if (val['position'] == "employee"){
            this.flag = 1;
            throw BreakError
          } else if (val['position'] == "supervisor"){
            this.flag = 2;
            throw BreakError
          } else {
            this.flag = 3;
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
        alert('welcome employee');
      } else if (this.flag == 2){
        alert('welcome supervisor')
      } else {
        alert('welcome admin')
      }
      sessionStorage.setItem('user', this.inputID);
      this.router.navigate(['/sidebar/home']);
    }

    }
  }


  //@Output() submitEM = new EventEmitter();
}
