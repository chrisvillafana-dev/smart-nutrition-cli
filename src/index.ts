import * as readline from "readline"; 
import { NutritionService } from "./services/NutritionService.js"
import { NutritionAnalyzer } from "./analysis/NutritionAnalyzer.js" 

console.log("🚀 Smart Nutrition App iniciado")

const service = new NutritionService()

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function showMenu() {
  console.log("\n🥗 Smart Nutrition CLI");
  console.log("1️⃣ Agregar comida");
  console.log("2️⃣ Ver comidas registradas");
  console.log("3️⃣ Ver calorías totales");
  console.log("4️⃣ Analizar nutrición del día");
  console.log("5️⃣ Salir");

  rl.question("\nSelecciona una opción: ", handleMenu);
}

function handleMenu(option: string) {

  switch (option) {

    case "1":
      addMealPrompt();
      break;

    case "2":
      console.log("\n📋 Comidas registradas:");
      console.log(service.getMeals());
      showMenu();
      break;

    case "3":
      console.log("\n🔥 Calorías totales:", service.getTotalCalories());
      showMenu();
      break;

    case "4":
      NutritionAnalyzer.printAnalysis(service.getMeals());
      showMenu();
      break;

    case "5":
      console.log("👋 Hasta luego");
      rl.close();
      break;

    default:
      console.log("❌ Opción inválida");
      showMenu();
  }
}
function addMealPrompt() {

  rl.question("Nombre de la comida: ", (name) => {

    if (!name || name.trim().length < 2) {
      console.log("❌ El nombre debe tener al menos 2 caracteres");
      showMenu();
      return;
    }

    rl.question("Calorías: ", (caloriesInput) => {

      const calories = Number(caloriesInput);

      if (isNaN(calories) || calories <= 0 || calories > 5000) {
      console.log("❌ Calorías inválidas (usa un número entre 1 y 5000)");
      showMenu();
      return;
}

      rl.question("Momento (desayuno/comida/cena/snack): ", (timeInput) => {

        const validTimes = ["desayuno", "comida", "cena", "snack"];

        if (!validTimes.includes(timeInput)) {
          console.log("❌ Momento inválido. Usa: desayuno, comida, cena, snack");
          showMenu();
          return;
        }

        service.addMeal({
          name,
          calories,
          time: timeInput as "desayuno" | "comida" | "cena" | "snack"
        });

        console.log("✅ Comida guardada correctamente");

        showMenu();

      });

    });

  });

}

console.log("📊 Calorías totales:", service.getTotalCalories()) 

console.log("📋 Comidas registradas:", service.getMeals())
NutritionAnalyzer.analyzeDay(service.getMeals());

showMenu();
