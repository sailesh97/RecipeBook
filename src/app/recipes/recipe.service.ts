import { EventEmitter } from "@angular/core";
import { Recipe } from "./recipe.model";

export class RecipeService{
    recipeSelected = new EventEmitter<Recipe>();
    private recipes: Recipe[] = [
        new Recipe('A Test Recipe', 'This is simply a test', 'https://cdn.pixabay.com/photo/2015/04/29/19/33/cookbook-746005__340.jpg'),
        new Recipe('Another Test Recipe', 'This is simply a test', 'https://cdn.pixabay.com/photo/2015/04/29/19/33/cookbook-746005__340.jpg')
    ];

    getRecipes(){
        return this.recipes.slice();
    }
}