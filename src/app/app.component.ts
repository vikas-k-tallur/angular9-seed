import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '@env';
import { Idle, DocumentInterruptSource, StorageInterruptSource } from '@ng-idle/core'
import { AuthenticationService } from '@app/authentication/authentication.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular9-seed';
  constructor(
    public translate: TranslateService,
    private idle: Idle,
    private authenticationService: AuthenticationService) {
    translate.addLangs(environment.supportedLanguages);
    translate.use(environment.defaultLanguage)
    translate.setDefaultLang(environment.defaultLanguage);
    if(environment.enableAutoLogout){
      const idleConfiguration =environment.idleConfiguration;//fetch it from api for dynamic updates
      this.idle.setIdle(idleConfiguration.idleTime);
      this.idle.setTimeout(idleConfiguration.timeout);
      const idleInterrupts = [new DocumentInterruptSource('click DOMMouseScroll touchmove scroll'),
                             new StorageInterruptSource()]
      this.idle.setInterrupts(idleInterrupts);
      this.idle.onIdleEnd.subscribe(()=>{
        console.log("reset timer")
      });
      this.idle.onIdleStart.subscribe(()=>{
        console.log("started idle timer")
      });
      this.idle.onTimeoutWarning.subscribe(()=>{
        console.log("show modal idle timer")
      });
      this.idle.onTimeout.subscribe(()=>{
        console.log("timeout")
        this.authenticationService.logout();
      })
      this.idle.watch();
    }
  }
  

  
}
