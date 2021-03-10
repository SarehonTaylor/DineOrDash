const axios = require("axios")

let API_KEY = "Y0TPfYzbBQDZOLb9MddQtWCiD1E7FLunXqWtcrc6Pwc2_aOxyJ9eW1yDiIcuIp_83vF0kprF5P0pVtDYpp4gU0S4r3oyxXFdKdbLUtPmW2X4Qfc8Kx9fQgeLjkfI-YHYx"

// REST
let yelpREST = axios.create({
  baseURL: "https://api.yelp.com/v3/",
  headers: {
    Authorization: `Bearer ${TPfYzbBQDZOLb9MddQtWCiD1E7FLunXqWtcrc6Pwc2_aOxyJ9eW1yDiIcuIp_83vF0kprF5P0pVtDYpp4gU0S4r3oyxXFdKdbLUtPmW2X4Qfc8Kx9fQgeLjkfI-YHYx}`,
    "Content-type": "application/json",
  },
})

yelpREST(ENDPOINT, { params: { key: value } }).then(({ data }) => {
  // Do something with the data
})
