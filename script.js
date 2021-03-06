//Global variables
let input = document.querySelector("input");

//Event listener
input.addEventListener("click", recipeApi);

//Yelp API function
function yelpApi() {
    let requestUrl = "https://api.yelp.com/v3/autocomplete?text=del&latitude=37.786882&longitude=-122.399972&appid=0TPfYzbBQDZOLb9MddQtWCiD1E7FLunXqWtcrc6Pwc2_aOxyJ9eW1yDiIcuIp_83vF0kprF5P0pVtDYpp4gU0S4r3oyxXFdKdbLUtPmW2X4Qfc8Kx9fQgeLjkfI-YHYx";
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


// function cheater() {
//     var data = null;
//     var xhr = new XMLHttpRequest();
//     xhr.open("GET", "https://api.yelp.com/v3/businesses/search?text=coffee&latitude=37.786882&longitude=-122.399972");
//     xhr.setRequestHeader("Authorization", "Bearer O_IPrWWCmaXkkcUPJb0EjA:0TPfYzbBQDZOLb9MddQtWCiD1E7FLunXqWtcrc6Pwc2_aOxyJ9eW1yDiIcuIp_83vF0kprF5P0pVtDYpp4gU0S4r3oyxXFdKdbLUtPmW2X4Qfc8Kx9fQgeLjkfI-YHYx");

//     xhr.addEventListener("readystatechange", function () {
//         if (this.readyState === 4) {
//             data = JSON.parse(this.responseText);
//             console.log(data);
//         }
//     });
//     xhr.send(data);
// }

//Recipe API function
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

//Helpful recipe code
// var unirest = require("unirest");
// var req = unirest("GET", "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/extract");
// req.query({
// 	"url": "http://www.melskitchencafe.com/the-best-fudgy-brownies/"
// });
// req.headers({
// 	"x-rapidapi-key": "6ff39b8647mshb4ef68c9809d5bfp1b15aajsn1265ffd5435c",
// 	"x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
// 	"useQueryString": true
// });
// req.end(function (res) {
// 	if (res.error) throw new Error(res.error);
// 	console.log(res.body);
// });