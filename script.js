//Global variables
let input = document.querySelector("input");

//Event listener
// input.addEventListener("click", recipeApi);
// input.addEventListener("click", yelpApi);

//Yelp API function
function yelpApi() {
    let requestUrl = "https://api.yelp.com/v3/autocomplete?text=del&latitude=37.786882&longitude=-122.399972&appid=0TPfYzbBQDZOLb9MddQtWCiD1E7FLunXqWtcrc6Pwc2_aOxyJ9eW1yDiIcuIp_83vF0kprF5P0pVtDYpp4gU0S4r3oyxXFdKdbLUtPmW2X4Qfc8Kx9fQgeLjkfI-YHYx";
    console.log(requestUrl);

    fetch(requestUrl)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data);
            //Type code here
        })
        .catch(function() {
            console.log("Error");
        });
}

//Recipe API function
function recipeApi() {
    let requestUrl = "https://api.spoonacular.com/recipes/716429/information?apiKey=349863eb6f0f4135b4d518b60c73d656&includeNutrition=true";
    console.log(requestUrl);

    fetch(requestUrl)
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data);
        }) 
        .catch(err => {
            console.error(err);
    });
}

//Test
let requestUrl = "https://api.spoonacular.com/recipes/716429/information?apiKey=349863eb6f0f4135b4d518b60c73d656&includeNutrition=true";
    console.log(requestUrl);

    fetch(requestUrl)
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data);
        }) 
        .catch(err => {
            console.error(err);
    });