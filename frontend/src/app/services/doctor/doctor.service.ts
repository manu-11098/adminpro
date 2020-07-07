import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { UserService } from '../user/user.service';
import { Doctor } from '../../models/doctor.model';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  public total: number;

  constructor(private http: HttpClient, private userService: UserService) { }

  public getAll() {
    const url = `${ environment.URL }/doctor`;
    return this.http.get(url).pipe( 
      map( (data: any) => { 
        this.total = data.count;
        return data; 
      })
    );
  }

  
  public getById(id: string) {
    const url = `${ environment.URL }/doctor/${ id }`;
    return this.http.get(url).pipe( map( (data: any) => data.doctor) );
  }
  
  public find(value: string) {
    const url = `${ environment.URL }/search/collections/doctors/${ value }`;
    return this.http.get(url).pipe( map( ( data: any ) => data.doctors ) );
  }

  public delete(id: string) {
    const url = `${ environment.URL }/doctor/${ id }?token=${ this.userService.token }`;
    return this.http.delete(url).pipe( map( ( data: any ) => data.deletedDoctor ) );
  }

  
  public create(doctor: Doctor) {
    const url = `${ environment.URL }/doctor?token=${ this.userService.token }`;
    return this.http.post(url , doctor).pipe( map( ( data: any ) => data.newDoctor ) );
  }

  public update(doctor: Doctor) {
    const url = `${ environment.URL }/doctor/${ doctor._id }?token=${ this.userService.token }`;
    return this.http.put(url , doctor).pipe( map( ( data: any ) => data.updatedDoctor ) );
  }
}
