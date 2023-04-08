import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {
  userIsAurhenticated = false;
  private authListenerSubs: Subscription;
  constructor(private authService: AuthService){}
  public sidebarShow: boolean = false;
  user = sessionStorage.getItem('user');
  listEmployees = JSON.parse(localStorage.getItem('Employees'));
  listDepartments = JSON.parse(localStorage.getItem('Departments'));
  empName: any;
  empPos: any;
  empDepID: any;
  empDepName: any;

  logout(){
    sessionStorage.clear()
  }

  ngOnInit(){
    this.authListenerSubs = this.authService
    .getAuthStatusListener()
    .subscribe(isAuthenticated => {
      this.userIsAurhenticated = isAuthenticated;
    })
  }
}
