import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Modules
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PagesModule } from './pages/pages.module';
import { ServiceModule } from './services/service.module';

// Routes
import { AppRoutingModule } from './app-routing.module';



// Components
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';
import { PagesComponent } from './pages/pages.component';
import { SharedModule } from './shared/shared.module';
import { PipesModule } from './pipes/pipes.module';





@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    PagesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    PipesModule,
    SharedModule, 
    ServiceModule,
    AppRoutingModule,
  ],
  providers: [ ],
  bootstrap: [AppComponent]
})
export class AppModule { }
