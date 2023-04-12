import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../shared-model/employee.model';
import { FWARequest } from "../shared-model/request.model";
import { requestService } from '../shared-services/request.service';
import { Subscription } from 'rxjs';
import { employeesService } from '../shared-services/employee.service';


@Component({
  selector: 'app-review-request',
  templateUrl: './review-request.component.html',
  styleUrls: ['./review-request.component.css']
})
export class ReviewRequestComponent {

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

  private requestSub : Subscription | undefined;

  private empSub : Subscription | undefined;


  sub: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public reqService: requestService,
    public empService: employeesService
    ) { }

  reqID: string;
  name: string;
  request: FWARequest;
  requestIndex: any;
  req: FWARequest;

  employee: Employee;

  requestArray: FWARequest[] = [];
  pastRequests: FWARequest[] = [];

  ngOnInit() {

    //retrives request ID from previous page to find request and populate the form
    this.sub = this.route.params.subscribe(params => {
      this.reqID = params['id'];

      this.reqService.getRequests();
      this.requestSub = this.reqService.getRequestUpdateListener()
      .subscribe((request : FWARequest[]) => {
        this.requestArray = request;

        this.request = this.requestArray.find(x => x.requestID == this.reqID);

        this.empService.getEmployees();
        this.empSub = this.empService.getEmployeesUpdateListener()
        .subscribe((employee: Employee[]) => {
          this.empTable = employee

          this.employee = this.empTable.find(x => x.employeeID == this.request.employeeID);
          this.name = this.employee['name'];
        })

        //Creates array of past requests to be displayed
      Object.values(this.requestArray).forEach(val => {
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
      })

      // this.empTable = Object.values(this.listEmployees)
      // this.requestArray = Object.values(this.listRequests);

      // this.request = this.requestArray.find(x => x.requestID == this.reqID);
      // this.requestIndex = (Object.keys(this.listRequests) as (keyof typeof this.listRequests)[]).find((key) => {
      //   return this.listRequests[key] === this.request;
      // });

      //display ID and name of employee on title card

    });
  }

  onSubmit(event) :void
  {
    //updates the request's status and comment
    this.request.comment = this.form.get('comment').value;
    if (event == 'reject'){

      alert('request rejected');
      // this.listRequests[this.requestIndex].status = 'Rejected';

      // this.listRequests[this.requestIndex].comment = this.request.comment;
      // localStorage.setItem("Requests",JSON.stringify(this.listRequests));
      console.log(this.request.requestID)
      this.reqService.updateRequest(this.request.requestID, this.request.employeeID, this.request.requestDate, this.request.workType, this.request.description, this.request.reason, 'Rejected', this.request.comment)
      this.router.navigate(['/sidebar/view-request']);
    } else if(event == 'accept'){
      alert('request accepted');
      this.request.comment = this.form.get('comment').value;
      // this.listRequests[this.requestIndex].status = 'Accepted';
      // this.listRequests[this.requestIndex].comment = this.request.comment;
      // localStorage.setItem("Requests",JSON.stringify(this.listRequests));
      this.reqService.updateRequest(this.request.requestID, this.request.employeeID, this.request.requestDate, this.request.workType, this.request.description, this.request.reason, 'Accepted', this.request.comment)
      this.empService.updateEmployee(this.employee.employeeID, this.employee.password,this.employee.name, this.employee.position, this.employee.email, this.request.workType, this.employee.supervisorID, this.employee.departmentID, this.employee.status)
      this.router.navigate(['/sidebar/view-request']);
    }

  }

}
