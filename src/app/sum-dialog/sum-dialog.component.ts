import { Component, Inject } from '@angular/core';
import { MatOptionSelectionChange } from '@angular/material/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatSelectionList, MatSelectionListChange } from '@angular/material/list';

export class dateList {
  date: string
  count: number
}

@Component({
  selector: 'app-sum-dialog',
  templateUrl: './sum-dialog.component.html',
  styleUrls: ['./sum-dialog.component.css']
})
export class SumDialogComponent {
  listSchedules = JSON.parse(localStorage.getItem('Schedules'));
  listEmployees = JSON.parse(localStorage.getItem('Employees'));


  counting: number = 0;
  early: Date = new Date()
  earlyCompare: Date
  late: Date = new Date
  lateCompare: Date
  currentDate: Date
  listDate = [];
  counts = {};
  dateRange = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<SumDialogComponent>
 ) { }

  departmentID: string = this.data['departmentID'];
  dateList: dateList[] = [];
  dList: dateList;


  ngOnInit(){
    //populates an array full of schedules
    Object.values(this.listEmployees).forEach(emp => {
      if (emp['departmentID'] == this.departmentID){
        Object.values(this.listSchedules).forEach(sch => {
          if (emp['employeeID'] == sch['employeeID']){
            this.listDate.push(new Date(sch['date']))
            }
          })
        }
      }
    )
    //counts the number of schedules made for each date and sorts them from earliest to latest
  this.bblSort(this.listDate)
  const counts = {};
  for (const num of this.listDate) {
    counts[num] = counts[num] ? counts[num] + 1 : 1;
  }
  Object.keys(counts).forEach(val => {
    const convert = new Date(val)
    this.dList = {
      date: convert.toLocaleDateString(),
      count: counts[val]
    }
    this.dateList.push(this.dList)
  })
}

//returns selected dates outside of dialog for the table
selected(){
  if(this.dateRange.length != 2){
    alert('please select two dates')
  } else (
    this.dialogRef.close({data: this.dateRange})
  )
}

//saves selected date into array
onSelection(event: MatSelectionListChange){
  const date = event.options.filter(o => o.selected).map(o => o.value)
  this.dateRange.push(date)
}

//bubble sort algorithm
bblSort(arr){
  for(var i = 0; i < arr.length; i++){
    for(var j = 0; j < ( arr.length - i -1 ); j++){
      if(arr[j] > arr[j+1]){
        var temp = arr[j]
        arr[j] = arr[j + 1]
        arr[j+1] = temp
      }
    }
  }
 }

}

