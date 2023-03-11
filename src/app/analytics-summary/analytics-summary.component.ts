import { SelectionModel } from '@angular/cdk/collections';
import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { SumDialogComponent } from '../sum-dialog/sum-dialog.component';
import {MatTable} from '@angular/material/table';


export class summary{
  date: string
  employeeID: string
  name: string
  location: string
  hours: number
}

@Component({
  selector: 'app-analytics-summary',
  templateUrl: './analytics-summary.component.html',
  styleUrls: ['./analytics-summary.component.css']
})
export class AnalyticsSummaryComponent {

  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  listDepartments = JSON.parse(localStorage.getItem('Departments'));
  listEmployees = JSON.parse(localStorage.getItem('Employees'));
  listSchedules = JSON.parse(localStorage.getItem('Schedules'));

  sub: any;
  depID: string;
  depName: string;

  sum: summary 

  dateRange: any[];

  sumTable: summary[] = [];

  dialogRef: any;

  first: string
  second: string

  @ViewChild(MatTable) table: MatTable<summary>;


  constructor(
    private route: ActivatedRoute,
    public dialog: MatDialog
    ) {}

  
  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.depID = params['id']
      this.depName = this.listDepartments.find(x => x.departmentID == this.depID);
    })
  }

  openDialog(): void {
    this.dialogRef = this.dialog.open(SumDialogComponent, {
      data: {departmentID: this.depID},
    });

    this.dialogRef.afterClosed().subscribe(result => {
      const first = result.data[0]

      const second = result.data[1]

      if (second < first){
        this.first = first['0']
        this.second = second['0'] 
      } else {
        this.second = first['0']
        this.first = second['0']
      }

      Object.values(this.listEmployees).forEach(emp => {
        if (emp['departmentID'] == this.depID){

          Object.values(this.listSchedules).forEach(sch => {
            if (emp['employeeID'] == sch['employeeID']){
              if (new Date(sch['date']) >= new Date(this.first) 
              && (new Date(sch['date']) <= new Date(this.second))){
                this.sum = {
                  date: sch['date'],
                  employeeID: sch['employeeID'],
                  name: emp['name'],
                  location: sch['workLocation'],
                  hours: sch['workHours'],
                }
                this.sumTable.push(this.sum)
                this.dataSource = this.sumTable
                console.log(this.dataSource)
                this.table.renderRows()
              }
            }
          })
        }
      
      }
    );
  }
  )}

  
  columnsToDisplay: string[] = ['date', 'ID', 'Name', 'Location', 'Hours'];
  dataSource = this.sumTable;
}
