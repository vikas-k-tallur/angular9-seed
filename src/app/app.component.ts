import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '@env';
import { Idle, DocumentInterruptSource, StorageInterruptSource } from '@ng-idle/core'
import { AuthenticationService } from '@app/authentication/authentication.service';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { ModalComponent } from './layout';
import { CommonUtilityService } from '@shared/services/common-utility.service';
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
    private matDialog: MatDialog,
    private commonUtilityService: CommonUtilityService,
    private authenticationService: AuthenticationService) {

    translate.addLangs(environment.supportedLanguages);
    translate.use(environment.defaultLanguage)
    translate.setDefaultLang(environment.defaultLanguage);

    if (environment.enableAutoLogout) {
      const idleConfiguration = environment.idleConfiguration;//fetch it from api for dynamic updates
      this.idle.setIdle(idleConfiguration.idleTime);
      this.idle.setTimeout(idleConfiguration.timeout);
      const idleInterrupts = [new DocumentInterruptSource('click DOMMouseScroll touchmove scroll'),
      new StorageInterruptSource()]
      this.idle.setInterrupts(idleInterrupts);
      this.idle.onIdleEnd.subscribe(() => {      
      });
      this.idle.onIdleStart.subscribe(() => {        
        this.openLogoutModal();
      });
      this.idle.onTimeoutWarning.subscribe((countdown: any) => {        
          this.commonUtilityService.timeoutData.next(countdown); 
      });
      this.idle.onTimeout.subscribe(() => {
        this.closeLogoutModal();
        this.authenticationService.logout();
      })
      this.startToWatch();
    }
  }

  startToWatch() {
    this.commonUtilityService.startIdleWatch.subscribe((isWatch: boolean)=>{
      if(isWatch) {
        this.idle.watch();
      }
    })
  }

  openLogoutModal() {

    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = true;
    dialogConfig.id = "modal-component";
    dialogConfig.height = "250px";
    dialogConfig.width = "500px";
    dialogConfig.data = {
      name: "logout",
      title: "Are you sure you want to logout?",
      description:"",
      baseDescription: "Your session is about to expire in ",
      actionButtonText: "Logout",
      closeButtonText: "Continue",

    }
    // https://material.angular.io/components/dialog/overview
    const modalDialog = this.matDialog.open(ModalComponent, dialogConfig);
  }

  closeLogoutModal() {
    this.matDialog.closeAll();
  }
}
