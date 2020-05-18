import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonUtilityService } from '@shared/services/common-utility.service';
import { AuthenticationService } from '@app/authentication/authentication.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

 
  constructor(
    private dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public modalData: any,
    private commonUtilityService: CommonUtilityService,
    private authenticationService: AuthenticationService) {
    
  }

  ngOnInit() {
    let modalData = this.modalData;
    switch (modalData.name) {
      case "logout":
        this.commonUtilityService.timeoutData.subscribe((countdownTime: number) => {
          if(countdownTime>0){
            const minutes = Math.floor(countdownTime/60);
            const seconds =countdownTime -(minutes*60);
            let logoutMessage=modalData.baseDescription;
            if(!!minutes && minutes>0){
              logoutMessage = logoutMessage+ minutes+" minutes "
            }
            if(!!seconds && seconds>0){
              logoutMessage = logoutMessage+ seconds+" seconds. "
            }
            this.modalData.description=logoutMessage;
          }
        })
        break;
      default:
        break;
    }
  }

  actionFunction() {
    this.modalAction(this.modalData);
    this.closeModal();
  }

  closeModal() {

    this.dialogRef.close();
  }

  modalAction(modalData: any) {
    switch (modalData.name) {
      case "logout":
        this.authenticationService.logout();
        break;
      default:
        break;
    }
  }

}
