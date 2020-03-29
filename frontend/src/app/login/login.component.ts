import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare function init();

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../../assets/css/pages/login-register-lock.css']
 // styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit(): void {
    init();
  }

  login() {
    console.log('ingresando ...');
    this.router.navigate(['/dashboard']);
  }
}
