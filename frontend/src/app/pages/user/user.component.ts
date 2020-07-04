import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user/user.service';

import Swal from 'sweetalert2';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styles: []
})
export class UserComponent implements OnInit {

  public users: User[] = [];
  public from: number = 0;
  public total: number = 0;
  public loading: boolean = false;

  constructor(public userService: UserService, public modalService: ModalUploadService) { }

  ngOnInit(): void {
    this.load();
    this.modalService.advise.subscribe( data => this.load() );
  }

  public load() {
    this.loading = true;
    this.userService.getAll(this.from).subscribe( ( response: any ) => {
      this.total = response.count;
      this.users = response.users;
      this.loading = false;
    });
  }

  
  public changeFrom(value: number) { 
    let from: number = this.from + value;
    
    if (from >= 0 && from < this.total) {
        this.from = from;
        this.load();
    }
  }

  public search(value: string) {
    if (value.length > 0) {
      this.loading = true;
      this.userService.getBy(value).subscribe( ( users: User[] ) => {
        this.users = users;
        this.loading = false;
      } );
      
    }
  }

  public delete(id: string) {
    if (id === this.userService.user._id) {
      Swal.fire({
        title: 'Operación denegada',
        text: 'El usuario no se puede borrar a si mismo',
        icon: 'error'
      });
    } else {
      Swal.fire({
        title: 'Are you sure?',
        text: 'You won\'t be able to revert this!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
          this.userService.delete(id).subscribe( (deletedUser: User) => {
            console.log(deletedUser);
            Swal.fire(
              'Deleted!',
              `User ${ deletedUser.email } has been deleted`,
              'success'
            );
            this.load();
          }, (error) => console.log(error)
          );
        }
      });
    }
  }

  public save(user: User) {
    this.userService.update(user).subscribe( ( updatedUser: any ) => {
      Swal.fire(
        'Updated!',
        `User ${ updatedUser.email } has been deleted`,
        'success'
      );
    });
  }

  public showModal(id: string) {
    this.modalService.showModal('user', id);
  }

}
