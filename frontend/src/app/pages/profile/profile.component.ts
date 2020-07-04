import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user/user.service';

import Swal from 'sweetalert2';
import { UploadFileService } from '../../services/upload-file/upload-file.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  public user: User;
  public img: File = null;
  public tempImg: string;


  constructor(private userService: UserService, private fileService: UploadFileService) { }

  ngOnInit(): void {
    this.user = this.userService.user;
  }

  public save(user: User) {
    this.user.name = user.name;
    this.user.email = user.email;

    this.userService.update(this.user).subscribe( ( updatedUser: any) => {
      Swal.fire({
        title: 'Usuario actualizado',
        text: `El usuario ${ updatedUser.email } ha sido actualizado`,
        icon: 'success'
      });
    });
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

  public change() {
    this.fileService.upload(this.img, 'user', this.user._id)
      .then( ( data: any ) => { 
        this.user.img = data.user.img;
        Swal.fire({
          title: 'Imagen actualizada',
          text: 'La imagen del usuario ha sido actualizada',
          icon: 'success'
        });
        localStorage.setItem('user', JSON.stringify(this.user));
        
      })
      .catch(error => console.log(error));
    
  }

}
