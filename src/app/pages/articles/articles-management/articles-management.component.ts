import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Articles } from 'src/app/_models';

@Component({
  selector: 'app-articles-management',
  templateUrl: './articles-management.component.html',
  styleUrls: ['./articles-management.component.scss']
})
export class ArticlesManagementComponent implements OnInit {
  @ViewChild('uploaderInput', { read: ElementRef, static: true }) uploader: ElementRef;
  articles: Articles[] = [];
  article: Articles = null;
  mainForm: FormGroup;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService
  ) {
    this.formInit();
  }

  ngOnInit() {
    this.articlesInit();
    this.editInit();
  }
  articlesInit(): void {
    if (localStorage.getItem('articles')) this.articles = JSON.parse(localStorage.getItem('articles'));
  }
  editInit(): void {
    const articleId: number = this.activatedRoute.snapshot.paramMap.get('id')
      ? parseInt(this.activatedRoute.snapshot.paramMap.get('id'), 10)
      : null;
    if (articleId !== null) {
      this.article = (JSON.parse(localStorage.getItem('articles')) as Articles[]).find(item => item.id === articleId);
      if (!this.article) {
        this.toastrService.error('Article Not Found', 'Invalid Url');
        this.router.navigate(['home/articles']);
        return;
      }
      this.mf('title').setValue(this.article.title);
      this.mf('content').setValue(this.article.content);
      this.mf('date').setValue(this.article.date);
      this.mf('image').setValue(this.article.image);
    }
    // this.activatedRoute.queryParams.subscribe(params => {
    //   if (!params) return;
    //   if (params.id) {
    //   }
    // });
  }
  formInit(): void {
    this.mainForm = this.formBuilder.group({
      title: [null, [Validators.required, Validators.maxLength(50)]],
      content: [null, Validators.required],
      date: [null, Validators.required],
      file: null,
      image: null
    });
  }
  mf(key: string): AbstractControl {
    return this.mainForm.controls[key];
  }
  fileChange(fileList: FileList): void {
    if (fileList.length > 0 && fileList[0].size <= 4194304) {
      const reader = new FileReader();
      reader.readAsDataURL(fileList[0]);
      reader.onload = (event: ProgressEvent) => {
        this.mf('image').setValue(event.target['result']);
      };
    } else if (fileList.length > 0) {
      this.mf('file').setValue(null);
      this.toastrService.error('Max allowed Image size 4MB', 'Size Limitations');
    }
  }
  removeImage(): void {
    this.mf('file').setValue(null);
    this.mf('image').setValue(null);
  }
  saving(): void {
    if (this.mainForm.valid) {
      if (this.article) {
        const articleIndex: number = this.articles.findIndex(item => item.id === this.article.id);
        if (articleIndex !== -1) {
          this.articles.splice(articleIndex, 1, {
            id: this.articles.length,
            title: this.mf('title').value,
            date: this.mf('date').value,
            content: this.mf('content').value,
            image: this.mf('image').value
          });
          localStorage.setItem('articles', JSON.stringify(this.articles));
          this.toastrService.success('Article updated successfully', 'Updating');
        }
      } else {
        this.articles.splice(0, 0, {
          id: this.articles.length,
          title: this.mf('title').value,
          date: this.mf('date').value,
          content: this.mf('content').value,
          image: this.mf('image').value
        });
        localStorage.setItem('articles', JSON.stringify(this.articles));
        this.toastrService.success('Article saved successfully', 'Saving');
      }
      this.router.navigate(['home/articles']);
    } else this.toastrService.error('Please fix all errors first!');
  }
  cancel(): void {
    this.router.navigate(['home/articles']);
  }
  upload(): void {
    (this.uploader.nativeElement as HTMLElement).click();
  }
}
