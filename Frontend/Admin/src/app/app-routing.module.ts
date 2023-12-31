import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './core/guards/auth.guard';
import { LayoutComponent } from './layouts/layout.component';
import { CyptolandingComponent } from './cyptolanding/cyptolanding.component';
import { Page404Component } from './extrapages/page404/page404.component';
import { Page500Component } from './extrapages/page500/page500.component';

const routes: Routes = [
  { path: 'auth', loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule) },
  { path: 'account',canActivate: [AuthGuard], loadChildren: () => import('./account/account.module').then(m => m.AccountModule) },
  { path: 'users',canActivate: [AuthGuard],component: LayoutComponent, loadChildren: () => import('./modules/users/users.module').then(m => m.UsersModule) },
  { path: 'chating',canActivate: [AuthGuard],component: LayoutComponent, loadChildren: () => import('./modules/chat/chat.module').then(m => m.ChatModule) },

  // tslint:disable-next-line: max-line-length
  // { path: '', component: LayoutComponent, loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule), canActivate: [AuthGuard] },
  // { path: 'pages', loadChildren: () => import('./extrapages/extrapages.module').then(m => m.ExtrapagesModule), canActivate: [AuthGuard] },
  
  
  { path: '',canActivate: [AuthGuard], component: LayoutComponent, loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)},
  { path: 'pages',canActivate: [AuthGuard], loadChildren: () => import('./extrapages/extrapages.module').then(m => m.ExtrapagesModule)},

  { path: 'crypto-ico-landing',canActivate: [AuthGuard], component: CyptolandingComponent },
  { path: 'Page500', component: Page500Component },
  { path: '**', component: Page404Component },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top', relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})

export class AppRoutingModule { }
