import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../../models';
import { Router } from '@angular/router';
import { environment } from '@env';
import { CommonUtilityService } from '@shared/services/common-utility.service';
import { HttpClient } from '@angular/common/http';

const loginRoute:string="login"

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  user: User;
  isUserLoggedIn: boolean = false;
  constructor(private router: Router,
    private commonUtilityService: CommonUtilityService,
    private http: HttpClient) { }
  get getAuthToken(): string {
    return this.user ? this.user.token : null;
  }

  setIsUserLoggedIn(isUserLoggedIn:boolean){
    this.isUserLoggedIn = isUserLoggedIn;
  }
  isAuthenticated(): boolean {
    if (!this.isUserLoggedIn && environment.enablePersistentSessionOnRefresh) {
      this.user = this.commonUtilityService.getUserSession
      this.isUserLoggedIn = !!this.user ? !!this.user.token : false;
    }
    return this.isUserLoggedIn;
  }
  login(username: string, password: string): Observable<any> {
    
    let loginFormData = {
      username: username,
      password: password
    };
    return this.http.post(environment.apiUrl+loginRoute,JSON.stringify(loginFormData))
    
    
  }
  navigateToLogin() {
    this.router.navigateByUrl('/login');
  }
  logout(): void {
    sessionStorage.clear();
    this.isUserLoggedIn = false;
    this.router.navigateByUrl('/login');
  }
}
