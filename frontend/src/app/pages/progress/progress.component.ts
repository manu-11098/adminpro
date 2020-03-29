import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styles: []
})
export class ProgressComponent implements OnInit {

  bluePercent: number = 20;
  greenPercent: number = 30;

  constructor() { }

  ngOnInit(): void {
  }

  /*  
   update(event: number) {
     console.log('Event: ' + event);
   }
   */
}
