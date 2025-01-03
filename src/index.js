function refreshWeather(response) {
  let currentTemp = document.querySelector("#current-temp-value");
  let temp = Math.round(response.data.temperature.current);
  let cityElement = document.querySelector("#current-city");
  let currentTempIcon = document.querySelector("#current-temp-icon");
  let description = document.querySelector("#description");
  let humidity = document.querySelector("#humidity");
  let windSpeed = document.querySelector("#wind-speed");
 
  cityElement.innerHTML = response.data.city;
  currentTemp.innerHTML = temp;
  currentTempIcon.innerHTML = `<img src="${response.data.condition.icon_url}" alt="${response.data.condition.description}" />`;
  description.innerHTML = `, ${response.data.condition.description}`;
  humidity.innerHTML = `${response.data.temperature.humidity}`;
  windSpeed.innerHTML = `${response.data.wind.speed}`;

  getForecast(response.data.city);
}

function searchCity(city) {
  let apiKey = "o922906b22974ec99e9bc3858a42ft20"
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`
  axios.get(apiUrl).then(refreshWeather);
}

function search(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");
  searchCity(searchInputElement.value);
}

function getForecast(city) {
  let apiKey = "o922906b22974ec99e9bc3858a42ft20";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Mon","Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return days[date.getDay()];

}

function displayForecast(response) {
  console.log(response.data);
  let forecastHtml = "";

  response.data.daily.forEach(function(day, index) {
    if (index < 5) {
    forecastHtml = forecastHtml + `
                    <div class="weather-forecast-day">
                        <div class="weather-forecast-date">${formatDay(day.time)}</div>
                        <div>
                          <img src="${day.condition.icon_url}" class="weather-forecast-icon" /></div>
                        <div class="weather-forecast-temps">
                            <div class="weather-forecast-temp"><strong>${Math.round(day.temperature.maximum)}°C</strong></div>
                            <div class="weather-forecast-temp">${Math.round(day.temperature.minimum)}°C</div>
                        </div>
                      </div>
                    </div>
                      `;
                    }
  });

  let weatherForecast = document.querySelector("#weather-forecast");
  weatherForecast.innerHTML = forecastHtml;
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  
  let formattedDay = days[day];
  return `${formattedDay} ${hours}:${minutes}`;
}


let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

let currentDateElement = document.querySelector("#current-date");
let currentDate = new Date();

currentDateElement.innerHTML = formatDate(currentDate);

searchCity("Paris");

