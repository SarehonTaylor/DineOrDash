let input = document.querySelector("input");

input.addEventListener("click", yelpApi);
function yelpApi() {
    let requestUrl = "https://api.yelp.com/v3/autocomplete?text=del&latitude=37.786882&longitude=-122.399972";
    console.log(requestUrl);

    // let access = {Access-Control-Allow-Origin: "*"};
    // let header = {Authorization: "Bearer O_IPrWWCmaXkkcUPJb0EjA:0TPfYzbBQDZOLb9MddQtWCiD1E7FLunXqWtcrc6Pwc2_aOxyJ9eW1yDiIcuIp_83vF0kprF5P0pVtDYpp4gU0S4r3oyxXFdKdbLUtPmW2X4Qfc8Kx9fQgeLjkfI-YHYx"};

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


function cheater() {
    var data = null;
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://api.yelp.com/v3/businesses/search?text=coffee&latitude=37.786882&longitude=-122.399972");
    xhr.setRequestHeader("Authorization", "Bearer O_IPrWWCmaXkkcUPJb0EjA:0TPfYzbBQDZOLb9MddQtWCiD1E7FLunXqWtcrc6Pwc2_aOxyJ9eW1yDiIcuIp_83vF0kprF5P0pVtDYpp4gU0S4r3oyxXFdKdbLUtPmW2X4Qfc8Kx9fQgeLjkfI-YHYx");

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            data = JSON.parse(this.responseText);
            console.log(data);
        }
    });
    xhr.send(data);
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
