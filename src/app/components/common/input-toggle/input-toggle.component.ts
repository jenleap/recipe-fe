import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-input-toggle',
  templateUrl: './input-toggle.component.html',
  styleUrls: ['./input-toggle.component.css']
})
export class InputToggleComponent implements OnInit {
  @Input() itemText: any;
  @Input() editMode: boolean = false;
  @Output() inputChanged = new EventEmitter<any>();
  inputType: any;

  constructor() { }

  ngOnInit() {
    if (typeof this.itemText == 'string') {
      this.inputType = 'text';
    } else if (typeof this.itemText == 'number') {
      this.inputType = 'number';
    }
  }

  onChanged() {
    this.inputChanged.emit(this.itemText);
  }

}
