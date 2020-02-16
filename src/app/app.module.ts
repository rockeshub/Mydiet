import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BlankModule } from './app-shell/blank/blank.module';
import { GridModule } from './app-shell/grid/grid.module';
import { ListModule } from './app-shell/list/list.module';
import { MasterDetailModule } from './app-shell/master-detail/master-detail.module';
import { NavBarComponent } from './app-shell/nav-bar/nav-bar.component';
import { FooterComponent } from './app-shell/footer/footer.component';
import {
  OktaAuthModule,
} from '@okta/okta-angular';
import { LoginComponent } from './login/login.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';;
import { ProfileComponent } from './profile/profile.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

const config = {
  issuer: 'https://dev-797783.okta.com/oauth2/default',
  redirectUri: 'http://localhost:3000/implicit/callback',
  clientId: '0oa2baafoyPojsOkc357',
  pkce: true
}

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    FooterComponent
,
    LoginComponent ,
    ProfileComponent ],
  imports: [
    NgbModule,
    FormsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    OktaAuthModule.initAuth(config),
    BlankModule,
    GridModule,
    ListModule,
    MasterDetailModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
