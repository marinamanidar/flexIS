import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { SubscribableOrPromise, Subscription } from 'rxjs';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit{
  userIsAuthenticated = false;
  private authListenerSubs: Subscription;
  constructor(private authService: AuthService){}

  user = sessionStorage.getItem('user');

  ngOnInit(){
    this.authListenerSubs = this.authService
    .getAuthStatusListener()
    .subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;

      console.log(this.userIsAuthenticated);
    })
  }
}
