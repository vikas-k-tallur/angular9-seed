import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgIdleKeepaliveModule} from '@ng-idle/keepalive'
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {TranslateLoader,TranslateModule} from '@ngx-translate/core'
import { TranslateHttpLoader} from '@ngx-translate/http-loader'
import {HttpClient,HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'

import { CoreModule} from '@app/core.module'
import { LoginModule } from '@modules/login/login.module';
import { SharedModule } from '@shared/shared.module';
import { MaterialModule } from './app-material.module';
import { ReactiveFormsModule } from '@angular/forms';

import { HomeComponent } from './modules/home/home.component';
import { RequestInterceptor } from '@app/interceptor/request.interceptor';
import { ResponseInterceptor } from '@app/interceptor/response.interceptor';
import { NoPageFoundComponent } from './modules/no-page-found/no-page-found.component';
import { MasterLayoutComponent } from './layout/master-layout/master-layout.component';
import { HeaderComponent } from './layout/header/header.component';
// AOT compilation support
export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http,'../assets/i18n/','.json');
}
@NgModule({
  
  imports: [
    BrowserModule,    
    ReactiveFormsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      }
    }),
    FlexLayoutModule,
    MaterialModule,
    NgIdleKeepaliveModule.forRoot(),
    CoreModule,
    SharedModule,
    LoginModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    NoPageFoundComponent,
    MasterLayoutComponent,
    HeaderComponent
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS,useClass:RequestInterceptor,multi:true},
    {provide:HTTP_INTERCEPTORS,useClass:ResponseInterceptor,multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
