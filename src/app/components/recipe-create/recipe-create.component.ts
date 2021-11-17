import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from 'src/app/models/recipe.model';
import { RecipeService } from 'src/app/services/recipe.service';
import { SearchFoodsComponent } from '../search-foods/search-foods.component';

@Component({
  selector: 'app-recipe-create',
  templateUrl: './recipe-create.component.html',
  styleUrls: ['./recipe-create.component.css']
})
export class RecipeCreateComponent implements OnInit {
  @ViewChild('filePicker', {static: false}) filePicker: ElementRef;
  recipe: Recipe;
  step = "";
  recipeTotals = {
    calories: 0,
    carbs: 0,
    fat: 0,
    protein: 0
  };
  editMode = false;
  imagePreview: any;
  image: any;
  validImgTypes = ["jpg", "jpeg", "png"];

  constructor(public dialog: MatDialog,
    private recipeService: RecipeService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.recipe = new Recipe();
    this.route.params.subscribe(params => {
      this.editMode = params['id'] != null;
      if (this.editMode) {
        this.recipeService.getRecipe(params['id'])
          .subscribe((res: any) => {
            this.recipe = res;
            this.imagePreview = res.image;
          });
      }
    })
  }

  addIngredient() {
    const dialogRef = this.dialog.open(SearchFoodsComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      this.recipe.ingredients.push(result);
      this.updateNutrition();
    });
  }

  addStep() {
    this.recipe.steps.push(this.step);
    this.step = "";
  }

  updateNutrition() {
    this.clearNutrientValues()
      .then(() => {
        this.getNutrientValues()
          .then(() => {
            Object.keys(this.recipeTotals).forEach((key) => {
              this.recipeTotals[key] = Math.round(this.recipeTotals[key] / this.recipe.servings);
            })
          }) 
      })
  }

  getNutrientValues(): Promise<void> {
    return new Promise((resolve, reject) => {
      Object.keys(this.recipeTotals).forEach(key => {
        this.recipeTotals[key] += this.recipe.ingredients[key];
      });
      resolve();
    })
  }
  
  clearNutrientValues(): Promise<void> {
    return new Promise((resolve, reject) => {
      Object.keys(this.recipeTotals).forEach(key => {
        this.recipeTotals[key] = 0;
      });
      resolve();
    })
  }

  saveRecipe() {
    if (this.editMode) {
      const image = (this.image) ? this.image : null;
      this.recipeService.updateRecipe(this.recipe, image);
    } else {
      this.recipeService.createRecipe(this.recipe, this.image);
    }
  }

  openPhotoDialog() {
    this.filePicker.nativeElement.click();
  }

  onPhotoSelected(event) {
    const file = event.target.files[0];
    this.image = file;
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    }
    reader.readAsDataURL(file);
  }

  ingredientChanged(e, index) {
    console.log(e);
    this.recipe.ingredients[index] = e;
    this.updateNutrition();
  }

  removeIngredient(index) {
    this.recipe.ingredients.splice(index, 1);
  }

  updateStep(e, index) {
    this.recipe.steps[index] = e;
  }

  removeStep(index) {
    this.recipe.steps.splice(index, 1);
  }
}

