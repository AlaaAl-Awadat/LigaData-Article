import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: 'src/app/pages/entry/entry.module#EntryModule'
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)]
})
export class BlankModule {}
