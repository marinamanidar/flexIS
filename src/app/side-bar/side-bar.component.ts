import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { employeesService } from '../shared-services/employee.service';
import { departmentsService } from '../shared-services/department.services';
import { Employee } from '../shared-model/employee.model';
import { Department } from '../shared-model/department.model';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {
  userIsAurhenticated = false;
  private authListenerSubs: Subscription;
  constructor(private authService: AuthService, public employeesService: employeesService, public departmentsService: departmentsService){}
  public sidebarShow: boolean = false;
  private employeesSub : Subscription | undefined;
  private departmentsSub : Subscription | undefined;
  user = sessionStorage.getItem('user');

  employees : Employee[] = [] ;
  departments : Department[] = [] ;
  empName: any;
  empPos: any;
  empDepID: any;
  empDepName: any;

  logout(){
    sessionStorage.clear()
    this.authService.logout();
  }

  ngOnInit(){
    console.log(this.user)
    this.employeesService.getEmployees();
    this.departmentsService.getDepartments();

    this.employeesSub = this.employeesService.getEmployeesUpdateListener()
    .subscribe((employees:Employee[])=> {
      this.employees = employees;

      this.departmentsSub = this.departmentsService.getDepartmentUpdateListener()
      .subscribe((departments:Department[])=> {
        this.departments = departments;

        for(let emp of this.employees){
          if(emp.email == this.user){
            this.empName = emp.name;
            this.empPos = emp.position;
            console.log(this.empPos)
            this.empDepID = emp.departmentID;
          }
          for(let dep of this.departments){
            if(this.empDepID == dep.departmentID){
              this.empDepName = dep.departmentName;
            }
          }
        }
      });
    });

    this.authListenerSubs = this.authService
    .getAuthStatusListener()
    .subscribe(isAuthenticated => {
      this.userIsAurhenticated = isAuthenticated;
    })
  }
}
