let latitude, longitude;

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
}

var today = new Date();
var year = today.getFullYear();
var mes = today.getMonth()+1;
var dia = today.getDate();
var fecha =dia+"/"+mes+"/"+year;
document.getElementById('date').innerHTML=`${fecha}`;

function showPosition(position) {
  latitude = position.coords.latitude;
  longitude = position.coords.longitude;
  let currentWeatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=ba30d0e76313884a12d1cc0a776b4d36`;
  let forecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=ba30d0e76313884a12d1cc0a776b4d36`;

  fetchWeatherData(currentWeatherURL, forecastURL);
}

async function fetchWeatherData(currentWeatherURL, forecastURL) {
  try {
    const currentWeatherResponse = await fetch(currentWeatherURL);
    const currentWeatherData = await currentWeatherResponse.json();

    const forecastResponse = await fetch(forecastURL);
    const forecastData = await forecastResponse.json();

    displayWeather(currentWeatherData, forecastData);
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}

function displayWeather(current,data) {
    document.getElementById('main').innerHTML = `Weather Forecast for ${current.name}, ${current.sys.country}`;
    document.getElementById('location').innerHTML = `${current.name}`;
    document.getElementById('temperature').innerHTML = `${current.main.feels_like} °C`;
    document.getElementById('condition').innerHTML = `${current.weather[0].description}`;
    document.getElementById('high-low').innerHTML = `${current.main.temp_max} °C / ${current.main.temp_min} °C`;
    document.getElementById('wind').innerHTML = `${current.wind.speed} Km/hr , ${current.wind.deg}`;
    document.getElementById('humidity').innerHTML = `${current.main.humidity}%`; 
    const sunriseTime = new Date(current.sys.sunrise * 1000).toLocaleTimeString();
    const sunsetTime = new Date(current.sys.sunset * 1000).toLocaleTimeString();
    document.getElementById('sunrise').innerHTML = `${sunriseTime}`;
    document.getElementById('sunset').innerHTML = `${sunsetTime}`;
    document.getElementById('Visibility').innerHTML = `${current.visibility} m`;

    document.getElementById('image').innerHTML = `<img src="https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}.png">`;  
    document.getElementById('image2').innerHTML = `<img src="https://openweathermap.org/img/wn/${data.list[1].weather[0].icon}.png">`;
    document.getElementById('image3').innerHTML = `<img src="https://openweathermap.org/img/wn/${data.list[2].weather[0].icon}.png">`;


    document.getElementById('Max1').innerHTML=`Maximum Temp: ${data.list[0].main.temp_max}`
    document.getElementById('Max2').innerHTML=`Maximum Temp: ${data.list[1].main.temp_max}`
    document.getElementById('Max3').innerHTML=`Maximum Temp: ${data.list[2].main.temp_max}`
    document.getElementById('Min1').innerHTML=`Minimum Temp: ${data.list[0].main.temp_min}`
    document.getElementById('Min2').innerHTML=`Minimum Temp: ${data.list[1].main.temp_min}`
    document.getElementById('Min3').innerHTML=`Minimum Temp: ${data.list[2].main.temp_min}`
    document.getElementById('Avg1').innerHTML=`Average Temp: ${(data.list[0].main.temp_min+data.list[0].main.temp_max)/2}`
    document.getElementById('Avg2').innerHTML=`Average Temp: ${(data.list[1].main.temp_min+data.list[1].main.temp_max)/2}`
    document.getElementById('Avg3').innerHTML=`Average Temp: ${(data.list[2].main.temp_min+data.list[2].main.temp_max)/2}`
    document.getElementById('Humidity1').innerHTML=`Humidity: ${data.list[0].main.humidity}%`
    document.getElementById('Humidity2').innerHTML=`Humidity: ${data.list[1].main.humidity}%`
    document.getElementById('Humidity3').innerHTML=`Humidity: ${data.list[2].main.humidity}%`
    document.getElementById('RainChance1').innerHTML=`Rain Probability: ${data.list[0].pop ?(data.list[0].pop * 100).toFixed(2) : "0"}%`
    document.getElementById('RainChance2').innerHTML=`Rain Probability: ${data.list[1].pop ?(data.list[1].pop * 100).toFixed(2) : "0"}%`
    document.getElementById('RainChance3').innerHTML=`Rain Probability: ${data.list[2].pop ?(data.list[2].pop * 100).toFixed(2) : "0"}%`
}

getLocation();
