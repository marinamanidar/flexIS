import { Component, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent {
  user = sessionStorage.getItem('user');
  listEmployees = JSON.parse(localStorage.getItem('Employees'));
  hide = true;
  index: any;
  picker ="";
  form: FormGroup = new FormGroup({
    password: new FormControl(''),
    newpassword: new FormControl(''),
  });

  constructor(private router: Router){}

  login() {
    if(this.form.value.password != this.form.value.newpassword){
      alert('Your new password and confirm password is not the same')
    }else if(this.form.valid) {
      this.index = this.listEmployees.findIndex(id => id.employeeID == this.user);
      this.listEmployees[this.index].password = this.form.value.password
      this.listEmployees[this.index].status = "None"
      localStorage.setItem('Employees', JSON.stringify(this.listEmployees));
      this.router.navigate(['/sidebar/home']);
    }
  }


  @Output() submitEM = new EventEmitter();
}
