import { logWarnings } from 'protractor/built/driverProviders';
import { Component, ViewChild, Input, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { DelayLoadingModalComponent } from './delay-loading-modal.component';
import { Subscription } from 'rxjs/Subscription';
import { ErrorModalComponent } from './error-modal.component';
import { UserService } from './user.service';
import { Credential } from './credential.interface';

@Component({
  selector: 'app-root',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit, OnDestroy {
  @ViewChild('delayLoadingModal') delayLoadingModal: DelayLoadingModalComponent;
  @ViewChild('errorModal') errorModal: ErrorModalComponent;

  successRate = 100;
  sub: Subscription;
  private delay;
  loginForm: FormGroup;

  ngOnInit() {
    this.sub = this.route
      .data
      .subscribe(v => {
        this.delay = v['delay'];
        this.successRate = v['successRate'];
      });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  constructor(private route: ActivatedRoute, private router: Router, private user: UserService, private fb: FormBuilder) {
    this.loginForm = fb.group({
      login: '',
      pass: ''
    });
  }

  signin({ value, valid }: { value: Credential, valid: boolean }): void {
    if (this.route.data && this.route.data['delay']) {
      this.delay = this.route.data['delay'];
    }

    this.delayLoadingModal.show(this.delay).then(() => {
      this.user.auth(value.login, value.pass).then(s => {
        if (s) {
          const hit = Math.random() * 100;
          if (hit > this.successRate) {
            this.errorModal.show('ไม่สามารถติดต่อ API ได้');
            return false;
          }
          this.router.navigate(['user/dashboard']);
        } else {
          this.errorModal.show('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
        }
      });
    });
  }
}
