import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-food-edit',
  templateUrl: './food-edit.component.html',
  styleUrls: ['./food-edit.component.css']
})
export class FoodEditComponent implements OnInit {
  @Input() food: any;
  @Output() foodChanged = new EventEmitter<any>();
  @Output() foodDeleted = new EventEmitter<any>();
  editMode = false;
  newAmount;
  newName;

  constructor() { }

  ngOnInit() {
  }

  onEdit() {
    this.editMode = true;
  }

  onSave() {
    this.editMode = false;
    this.foodChanged.emit(this.food);
  }

  onDelete() {
    this.foodDeleted.emit();
  }

  updateAmount(e) {
    const ratio = e / this.food.weight.amount;
    this.food.nutrients.forEach(n => {
      n.value = n.value * ratio;
    });
    this.food.weight.amount = e;
  }

  updateName(e) {
    this.food.name = e;
  }

  updateMeasure(e) {
    this.food.weight.measure = e;
  }

}
