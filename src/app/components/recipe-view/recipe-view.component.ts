import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ServingsConfirmComponent } from '../servings-confirm/servings-confirm.component';
import * as moment from 'moment';
import { dateFormat } from '../../../utils/constants';
import { RecipeService } from 'src/app/services/recipe.service';
import { LogService } from 'src/app/services/log.service';


@Component({
  selector: 'app-recipe-view',
  templateUrl: './recipe-view.component.html',
  styleUrls: ['./recipe-view.component.css']
})
export class RecipeViewComponent implements OnInit {
  id: any;
  recipe: any;
  recipeTotals = {
    calories: 0,
    carbs: 0,
    fat: 0,
    protein: 0
  };

  constructor(private route: ActivatedRoute,
    private recipeService: RecipeService,
    private logService: LogService,
    public dialog: MatDialog,
    private router: Router) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.recipeService.getRecipe(this.id).subscribe(res => {
      this.recipe = res;
      this.updateNutrition();
    })
  }

  updateNutrition() {
        this.getNutrientValues()
          .then(() => {
            Object.keys(this.recipeTotals).forEach((key) => {
              this.recipeTotals[key] = Math.round(this.recipeTotals[key] / this.recipe.servings);
            })
          }) 
  }

  getNutrientValues(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.recipe.ingredients.map(i => {
        i.nutrients.map(n => {
          this.recipeTotals[n.name] += n.value;
        })
      });
      resolve();
    })
  }

  addToLog() {
    const dialogRef = this.dialog.open(ServingsConfirmComponent, {
      width: '300px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const momentDate = moment(result.selectedDate);
        const selectedDate = momentDate.format(dateFormat);
        const newLogItem = {
          date: selectedDate,
          food: {
            name: this.recipe.name,
            weight: {
              amount: result.servings,
              measure: 'servings'
            },
            nutrients: this.getNutrientsForLog(result.servings),
            meal: result.meal
          }
        };
        this.logService.addFood(newLogItem);
        this.router.navigate(['/log'])
      }
    });
  }

  getNutrientsForLog(servings) {
    return Object.keys(this.recipeTotals).map(key => {
      return {
        name: key,
        value: this.recipeTotals[key] * servings
      };
    })
  }

  getImageUrl() {
    return (this.recipe.image.length > 0) ? 'url("' + this.recipe.image + '")' : null;
  }
}
