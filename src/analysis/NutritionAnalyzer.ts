import type { Meal } from "../models/Meal.js";

export class NutritionAnalyzer {

    static analyzeDay(meals: Meal[]) {

        const totalMeals = meals.length;

        const totalCalories = meals.reduce((sum, meal) => sum + meal.calories, 0);

        const averageCalories = totalMeals === 0
            ? 0
            : Math.round(totalCalories / totalMeals);

        let highestMeal: Meal | null = null;

        for (const meal of meals) {
            if (!highestMeal || meal.calories > highestMeal.calories) {
                highestMeal = meal;
            }
        }

        return {
            totalMeals,
            totalCalories,
            averageCalories,
            highestMeal
        };
    }

    static printAnalysis(meals: Meal[]) {

        const stats = this.analyzeDay(meals);

        console.log("🔍 Analizando nutrición del día...\n");

        console.log("Total comidas:", stats.totalMeals);
        console.log("Calorías totales:", stats.totalCalories);
        console.log("Promedio por comida:", stats.averageCalories);

        if (stats.highestMeal) {
            console.log(
                "Comida más calórica:",
                `${stats.highestMeal.name} (${stats.highestMeal.calories} kcal)`
            );
        }

        console.log("");

        if (stats.totalCalories < 1200) {
            console.log("🔔 Muy pocas calorías hoy");
        }
        else if (stats.totalCalories > 2500) {
            console.log("🔔 Exceso de calorías");
        }
        else {
            console.log("🔔 Consumo de calorías balanceado");
        }

    }

}