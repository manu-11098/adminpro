import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsService, SharedService, SidebarService } from './service.index';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [ ],
  imports: [ CommonModule, HttpClientModule ], 
  // providers: [ SettingsService, SharedService, SidebarService ]
})
export class ServiceModule { }
