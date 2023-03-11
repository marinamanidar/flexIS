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

  // closeDialog(){
  //   this.dialogRef.close({data: 'cock'})
  // }

  // save(){
  //   this.dialogRef.close({data: this.dateRange})
  // }

  ngOnInit(){
    Object.values(this.listEmployees).forEach(emp => {
      if (emp['departmentID'] == this.departmentID){
        //6
        Object.values(this.listSchedules).forEach(sch => {
          if (emp['employeeID'] == sch['employeeID']){

            this.listDate.push(new Date(sch['date']))
            // if (this.early > new Date(sch['date'])){
            //   this.early = new Date(sch['date'])
            // }
            // if (this.late < new Date(sch['date'])){
            //   this.late = new Date(sch['date'])
            // }
          }
        })
      }
    },
  )



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

selected(){
  this.dialogRef.close({data: this.dateRange})
}


onSelection(event: MatSelectionListChange){
  const date = event.options.filter(o => o.selected).map(o => o.value)
  this.dateRange.push(date)
  // console.log(this.dateRange)
}


bblSort(arr){

  for(var i = 0; i < arr.length; i++){

    // Last i elements are already in place
    for(var j = 0; j < ( arr.length - i -1 ); j++){

      // Checking if the item at present iteration
      // is greater than the next iteration
      if(arr[j] > arr[j+1]){

        // If the condition is true then swap them
        var temp = arr[j]
        arr[j] = arr[j + 1]
        arr[j+1] = temp
      }
    }
  }
 }

}

