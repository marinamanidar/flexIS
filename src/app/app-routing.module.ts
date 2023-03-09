
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FwaAnalyticsComponent } from './fwa-analytics/fwa-analytics.component';
import { RegisterEmployeeComponent } from './register-employee/register-employee.component';
import { ReviewSchedulesComponent } from './review-schedules/review-schedules.component';
import { SubmitRequestComponent } from './submit-request/submit-request.component';
import { UpdateScheduleComponent } from './update-schedule/update-schedule.component';
import { SideBarComponent } from "./side-bar/side-bar.component";
import { LoginComponent } from './login/login.component';
import { PasswordComponent } from './password/password.component';
import { ViewEmployeesComponent } from './view-employees/view-employees.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ViewScheduleComponent } from './view-schedule/view-schedule.component';
import { ReviewRequestComponent } from './review-request/review-request.component';
import { ViewRequestComponent } from './view-request/view-request.component';
import { ViewEmpSchComponent } from './view-emp-sch/view-emp-sch.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'reset',
    component: PasswordComponent
  },
  {
    path: 'sidebar', component: SideBarComponent,
    children: [
      {path: 'review', component: ReviewSchedulesComponent},
      {path: 'submit', component: SubmitRequestComponent},
      {path: 'fwa', component: FwaAnalyticsComponent},
      {path: 'register', component: RegisterEmployeeComponent},
      {path: 'update', component: UpdateScheduleComponent},
      {path: 'view-emp', component: ViewEmployeesComponent},
      {path: 'home', component: HomePageComponent},
	    {path: 'view-sch', component: ViewScheduleComponent},
	    {path: 'request/:id',component: ReviewRequestComponent},
      {path: 'view-request', component: ViewRequestComponent},
      {path: 'update/:id',component: UpdateScheduleComponent},
      {path: 'view-emp-sch/:id',component: ViewEmpSchComponent}
    ]
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
