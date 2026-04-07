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
  console.log("6️⃣ Eliminar comida");
  console.log("7️⃣ Editar comida");

  rl.question("\nSelecciona una opción: ", handleMenu);
}

function handleMenu(option: string) {
  clearScreen();

  switch (option) {

    case "1":
      addMealPrompt();
      break;

    case "2":
      printMeals();
      showMenu();
      break;

    case "3":
      console.log(`\n🔥 Total calorías: ${service.getTotalCalories()} kcal`);
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

    case "6":
      deleteMealPrompt();
      break;

    case "7":
      editMealPrompt();
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
      console.log("❌ Ingresa calorías válidas (1 - 5000)");
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

        console.log(`\n✅ ${name} (${calories} kcal) guardado correctamente`);

        showMenu();

      });

    });

  });

}
function clearScreen() {
  console.clear();
}

function printMeals() {
  const meals = service.getMeals();

  if (meals.length === 0) {
    console.log("\n No hay comidas registradas");
    return;
  }
  console.log("\n Meals today:\n");

  meals.forEach((meal, index) => {
    console.log(
      `${index +1}. ${meal.name} - ${meal.calories} kcal (${meal.time})`
    );
  });
}

function deleteMealPrompt() {
  const meals = service.getMeals();

  if (meals.length === 0) {
    console.log(" No hay comidas para eliminar");
    showMenu();
    return;

  }

  printMeals();

  rl.question("\nIngresa el numero de la comida a eliminar: ", (input) => {
    const index = Number(input) - 1;

    if (isNaN(index)) {
      console.log("Entrada invalida");
      showMenu();
      return;
    }

    service.deleteMeal(index);
    showMenu();

  }); 
}

function editMealPrompt() {
  const meals = service.getMeals();

  if (meals.length === 0) {
    console.log("⚠️ No hay comidas para editar");
    showMenu();
    return;
  }

  printMeals();

  rl.question("\nIngresa el número de la comida a editar: ", (input) => {
    const index = Number(input) - 1;

    if (isNaN(index)) {
      console.log("❌ Entrada inválida");
      showMenu();
      return;
    }

    const existingMeal = meals[index];

    if (!existingMeal) {
      console.log("❌ Comida no encontrada");
      showMenu();
      return;
    }

    rl.question("Nuevo nombre: ", (name) => {
      rl.question("Nuevas calorías: ", (caloriesInput) => {
        const calories = Number(caloriesInput);

        if (isNaN(calories)) {
          console.log("❌ Calorías inválidas");
          showMenu();
          return;
        }

        rl.question("Nuevo momento (desayuno/comida/cena/snack): ", (timeInput) => {
          const validTimes = ["desayuno", "comida", "cena", "snack"];

          if (!validTimes.includes(timeInput)) {
            console.log("❌ Momento inválido");
            showMenu();
            return;
          }

          service.updateMeal(index, {
            name,
            calories,
            time: timeInput as "desayuno" | "comida" | "cena" | "snack"
          });

          console.log("✅ Comida editada correctamente");

          showMenu();
        });
      });
    });
  });
}

showMenu();
