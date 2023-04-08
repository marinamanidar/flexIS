import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './auth/login/login.component';
import { ReactiveFormsModule } from "@angular/forms";
import { MatCardModule } from "@angular/material/card";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { SideBarComponent } from './side-bar/side-bar.component';
import { RegisterEmployeeComponent } from './register-employee/register-employee.component';
import { FwaAnalyticsComponent } from './fwa-analytics/fwa-analytics.component';
import { ReviewSchedulesComponent } from './review-schedules/review-schedules.component';
import { SubmitRequestComponent } from './submit-request/submit-request.component';
import { UpdateScheduleComponent } from './update-schedule/update-schedule.component';
import { AppRoutingModule } from './app-routing.module';
import {MatSelectModule} from '@angular/material/select';
import { PasswordComponent } from './password/password.component';
import {MatGridListModule} from '@angular/material/grid-list';
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatRadioModule } from "@angular/material/radio";
import {MatStepperModule} from '@angular/material/stepper';
import {MatRippleModule} from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ViewEmployeesComponent } from './view-employees/view-employees.component';
import { ReviewRequestComponent } from './review-request/review-request.component';
import {MatTableModule} from '@angular/material/table';
import { ViewRequestComponent } from './view-request/view-request.component';import { HomePageComponent } from './home-page/home-page.component';
import { ViewScheduleComponent } from './view-schedule/view-schedule.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { AnalyticsSummaryComponent } from './analytics-summary/analytics-summary.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDialogModule} from '@angular/material/dialog';
import { SumDialogComponent } from './sum-dialog/sum-dialog.component';
import {MatListModule} from '@angular/material/list';
import { ViewEmpSchComponent } from './view-emp-sch/view-emp-sch.component';
import { AuthInterceptor } from './auth/auth-interceptor';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SideBarComponent,
    RegisterEmployeeComponent,
    FwaAnalyticsComponent,
    ReviewSchedulesComponent,
    SubmitRequestComponent,
    UpdateScheduleComponent,
    PasswordComponent,
    ViewEmployeesComponent,
	  ReviewRequestComponent,
    ViewRequestComponent,
	  HomePageComponent,
    ViewScheduleComponent,
	 ViewEmpSchComponent,
	AnalyticsSummaryComponent,
    SumDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
	  MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
	  MatGridListModule,
    MatDatepickerModule,
    MatRadioModule,
    MatStepperModule,
    MatRippleModule,
    FormsModule,
    HttpClientModule,
    MatTableModule,
    MatExpansionModule,
    MatCheckboxModule,
    MatDialogModule,
    MatListModule
  ],
  providers: [{provide:HTTP_INTERCEPTORS, useClass : AuthInterceptor, multi:true}],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
