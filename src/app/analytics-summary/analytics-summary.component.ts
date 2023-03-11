import { SelectionModel } from '@angular/cdk/collections';
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { SumDialogComponent } from '../sum-dialog/sum-dialog.component';

export class summary{
  date: string
  count: number
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

  sub: any;
  depID: string;
  depName: string;

  dateRange: any[];

  sumTable: summary[] = [];

  constructor(
    private route: ActivatedRoute,
    public dialog: MatDialog
    ) {}

  columnsToDisplay: string[] = ['date', 'ID', 'Name', 'Location', 'Hours'];
  dataSource = this.sumTable;
  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.depID = params['id']
      this.depName = this.listDepartments.find(x => x.departmentID == this.depID);
    })
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(SumDialogComponent, {
      data: {departmentID: this.depID},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.dateRange = result;
      console.log(result)
    });
  }


}
