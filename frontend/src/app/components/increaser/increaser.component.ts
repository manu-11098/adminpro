import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-increaser',
  templateUrl: './increaser.component.html',
  styles: []
})
export class IncreaserComponent implements OnInit {

  @ViewChild('input') input: ElementRef;
  @Input('title') legend: string = 'Legend';
  @Input('value') percent: number = 50;
  @Output() changeValue: EventEmitter<number> = new EventEmitter();

  constructor() {
    // console.log('Leyenda: ' + this.legend);
    // console.log('Porcentaje: ' + this.percent);
   }

  ngOnInit(): void {
    // console.log('Leyenda: ' + this.legend);
    // console.log('Porcentaje: ' + this.percent);
  }

  increment(value: number) {
    if (this.percent < 100 ) {
      this.percent += value;
      this.changeValue.emit(this.percent);
    }
    this.input.nativeElement.focus();
  }

  decrement(value: number) {
    if (this.percent > 0) {
      this.percent -= value;
      this.changeValue.emit(this.percent);
    }
    this.input.nativeElement.focus();
  }

  onChange(newValue: number) {
    // const element: any = document.getElementsByName('percent')[0];
    
    // tslint:disable-next-line:curly
    if (newValue > 100 )
      this.percent = 100;
    else if (newValue < 0) 
      this.percent = 0;
    else 
      this.percent = newValue;
    
    this.input.nativeElement.value = this.percent;
  
    this.changeValue.emit(this.percent);
  }

}
