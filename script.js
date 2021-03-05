let button = document.querySelector("button");

button.addEventListener("click", yelpApi);
function yelpApi() {
    let requestUrl = "https://api.yelp.com/v3/autocomplete?text=del&latitude=37.786882&longitude=-122.399972";
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

function recipeApi() {
    let requestUrl = "";
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

fetch("https://api.spoonacular.com/recipes/716429/information?apiKey=349863eb6f0f4135b4d518b60c73d656&includeNutrition=true"
 
	
)
.then(response => {
	return response.json();
})
.then(data => {
    console.log(data);
}) 
.catch(err => {
	console.error(err);
});
