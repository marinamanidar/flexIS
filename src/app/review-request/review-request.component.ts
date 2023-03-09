import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { findIndex } from 'rxjs';
import { Employee } from '../shared-model/employee.model';
import { FWARequest } from "../shared-model/request.model";


@Component({
  selector: 'app-review-request',
  templateUrl: './review-request.component.html',
  styleUrls: ['./review-request.component.css']
})
export class ReviewRequestComponent {
  // test: string;
  // constructor(private route: ActivatedRoute) {
  //   this.route.queryParams.subscribe(params => {
  //     console.log(params['id'])
  //   });

  listEmployees = JSON.parse(localStorage.getItem('Employees'));
  listRequests = JSON.parse(localStorage.getItem('Requests'));

  form: FormGroup = new FormGroup({
    worktype: new FormControl(''),
    date: new FormControl(''),
    description: new FormControl(''),
    reason: new FormControl(''),
    comment: new FormControl(''),
  });

  // emp: Employee;
  empTable: Employee[] = [];

  sub: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router
    ) { }

  reqID: string;
  name: string;
  request: FWARequest;
  requestIndex: any;
  req: FWARequest;

  requestArray: FWARequest[] = [];
  pastRequests: FWARequest[] = [];

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.reqID = params['id'];
      this.empTable = Object.values(this.listEmployees)
      // Object.values(this.listEmployees).forEach(val => {
      //   this.emp = new Employee;
      //   this.emp.employeeID = val['employeeID'];
      //   this.emp.name = val['name'];
      //   this.empTable.push(this.emp);
      // })
      this.requestArray = Object.values(this.listRequests);
      this.request = this.requestArray.find(x => x.requestID == this.reqID);
      this.requestIndex = (Object.keys(this.listRequests) as (keyof typeof this.listRequests)[]).find((key) => {
        return this.listRequests[key] === this.request;
      });
      const empName = this.empTable.find(x => x.employeeID == this.request.employeeID);
      this.name = empName['name'];

      Object.values(this.listRequests).forEach(val => {
        if (val['employeeID'] == this.request.employeeID){
          if (val['status'] != 'Pending'){
            this.req = {
              employeeID: val['employeeID'],
              requestID: val['requestID'],
              requestDate: val['requestDate'],
              workType: val['workType'],
              description: val['description'],
              reason: val['reason'],
              status:  val['status'],
              comment: val['comment']
            }

            this.pastRequests.push(this.req);
          }
        }
      })
    });
  }

  onSubmit(event) :void
  {
    this.request.comment = this.form.get('comment').value;
    if (event == 'reject'){
      alert('request rejected');
      this.listRequests[this.requestIndex].status = 'Rejected';
      this.listRequests[this.requestIndex].comment = this.request.comment;
      localStorage.setItem("Requests",JSON.stringify(this.listRequests));
      this.router.navigate(['/sidebar/view-request']);
    } else if(event == 'accept'){
      alert('request accepted');
      this.request.comment = this.form.get('comment').value;
      this.listRequests[this.requestIndex].status = 'Accepted';
      this.listRequests[this.requestIndex].comment = this.request.comment;
      localStorage.setItem("Requests",JSON.stringify(this.listRequests));
      this.router.navigate(['/sidebar/view-request']);
    }

  }

//   this.pastRequests = this.listRequests.filter('myFilter', function () {
//     return function (items, search) {
//         var result = [];
//         angular.forEach(items, function (value, key) {
//             angular.forEach(value, function (value2, key2) {
//                 if (value2 === search) {
//                     result.push(value2);
//                 }
//             })
//         });
//         return result;

//     }
// });

}
