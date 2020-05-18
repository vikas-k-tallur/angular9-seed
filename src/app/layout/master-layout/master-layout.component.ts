import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AuthenticationService } from '@app/authentication/authentication.service';

@Component({
  selector: 'app-master-layout',
  templateUrl: './master-layout.component.html',
  styleUrls: ['./master-layout.component.scss']
})
export class MasterLayoutComponent implements OnInit {
  @Output() sidenavClose = new EventEmitter();
  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
  }
  public onSidenavClose = () => {
    this.sidenavClose.emit();
  }
  onLogout(){
    this.authenticationService.logout();
    return false;
  }
 

}
