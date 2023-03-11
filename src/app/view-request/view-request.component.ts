import { Component } from '@angular/core';
import { Router } from "@angular/router";

export class requestTable {
  ID: string
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

  constructor(private router: Router) {}

  listRequests = JSON.parse(localStorage.getItem('Requests'));
  listEmployees = JSON.parse(localStorage.getItem('Employees'));
  user = sessionStorage.getItem('user');

  emp: empList;
  empTable: empList[] = [];

  req: requestTable;
  reqTable: requestTable[] = [];

  ngOnInit() {
    //creates array of employees under the logged in supervisor
    Object.values(this.listEmployees).forEach(val => {
      if(val['supervisorID'] == this.user){
        this.emp = new empList();
        this.emp.empID = val['employeeID'];
        this.emp.name = val['name'];
        this.empTable.push(this.emp);
      }
    })

    //creates array of requests under the employees under the supervisor
    Object.values(this.listRequests).forEach(val => {
      this.req = new requestTable();
      this.req.ID = val['employeeID'];
      this.req.status = val['status'];
      this.req.reqID = val['requestID']
      if (this.req.status == 'Pending'){
        const emp = this.empTable.find(x => x.empID == this.req.ID);
        if (emp != undefined){
          this.req.name = emp.name;
          this.reqTable.push(this.req);
        }
      }
    })
  }

  //variables for the table
  columnsToDisplay: string[] = ['ID', 'Name', 'Status'];
  dataSource = this.reqTable;

  //navigates to page to accept or reject request
  review(data) {
    this.router.navigate(['/sidebar/request', data['reqID']]);
  }
}
