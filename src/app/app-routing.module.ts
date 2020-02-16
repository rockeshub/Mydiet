import { NgModule } from '@angular/core';
import {Routes, RouterModule, Router} from '@angular/router';
import {OktaAuthGuard, OktaCallbackComponent} from '@okta/okta-angular';
import { AppComponent } from './app.component';
import {LoginComponent} from './login/login.component';
import {ProfileComponent} from './profile/profile.component';

export function onAuthRequired({ oktaAuth, router }) {
  // Redirect the user to your custom login page
  router.navigate(['/login']);
}
const routes: Routes = [
  { path: '',   redirectTo: '/master-detail', pathMatch: 'full' },
  {
    path: 'implicit/callback',
    component: OktaCallbackComponent
  },
  {
    path: 'master-detail',
    canActivate: [ OktaAuthGuard ],
    data: {
      'onAuthRequired': onAuthRequired
    },
    loadChildren: () => import('./app-shell/master-detail/master-detail.module').then(mod => mod.MasterDetailModule)
  },
  {
    path: 'profile',
    canActivate: [ OktaAuthGuard ],
    data: {
      'onAuthRequired': onAuthRequired
    },
    component: ProfileComponent
  },
  {
    path: 'list',
    loadChildren: () => import('./app-shell/list/list.module').then(mod => mod.ListModule)
  },
  {
    path: 'grid',
    loadChildren: () => import('./app-shell/grid/grid.module').then(mod => mod.GridModule)
  },
  {
    path: 'blank',
    loadChildren: () => import('./app-shell/blank/blank.module').then(mod => mod.BlankModule)
  },
  {
    path: 'login',
    component: LoginComponent
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }

