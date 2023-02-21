import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SideBarComponent } from './side-bar/side-bar.component';
import { RegisterEmployeeComponent } from './register-employee/register-employee.component';
import { FwaAnalyticsComponent } from './fwa-analytics/fwa-analytics.component';
import { ReviewSchedulesComponent } from './review-schedules/review-schedules.component';
import { SubmitRequestComponent } from './submit-request/submit-request.component';
import { UpdateScheduleComponent } from './update-schedule/update-schedule.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    SideBarComponent,
    RegisterEmployeeComponent,
    FwaAnalyticsComponent,
    ReviewSchedulesComponent,
    SubmitRequestComponent,
    UpdateScheduleComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
