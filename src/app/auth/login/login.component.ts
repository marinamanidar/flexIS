import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { employeesService } from 'src/app/shared-services/employee.service';
import { Subscription } from 'rxjs';
import { Employee } from 'src/app/shared-model/employee.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  private employeesSub : Subscription | undefined;
  employee : Employee;

  constructor(private router: Router, public authService : AuthService, public employeesService : employeesService){}

  onLogin(form : NgForm) {
    //console.log(form.value);

    if(form.invalid){
      return;
    }
    this.authService.login(form.value.email, form.value.password);
    this.employee = this.employeesService.getEmployeeByEmail(form.value.email);
    console.log(this.employee)


    if(this.employee.position == "Supervisor" && this.employee.status == "New"){
      this.router.navigate(['/reset']);
    }else if(this.employee.position == "Employee" && this.employee.status == "New"){
      this.router.navigate(['/reset']);
    }else{
      console.log(this.employee)
      this.router.navigate(['/sidebar/home']);
    }
  }

}

