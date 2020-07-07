import { Component, OnInit } from '@angular/core';
import { Doctor } from '../../models/doctor.model';
import { DoctorService } from '../../services/doctor/doctor.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styles: []
})
export class DoctorsComponent implements OnInit {

  public loading: boolean = false;
  public doctors: Doctor[] = [];

  public get count(): number {
    return this.doctorService.total;
  }

  constructor(private doctorService: DoctorService) { }

  ngOnInit(): void {
    this.load();
  }

  public load() {
    this.loading = true;
    this.doctorService.getAll().subscribe( ( resp ) => { 
      this.doctors = resp.doctors;
      this.loading = false;
    } );
  }

  public search(value: string) {
    if (value.length > 0) {
      this.loading = true;
      this.doctorService.find(value).subscribe( ( doctors: Doctor[] ) => {
        this.doctors = doctors;
        this.loading = false;
      } );   
    } else {
      this.load();
    }
  }


  
  public delete(id: string) { 
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
        this.doctorService.delete(id).subscribe( (deletedDoctor: Doctor) => {
          Swal.fire(
            'Deleted!',
            `Hospital ${ deletedDoctor.name } has been deleted`,
            'success'
          );
          this.load();
        }, 
          (error) => console.log(error)
        );
      }
    });

  }


}
