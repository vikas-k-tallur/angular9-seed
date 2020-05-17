import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { environment } from '@env';
@Injectable({
  providedIn: 'root'
})
export class SecurityUtilityService {

  constructor() { }
  private keyConstruct: string = environment.secretKey;
  //The set method is use for encrypt the value.
  set(key: string, value: any) {
    var encrypted = value;
    if (environment.enableEncryption) {
      var compoundKey = this.keyConstruct + key//appending base keyConstruct+key to make it more complex
      var iv = this.keyConstruct + key//appending base keyConstruct+key to make it more complex
      encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(value.toString()), compoundKey,
        {
          keySize: 128 / 8,
          iv: iv,
          mode: CryptoJS.mode.CBC,
          padding: CryptoJS.pad.Pkcs7
        });
    }
    return encrypted.toString();
  }

  //The get method is use for decrypt the value.
  get(key: string, value: any) {
    var decryptedString = value;
    if (environment.enableEncryption) {
      var compoundKey = this.keyConstruct + key//appending base keyConstruct+key to make it more complex
      var iv = this.keyConstruct + key//appending base keyConstruct+key to make it more complex
      var decrypted = CryptoJS.AES.decrypt(value, compoundKey, {
        keySize: 128 / 8,
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      });

      decryptedString= decrypted.toString(CryptoJS.enc.Utf8);
    }
    return decryptedString;
  }
}
