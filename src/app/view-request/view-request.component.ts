import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { requestService } from "../shared-services/request.service";
import { Subscription } from 'rxjs';
import { FWARequest } from '../shared-model/request.model';
import { employeesService } from '../shared-services/employee.service';
import { Employee } from '../shared-model/employee.model';


export class requestTable {
  empID: string
  name: string
  status: string
  reqID: string
}

export class empList {
  empID: string
  name: string
}

@Component({
  selector: 'app-view-request',
  templateUrl: './view-request.component.html',
  styleUrls: ['./view-request.component.css']
})
export class ViewRequestComponent {

  constructor(public reqService: requestService, public empService: employeesService ,private router: Router) {}


  private requestSub : Subscription | undefined;
  private employeeSub : Subscription | undefined;

  request : FWARequest[] = [];
  employee: Employee[] = [];

  supervisor: Employee;

  listRequests = JSON.parse(localStorage.getItem('Requests'));
  listEmployees = JSON.parse(localStorage.getItem('Employees'));
  user = sessionStorage.getItem('user');

  emp: empList;
  empTable: empList[] = [];

  req: requestTable;
  reqTable: requestTable[] = [];

  //variables for the table
  columnsToDisplay: string[] = ['ID', 'Name', 'Status'];
  dataSource = this.reqTable;

  ngOnInit() {
    this.empService.getEmployees();
    this.employeeSub = this.empService.getEmployeesUpdateListener()
    .subscribe((employees : Employee[]) => {
      this.employee = employees;
      this.supervisor = this.empService.getEmployeeByEmail(this.user)
      Object.values(this.employee).forEach(val => {
        if(val['supervisorID'] == this.supervisor.employeeID){
          this.emp = new empList();
          this.emp.empID = val['employeeID'];
          this.emp.name = val['name'];
          // console.log(this.emp)
          this.empTable.push(this.emp);
        }
      })
    })


    this.reqService.getRequests();
    this.requestSub = this.reqService.getRequestUpdateListener()
    .subscribe((requests : FWARequest[]) => {
      this.request = requests;
      // console.log(this.request)

      Object.values(this.request).forEach(val => {
        this.req = new requestTable();
        this.req.empID = val['employeeID'];
        this.req.status = val['status'];
        this.req.reqID = val['requestID']
        if (this.req.status == 'Pending'){
          const emp = this.empTable.find(x => x.empID == this.req.empID);
          if (emp != undefined){
            // console.log('found')
            this.req.name = emp.name;
            this.reqTable.push(this.req);
            // console.log(this.reqTable)
          }
        }
      })

    })
  }


  //navigates to page to accept or reject request
  review(data) {
    console.log(data)
    this.router.navigate(['/sidebar/request', data['reqID']]);
  }
}



