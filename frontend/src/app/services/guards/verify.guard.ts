import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../user/user.service';
import { promise } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class VerifyGuard implements CanActivate {

  constructor(private userService: UserService, public router: Router) {

  }

  canActivate(): Promise<boolean> | boolean {
    console.log('token guard');

    let token = this.userService.token;
    let payload = JSON.parse(atob(token.split('.')[1]));
    let expired = this.expired(payload.exp);
    if (expired) {
      return false;
    }

    return this.isNeedRenew(payload.exp);
  }
  
  public expired(date: number) {
    let now = new Date().getDate() / 1000;
    if (date < now)
      return true;
    return false;
  }

  public isNeedRenew(date: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      let expired = new Date(date * 1000);
      let now = new Date();
      now.setTime(now.getTime() + (4 * 60 * 60 * 1000));
      if (expired.getTime() > now.getTime()) {
        resolve(true);
      } else {
        this.userService.renew().subscribe( 
          () => resolve(true),
          () => reject(false)
        );
      }
    });
  }

}
