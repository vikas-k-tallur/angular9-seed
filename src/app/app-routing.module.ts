import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '@modules/login/login.component';
import { HomeComponent } from '@modules/home/home.component';
import { TranslateModule } from '@ngx-translate/core';
import { AuthenticationGuard } from '@app/authentication/authentication.guard';
import { NoPageFoundComponent } from '@modules/no-page-found/no-page-found.component';
import { MasterRoute } from './layout/master-layout/master-layout.service';
import { MasterLayoutComponent } from './layout/master-layout/master-layout.component';
//alternate option but need to hide the master layout contents for public pages like login
// const routes: Routes = MasterRoute.withMaster([
//   {path:'',redirectTo:'/login',pathMatch:'full'},
//   {path:'login',component:LoginComponent,pathMatch:'full'},
//   {path:'home',component:HomeComponent,pathMatch:'full'},
//   { path: '**', component: NoPageFoundComponent }
// ]);
const routes: Routes = [
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  { path: '', redirectTo: '/home', pathMatch: 'full' },  
  {
    path: '',
    component: MasterLayoutComponent,
    children: [
      { path: 'home', component: HomeComponent, pathMatch: 'full', canActivate:[AuthenticationGuard] },
    ]
  },
  { path: '**', component: NoPageFoundComponent }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes), TranslateModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
