import * as fs from "fs";
import * as path from "path";
import { fileURLToPath} from "url";
import type { Meal } from "../models/Meal.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class NutritionService {
    private meals: Meal[] = [];
    private filePath = path.join(__dirname, "../../data/meals.json");

    constructor () {

        if (fs.existsSync(this.filePath)) {
            const data = fs.readFileSync(this.filePath, "utf-8");
            this.meals = JSON.parse(data);
            console.log(`📂 ${this.meals.length} comidas cargadas desde meals.json`);

        }
        
    }

private loadMeals(): void {
    if (fs.existsSync(this.filePath)) {
        const data = fs.readFileSync(this.filePath, "utf-8");
        this.meals = JSON.parse(data);
    }
}
private saveMeals(): void {
    const data = JSON.stringify(this.meals, null, 2);
    fs.writeFileSync(this.filePath, data);
}

    addMeal(meal: Meal): void {
        this.meals.push(meal)

        console.log("Guardando comidas en archivo...");
        this.saveMeals();
        console.log(` Comida registrada: ${meal.name}`);
    }

    getTotalCalories(): number {
        return this.meals.reduce((total, meal) => total + meal.calories, 0);
        
    }

    getMeals(): Meal[] {
        return this.meals;
    }   
deleteMeal(index: number): void {
    if (index < 0 || index >= this.meals.length) {
        console.log(" Índice invalido");
        return;
    }

    const [removedMeal] = this.meals.splice(index, 1);
    if (!removedMeal) {
        console.log(" Error al eliminar la comida");
        return;
    }
    console.log(`\n ${removedMeal.name} eliminada correctamente`);

    this.saveMeals();
}

updateMeal(index: number, updatedMeal: Meal): void {
    if (index < 0 || index >= this.meals.length) {
      console.log("❌ Índice inválido");
      return;
    }
  
    this.meals[index] = updatedMeal;
  
    console.log(`\n✏️ ${updatedMeal.name} actualizada correctamente`);
  
    this.saveMeals();
  }
    
}

