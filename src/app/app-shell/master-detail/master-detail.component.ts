import { Component, OnInit } from '@angular/core';

import { MasterDetailService, IMasterDetailText } from './master-detail.service';
import { OktaAuthService } from '@okta/okta-angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-master-detail',
  templateUrl: './master-detail.component.html',
  styleUrls: ['./master-detail.component.css']
})
export class MasterDetailComponent implements OnInit {

  GreyAvatar = require('../../../assets/GreyAvatar.svg') as string;
  WarningMessageText = 'Request to get master detail text failed:';
  WarningMessageOpen = false;
  currentDisplayTabIndex = 0;
  masterDetailText: IMasterDetailText[] = [];

  constructor(private masterDetailService: MasterDetailService, private oktaAuth: OktaAuthService, private http: HttpClient) { }

  async ngOnInit() {

    const accessToken = await this.oktaAuth.getAccessToken();
    console.log('AccesToken', accessToken);
    this.masterDetailService.getMasterDetailItems(accessToken).subscribe(
      result => {
        this.masterDetailText = result;
      },
      error => {
        this.WarningMessageOpen = true;
        this.WarningMessageText = `Request to get master detail text failed: ${error}`;
      }
    );
  }

  handleDisplayTabClick(id: number) {
    this.currentDisplayTabIndex = id;
  }
  handleWarningClose(open: boolean) {
    this.WarningMessageOpen = open;
    this.WarningMessageText = '';
  }
}


