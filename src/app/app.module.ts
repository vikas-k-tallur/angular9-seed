import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgIdleKeepaliveModule} from '@ng-idle/keepalive'
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {TranslateLoader,TranslateModule} from '@ngx-translate/core'
import { TranslateHttpLoader} from '@ngx-translate/http-loader'
import {HttpClient,HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'

import { CoreModule} from '@app/core.module'
import { SharedModule } from '@shared/shared.module';
import { MaterialModule } from './app-material.module';

import { RequestInterceptor } from '@app/interceptor/request.interceptor';
import { ResponseInterceptor } from '@app/interceptor/response.interceptor';


import { LoginComponent, HomeComponent, NoPageFoundComponent } from './modules';
import { MasterLayoutComponent,HeaderComponent,ModalComponent, LoaderComponent } from './layout'


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
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    NoPageFoundComponent,
    MasterLayoutComponent,
    HeaderComponent,
    ModalComponent,
    LoaderComponent
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS,useClass:RequestInterceptor,multi:true},
    {provide:HTTP_INTERCEPTORS,useClass:ResponseInterceptor,multi:true}
  ],
  bootstrap: [AppComponent],
  entryComponents:[ModalComponent]
})
export class AppModule { }
