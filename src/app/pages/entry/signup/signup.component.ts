import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { emailExpression } from 'src/app/_config';
import { Users } from 'src/app/_models';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  users: Users[] = [];
  mainForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private router: Router, private toastrService: ToastrService) {}

  ngOnInit() {
    this.usersInit();
    this.formInit();
  }
  usersInit(): void {
    if (localStorage.getItem('users')) this.users = JSON.parse(localStorage.getItem('users'));
  }
  formInit(): void {
    this.mainForm = this.formBuilder.group({
      firstName: [null, [Validators.required, Validators.maxLength(50)]],
      lastName: [null, [Validators.required, Validators.maxLength(50)]],
      username: [null, [Validators.required, Validators.pattern(emailExpression)]],
      passwordMatch: this.formBuilder.group(
        {
          password: [null, [Validators.required, Validators.minLength(3)]],
          confirmPassword: [null, Validators.required]
        },
        { validator: this.passwordMatching }
      )
    });
  }
  passwordMatching(group: FormGroup): { notMatch: boolean } {
    const password: AbstractControl = group.controls.password;
    const confirmPassword: AbstractControl = group.controls.confirmPassword;
    return password.valid && confirmPassword.valid && password.value !== confirmPassword.value
      ? { notMatch: true }
      : null;
  }
  mf(key: string): AbstractControl {
    return this.mainForm.controls[key];
  }
  mfg(groupName: string): AbstractControl {
    return this.mainForm.controls[groupName];
  }
  mfgc(groupName: string, key: string): AbstractControl {
    return this.mainForm.controls[groupName]['controls'][key];
  }

  signup(): void {
    if (this.mainForm.valid) {
      if (
        this.users.findIndex(item => item.username.toLowerCase() === this.mf('username').value.toLowerCase()) !== -1
      ) {
        this.toastrService.error('Username already exist');
        return;
      }
      this.users.push({
        id: this.users.length,
        firstName: this.mf('firstName').value,
        lastName: this.mf('lastName').value,
        username: this.mf('username').value,
        password: this.mfgc('passwordMatch', 'password').value
      });
      localStorage.setItem('users', JSON.stringify(this.users));
      this.toastrService.success('User saved successfully', 'Saved Successfully');
      this.router.navigate(['']);
    } else this.toastrService.error('Please fix all errors first!');
  }
}
