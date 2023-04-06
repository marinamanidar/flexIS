
import {Employee } from '../shared-model/employee.model';
import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

import { HttpClient } from '@angular/common/http';
import {Router} from '@angular/router'
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";

@Injectable({providedIn:'root'})

export class employeesService {
private employees: Employee[] = [];

private employeeUpdated = new Subject<Employee[]>();

constructor(private http:HttpClient , private router : Router){}

// getEmployees() {
//   this.http.get<{message : String , employees: []}>('http://localhost:3000/api/employees').subscribe(
//   (postData) => {
//     this.employees = postData.employees;
//     this.employeeUpdated.next([...this.employees]);
//   })

// }

getEmployee(id:string){

  return {...this.employees.find(p=>p.employeeID === id)};

}

addEmployee(password:string, name:string, position:string, email:string, FWAstatus:string, supervisorID:string, departmentID:string, status:string) {
  const employee: Employee = {employeeID:'null', password: password, name: name, position: position, email: email, FWAstatus: FWAstatus, supervisorID: supervisorID, departmentID: departmentID, status: status};
  this.http.post<{message: string, employeeId:string}>('http://localhost:3000/api/employees',employee).subscribe(
  (responseData)=> {
    console.log('yessssss')
    const id = responseData.employeeId;
    employee.employeeID = id;
    this.employees.push(employee);
    this.employeeUpdated.next([...this.employees]);
    //this.router.navigate(['/']);
    console.log("Employee added sucessfully " , employee);
  }
  );
}

getEmployees(){
this.http.get<{message: string , employee : any}>('http://localhost:3000/api/employees')
        .pipe(map((employeeData) => {
          return employeeData.employee.map( employee => {
            return {
              employeeID: employee._id,
              password: employee.password,
              name: employee.name,
              position:employee.position,
              email: employee.email,
              FWAstatus: employee.FWAstatus,
              supervisorID: employee.supervisorID,
              departmentID: employee.departmentID,
              status: employee.status,
            }
          }

          );
        }))
        .subscribe(transformedEmployees => {
          this.employees = transformedEmployees;
          this.employeeUpdated.next([...this.employees]);
        }
        );
}


getEmployeesUpdateListener(){
  return this.employeeUpdated.asObservable();
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
