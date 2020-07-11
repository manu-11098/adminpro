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
import { HospitalComponent } from './hospital/hospital.component';
import { DoctorsComponent } from './doctor/doctors.component';
import { DoctorComponent } from './doctor/doctor.component';
import { SearchComponent } from './search/search.component';
import { AdminGuard } from '../services/guards/admin.guard';

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
          { path: 'promises', component: PromisesComponent, data: { title: 'Promesas' } },
          { path: 'rxjs', component: RxjsComponent, data: { title: 'Observables' } },
          { path: 'profile', component: ProfileComponent, data: { title: 'Profile' } },
          { path: 'search/:value', component: SearchComponent, data: { title: 'Buscador' } },
            // Mantenimiento
          { path: 'user', component: UserComponent, data: { title: 'Mantenimiento de usuarios' }, canActivate: [ AdminGuard ] },
          { path: 'hospital', component: HospitalComponent, data: { title: 'Mantenimiento de hospitales' } },
          { path: 'doctor', component: DoctorsComponent, data: { title: 'Mantenimiento de médicos' } },
          { path: 'doctor/:id', component: DoctorComponent, data: { title: 'Actualizar médico' } },
          { path: '', redirectTo: '/dashboard', pathMatch: 'full'},
        ]
    }
];


@NgModule({
    imports: [ RouterModule.forChild(pagesRoutes) ],
    exports: [ RouterModule ]
})
export class PagesRoutingModule {}


