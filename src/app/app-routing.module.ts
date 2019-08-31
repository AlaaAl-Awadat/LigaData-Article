import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthenticationsGuard } from './_guard/authentications.guard';
import { BlankComponent } from './_layouts/blank/blank.component';
import { MainComponent } from './_layouts/main/main.component';

const routes: Routes = [
  {
    path: '',
    component: BlankComponent,
    loadChildren: './_layouts/blank/blank.module#BlankModule'
  },
  {
    path: 'home',
    component: MainComponent,
    canActivate: [AuthenticationsGuard],
    loadChildren: './_layouts/main/main.module#MainModule'
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
