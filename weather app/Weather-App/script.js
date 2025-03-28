let url;
const button=document.getElementById('sbt')
const ul=document.getElementById('3')
const image=document.getElementById('image')

function abc(e){
    e.preventDefault();
    const input=document.getElementById('input1').value;
    console.log(input);
    url=`https://api.openweathermap.org/data/2.5/weather?appid=ba30d0e76313884a12d1cc0a776b4d36&q=${input}&units=metric`
    consume();
}

sbt.addEventListener('click',abc);
ul.addEventListener('click',abc);
ul.addEventListener('keyup',function(e){
    if(e.key==='Enter')
    abc;
});


async function consume(){
    try{
        const response=await fetch(url);
        const result=await response.json();
        if(!result.coord){
            console.log("invalid city name");
            return;
        }
        const lat=result.coord.lat;
        const lon=result.coord.lon;
        fetchWeather(lat,lon,result);
    }
    catch(error){
        console.log(error);
    }
}


async function fetchWeather(lat,lon,result){
    try{
        const url2=`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&exclude=minutely&units=metric&appid=ba30d0e76313884a12d1cc0a776b4d36`
        const response=await fetch(url2);
        const data=await response.json();
        console.log(data)

        if(result!==undefined){
            document.getElementById('main').innerHTML=`Weather Forecast for ${result.name},${result.sys.country}`;
            document.getElementById('location').innerHTML=`${result.name}`;
            document.getElementById('temperature').innerHTML=`${result.main.feels_like} &deg;C`;
            document.getElementById('condition').innerHTML=`${result.weather[0].description}`;
            document.getElementById('high-low').innerHTML=`${result.main.temp_max} &deg;C / ${result.main.temp_min} &deg;C`;
            document.getElementById('wind').innerHTML=`${result.wind.speed} Km/hr , ${result.wind.deg}`;
            document.getElementById('humidity').innerHTML=`${result.main.humidity}`;
            const sunriseDate = new Date(result.sys.sunrise * 1000);
            const sunriseTime = sunriseDate.toLocaleTimeString();
            document.getElementById('sunrise').innerHTML=`${sunriseTime}`;
            const sunsetDate = new Date(result.sys.sunset * 1000);
            const sunsetTime = sunsetDate.toLocaleTimeString();
            document.getElementById('sunset').innerHTML = `${sunsetTime}`;
            document.getElementById('Visibility').innerHTML=`${result.visibility}`;

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
    }
    catch(error){
        console.log(error);
    }
}
