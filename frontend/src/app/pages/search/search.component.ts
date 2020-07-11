import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Doctor } from '../../models/doctor.model';
import { Hospital } from 'src/app/models/hospital.model';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: []
})
export class SearchComponent implements OnInit {
  
  public doctors: Doctor[] = [];
  public hospitals: Hospital[] = [];
  public users: User[] = [];


  constructor(private activatedRoute: ActivatedRoute, private http: HttpClient) {  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params.value) {
        console.log(params.value);
        this.search(params.value);
      }
    });
  }

  public search(value: string) {
    const url = `${ environment.URL }/search/all/${ value }`;
    this.http.get(url).subscribe( ( data: any ) => {
      console.log(data);
      this.users = data.users;
      this.hospitals = data.hospitals;
      this.doctors = data.doctors;
    });
  }

}
