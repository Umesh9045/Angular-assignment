import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated = false;

  constructor(private router: Router) {}

  login(username: string, password: string): boolean {
    if (username === 'admin' && password === 'admin') {
      this.isAuthenticated = true;
      return true;
    }
    return false;
  }

  logout(){
    this.isAuthenticated = false;
    this.router.navigate(['/login']);
  }

  checkAuthentication(): boolean {
    return this.isAuthenticated;
  }
}
