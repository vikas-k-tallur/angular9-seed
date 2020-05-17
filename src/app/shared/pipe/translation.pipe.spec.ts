import { TranslationPipe } from './translation.pipe';
import { TranslateService } from '@ngx-translate/core'
describe('TranslationPipe', () => {
  it('create an instance', () => {
    tranlateService: TranslateService;
    const pipe = new TranslationPipe(this.tranlateService);
    expect(pipe).toBeTruthy();
  });
});
