import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { modalMDCentered } from 'src/app/_config';
import { Articles } from 'src/app/_models';

import { DeleteComponent } from './modal/delete/delete.component';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) pagination: MatPaginator;
  dataToBindSource = new MatTableDataSource<Articles>([]);
  articles: Articles[] = [];
  displayedColumns: string[] = ['i', 'title', 'date', 'content', 'image', 'actions'];
  pageIndex = 0;
  pageSize = 10;
  modalRef: BsModalRef;
  constructor(private router: Router, private modalService: BsModalService, private toastrService: ToastrService) {}

  ngOnInit() {
    this.articlesInit();
    this.dataInit();
  }
  articlesInit(): void {
    if (localStorage.getItem('articles')) this.articles = JSON.parse(localStorage.getItem('articles'));
  }
  dataInit(): void {
    this.dataToBindSource.data = this.articles;
    setTimeout(() => {
      this.dataToBindSource.sort = this.sort;
      this.dataToBindSource.paginator = this.pagination;
    }, 50);
  }
  goToAdd(): void {
    this.router.navigate(['home/articles/management']);
  }
  edit(article: Articles): void {
    this.router.navigate([`home/articles/management/${article.id}`]);
  }
  delete(article: Articles): void {
    this.modalRef = this.modalService.show(DeleteComponent, modalMDCentered);
    this.modalRef.content.savingEmitter.subscribe(() => {
      const articleIndex: number = this.articles.findIndex(item => item.id === article.id);
      if (articleIndex !== -1) {
        this.articles.splice(articleIndex, 1);
        localStorage.setItem('articles', JSON.stringify(this.articles));
        this.toastrService.success('Article deleted successfully', 'Deleted Successfully');
      }
      this.modalRef.hide();
      this.dataInit();
    });
  }
}
