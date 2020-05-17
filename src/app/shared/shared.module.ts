import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { TranslationPipe } from './pipe/translation.pipe';
import { SecurityUtilityService } from './services/security-utility.service';
import { CommonUtilityService } from './services/common-utility.service';


@NgModule({
 
  imports: [
    CommonModule,
    TranslateModule
  ],
  declarations: [TranslationPipe],
  providers:[SecurityUtilityService,CommonUtilityService],
  exports: [TranslationPipe]

})
export class SharedModule { }
