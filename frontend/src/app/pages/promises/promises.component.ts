import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promises',
  templateUrl: './promises.component.html',
  styles: []
})
export class PromisesComponent implements OnInit {

  constructor() { 
    this.counter().then((data: any) => console.log(data), (e: any) => console.log(e) );
    this.counter().then((data: any) => console.log(data)).catch((e: any) => console.log(e));
  }

  ngOnInit(): void {
  }

  private counter(): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      let count = 0;
      let interval = setInterval(() => {
        count++;
        console.log(count);
        if (count === 3) {
          resolve('Ok');
          clearInterval(interval);
        }
      }, 1000);
    });
  }

}
