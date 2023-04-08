import { Component, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { employeesService } from '../shared-services/employee.service';
import { Employee } from '../shared-model/employee.model';

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
  employees: Employee[] = []
  employee: Employee;

  constructor(private router: Router, public empService: employeesService){}

  ngOnInit(){

    this.employee = this.empService.getEmployeeByEmail(this.user)
    // console.log(this.employee)
    // this.empService.getEmployees();
    // this.empService.getEmployeesUpdateListener()
    // .subscribe((employee: Employee[]) => {
    //   this.employee = employee.find(x=> x.email == this.user)
    // })
  }

  login() {
    if(this.form.value.password != this.form.value.newpassword){

      alert('Your new password and confirm password is not the same')
    }else if(this.form.valid) {
      this.empService.updateEmployee(this.employee.employeeID, this.form.value.newpassword, this.employee.name, this.employee.position, this.employee.email, this.employee.FWAstatus, this.employee.supervisorID, this.employee.departmentID, 'old')
      this.router.navigate(['/sidebar/home']);
    }
  }


  @Output() submitEM = new EventEmitter();
}
