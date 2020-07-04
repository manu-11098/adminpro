import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalUploadService {

  public type: string = '';
  public id: string = '';
  public hide: boolean = true;

  public advise = new EventEmitter<any>();

  constructor() { }

  public showModal(type: string, id: string) {
    this.id = id;
    this.type = type;
    this.hide = false;
  }

  public hideModal() {
    this.id = '';
    this.type = '';
    this.hide = true; 
  }
}
