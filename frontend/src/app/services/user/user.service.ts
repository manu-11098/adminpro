import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../models/user.model';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public user: User;
  public token: string;
  public menu: any[] = [];

  private readonly url: string = 'http://localhost:3000';
  constructor(public http: HttpClient, private router: Router) { 
    this.token = localStorage.getItem('token') || '';
    if (localStorage.getItem('user'))
      this.user = JSON.parse(localStorage.getItem('user'));
    if (localStorage.getItem('menu'))
      this.menu = JSON.parse(localStorage.getItem('menu'));
   }

  public save(user: User) {
    return this.http.post(`${ environment.URL }/user`, user).pipe( map( (data: any) => data.newUser ) );
  }

  public updateSessionUser(user: User) {
    let url = `${ environment.URL }/user/${ user._id }?token=${ this.token }`;
    return this.http.put(url, user).pipe( map( (data: any) => {
      this.user = data.user;
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('menu', JSON.stringify(data.menu));
      return data.user;
    }));
  }

  public loginByGoogle(token: string) {
    return this.http.post(`${ environment.URL }/login/google`, { token }).pipe( 
      map( ( data: any ) => {
        console.log(data);
        localStorage.setItem('id', data.user._id);
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('menu', JSON.stringify(data.menu));
        this.user = data.user;
        this.token = data.token;
        this.menu = data.menu;
        return data.user;
      })
    );
  }



  public login(email: string, password: string) {
    return this.http.post(`${ environment.URL }/login`, new User(null, email, password)).pipe( 
      map( ( data: any ) => {
        localStorage.setItem('id', data.user._id);
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('menu', JSON.stringify(data.menu));
        this.user = data.user;
        this.token = data.token;
        this.menu = data.menu;
        return data.user;
      })
    );
  }

  public logout() {
    this.user = null;
    this.token = '';
    this.menu = [];
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    localStorage.removeItem('menu');

  }

  public isLogged(): boolean { return this.token.length > 0; }

  public saveEmail( email: string ) { localStorage.setItem( 'email', email ); }

  public getEmail(): string { return localStorage.getItem('email'); }

  public deleteEmail() { localStorage.removeItem('email'); }


  public getAll(from: number = 0) {
    const url = `${ environment.URL }/user?from=${ from }`;
    return this.http.get(url);
  }

  public getBy(value: string) {
    const url = `${ environment.URL }/search/collections/users/${ value }`;
    return this.http.get(url).pipe( map( ( data: any ) => data.users ) );
  }

  public delete(id: string) {
    const url = `${ environment.URL }/user/${ id }?token=${ this.token }`; 
    return this.http.delete(url).pipe( map( ( data: any ) => data.deletedUser ) );
  }

  public update(user: User) {
    let url = `${ environment.URL }/user/${ user._id }?token=${ this.token }`;
    return this.http.put(url, user).pipe( map( (data: any) => {
      return data.user;
    }));
  }

}
