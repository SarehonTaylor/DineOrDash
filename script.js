let city = "columbus";
let address = "281 W Lane Ave, Columbus, OH 43210";
let food = "burger";

// coords(address);
recipeApi(food);

//Takes an address string as an argument and inputs the latitude and longitude of that address as arguments for
//the restApi() function
function coords(address) {
    let requestUrl = "https://www.mapquestapi.com/geocoding/v1/address?key=OTXJc1VBLf5O4Q9o2nAZaZRR0fXaGJw1&inFormat=kvp&outFormat=json&location=" + address + "&thumbMaps=false";
    console.log(requestUrl);

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

            for (let i = 0; i < data["data"].length; i++) {
                let num = i + 1;
                console.log(num + ".");
                console.log("Restaurant: " + data["data"][i]["restaurant_name"]);
                console.log("Food: " + data["data"][i]["menu_item_name"]);
                console.log("Price: " + data["data"][i]["menu_item_price"]);
                console.log("Address: " + data["data"][i]["address"]["formatted"]);
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
            
            for (let i = 0; i < data["results"].length; i++) {
                let num = i + 1;
                console.log(num + ". " + data["results"][i]["title"]);
            }

            let chosen = 1;
            ingredientsApi(data["results"][chosen]["id"]);
        }) 
        .catch(err => {
            console.error(err);
    });
}

//Fetches the ingredients and preparation steps of a given recipe id that is used as an argument
function ingredientsApi(recipe) {
    let requestUrl = "https://api.spoonacular.com/recipes/" + recipe + "/information?apiKey=349863eb6f0f4135b4d518b60c73d656&includeNutrition=true";

    fetch(requestUrl)
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(recipe);
            console.log("Ingredients data:");
            console.log(data);

            let ingredients = data["extendedIngredients"];
            console.log("Ingredients:");
            for (let i = 0; i < ingredients.length; i++) {
                let ingrNum = i + 1;
                console.log(ingrNum + ". " + ingredients[i]["original"]);
            }

            console.log("--");

            console.log("Recipe Steps:");
            let instructions = data["analyzedInstructions"];
            for (let i = 0; i < instructions.length; i++) {
                let num = i + 1;
                console.log(num + ": " + instructions[i]["name"]);

                let steps = instructions[i]["steps"];
                for (let i = 0; i < steps.length; i++) {
                    let stepsNum = i + 1;
                    console.log("   " + stepsNum + ". " + steps[i]["step"]);
                }
            }

            
        }) 
        .catch(err => {
            console.error(err);
    });
}
