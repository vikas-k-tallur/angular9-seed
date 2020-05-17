import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '@shared/shared.module';

@NgModule({
 
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    SharedModule
  ], declarations: [LoginComponent]
})
export class LoginModule { }
