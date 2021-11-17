import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-simple-text-edit',
  templateUrl: './simple-text-edit.component.html',
  styleUrls: ['./simple-text-edit.component.css']
})
export class SimpleTextEditComponent implements OnInit {
  @Input() itemText: any;
  @Input() inputType: string;
  @Output() inputSaved = new EventEmitter<any>();
  @Output() itemDeleted = new EventEmitter<any>();
  editMode = false;

  constructor() { }

  ngOnInit() {
  }

  onEdit() {
    this.editMode = true;
  }

  onSave() {
    this.editMode = false;
    this.inputSaved.emit(this.itemText);
  }

  onDelete() {
    this.itemDeleted.emit();
  }

  onChange(e) {
    this.itemText = e;
  }


}
