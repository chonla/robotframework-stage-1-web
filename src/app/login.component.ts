import { Component, ViewChild, Input, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { DelayLoadingModalComponent } from './delay-loading-modal.component';
import { Subscription } from 'rxjs/Subscription';
import { ErrorModalComponent } from './error-modal.component';

@Component({
  selector: 'app-root',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit, OnDestroy {
  @ViewChild('delayLoadingModal') delayLoadingModal: DelayLoadingModalComponent;
  @ViewChild('errorModal') errorModal: ErrorModalComponent;
  login = '';
  pass = '';
  successRate = 100;
  sub: Subscription;
  private delay;

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

  constructor(private route: ActivatedRoute, private router: Router) { }

  signin(form: NgForm): void {
    const credential = ['demouser', 'demopassword'];

    if (this.route.data && this.route.data['delay']) {
      this.delay = this.route.data['delay'];
    }

    this.delayLoadingModal.show(this.delay).then(() => {
      if (form.value.login !== credential[0] || form.value.pass !== credential[1]) {
        this.errorModal.show('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
        return;
      }

      const hit = Math.random() * 100;
      if (hit > this.successRate) {
        this.errorModal.show('ไม่สามารถติดต่อ API ได้');
        return false;
      }

      this.router.navigate(['user/dashboard']);
    });
  }
}
