import { FWARequest } from '../shared-model/request.model';
import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {Router} from '@angular/router'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({providedIn:'root'})

export class requestService {
private requests: FWARequest[] = [];

private requestUpdated = new Subject<FWARequest[]>();

constructor(private http:HttpClient , private router : Router){}

// getEmployees() {
//   this.http.get<{message : String , employees: []}>('http://localhost:3000/api/employees').subscribe(
//   (postData) => {
//     this.employees = postData.employees;
//     this.employeeUpdated.next([...this.employees]);
//   })

// }

getRequest(reqID: string, date: string){
  return {...this.requests.find(p=>p.requestID === reqID)};
  //convert date to date and find too
}

addRequest(employeeID:string, requestDate: string, workType:string, description:string, reason:string, status:string, comment:string) {
  const request: FWARequest = {requestID:'null', employeeID: employeeID, requestDate: requestDate, workType: workType, description: description, reason: reason , status: status, comment: comment};
  this.http.post<{message: string, requestId:string}>('http://localhost:3000/api/requests', request).subscribe(
  (responseData)=> {
    console.log('request addedddd')
    const id = responseData.requestId;
    request.requestID = id;
    this.requests.push(request);
    this.requestUpdated.next([...this.requests]);
    //this.router.navigate(['/']);
    console.log("Request added sucessfully " , request);
  }
  );
}

getRequests(){
this.http.get<{message: string , request : any}>('http://localhost:3000/api/requests')
        .pipe(map((requestData) => {
          return requestData.request.map( req => {
            return {
              employeeID:  req.employeeID,
              requestID:   req._id,
              requestDate: req.requestDate,
              workType:    req.workType,
              description: req.description,
              reason:      req.reason,
              status:      req.status,
              comment:     req.comment
            }
          }
          );
        }))
        .subscribe(transformedRequests => {
          this.requests = transformedRequests;
          this.requestUpdated.next([...this.requests]);
        }
        );
}


getRequestUpdateListener(){
  return this.requestUpdated.asObservable();
}

// addEmployee(password:string, name:string, position:string, email:string, FWAstatus:string, supervisorID:string, departmentID:string, status:string) {
//   const employee: Employee = {employeeID:'null', password: password, name: name, position: position, email: email, FWAstatus: FWAstatus, supervisorID: supervisorID, departmentID: departmentID, status: status};
//   this.http.post<{message: string, employeeId:string}>('http://localhost:3000/api/employees',employee).subscribe(
//   (responseData)=> {
//     console.log('yessssss')
//     const id = responseData.employeeId;
//     employee.employeeID = id;
//     this.employees.push(employee);
//     this.employeeUpdated.next([...this.employees]);
//     //this.router.navigate(['/']);
//     console.log("Post added sucessfulyy " , employee);
//   }
//   );
// }


// updatePost(id:string, password:string, name:string,
//   position:string, email:string, FWAstatus:string,
//   supervisorID:string, departmentID:string, status:string){
//   const emp : Employee = {
//     employeeID:id,
//     password: password,
//     name: name,
//     position:position,
//     email: email,
//     FWAstatus: FWAstatus,
//     supervisorID: supervisorID,
//     departmentID: departmentID,
//     status: status
//   };
//   this.http.put('http://localhost:3000/api/posts/' + id , emp)
//   .subscribe(response => console.log (response));
//   this.router.navigate(['/']);
// }




}
