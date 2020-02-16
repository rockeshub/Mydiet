import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart} from '@angular/router';

import { OktaAuthService } from '@okta/okta-angular';
import * as OktaSignIn from '@okta/okta-signin-widget';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  signIn;
  isAuthenticated: boolean;
  widget = new OktaSignIn({
    baseUrl: 'https://dev-797783.okta.com',
    logo: './../assets/logo.png',
    brandName: 'Synopsys',
    authParams: {
      pkce: true
    }
  });

  constructor(public oktaAuth: OktaAuthService, public router: Router) {
    this.signIn = oktaAuth;

    // Show the widget when prompted, otherwise remove it from the DOM.
    router.events.forEach(event => {
      if (event instanceof NavigationStart) {
        switch(event.url) {
          case '/login':
            break;
          case '/protected':
            break;
          default:
            this.widget.remove();
            break;
        }
      }
    });
  }

  async ngOnInit() {
    // Get the authentication state for immediate use
    this.isAuthenticated = await this.oktaAuth.isAuthenticated();
    console.log('AUTH', this.isAuthenticated);
    if (!this.isAuthenticated) {
      this.widget.renderEl({
            el: '#okta-signin-container'},
          (res) => {
            if (res.status === 'SUCCESS') {
              this.signIn.loginRedirect('/', { sessionToken: res.session.token });
              // Hide the widget
              this.widget.hide();
            }
          },
          (err) => {
            throw err;
          }
      );
    } else {

      this.router.navigateByUrl('/');
    }
  }

}
