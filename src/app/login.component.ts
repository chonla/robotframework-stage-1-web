import { Component, ViewChild, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { DelayLoadingModalComponent } from './delay-loading-modal.component';
import { Subscription } from 'rxjs/Subscription';

declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  @ViewChild('delayLoadingModal') delayLoadingModal: DelayLoadingModalComponent;
  login: string = '';
  password: string = '';
  delay: number = 0;
  successRate: number = 100;
  sub: Subscription;

  ngOnInit() {
    this.sub = this.route
      .data
      .subscribe(v => { 
        this.delay = v['delay']
        this.successRate = v['successRate']
      });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  constructor(private route: ActivatedRoute, private router: Router) { }

  signin(form: NgForm): void {
    var credential = ['demouser', 'demopassword'];

    if (this.route.data && this.route.data['delay']) {
      this.delay = this.route.data['delay'];
    }

    this.delayLoadingModal.show(this.delay).then(() => {
      if (form.value.login !== credential[0] || form.value.pass !== credential[1]) {
        this.show_error('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
        return;
      }

      var hit:number = Math.random() * 100;
      if (hit > this.successRate) {
        this.show_error('ไม่สามารถติดต่อ API ได้');
        return false;
      }
  

      this.router.navigate(["user/dashboard"]);
    })
  }

  show_error(msg: string): void {
    $('#modalBody').html(msg);
    $('#modal').modal();
  }
}