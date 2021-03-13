//Global variables
let area = document.querySelector("#location");
let food = document.querySelector("#food");
let button = document.querySelector("#submit");
let recipeDiv = document.querySelector("#recipes");
let restDiv = document.querySelector("#restaurants");
let historyDiv = document.querySelector("#searchhistory");
let clear = document.querySelector("#clear");
let recipeHisDiv = document.querySelector("#recipehistory");
let recipeClear = document.querySelector("#clearrecipe");
let chosenRecipe = document.querySelector("#chosenrecipe");
let stepsList = document.querySelector("#stepslist");

//Uses localStorage to populate an array and the search history
let array = [];
let localArray = localStorage.getItem("array");
if (localArray !== null) {
    array = JSON.parse(localArray);

    for (let i = 0; i < array.length; i++) {
        let buttonSearch = document.createElement("button");
        buttonSearch.innerHTML = "Location: " + array[i][0] + ", Food: " + array[i][1];
        historyDiv.appendChild(buttonSearch);

        buttonSearch.addEventListener("click", function() {
            recipeDiv.innerHTML = "";
            restDiv.innerHTML = "";
            chosenRecipe.innerHTML = "";
            stepsList.innerHTML = "";
            area.value = array[i][0];
            food.value = array[i][1];
            recipeApi(food.value);
            coords(area.value, food.value);
        })
    }
}

//Uses localStorage to populate an array and the recipe history
let recipeArray = [];
let localRecipe = localStorage.getItem("recipes");
if (localRecipe !== null) {
    recipeArray = JSON.parse(localRecipe);

    for (let i = 0; i < recipeArray.length; i++) {
        let recipeButton = document.createElement("button");
        recipeButton.innerHTML = recipeArray[i][0];
        recipeHisDiv.appendChild(recipeButton);

        recipeButton.addEventListener("click", function() {
            ingredientsApi(recipeArray[i][1]);
        })
    }
}

//Clears search history and localStorage
clear.addEventListener("click", function() {
    array = [];
    localStorage.setItem("array", JSON.stringify(array));
    historyDiv.innerHTML = "";
})

//Clears recipe history and localStorage
recipeClear.addEventListener("click", function() {
    recipeArray = [];
    localStorage.setItem("recipes", JSON.stringify(recipeArray));
    recipeHisDiv.innerHTML = "";
})

//Calls the recipeApi and coords functions to get information from the APIs when the submit button is clicked
button.addEventListener("click", function() {
    recipeDiv.innerHTML = "";
    recipeApi(food.value);

    restDiv.innerHTML = "";
    coords(area.value, food.value);
    chosenRecipe.innerHTML = "";
    stepsList.innerHTML = "";
});

//Adds the input items to localStorage and search history
button.addEventListener("click", function() {
    let boo = false;
    let entry = [area.value, food.value];
    for (let i = 0; i < array.length; i++) {
        if (array[i][0] === entry[0] && array[i][1] === entry[1]) {
            boo = true;
        }
    }

    if (boo === false) {
        array.push(entry);
    }
    
    while (array.length > 5) {
        array.shift();
    }
    localStorage.setItem("array", JSON.stringify(array));
    historyDiv.innerHTML = "";

    for (let i = 0; i < array.length; i++) {
        let buttonSearch = document.createElement("button");
        buttonSearch.innerHTML = "Location: " + array[i][0] + ", Food: " + array[i][1];
        historyDiv.appendChild(buttonSearch);

        buttonSearch.addEventListener("click", function() {
            recipeDiv.innerHTML = "";
            restDiv.innerHTML = "";
            area.value = array[i][0];
            food.value = array[i][1];
            recipeApi(food.value);
            coords(area.value, food.value);
        })
    }
    console.log(array);
})

//Takes an address string as an argument and inputs the latitude and longitude of that address as arguments for
//the restApi() function
function coords(address, food) {
    let requestUrl = "https://www.mapquestapi.com/geocoding/v1/address?key=OTXJc1VBLf5O4Q9o2nAZaZRR0fXaGJw1&inFormat=kvp&outFormat=json&location=" + address + "&thumbMaps=false";

    fetch(requestUrl)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log("Lat Lon Data:");
            console.log(data);

            let lat = data["results"][0]["locations"][0]["latLng"]["lat"];
            console.log("Lat: " + lat);

            let lon = data["results"][0]["locations"][0]["latLng"]["lng"];
            console.log("Lon: " + lon);

            restApi(lat, lon, food);
        })
        .catch(function() {
            console.log("Error");
        });
}

//Takes the coordinates of the inputed city and the requested food item and prints 10 results to the console
function restApi(lat, lon, food) {
    let requestUrl = "https://documenu.p.rapidapi.com/menuitems/search/geo?lat=" + lat + "&lon=" + lon + "&distance=5&size=10&page=1&search=" + food;
    
    fetch(requestUrl, {
	"method": "GET",
	"headers": {
		"x-api-key": "3961f418c97acd355c657af27c9e007c",
		"x-rapidapi-key": "f8fb3fa959msh5a99371fad537f4p136473jsn05a9c31b8f9d",
		"x-rapidapi-host": "documenu.p.rapidapi.com"
	}
    })
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log("--");
            console.log("Documenu data:");
            console.log(data);

            let title = document.createElement("h2");
            title.innerHTML = "Restaurant List:";
            restDiv.appendChild(title);
            
            for (let i = 0; i < data["data"].length; i++) {
                let num = i + 1;
                let div = document.createElement("div");
                div.classList.add("grey");

                let pNum = document.createElement("p");
                pNum.innerHTML = num + ".";
                div.appendChild(pNum);

                let pFood = document.createElement("p");
                pFood.innerHTML = "   Food: " + data["data"][i]["menu_item_name"];
                div.appendChild(pFood);

                let pDesc = document.createElement("p");
                pDesc.innerHTML = "   Description: " + data["data"][i]["menu_item_description"];
                div.appendChild(pDesc);

                let pPrice = document.createElement("p");
                pPrice.innerHTML = "   Price: " + data["data"][i]["menu_item_pricing"][0]["priceString"];
                div.appendChild(pPrice);

                let pRest = document.createElement("p");
                pRest.innerHTML = "   Restaurant: " + data["data"][i]["restaurant_name"];
                div.appendChild(pRest);

                let pAddy = document.createElement("p");
                pAddy.innerHTML = "   Address: " + data["data"][i]["address"]["formatted"];
                div.appendChild(pAddy);

                restDiv.appendChild(div);
            }
        })
        .catch(err => {
            console.error(err);
        });
}

//Takes the food item as an argument and outputs a list of recipes, each recipe is clickable and reveals
//the list of ingredients and recipe steps
function recipeApi(food) {
    let requestUrl = "https://api.spoonacular.com/recipes/complexSearch?query=" + food + "&number=10&apiKey=349863eb6f0f4135b4d518b60c73d656";

    fetch(requestUrl)
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log("Recipes data:");
            console.log(data);
            
            let recipeList = document.createElement("h2");
            recipeList.innerHTML = "Recipe List:";
            recipeDiv.appendChild(recipeList);

            for (let i = 0; i < data["results"].length; i++) {
                let num = i + 1;

                let bRecipe = document.createElement("button");
                bRecipe.classList.add("recipebutton");
                bRecipe.innerHTML = num + ". " + data["results"][i]["title"];
                recipeDiv.appendChild(bRecipe);

                let recipeId = data["results"][i]["id"];

                bRecipe.addEventListener("click", function() {


                    let boo = false;
                    let entry = [data["results"][i]["title"], recipeId];
                    for (let i = 0; i < recipeArray.length; i++) {
                        if (recipeArray[i][0] === entry[0] && recipeArray[i][1] === entry[1]) {
                            boo = true;
                        }
                    }

                    if (boo === false) {
                        recipeArray.push(entry);
                    }

                    
                    while (recipeArray.length > 5) {
                        recipeArray.shift();
                    }
                    localStorage.setItem("recipes", JSON.stringify(recipeArray));
                    recipeHisDiv.innerHTML = "";

                    for (let j = 0; j < recipeArray.length; j++) {
                        let recipeP = document.createElement("button");
                        recipeP.innerHTML = recipeArray[j][0];
                        recipeHisDiv.appendChild(recipeP);

                        recipeP.addEventListener("click", function() {
                            ingredientsApi(recipeArray[j][1]);
                        })
                    }
                    
                    ingredientsApi(recipeId);
                })
            }            
        }) 
        .catch(err => {
            console.error(err);
    });
}

//Fetches the ingredients and recipe steps of a given recipe id that is used as an argument
function ingredientsApi(recipeId) {
    let requestUrl = "https://api.spoonacular.com/recipes/" + recipeId + "/information?apiKey=349863eb6f0f4135b4d518b60c73d656&includeNutrition=true";

    fetch(requestUrl)
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log("--");
            console.log("Ingredients:");
            console.log(recipeId);
            console.log(data);

            chosenRecipe.innerHTML = "";
            stepsList.innerHTML = "";

            let foodItem = document.createElement("h2");
            foodItem.innerHTML = data["title"];
            chosenRecipe.appendChild(foodItem);

            let ingredientsList = document.createElement("div");
            chosenRecipe.appendChild(ingredientsList);

            let ingredientsH2 = document.createElement("h2");
            ingredientsH2.innerHTML = "Ingredients List:";
            ingredientsList.appendChild(ingredientsH2);

            let ingredients = data["extendedIngredients"];
            for (let i = 0; i < ingredients.length; i++) {
                let ingrNum = i + 1;

                let pIngredient = document.createElement("p");
                pIngredient.classList.add("ingredient");
                pIngredient.innerHTML = ingrNum + ". " + ingredients[i]["original"];
                ingredientsList.appendChild(pIngredient);
            }

            let recipeSteps = document.createElement("h2");
            recipeSteps.innerHTML = "Recipe Steps:";
            stepsList.appendChild(recipeSteps);

            let instructions = data["analyzedInstructions"];
            if (instructions.length > 1) {
                for (let i = 0; i < instructions.length; i++) {
                    let num = i + 1;

                    let instrPart = document.createElement("p");
                    instrPart.classList.add("recipelist");
                    instrPart.innerHTML = num + ": " + instructions[i]["name"];
                    stepsList.appendChild(instrPart);

                    let steps = instructions[i]["steps"];
                    for (let i = 0; i < steps.length; i++) {
                        let stepsNum = i + 1;

                        let instr = document.createElement("p");
                        instr.classList.add("recipelist");
                        instr.innerHTML = ">>>>" + stepsNum + ". " + steps[i]["step"];
                        stepsList.appendChild(instr);
                    }
                }
            } else {
                if (instructions.length > 0) {
                    let steps = instructions[0]["steps"];
                    for (let i = 0; i < steps.length; i++) {
                        let stepsNum = i + 1;

                        let instr = document.createElement("p");
                        instr.classList.add("recipelist");
                        instr.innerHTML = stepsNum + ". " + steps[i]["step"];
                        stepsList.appendChild(instr);
                    }
                } else {
                    let instr = document.createElement("p");
                    instr.classList.add("recipelist");
                    instr.innerHTML = "None";
                    stepsList.appendChild(instr);
                }
            }
        }) 
        .catch(err => {
            console.error(err);
        });
}
