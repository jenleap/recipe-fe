import { Ingredient } from "./ingredient.model";

export class Recipe {
    name: string;
    description: string;
    image: string;
    servings: number;
    ingredients: Ingredient[];
    steps: string[];

    constructor() {
        this.name = '';
        this.description = '';
        this.image = '';
        this.servings = 1;
        this.ingredients = [];
        this.steps = [];
    }
}