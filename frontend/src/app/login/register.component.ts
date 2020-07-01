import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '../services/service.index';
import { User } from '../models/user.model';

import Swal from 'sweetalert2';


declare function init();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../../assets/css/pages/login-register-lock.css']
})
export class RegisterComponent implements OnInit {

  public form: FormGroup;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    init();

    this.form = new FormGroup({
        name: new FormControl( null, Validators.required ),
        email: new FormControl( null, [ Validators.required, Validators.email ]),
        password: new FormControl( null, Validators.required ),
        password2: new FormControl( null, Validators.required ),
        terms: new FormControl( false ),
      }, 
      ( group: FormGroup ) => group.controls.password.value === group.controls.password2.value ? null : { iguales: true }
    );

    this.form.setValue( {
      name: 'Test',
      email: 'test@test.es',
      password: '123',
      password2: '1234',
      terms: true
    });
  }


  public register() {
    if (this.form.valid) {
      if (!this.form.value.terms) {
        Swal.fire({
          title: 'Importante',
          text: 'Debe aceptar las condiciones',
          icon: 'error'
        });
      } else {
        let user = new User(this.form.value.name, this.form.value.email, this.form.value.password);
        this.userService.save(user).subscribe( ( newUser: any ) => { 
          Swal.fire({
            title: 'Usuario creado correctamente',
            text: newUser.email,
            icon: 'success'
          });  
          this.router.navigate( ['/login'] );
        } );
      }
        

    }
  }
}
