function formatDate(timestamp) {
  let now = new Date(timestamp);

  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

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

  return `${today} ${hours}:${minutes}`;
}
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
  return days[day];
}
function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `  <div class="col weekday">
      <div class="weekday_title">${formatDay(forecastDay.dt)}</div>
       <img
          src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt=""
          width="42"
        />
      <div class="forecast_temp">
        <span class="wforecast_temp_max"> ${Math.round(
          forecastDay.temp.max
        )}° </span>
        <span class="wforecast_temp_min"> ${Math.round(
          forecastDay.temp.min
        )}° </span>
      </div>
    </div>
  `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "45c53691ffca75c2aad969972b22ca80";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function showWeatherConditions(response) {
  document.querySelector("#city-name").innerHTML = response.data.name;

  unitCelsiusTemp = response.data.main.temp;
  document.querySelector("#temp").innerHTML = Math.round(unitCelsiusTemp);
  document.querySelector("#humidity").innerHTML = Math.round(
    response.data.main.humidity
  );
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  document
    .querySelector("#icon")
    .setAttribute("alt", response.data.weather[0].description);
  document.querySelector("#time").innerHTML = formatDate(
    response.data.dt * 1000
  );
  getForecast(response.data.coord);
}

function searchCity(city) {
  let apiKey = "45c53691ffca75c2aad969972b22ca80";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeatherConditions);
}

function madrid() {
  let apiKey = "45c53691ffca75c2aad969972b22ca80";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=madrid&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeatherConditions);
}

function cambridge() {
  let apiKey = "45c53691ffca75c2aad969972b22ca80";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=cambridge&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeatherConditions);
}

function edinburgh() {
  let apiKey = "45c53691ffca75c2aad969972b22ca80";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=edinburgh&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeatherConditions);
}

function cityClick(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

function currentClick(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showLocation);
}

function madridClick(event) {
  event.preventDefault();
  madrid();
}
function cambridgeClick(event) {
  event.preventDefault();
  cambridge();
}

function edinburghClick(event) {
  event.preventDefault();
  edinburgh();
}
function showLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "45c53691ffca75c2aad969972b22ca80";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showWeatherConditions);
}

// function clickFahrenheit(event) {
//   event.preventDefault();
//   unitCelsius.classList.remove("active");
//   unitFahrenheit.classList.add("active");
//   document.querySelector("#temp").innerHTML = Math.round(
//     (unitCelsiusTemp * 9) / 5 + 32
//   );
// }

// function clickCelsius(event) {
//   event.preventDefault();
//   unitCelsius.classList.add("active");
//   unitFahrenheit.classList.remove("active");
//   document.querySelector("#temp").innerHTML = Math.round(unitCelsiusTemp);
// }

let cityButton = document.querySelector("#search-form");
cityButton.addEventListener("submit", cityClick);

let currentLocation = document.querySelector("#current-button");
currentLocation.addEventListener("click", currentClick);

let madridButton = document.querySelector("#madrid-button");
madridButton.addEventListener("click", madridClick);

let cambridgeButton = document.querySelector("#cambridge-button");
cambridgeButton.addEventListener("click", cambridgeClick);

let edinburghButton = document.querySelector("#edinburgh-button");
edinburghButton.addEventListener("click", edinburghClick);

// let unitFahrenheit = document.querySelector("#fahrenheit-link");
// unitFahrenheit.addEventListener("click", clickFahrenheit);

// let unitCelsius = document.querySelector("#celsius-link");
// unitCelsius.addEventListener("click", clickCelsius);

// let unitCelsiusTemp = null;

searchCity("tokyo");
