import { Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable() 
export class RecipeService{
    private recipes: Recipe[] = [
        new Recipe('Tasty Schintzel',
         'A super-tasty Schintzel - just awesome!', 
         'https://cdn.pixabay.com/photo/2019/03/25/20/20/schnitzel-4081269_960_720.jpg',
         [
             new Ingredient("Meat", 1),
             new Ingredient("French Fries", 20)
         ]
        ),
        new Recipe(
            'Big Fat Burger',  
            'What else you need to say!', 
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlHDr-z8Jf7lr2Mlqn9Vm1A6Ny3pCfy1O1Ag&usqp=CAU', 
            [
                new Ingredient("Buns", 2),
                new Ingredient("Meat", 1)
            ]
        )
    ];

    constructor(private slService: ShoppingListService){}
    
    getRecipes(){
        return this.recipes.slice();
    }

    getRecipe(index: number){
        return this.recipes[index];  
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]){
        this.slService.addIngredients(ingredients);   
    }
}