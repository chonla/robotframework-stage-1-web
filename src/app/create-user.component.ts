import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ErrorModalComponent } from './error-modal.component';
import { LoadingModalComponent } from './loading-modal.component';
import { SuccessModalComponent } from './success-modal.component';
import { UserService } from './user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './create-user.component.html',
  providers: [UserService]
})

export class CreateUserComponent {
  @ViewChild('errorModal') errorModal: ErrorModalComponent;
  @ViewChild('loadingModal') loadingModal: LoadingModalComponent;
  @ViewChild('successModal') successModal: SuccessModalComponent;
  name = '';
  login = '';
  pass = '';
  pass2 = '';

  constructor(private user: UserService, private router: Router) {
  }

  create(form: NgForm): void {
    if (form.value.pass !== form.value.pass2) {
      this.errorModal.show('รหัสผ่านไม่ตรงกับรหัสผ่านยืนยัน');
      return;
    }

    this.loadingModal.show().then(() => {
      this.user.create(form.value.name, form.value.login, form.value.pass)
        .then(() => {
          this.loadingModal.hide()
            .then(() => {
              this.successModal.show('บันทึกสำเร็จ').then(() => {
                this.router.navigate(['user/dashboard']);
              });
            });
        });
    });
  }
}
