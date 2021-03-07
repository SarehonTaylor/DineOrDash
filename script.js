let city = "columbus";
let food = "pizza";
// getCoords(city);
recipeApi(food);
//Takes a city string as an argument and inputs the latitude and longitude of that city as arguments for
//the restApi() function
function getCoords(city) {
    let requestUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=de53a40654766cb8ce20288a99c9f736";

    fetch(requestUrl)
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        console.log("Openweather data:");
        console.log(data);

        let lat = data["coord"]["lat"];
        let lon = data["coord"]["lon"];
        restApi(lat, lon, food);
      })
      .catch(function() {
        console.log("Error");
      });
}

//Takes the coordinates of the inputed city and the requested food item and prints 10 results to the console
function restApi(lat, lon, food) {
    let requestUrl = "https://documenu.p.rapidapi.com/menuitems/search/geo?lat=" + lat + "&lon=" + lon + "&distance=5&size=10&page=1&search=" + food;
    console.log(requestUrl);
    
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
            }
        })
        .catch(err => {
            console.error(err);
        });
}

//Takes the food item as an argument and outputs a list of recipes
function recipeApi(food) {
    let requestUrl = "https://api.spoonacular.com/recipes/716429/information?apiKey=349863eb6f0f4135b4d518b60c73d656&includeNutrition=true";
    console.log(requestUrl);

    fetch(requestUrl)
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log("Spoonacular data:");
            console.log(data);
            console.log(food);

            for (let i = 0; i < 10; i++) {
                let num = i + 1;
                console.log(num + ". Recipe");
            }
        }) 
        .catch(err => {
            console.error(err);
    });
}

// function recipeApi(food) {
//     fetch("https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/queries/analyze?q=pizza", {
// 	"method": "GET",
// 	"headers": {
// 		"x-rapidapi-key": "f8fb3fa959msh5a99371fad537f4p136473jsn05a9c31b8f9d",
// 		"x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com"
// 	}
//     })
//         .then(response => {
//             return response.json();
//         })
//         .then(data => {
//             console.log("Rapidapi Spoonacular data:");
//             console.log(data);
//             console.log(food);

//             for (let i = 0; i < 10; i++) {
//                 let num = i + 1;
//                 console.log(num + ". Recipe");
//             }
//         })
//         .catch(err => {
//             console.error(err);
//         });
// }
