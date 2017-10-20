import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { SuccessModalComponent } from './success-modal.component';

declare var $: any;

@Component({
  templateUrl: './create-customer.component.html'
})

export class CreateCustomerComponent {
  @ViewChild('successModal') successModal:SuccessModalComponent;

  constructor(private router: Router) { }

  createCustomer(form: NgForm): void {
    this.successModal.show('บันทึกสำเร็จ')
      .then(() => {
        this.router.navigate(["user/dashboard"]);
      })
  }
}
