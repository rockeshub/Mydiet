import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { OktaAuthService } from '@okta/okta-angular';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
  providers: []
})
export class NavBarComponent implements OnInit {
  skipLinkPath: string;
  constructor(private location: Location, public oktaAuth: OktaAuthService) { }

  ngOnInit() {
    this.skipLinkPath = `${this.location.path()}#mainContent`;
  }
  logout() {
    this.oktaAuth.logout('/login').then(r => {
      console.log(r);
    });
  }
}
