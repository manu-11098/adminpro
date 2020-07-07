import { Component, OnInit } from '@angular/core';
import { HospitalService } from '../../services/hospital/hospital.service';
import { Hospital } from 'src/app/models/hospital.model';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-hospital',
  templateUrl: './hospital.component.html',
  styles: []
})
export class HospitalComponent implements OnInit {

  public loading: boolean = false;
  public hospitals: Hospital[] = [];
  
  public get count(): number {
    return this.hospitalService.total;
  }

  constructor(private hospitalService: HospitalService, private modalService: ModalUploadService) { }

  ngOnInit(): void {
    this.load();
    this.modalService.advise.subscribe( data => this.load() );
  }

  public load() {
    this.loading = true;
    this.hospitalService.getAll().subscribe( ( resp ) => { 
      this.hospitals = resp.hospitals;
      this.loading = false;
    } );
  }

  public search(value: string) {
    if (value.length > 0) {
      this.loading = true;
      this.hospitalService.find(value).subscribe( ( hospitals: Hospital[] ) => {
        this.hospitals = hospitals;
        this.loading = false;
      } );   
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
        this.hospitalService.delete(id).subscribe( (deletedHospital: Hospital) => {
          Swal.fire(
            'Deleted!',
            `Hospital ${ deletedHospital.name } has been deleted`,
            'success'
          );
          this.load();
        }, 
          (error) => console.log(error)
        );
      }
    });
  }

  public save(hospital: Hospital) {
    this.hospitalService.update(hospital).subscribe( ( updatedHospital: Hospital ) => {
      Swal.fire(
        'Updated!',
        `Hospital ${ updatedHospital.name } has been deleted`,
        'success'
      );
    });
  }

  public showModal(id: string) {
    this.modalService.showModal('hospital', id);
  }

  public async create() {
    const { value: name } = await Swal.fire({
      title: 'Hospital name',
      input: 'text',
      inputPlaceholder: 'Enter hosipital Name'
    });
    
    if (name) {
      this.hospitalService.create(`${name}`).subscribe( newHospital => {
        Swal.fire(
          'Created!',
          `Hospital ${ newHospital.name } has been created`,
          'success'
        );
        this.load();
      });
    }
  }
}
