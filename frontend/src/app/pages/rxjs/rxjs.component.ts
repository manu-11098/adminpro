import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { retry, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  private subscription: Subscription;

  constructor() {
    

      this.subscription = this.counter().pipe(
        retry(2)
      )
      .subscribe( 
        data => console.log(data),
        error => console.log('Error: ' + error),
        () => console.log('El observable termino')
      );
  
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    console.log('Pagina cerrada');
    this.subscription.unsubscribe();
  }


  public counter(): Observable<any> {
    return new Observable<any>(observer => {
      let count = 0;
      let interval = setInterval(() => {
        const salida = { valor: count++ };
        observer.next(salida);
        /*
        if (count === 3) {
          observer.complete();
          clearInterval(interval);
        }
        */
      }, 1000);
    })
    .pipe(
      map( data => data.valor ),
      filter( ( data, index ) =>  data % 2 === 0 ? false : true )
    );
  }

}
