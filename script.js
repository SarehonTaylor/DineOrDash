let city = "columbus";
let address = "281 W Lane Ave, Columbus, OH 43210";
let foods = ["tacos", "waffles", "chicken sandwich", "omelette", "burger"]

let array = [];
let localArray = localStorage.getItem("array");
if (localArray !== null) {
    array = JSON.parse(localArray);
}

let area = document.querySelector("#location");
let food = document.querySelector("#food");
let button = document.querySelector("#submit");
let recipeDiv = document.querySelector("#recipes");
let restDiv = document.querySelector("#restaurants");

button.addEventListener("click", function() {
    recipeDiv.innerHTML = "";
    recipeApi(food.value);
});
button.addEventListener("click", function() {
    restDiv.innerHTML = "";
    coords(area.value, food.value);
});
button.addEventListener("click", function() {
    array.push([area.value, food.value]);
    localStorage.setItem("array", JSON.stringify(array));
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

//Takes the coordinates of the inputed city and the requested food item and prints 20 results to the console
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
            console.log("Documenu data:");
            console.log(data);

            let title = document.createElement("h2");
            title.innerHTML = "Restaurant List";
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

//Takes the food item as an argument and outputs a list of recipes
function recipeApi(food) {
    let requestUrl = "https://api.spoonacular.com/recipes/complexSearch?query=" + food + "&number=10&apiKey=349863eb6f0f4135b4d518b60c73d656";

    fetch(requestUrl)
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(food);
            console.log("--");
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
                    ingredientsApi(recipeId);
                })
            }            
        }) 
        .catch(err => {
            console.error(err);
    });
}

// let recipeButton = document.querySelector(".recipebutton");


//Fetches the ingredients and recipe steps of a given recipe id that is used as an argument
function ingredientsApi(recipeId) {
    let requestUrl = "https://api.spoonacular.com/recipes/" + recipeId + "/information?apiKey=349863eb6f0f4135b4d518b60c73d656&includeNutrition=true";

    fetch(requestUrl)
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(recipeId);
            console.log(data);

            let ingredients = data["extendedIngredients"];
            console.log("Ingredients:");

            recipeDiv.innerHTML = "";
            let ingredientsH2 = document.createElement("h2");
            ingredientsH2.innerHTML = "Ingredients List:";
            recipeDiv.appendChild(ingredientsH2);
            for (let i = 0; i < ingredients.length; i++) {
                let ingrNum = i + 1;

                // console.log(ingrNum + ". " + ingredients[i]["original"]);
                let pIngredient = document.createElement("p");
                pIngredient.classList.add("ingredient");
                pIngredient.innerHTML = ingrNum + ". " + ingredients[i]["original"];
                recipeDiv.appendChild(pIngredient);
            }

            console.log("--");

            // console.log("Recipe Steps:");
            let recipeSteps = document.createElement("h2");
            recipeSteps.innerHTML = "Recipe Steps:";
            recipeDiv.appendChild(recipeSteps);

            let instructions = data["analyzedInstructions"];
            if (instructions.length > 1) {
                for (let i = 0; i < instructions.length; i++) {
                    let num = i + 1;

                    // console.log(num + ": " + instructions[i]["name"]);
                    let instrPart = document.createElement("p");
                    instrPart.classList.add("ingredient");
                    instrPart.innerHTML = num + ": " + instructions[i]["name"];
                    recipeDiv.appendChild(instrPart);

    
                    let steps = instructions[i]["steps"];
                    for (let i = 0; i < steps.length; i++) {
                        let stepsNum = i + 1;

                        // console.log("   " + stepsNum + ". " + steps[i]["step"]);
                        let instr = document.createElement("p");
                        instr.classList.add("ingredient");
                        instr.innerHTML = "   " + stepsNum + ". " + steps[i]["step"];
                        recipeDiv.appendChild(instr);
                    }
                }
            } else {
                let steps = instructions[0]["steps"];
                for (let i = 0; i < steps.length; i++) {
                    let stepsNum = i + 1;

                    // console.log("   " + stepsNum + ". " + steps[i]["step"]);
                    let instr = document.createElement("p");
                    instr.classList.add("ingredient");
                    instr.innerHTML = "   " + stepsNum + ". " + steps[i]["step"];
                    recipeDiv.appendChild(instr);
                }
            }

            

            
        }) 
        .catch(err => {
            console.error(err);
    });
}
