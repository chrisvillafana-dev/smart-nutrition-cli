import type { Meal } from "../models/Meal.js";

export class NutritionService {
    private meals: Meal[] = [];

    addMeal(meal: Meal): void {
        this.meals.push(meal)
        console.log(` Comida registrada: ${meal.name}`);
    }

    getTotalCalories(): number {
        return this.meals.reduce((total, meal) => total + meal.calories, 0);
        
    }

    listMeals(): Meal[] {
        return this.meals;
    }   
}
