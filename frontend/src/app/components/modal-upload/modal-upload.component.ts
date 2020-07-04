import { Component, OnInit } from '@angular/core';

import Swal from 'sweetalert2';
import { UploadFileService } from '../../services/upload-file/upload-file.service';
import { ModalUploadService } from './modal-upload.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {

  public hide: boolean = false;

  public img: File = null;
  public tempImg: string = '';

  constructor(private uploadService: UploadFileService, public modalService: ModalUploadService) { 
  }

  ngOnInit(): void {
  }

  public select(file: File) {
    console.log(file);
    if (file) {
      if (file.type.indexOf('image') >= 0) {
        let reader = new FileReader();
        let urlTempImg = reader.readAsDataURL(file);
        reader.onloadend = () => this.tempImg = reader.result.toString();
        this.img = file;
      } else {
        Swal.fire({
          title: 'Solo imagenes',
          text: 'El archivo seleccionado debe ser una imagen',
          icon: 'error'
        });        
      }
    }
  }

  public upload() {
    this.uploadService.upload(this.img, this.modalService.type, this.modalService.id )
    .then( ( data: any ) => { 
      this.modalService.advise.emit(data);
      this.close();
    })
    .catch(error => console.log(error));
  }

  public close() {
    this.img = null;
    this.tempImg = '';
    this.modalService.hideModal();
  }
}
