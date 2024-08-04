const api = {
    key: "fcc8de7015bbb202209bbf0261babf4c",
    base: "https://api.openweathermap.org/data/2.5/"
  }
  
  const searchbox = document.querySelector('.search-box');
  searchbox.addEventListener('keypress', setQuery);
  
  function setQuery(evt) {
    if (evt.keyCode == 13) {
      getResults(searchbox.value);
    }
  }
  
  function getResults(query) {
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(weather => {
        return weather.json();
      }).then(displayResults);
  }
  
  function displayResults(weather) {
    let city = document.querySelector('.location .city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;
  
    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerText = dateBuilder(now);
  
    let temp = document.querySelector('.current .temp');
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;
  
    let weather_el = document.querySelector('.current .weather');
    weather_el.innerText = weather.weather[0].main;
  
    let hilow = document.querySelector('.hi-low');
    hilow.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;
  
    let humidity = document.querySelector('.humidity');
    humidity.innerText = `Humidity: ${weather.main.humidity}%`;
  
    let wind = document.querySelector('.wind');
    wind.innerText = `Wind Speed: ${weather.wind.speed} km/h`;
  
    let pressure = document.querySelector('.pressure');
    pressure.innerText = `Pressure: ${weather.main.pressure} hPa`;
  
    getForecast(weather.coord.lat, weather.coord.lon);
  }
  
  function getForecast(lat, lon) {
    fetch(`${api.base}onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&units=metric&appid=${api.key}`)
      .then(response => response.json())
      .then(data => {
        let forecastDays = document.querySelectorAll('.forecast-day');
        for (let i = 0; i < 3; i++) {
          let forecastDay = forecastDays[i];
          let date = new Date(data.daily[i + 1].dt * 1000);
          forecastDay.querySelector('.forecast-date').innerText = dateBuilder(date);
          forecastDay.querySelector('.forecast-temp').innerText = `${Math.round(data.daily[i + 1].temp.day)}°c`;
          forecastDay.querySelector('.forecast-weather').innerText = data.daily[i + 1].weather[0].main;
        }
      });
  }
  
  function dateBuilder(d) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
  
    return `${day} ${date} ${month} ${year}`;
  }
  