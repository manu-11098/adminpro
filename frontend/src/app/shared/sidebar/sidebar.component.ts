import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/service.index';
import { UserService } from '../../services/user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  constructor(public sidebarSrv: SidebarService, private userService: UserService, private router: Router) { }

  ngOnInit(): void { }
  
  public logout() {
    this.userService.logout();
    this.router.navigate(['/login']);
  }
}
