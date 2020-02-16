import { Component, AfterViewInit, OnInit } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: []
})
export class AppComponent implements AfterViewInit, OnInit {
  title = 'MyDietP';
  isAuthenticated: boolean;

  constructor(public oktaAuth: OktaAuthService) {
    // Subscribe to authentication state changes
    this.oktaAuth.$authenticationState.subscribe(
      (isAuthenticated: boolean)  => {
        console.log('AUTH', isAuthenticated);
        this.isAuthenticated = isAuthenticated;
      },
      (error) => {
        console.log('Error', error);
      },
      () => {
        console.log('Complete');
      }
    );
  }

  async ngOnInit() {
    // Get the authentication state for immediate use
    this.isAuthenticated = await this.oktaAuth.isAuthenticated();
    console.log('AUTH', this.isAuthenticated);
  }

  login() {
    this.oktaAuth.loginRedirect();
    console.log('Login');
  }

  logout() {
    this.oktaAuth.logout('/');
  }

  public ngAfterViewInit(): void {
    //Called after ngOnInit when the component's or directive's content has been initialized.
    //Add 'implements AfterContentInit' to the class.
  }
}

