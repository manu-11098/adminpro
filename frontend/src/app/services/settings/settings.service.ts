import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  settings: Settings = {
    url: 'assets/css/colors/default.css',
    theme: 'default'
  };

  constructor( @Inject(DOCUMENT) private document) { 
    this.load();
  }

 

  load() {
    if (localStorage.getItem('settings'))
      this.settings = JSON.parse(localStorage.getItem('settings'));
    this.set(this.settings.theme);

  }

  save() {
    localStorage.setItem('settings', JSON.stringify(this.settings));
  }

  set(theme: string) {
    this.settings.theme = theme;
    this.settings.url = `assets/css/colors/${theme}.css`;
    const element = this.document.getElementById('tema');
    element.setAttribute('href', this.settings.url);
  }
}

interface Settings {
  url: string;
  theme: string;
}
