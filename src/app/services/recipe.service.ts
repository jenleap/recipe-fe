import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService {
    private recipes: any = [];
    private recipesUpdated = new Subject<any>();

    constructor(private http: HttpClient){}

    getRecipes() {
        this.http.get("http://localhost:5001/api/recipes")
            .subscribe(res => {
                this.recipes = res;
                this.recipesUpdated.next([...this.recipes]);
            });
    }

    recipesUpdatedListener() {
        return this.recipesUpdated.asObservable();
    }

    getRecipe(recipeId) {
        return this.http.get(`http://localhost:5001/api/recipes/${recipeId}`);
    }

    createRecipe(recipe, image) {
        console.log(image);
        const data = new FormData();
        data.append("recipe", JSON.stringify(recipe));
        if (image) {
            data.append("image", image, recipe.name);
        }
        this.http.post("http://localhost:5001/api/recipes", data)
            .subscribe(res => {
                console.log(res);
            })
    }

    updateRecipe(recipe, image) {
        const data = new FormData();
        data.append("recipe", JSON.stringify(recipe));
        if (image) {
            data.append("image", image, recipe.name);
        }
        console.log(recipe);
        this.http.put(`http://localhost:5001/api/recipes/${recipe._id}`, data)
            .subscribe(res => {
               console.log(res);
            });
    }
}