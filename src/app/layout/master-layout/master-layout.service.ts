
import {Routes} from '@angular/router'
import { MasterLayoutComponent } from './master-layout.component'
import { AuthenticationGuard } from '@app/authentication/authentication.guard'
export class MasterRoute {

  static withMaster(routes:Routes):Routes{
    return [{
      path:'',
      component:MasterLayoutComponent,
      children:routes,
      canActivate:[AuthenticationGuard]
    }]
  }
}
