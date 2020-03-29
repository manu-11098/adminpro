import { Component, OnInit, Inject, ElementRef } from '@angular/core';
import { SettingsService } from '../../services/service.index';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {

  constructor(public srv: SettingsService) { }

  ngOnInit(): void {
    const selectors: any = document.getElementsByClassName('selector');
    for (let ref of selectors)
      if (ref.getAttribute('data-theme') === this.srv.settings.theme)
        ref.classList.add('working');

  }
  
  changeColor(theme: string, link: ElementRef) {
    this.setTheme(theme);
    this.setElement(link);
  }

  private setTheme(theme: string): void {
    this.srv.set(theme);
    this.srv.save();
  }

  private setElement(link: any): void {
    const selectors: any = document.getElementsByClassName('selector');
    for (let ref of selectors)
      ref.classList.remove('working');
    link.classList.add('working');
  }
}
