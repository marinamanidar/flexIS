import { Component } from '@angular/core';
import { retryWhen } from 'rxjs';
import { Employee } from '../shared-model/employee.model';
import { Router, NavigationExtras } from "@angular/router";


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

  emp: empList;
  empTable: empList[] = [];

  req: requestTable;
  reqTable: requestTable[] = [];

  ngOnInit() {
    Object.values(this.listEmployees).forEach(val => {
      this.emp = new empList();
      this.emp.empID = val['employeeID'];
      this.emp.name = val['name'];
      this.empTable.push(this.emp);
    })

    Object.values(this.listRequests).forEach(val => {
      this.req = new requestTable();
      this.req.ID = val['employeeID'];
      this.req.status = val['status'];
      this.req.reqID = val['requestID']
      if (this.req.status == 'Pending'){
        const emp = this.empTable.find(x => x.empID == this.req.ID);
        this.req.name = emp.name;
        this.reqTable.push(this.req);
      }
    })
  }
  columnsToDisplay: string[] = ['ID', 'Name', 'Status'];
  dataSource = this.reqTable;

  review(data) {
    // alert('test')

    // let navigationExtras: NavigationExtras = {
    //   queryParams: {
    //     id: 'test'
    //   }
    // }

    this.router.navigate(['/request', data['reqID']]);
  }
}
