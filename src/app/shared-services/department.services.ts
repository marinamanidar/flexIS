import { Department } from '../shared-model/department.model';
import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {Router} from '@angular/router'
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";

@Injectable({providedIn:'root'})

export class departmentsService {
private departments: Department[] = [];

private departmentUpdated = new Subject<Department[]>();

constructor(private http:HttpClient , private router : Router){}

// getEmployees() {
//   this.http.get<{message : String , employees: []}>('http://localhost:3000/api/employees').subscribe(
//   (postData) => {
//     this.employees = postData.employees;
//     this.employeeUpdated.next([...this.employees]);
//   })

// }

getDepartment(id:string){
  return {...this.departments.find(p=>p.departmentID === id)};
}

getDepartments(){
this.http.get<{message: string , department : any}>('http://localhost:3000/api/departments')
        .pipe(map((departmentData) => {
          return departmentData.department.map( department => {
            return {
              departmentID: department._id,
              departmentName: department.departmentName
            }
          }
          );
        }))
        .subscribe(transformedDepartments => {
          this.departments = transformedDepartments;
          this.departmentUpdated.next([...this.departments]);
        }
        );
}


getDepartmentUpdateListener(){
  return this.departmentUpdated.asObservable();
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