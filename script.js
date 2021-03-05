function yelpApi() {
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