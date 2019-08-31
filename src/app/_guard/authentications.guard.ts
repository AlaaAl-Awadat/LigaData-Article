import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationsGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate(): boolean {
    if (!localStorage.getItem('currentUser')) {
      this.router.navigate(['']);
      return false;
    }
    return true;
  }
}
