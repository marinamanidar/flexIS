import { Schedule } from '../shared-model/daily-schedule.model';
import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

import { HttpClient } from '@angular/common/http';
import {Router} from '@angular/router'
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";

@Injectable({providedIn:'root'})

export class schedulesService {
private schedules: Schedule[] = [];

private scheduleUpdated = new Subject<Schedule[]>();

constructor(private http:HttpClient , private router : Router){}


getSchedule(id:string){

  return {...this.schedules.find(p=>p.id === id)};

}

addSchedules(employeeID:string, date:string, workLocation:string, workHours:string, workReport:string, supervisorComments:string, status:string) {
  const schedule: Schedule = {id:'null', employeeID:employeeID, date: date, workLocation: workLocation, workHours: workHours, workReport: workReport, supervisorComments: supervisorComments, status: status};
  this.http.post<{message: string, employeeId:string}>('http://localhost:3000/api/schedules',schedule).subscribe(
  (responseData)=> {
    const id = responseData.employeeId;
    schedule.employeeID = id;
    this.schedules.push(schedule);
    this.scheduleUpdated.next([...this.schedules]);
    console.log("Schedule added sucessfully " , schedule);
  }
  );
}

getSchedules(){
this.http.get<{message: string , schedule : any}>('http://localhost:3000/api/schedules')
        .pipe(map((scheduleData) => {
          return scheduleData.schedule.map( schedule => {
            return {
              id: schedule._id,
              employeeID: schedule.employeeID,
              date: schedule.date,
              workLocation: schedule.workLocation,
              workHours:schedule.workHours,
              workReport: schedule.workReport,
              supervisorComments: schedule.supervisorComments,
              status: schedule.status,
            }
          }
          );
        }))
        .subscribe(transformedSchedules => {
          this.schedules = transformedSchedules;
          this.scheduleUpdated.next([...this.schedules]);
        }
        );
}


getSchedulesUpdateListener(){
  return this.scheduleUpdated.asObservable();
}

}