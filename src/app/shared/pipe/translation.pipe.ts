import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core'

@Pipe({
  name: 'translation',
  pure: false
})
export class TranslationPipe implements PipeTransform {
  constructor(private translateService: TranslateService) { }
  transform(value: string): string {
    if (!value) {
      return null;
    } else {
      return this.translateService.instant(value);
    }

  }
}
