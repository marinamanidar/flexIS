import { SelectionModel } from '@angular/cdk/collections';
import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { SumDialogComponent } from '../sum-dialog/sum-dialog.component';
import {MatTable} from '@angular/material/table';
import { employeesService } from '../shared-services/employee.service';
import { requestService } from '../shared-services/request.service';
import { Employee } from '../shared-model/employee.model';
import { FWARequest } from '../shared-model/request.model';
import { Department } from '../shared-model/department.model';
import { departmentsService } from '../shared-services/department.services';
import { Subscription } from 'rxjs';


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

  employees: Employee[] = [];

  requests: FWARequest[] = [];

  departments: Department[] = [];

  request: FWARequest;

  employee: Employee;

  department: Department;

  sumTable: summary[] = [];

  dialogRef: any;

  first: string
  second: string

  @ViewChild(MatTable) table: MatTable<summary>;

  private depSub : Subscription | undefined;

  constructor(
    private route: ActivatedRoute,
    public dialog: MatDialog,
    public empService: employeesService,
    public reqService: requestService,
    public depService: departmentsService
    ) {}

  ngOnInit() {
    //Retrieve departmentID from previous page
    this.sub = this.route.params.subscribe(params => {
      this.depID = params['id']
    })
    this.depService.getDepartments();
      this.depService.getDepartmentUpdateListener()
      .subscribe((department: Department[]) => {
        this.departments = department
        this.depName = this.departments.find(x => x.departmentID == this.depID).departmentName;
      })
  }

  openDialog(): void {
    //opens dialog to view number of schedules for each date
    this.sumTable = [];
    this.table.renderRows()
    this.dialogRef = this.dialog.open(SumDialogComponent, {
      data: {departmentID: this.depID},
    });

    //retrieves earliest date and latest date after closing the dialog to populate the table
    this.dialogRef.afterClosed().subscribe(result => {
      const first = result.data[0]
      const second = result.data[1]
      const first2 = result.data[0]
      const second2 = result.data[1]
      if (new Date(second['0']) <= new Date(first['0'])){
        this.first = second2['0']
        this.second = first2['0']
      } else if (new Date(first['0'])<= new Date(second['0'])) {
        this.second = second2['0']
        this.first = first2['0']
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
                this.table.renderRows()
              }
            }
          })
        }

      }
    );
  },

  //clicking outside of the dialog cancels the date selection
      this.dialogRef.backdropClick().subscribe(() => {
        this.dataSource = []
        this.table.renderRows()
      })
  )}


  columnsToDisplay: string[] = ['date', 'ID', 'Name', 'Location', 'Hours'];
  dataSource = this.sumTable;
}
