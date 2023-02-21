
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FwaAnalyticsComponent } from './fwa-analytics/fwa-analytics.component';
import { RegisterEmployeeComponent } from './register-employee/register-employee.component';
import { ReviewSchedulesComponent } from './review-schedules/review-schedules.component';
import { SubmitRequestComponent } from './submit-request/submit-request.component';
import { UpdateScheduleComponent } from './update-schedule/update-schedule.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'review',
    component: ReviewSchedulesComponent,
  },
  {
    path: 'submit',
    component: SubmitRequestComponent,
  },
  {
    path: 'fwa',
    component: FwaAnalyticsComponent,
  },
  {
    path: 'register',
    component: RegisterEmployeeComponent,
  },
  {
    path: 'update',
    component: UpdateScheduleComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
