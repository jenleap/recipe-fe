import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Food } from 'src/app/models/food.model';
import { FoodService } from 'src/app/services/food.service';
import { LogService } from 'src/app/services/log.service';

@Component({
  selector: 'app-foods-list',
  templateUrl: './foods-list.component.html',
  styleUrls: ['./foods-list.component.css']
})
export class FoodsListComponent implements OnInit {
  @Input() data: any;
  @Input() index: number;
  @Output() foodAdded = new EventEmitter<any>();
  @Input() foods: Food[] = [];
  amountSelected = 1;

  constructor(public foodService: FoodService, public logService: LogService) { }

  ngOnInit() {
  }

  onAddFood(form: NgForm) {
    if (form.invalid) { return; }

    const selectedWeight = form.value.foodObj.weights.filter(w => w._id == form.value.measure);

    this.createNutrientArray(form.value, selectedWeight[0])
      .then(nutrients => {
        const newFood = {
            name: form.value.foodObj.name,
            weight: {
                amount: this.amountSelected,
                measure: selectedWeight[0].mes_desc,
            },
            nutrients: nutrients
        };

        this.foodAdded.emit(newFood);

        form.resetForm();
      });    
  }

  async createNutrientArray(formData, measureWeight) {
    let nutrients = [];
    if (this.index == 0) {
      const ratio = (measureWeight.gm_weight / 100) * (this.amountSelected / measureWeight.amount);
      for (let i = 0; i < formData.foodObj.nutrients.length; i++) {
        const nutrient = formData.foodObj.nutrients[i];
        switch(nutrient.tag) {
          case "ENERC_KCAL":
            await nutrients.push(this.createNutrient(nutrient, ratio, "calories"));
            break;
          case "PROCNT":
            await nutrients.push(this.createNutrient(nutrient, ratio, "protein"));
            break;
          case "FAT":
            await nutrients.push(this.createNutrient(nutrient, ratio, "fat"));
            break;
          case "CHOCDF":
            await nutrients.push(this.createNutrient(nutrient, ratio, "carbs"));
            break;
          default:
            break;
        }
      }
    } else {
      const ratio = this.amountSelected / measureWeight.amount;
      for (let i = 0; i < formData.foodObj.nutrients.length; i++){
        await nutrients.push({
          name: formData.foodObj.nutrients[i].name,
          value: formData.foodObj.nutrients[i].value * ratio
        });
      }
    }
    return nutrients;
  }
  
  createNutrient(nutrient, ratio, name) {
     return {
       name: name,
       value: Math.round(nutrient.value * ratio)
     };
  }

  amountChanged(e) {
    this.amountSelected = e;
  }

}
