import { Injectable } from '@angular/core';
import { SecurityUtilityService } from './security-utility.service';
import { User } from '../../models';
import { environment } from '@env';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CommonUtilityService {
  timeoutData:BehaviorSubject<number>= new BehaviorSubject<number>(0);
  startIdleWatch:BehaviorSubject<boolean>= new BehaviorSubject<boolean>(false);

  constructor(private securityUtilityService:SecurityUtilityService) { }
  private userSessionKey:string="user-session";
  
  setUserSession(user:User){
    if(environment.enablePersistentSessionOnRefresh){
      let value = this.securityUtilityService.set(this.userSessionKey,JSON.stringify(user));
      sessionStorage.setItem(this.userSessionKey,value)
    }
  }

  get getUserSession():User{
    let value =  sessionStorage.getItem(this.userSessionKey);
    return !!value?
    JSON.parse(this.securityUtilityService.get(this.userSessionKey,value)):null;
   }
    
}
