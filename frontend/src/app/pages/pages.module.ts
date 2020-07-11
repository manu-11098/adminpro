import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts';

// Modules
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

// Routes
import { PagesRoutingModule } from './pages-routing.module';

// Components
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graphics1Component } from './graphics1/graphics1.component';
import { IncreaserComponent } from '../components/increaser/increaser.component';
import { GraphicDoughnutComponent } from '../components/graphic-doughnut/graphic-doughnut.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ImagePipe } from '../pipes/image.pipe';
import { PipesModule } from '../pipes/pipes.module';
import { ProfileComponent } from './profile/profile.component';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user/user.component';
import { ModalUploadComponent } from '../components/modal-upload/modal-upload.component';
import { HospitalComponent } from './hospital/hospital.component';
import { DoctorComponent } from './doctor/doctor.component';
import { DoctorsComponent } from './doctor/doctors.component';
import { SearchComponent } from './search/search.component';


@NgModule({
    declarations: [
        PagesComponent,
        DashboardComponent,
        ProgressComponent,
        Graphics1Component,
        IncreaserComponent,
        GraphicDoughnutComponent,
        AccountSettingsComponent,
        PromisesComponent,
        RxjsComponent,
        ProfileComponent,
        UserComponent,
        ModalUploadComponent,
        HospitalComponent,
        DoctorComponent,
        DoctorsComponent,
        SearchComponent,
    ],
    exports: [
        PagesComponent,
        DashboardComponent,
        ProgressComponent,
        Graphics1Component
    ],
    imports: [
        CommonModule,
        SharedModule,
        ChartsModule,
        FormsModule,
        PagesRoutingModule,
        PipesModule
    ]
})
export class PagesModule { }
