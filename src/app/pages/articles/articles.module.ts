import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { SharedModule } from 'src/app/shared.module';

import { ArticlesManagementComponent } from './articles-management/articles-management.component';
import { ArticlesComponent } from './articles.component';
import { DeleteComponent } from './modal/delete/delete.component';

const routes: Routes = [
  {
    path: '',
    component: ArticlesComponent
  },
  {
    path: 'management',
    component: ArticlesManagementComponent
  },
  {
    path: 'management/:id',
    component: ArticlesManagementComponent
  },
  { path: '', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  declarations: [ArticlesComponent, ArticlesManagementComponent, DeleteComponent],
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule, AngularEditorModule],
  entryComponents: [DeleteComponent]
})
export class ArticlesModule {}
