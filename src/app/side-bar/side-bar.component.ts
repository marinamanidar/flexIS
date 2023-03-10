import { Component } from '@angular/core';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent {
  public sidebarShow: boolean = false;
  user = sessionStorage.getItem('user');
  listEmployees = JSON.parse(localStorage.getItem('Employees'));
  listDepartments = JSON.parse(localStorage.getItem('Departments'));
  empName: any;
  empPos: any;
  empDepID: any;
  empDepName: any;

  logout(){
    sessionStorage.clear()
  }

  ngOnInit(){
    for(let emp of this.listEmployees){
      if(emp.employeeID == this.user){
        this.empName = emp.name;
        this.empPos = emp.position;
        this.empDepID = emp.departmentID;
      }
      for(let dep of this.listDepartments){
        if(this.empDepID == dep.departmentID){
          this.empDepName = dep.departmentName;
        }
      }
      
    }
    console.log(this.empName)
  }
}
