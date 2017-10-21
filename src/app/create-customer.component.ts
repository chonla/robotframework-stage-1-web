import { Component, ViewChild, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SuccessModalComponent } from './success-modal.component';
import { Subscription } from 'rxjs/Subscription';

@Component({
  templateUrl: './create-customer.component.html'
})

export class CreateCustomerComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('successModal') successModal: SuccessModalComponent;
  delays: number[] = [0, 0];
  sub: Subscription;
  formHidden = true;
  loadingHidden = false;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.sub = this.route
      .data
      .subscribe(v => {
        this.delays = v['delays'];
      });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  ngAfterViewInit() {
    const delay = (Math.random() * (this.delays[1] - this.delays[0])) + this.delays[0];
    setTimeout(() => {
      this.formHidden = false;
      this.loadingHidden = true;
    }, delay);
  }

  createCustomer(form: NgForm): void {
    this.successModal.show('บันทึกสำเร็จ')
      .then(() => {
        this.router.navigate(['user/dashboard']);
      });
  }
}
