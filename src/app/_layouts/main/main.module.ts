import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'articles',
    loadChildren: 'src/app/pages/articles/articles.module#ArticlesModule'
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)]
})
export class MainModule {}
