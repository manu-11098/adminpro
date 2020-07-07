import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { UserService } from '../user/user.service';
import { Hospital } from 'src/app/models/hospital.model';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  public total: number;

  constructor(private http: HttpClient, private userService: UserService) { }

  public getAll() {
    const url = `${ environment.URL }/hospital`;
    return this.http.get(url).pipe( 
      map( (data: any) => { 
        this.total = data.count;
        return data; 
      })
    );
  }

  public getById(id: string) {
    const url = `${ environment.URL }/hospital/${ id }`;
    return this.http.get(url).pipe( map( (data: any) => data.hospital) );
  }

  public find(value: string) {
    const url = `${ environment.URL }/search/collections/hospitals/${ value }`;
    return this.http.get(url).pipe( map( ( data: any ) => data.hospitals ) );
  }

  public delete(id: string) {
    const url = `${ environment.URL }/hospital/${ id }?token=${ this.userService.token }`;
    return this.http.delete(url).pipe( map( ( data: any ) => data.deletedHospital ) );
  }

  public create(name: string) {
    const url = `${ environment.URL }/hospital?token=${ this.userService.token }`;
    return this.http.post(url , { name }).pipe( map( ( data: any ) => data.newHospital ) );
  }

  public update(hospital: Hospital) {
    const url = `${ environment.URL }/hospital/${ hospital._id }?token=${ this.userService.token }`;
    return this.http.put(url , hospital).pipe( map( ( data: any ) => data.updatedHospital ) );
  }

}
