export class NutritionService {
    meals = [];
    addMeal(meal) {
        this.meals.push(meal);
        console.log(` Comida registrada: ${meal.name}`);
    }
    getTotalCalories() {
        return this.meals.reduce((total, meal) => total + meal.calories, 0);
    }
    listMeals() {
        return this.meals;
    }
}
//# sourceMappingURL=NutritionService.js.map