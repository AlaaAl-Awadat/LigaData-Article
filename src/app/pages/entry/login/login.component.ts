import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { emailExpression } from 'src/app/_config';
import { Users, UsersAccount } from 'src/app/_models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  users: Users[] = [];
  lastUser: UsersAccount = null;
  mainForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private router: Router, private toastrService: ToastrService) {
    this.formInit();
  }

  ngOnInit() {
    this.usersInit();
    this.rememberMyInit();
  }
  usersInit(): void {
    if (localStorage.getItem('currentUser')) this.router.navigate(['home/articles']);
    if (localStorage.getItem('users')) this.users = JSON.parse(localStorage.getItem('users'));
  }
  rememberMyInit(): void {
    if (localStorage.getItem('lastUser')) {
      this.lastUser = JSON.parse(localStorage.getItem('lastUser'));
      this.mf('username').setValue(this.lastUser.username);
      this.mf('password').setValue(this.lastUser.password);
      this.mf('rememberMe').setValue(true);
    }
  }
  formInit(): void {
    this.mainForm = this.formBuilder.group({
      username: [null, [Validators.required, Validators.pattern(emailExpression)]],
      password: [null, [Validators.required, Validators.minLength(3)]],
      rememberMe: false
    });
  }
  mf(key: string): AbstractControl {
    return this.mainForm.controls[key];
  }
  login(): void {
    if (this.mainForm.valid) {
      const user: Users = this.users.find(
        item => item.username.toLowerCase() === this.mf('username').value.toLowerCase()
      );
      if (!user) {
        this.toastrService.error('Username not exist!', 'Invalid Username');
        return;
      }
      if (user.password !== this.mf('password').value) {
        this.toastrService.error('Incorrect Username or Password', 'Unauthorized User');
        return;
      }
      if (this.mf('rememberMe').value)
        localStorage.setItem(
          'lastUser',
          JSON.stringify({
            username: this.mf('username').value,
            password: this.mf('password').value
          } as UsersAccount)
        );
      else localStorage.removeItem('lastUser');
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.router.navigate(['home/articles']);
    } else this.toastrService.error('Please fix all errors first!');
  }
  goTo(): void {
    this.router.navigate(['signup']);
  }
}
