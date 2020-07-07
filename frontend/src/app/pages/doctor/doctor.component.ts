import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Hospital } from '../../models/hospital.model';
import { HospitalService } from '../../services/hospital/hospital.service';
import { Doctor } from '../../models/doctor.model';
import { DoctorService } from '../../services/doctor/doctor.service';

import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styles: []
})
export class DoctorComponent implements OnInit {

  public hospitals: Hospital[] = [];
  public doctor: Doctor = new Doctor('', '', '', '', '');
  public hospital: Hospital = new Hospital('');

  constructor(
    private hospitalService: HospitalService, 
    private doctorService: DoctorService, 
    private router: Router, 
    private activatedRoute: ActivatedRoute, 
    private modalService: ModalUploadService) { 

  }

  ngOnInit(): void {
    this.hospitalService.getAll().subscribe( ( resp: any) => this.hospitals = resp.hospitals );
    this.activatedRoute.params.subscribe(params => {
      let id = params.id;
      if (id !== 'new')
        this.load(id);
    });
    this.modalService.advise.subscribe( resp => this.doctor = resp.doctor );
  }

  public load(id: string) {
    this.doctorService.getById(id).subscribe( doctor => { 
      this.doctor = doctor;
      this.hospital = doctor.hospital;
      this.doctor.hospital = doctor.hospital._id;
      // this.hospitalService.getById(id).subscribe(hospital => this.hospital = hospital);
    });
  }

  public save(form: NgForm) {
    if (form.valid) {
      if (this.doctor._id) {
        this.doctorService.update(this.doctor).subscribe(updatedDoctor => {
          Swal.fire(
            'Updated!',
            `Hospital ${ updatedDoctor.name } has been updated`,
            'success'
          );
          this.doctor = updatedDoctor;
        });
      } else {
        this.doctorService.create(this.doctor).subscribe(newDoctor => {
          Swal.fire(
            'Created!',
            `Hospital ${ newDoctor.name } has been created`,
            'success'
          );
          this.doctor = newDoctor;
          this.router.navigate(['/doctor', newDoctor._id]);
        });
      }

    }
  }

  public change(event) {
    if (event.target.value) {
      this.hospitalService.getById(event.target.value).subscribe(hospital => this.hospital = hospital);
    }
  }

  public showModal() {
    this.modalService.showModal('doctor', this.doctor._id);
  }
  
}
