import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UserService } from '../services/user/user.service';

import Swal from 'sweetalert2';

declare function init();
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../../assets/css/pages/login-register-lock.css']
 // styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public email: string = '';
  public rememberme: boolean = false;
  public auth2: any;

  constructor(public userService: UserService, public router: Router) { }

  ngOnInit(): void {
    init();
    this.googleInit();


    this.email = this.userService.getEmail() || '';
    this.rememberme = this.email.length > 0;
  }

  login(form: NgForm) {
    if (form.valid) {
      this.userService.login(form.value.email, form.value.password).subscribe( 
        user => {
          if (form.value.rememberme)
            this.userService.saveEmail(form.value.email);
          else 
            this.userService.deleteEmail();
          this.router.navigate(['/dashboard']);
        }, (error: any) => {
          Swal.fire(
            'Error en el login',
            `${error.error.message}`,
            'error');
        }
      );
    }

    // this.router.navigate(['/dashboard']);
  }

  private googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '768636056307-6f6p2hp230lk07f418a2n1a3i8n31in4.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });
      this.attachSignin(document.getElementById('btn-google'));
    });    
  }

  public attachSignin(element) {
    console.log(this.auth2);
    this.auth2.attachClickHandler(element, {}, ( googleUser ) => {
      // let profile = googleUser.getBasicProfile();
      let token = googleUser.getAuthResponse().id_token;
      this.userService.loginByGoogle(token).subscribe( data  => 
        // window.location.href = '#/dashboard' 
        this.router.navigate(['/dashboard']) 
      );
    }, ( error ) =>   {
      alert(JSON.stringify(error, undefined, 2));
    });
  }
}
