import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  login: string = '';
  password: string = '';

  constructor(private router: Router) { }

  signin(form: NgForm): void {
    var credential = ['demouser', 'demopassword'];

    if (form.value.login !== credential[0] || form.value.pass !== credential[1]) {
      this.show_error('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
      return;
    }

    this.router.navigate(["user/dashboard"]);
  }

  show_error(msg: string): void {
    $('#modalBody').html(msg);
    $('#modal').modal();  
  }
}