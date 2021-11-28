//Challenge 1

let current = document.querySelector("#time");

let now = new Date();

let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}

let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let time = `${hours}:${minutes}`;

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thurday",
  "Friday",
  "Saturday",
];

let today = days[now.getDay()];

current.innerHTML = `${today} ${time}`;

//challenge 2

function showWeatherConditions(response) {
  console.log(response.data);
  document.querySelector("#city-name").innerHTML = response.data.name;
  document.querySelector("#temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = Math.round(
    response.data.main.humidity
  );
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
}

function cityClick(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

function searchCity(city) {
  let apiKey = "45c53691ffca75c2aad969972b22ca80";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeatherConditions);
}

//challenge 3
// function clickCelsius(event) {
//   event.preventDefault();
//   let currentTemp = document.querySelector("#temp");
//   currentTemp.innerHTML = `14`;
// }
// let unitCelsius = document.querySelector("#celsius-link");
// unitCelsius.addEventListener("click", clickCelsius);

// function clickFahrenheit(event) {
//   event.preventDefault();
//   let currentTemp = document.querySelector("#temp");
//   currentTemp.innerHTML = `57`;
// }
// let unitFahrenheit = document.querySelector("#fahrenheit-link");
// unitFahrenheit.addEventListener("click", clickFahrenheit);

//challenge 2 bonus
function currentClick(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showLocation);
}
function showLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "45c53691ffca75c2aad969972b22ca80";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showWeatherConditions);
}

let cityButton = document.querySelector("#search-form");
cityButton.addEventListener("submit", cityClick);

let currentLocation = document.querySelector("#current-button");
currentLocation.addEventListener("click", currentClick);

searchCity("tokyo");
