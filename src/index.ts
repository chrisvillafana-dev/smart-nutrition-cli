import { NutritionService } from "./services/NutritionService.js"

const app = new NutritionService()

console.log("🚀 Smart Nutrition App iniciado")

app.addMeal({
  name: "Desayuno",
  calories: 450,
  time: "desayuno",
})

app.addMeal({
  name: "Comida",
  calories: 700,
  time: "comida",
})

console.log("📊 Calorías totales:", app.getTotalCalories())
console.log("📋 Comidas registradas:", app.listMeals())

