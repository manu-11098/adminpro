import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../models/user.model';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private user: User;
  private token: string;

  private readonly url: string = 'http://localhost:3000';
  constructor(public http: HttpClient, private router: Router) { 
    this.token = localStorage.getItem('token') || '';
    if (localStorage.getItem('user'))
      this.user = JSON.parse(localStorage.getItem('user'));
   }

  public save(user: User) {
    return this.http.post(`${this.url}/user`, user).pipe( map( (data: any) => data.newUser ) );
  }

  public loginByGoogle(token: string) {
    return this.http.post(`${this.url}/login/google`, { token }).pipe( 
      map( ( data: any ) => {
        localStorage.setItem('id', data.user._id);
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        this.user = data.user;
        this.token = data.token;
        return data.user;
      })
    );
  }



  public login(email: string, password: string) {
    return this.http.post(`${this.url}/login`, new User(null, email, password)).pipe( 
      map( ( data: any ) => {
        localStorage.setItem('id', data.user._id);
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        this.user = data.user;
        this.token = data.token;
        return data.user;
      }) 
    );
  }

  public logout() {
    this.user = null;
    this.token = '';
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('id');
  }

  public isLogged(): boolean { return this.token.length > 0; }

  public saveEmail( email: string ) { localStorage.setItem( 'email', email ); }

  public getEmail(): string { return localStorage.getItem('email'); }

  public deleteEmail() { localStorage.removeItem('email'); }

}
