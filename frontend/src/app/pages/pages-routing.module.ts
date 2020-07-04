import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graphics1Component } from './graphics1/graphics1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { LoginGuard } from '../services/guards/login.guard';
import { ProfileComponent } from './profile/profile.component';
import { UserComponent } from './user/user.component';

const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        canActivate: [ LoginGuard ],
        children: [
          { path: 'dashboard', component: DashboardComponent, data: { title: 'Dashboard' } },
          { path: 'progress', component: ProgressComponent, data: { title: 'Progress' } },
          { path: 'graphics1', component: Graphics1Component, data: { title: 'Graphics' } },
          { path: 'accountsettings', component: AccountSettingsComponent, data: { title: 'Ajustes del tema' } }, 
          { path: 'profile', component: ProfileComponent, data: { title: 'Profile' } },
          { path: 'user', component: UserComponent, data: { title: 'Mantenimiento de usuarios' } },
          { path: 'promises', component: PromisesComponent, data: { title: 'Promesas' } },
          { path: 'rxjs', component: RxjsComponent, data: { title: 'Observables' } },
          { path: '', redirectTo: '/dashboard', pathMatch: 'full'},
        ]
    }
];


@NgModule({
    imports: [ RouterModule.forChild(pagesRoutes) ],
    exports: [ RouterModule ]
})
export class PagesRoutingModule {}


