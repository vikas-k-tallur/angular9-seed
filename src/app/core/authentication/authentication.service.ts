import { Injectable } from '@angular/core';
import { Observable,of } from 'rxjs';
import { User } from '../../models';
import { Router } from '@angular/router';
import { environment } from '@env';
import { CommonUtilityService } from '@shared/services/common-utility.service';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  user:User;
  isUserLoggedIn:boolean=false;
  constructor(private router: Router,private commonUtilityService:CommonUtilityService) { }
  get getAuthToken():string{
    return this.user?this.user.token:null;
  }
  
  isAuthenticated():boolean{
    if(!this.isUserLoggedIn && environment.enablePersistentSessionOnRefresh){
      this.user=this.commonUtilityService.getUserSession
      this.isUserLoggedIn=!!this.user?!!this.user.token:false;
    }
    return this.isUserLoggedIn;
  }
  login(username:string,password:string):Observable<User>{     
    this.isUserLoggedIn=true;    
    var userResponseForValidUser= {
      id:'user101',
      username: username,
      password: password,
      firstName: "Guest",
      lastName: "User",
      token: "Bearer Token-String"
    }
    if(environment.enablePersistentSessionOnRefresh){
      this.commonUtilityService.setUserSession(userResponseForValidUser)
    }
    return of(userResponseForValidUser);
  }
  navigateToLogin(){
    this.router.navigateByUrl('/login');
  }
  logout():void{
    sessionStorage.clear();
    this.isUserLoggedIn=false;    
    this.router.navigateByUrl('/login');
  }
}
