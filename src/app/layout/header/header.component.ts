import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AuthenticationService } from '@app/authentication/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() public sidenavToggle = new EventEmitter();
 
  constructor(private authenticationService: AuthenticationService) { }
 
  ngOnInit() {
  }
 
  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  }

  onLogout(){
    this.authenticationService.logout();
    return false;
  }

}
