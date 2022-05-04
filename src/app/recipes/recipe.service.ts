import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";
import * as ShoppingListActions from '../shopping-list/store/shopping-list.actions';
import * as fromShoppingList from '../shopping-list/store/shopping-list.reducer';
@Injectable() 
export class RecipeService{
    recipesChanged = new Subject<Recipe[]>();

    // private recipes: Recipe[] = [
    //     new Recipe('Tasty Schintzel',
    //      'A super-tasty Schintzel - just awesome!', 
    //      'https://cdn.pixabay.com/photo/2019/03/25/20/20/schnitzel-4081269_960_720.jpg',
    //      [
    //          new Ingredient("Meat", 1),
    //          new Ingredient("French Fries", 20)
    //      ]
    //     ),
    //     new Recipe(
    //         'Big Fat Burger',  
    //         'What else you need to say!', 
    //         'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlHDr-z8Jf7lr2Mlqn9Vm1A6Ny3pCfy1O1Ag&usqp=CAU', 
    //         [
    //             new Ingredient("Buns", 2),
    //             new Ingredient("Meat", 1)
    //         ]
    //     ),
    //     new Recipe(
    //         'Cheesy Pizza',  
    //         'What else you need to say!', 
    //         'https://cdn.pixabay.com/photo/2017/12/09/08/18/pizza-3007395__480.jpg', 
    //         [
    //             new Ingredient("Pizza Bread", 25),
    //             new Ingredient("Mushrooms", 19)
    //         ]
    //     )
    // ];

    private recipes: Recipe[] = [];
    constructor(private slService: ShoppingListService, private store: Store<fromShoppingList.AppState>){}
    
    setRecipes(recipes: Recipe[]){
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
    }

    getRecipes(){
        return this.recipes.slice();
    }

    getRecipe(index: number){
        return this.recipes[index];  
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]){
        // this.slService.addIngredients(ingredients);   
        this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients))
    }

    addRecipe(recipe: Recipe){
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: Recipe){
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number){
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
    }   
}