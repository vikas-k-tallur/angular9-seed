import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '@app/authentication/authentication.service';
import { first, finalize } from 'rxjs/operators';
import { CommonUtilityService } from '@shared/services/common-utility.service';
import { LoggerService } from '@app/logger/logger.service';
import { User } from 'app/models';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  isSubmitted = false;
  isLoading: boolean = false;
  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private commonUtilityService: CommonUtilityService,
    private logger:LoggerService,
    private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

  }
  get formControls() { return this.loginForm.controls; }

  login() {
    this.isLoading = true;
    this.isSubmitted = true;
    if (this.loginForm.invalid) {
      this.commonUtilityService.sleepWithPromise(500).then(() => {
        this.isLoading = false;
        return;
      })

    } else {
      //induced sleep for displaying loader
      this.commonUtilityService.sleepWithPromise(5000).then(() => {
        this.authenticationService.login(this.formControls.username.value,
          this.formControls.password.value)
          .pipe(first(),
            finalize(() => {
              this.isLoading = false;
              this.isSubmitted = false;
            }))
          .subscribe(
            (user:User) => {
              this.logger.log(user.username+" logged in.");
              this.commonUtilityService.startIdleWatch.next(true);
              this.router.navigateByUrl('/home');
            },
            (error:any) => {
              this.logger.error(error.message,)
            });
      });
    }
  }
}
