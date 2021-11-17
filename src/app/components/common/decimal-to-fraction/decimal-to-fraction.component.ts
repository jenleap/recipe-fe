import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-decimal-to-fraction',
  templateUrl: './decimal-to-fraction.component.html',
  styleUrls: ['./decimal-to-fraction.component.css']
})
export class DecimalToFractionComponent implements OnInit {
  @Input() numberIn: number;
  @Output() numberChanged = new EventEmitter<any>();
  wholeNumber: number;
  decimalNumber: number;
  fractionArray = [
    { value: 0, label: "" },
    { value: 0.25, label: "1/4" },
    { value: 0.333, label: "1/3" },
    { value: 0.5, label: "1/2" },
    { value: 0.666, label: "2/3" },
    { value: 0.75, label: "3/4" }
  ]

  constructor() { }

  ngOnInit() {
    this.wholeNumber = Math.floor(this.numberIn);
    this.decimalNumber = this.numberIn - this.wholeNumber;
  }

  onChanged() {
    this.numberChanged.emit(this.wholeNumber + this.decimalNumber);
  }

}
