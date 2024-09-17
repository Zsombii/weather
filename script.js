const temp = document.getElementById("temp"),
  date = document.getElementById("date"),
  pressure = document.getElementById("pressure"),
  wind = document.getElementById("wind"),
  humidity = document.getElementById("humidity"),
  cloudy = document.getElementById("cloudy"),
  temp0 = document.getElementById("temp0"),
  time0 = document.getElementById("time0");

const mainImg = document.getElementById("main-img");

const apiKey = 'df24051cee16f676e8168bab8b2ae28c';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

const locationInput = document.getElementById('city');
const searchButton = document.getElementById('search-btn');
const locationElement = document.getElementById('location');
const temperatureElement = document.getElementById('temperature');

function getDateTime() {
  let now = new Date(),
      hour = now.getHours(),
      minute = now.getMinutes();
  
  let days = [
    "Vasárnap",
    "Hétfő",
    "Kedd",
    "Szerda",
    "Csütörtök",
    "Péntek",
    "Szombat",
  ];
  if (hour < 10) {
    hour = "0" + hour;
  }
  if (minute < 10) {
    minute = "0" + minute;
  }
  let dayString = days[now.getDay()];
  return `${dayString}, ${hour}:${minute}`;
}

date.innerText = getDateTime();
setInterval(() => {
  date.innerText = getDateTime();
}, 1000);

searchButton.addEventListener('click', () => {
  const location = locationInput.value;
  if (location) {
    fetchWeather(location);
  }
});

function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function getDailyForecasts(forecasts) {
  const dailyForecasts = {};

  forecasts.forEach(forecast => {
    const date = new Date(forecast.dt * 1000);
    const day = formatDate(date);
    const hours = date.getHours();

    if (hours === 11) {
      const temp = Math.round(forecast.main.temp);
      const weatherIcon = forecast.weather[0].icon;

      dailyForecasts[day] = { temp, icon: weatherIcon };
    }
  });

  return dailyForecasts;
}

function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function getDailyForecasts(forecasts) {
  const dailyForecasts = {};

  forecasts.forEach(forecast => {
    const date = new Date(forecast.dt * 1000);
    const day = formatDate(date);
    const hours = date.getHours();

    if (hours === 11) {
      const temp = Math.round(forecast.main.temp);
      const weatherIcon = forecast.weather[0].icon;

      dailyForecasts[day] = { temp, icon: weatherIcon };
    }
  });

  return dailyForecasts;
}

function displayWeeklyForecast(dailyForecasts) {
  const today = new Date();

  for (let i = 0; i < 5; i++) {
    const futureDate = new Date(today);
    futureDate.setDate(today.getDate() + i + 1); 
    const formattedDate = formatDate(futureDate);
    
    const weekdayElement = document.getElementById(`weekday${i}`);
    const weekImgElement = document.getElementById(`weekimg${i}`);
    const weekTempElement = document.getElementById(`weektemp${i}`);

    if (weekdayElement && weekImgElement && weekTempElement) {
      weekdayElement.innerHTML = formattedDate;

      if (dailyForecasts[formattedDate]) {
        const temp = dailyForecasts[formattedDate].temp;
        const weatherIcon = dailyForecasts[formattedDate].icon;

        let imageSrc;
        switch (true) {
          case weatherIcon.includes('01d'):
            imageSrc = 'sunny.png';
            break;
          case weatherIcon.includes('02d'):
            imageSrc = 'cloudy.png';
            break;
          case weatherIcon.includes('03d'):
          case weatherIcon.includes('04d'):
            imageSrc = 'cloudy.png';
            break;
          case weatherIcon.includes('09d'):
          case weatherIcon.includes('10d'):
          case weatherIcon.includes('10n'):
            imageSrc = 'rain.png';
            break;
          case weatherIcon.includes('11d'):
            imageSrc = 'storm.png';
            break;
          case weatherIcon.includes('13d'):
            imageSrc = 'snow.png';
            break;
          case weatherIcon.includes('50d'):
            imageSrc = 'mist.png';
            break;
          case weatherIcon.includes('01n'):
            imageSrc = 'moon.png';
            break;
          case weatherIcon.includes('04n'):
          case weatherIcon.includes('02n'):
          case weatherIcon.includes('03n'):
            imageSrc = 'cloud.png';
            break;
          default:
            imageSrc = 'default.png';
            break;
        }

        weekImgElement.src = imageSrc;
        weekTempElement.innerHTML = `${temp}°C`;
      } else {
        weekImgElement.src = 'default.png';
        weekTempElement.innerHTML = '--';
      }
    }
  }
}

function getweather(lat, lon) {
  const weatherApiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  fetch(weatherApiUrl)
    .then(res => res.json())
    .then(data => {
      console.log(data);

      const forecasts = data.list;
      const dailyForecasts = getDailyForecasts(forecasts);
      displayWeeklyForecast(dailyForecasts);

      const numberOfCards = 24;
      forecasts.slice(0, numberOfCards).forEach((forecast, index) => {
        const timestamp = forecast.dt;
        const date = new Date(timestamp * 1000);
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const temp = Math.round(forecast.main.temp);
        const weatherIcon = forecast.weather[0].icon;
        let imageSrc;

        switch (true) {
          case weatherIcon.includes('01d'):
            imageSrc = 'sunny.png';
            break;
          case weatherIcon.includes('02d'):
            imageSrc = 'cloudy.png';
            break;
          case weatherIcon.includes('03d'):
          case weatherIcon.includes('04d'):
            imageSrc = 'cloudy.png';
            break;
          case weatherIcon.includes('09d'):
          case weatherIcon.includes('10d'):
          case weatherIcon.includes('10n'):
            imageSrc = 'rain.png';
            break;
          case weatherIcon.includes('11d'):
            imageSrc = 'storm.png';
            break;
          case weatherIcon.includes('13d'):
            imageSrc = 'snow.png';
            break;
          case weatherIcon.includes('50d'):
            imageSrc = 'mist.png';
            break;
          case weatherIcon.includes('01n'):
            imageSrc = 'moon.png';
            break;
          case weatherIcon.includes('04n'):
          case weatherIcon.includes('02n'):
          case weatherIcon.includes('03n'):
            imageSrc = 'cloud.png';
            break;
          default:
            imageSrc = 'default.png';
            break;
        }

        const timeElement = document.getElementById(`time${index}`);
        const tempElement = document.getElementById(`temp${index}`);
        const imageElement = document.getElementById(`image${index}`);

        if (timeElement && tempElement && imageElement) {
          timeElement.innerHTML = `${hours}:${minutes}`;
          tempElement.innerHTML = `${temp}°C`;
          imageElement.src = imageSrc;
        }

        if (index === 0) {
          mainImg.src = imageSrc;
        }
      });
    })
    .catch(() => {
      alert("Hiba történt az előrejelzés lekérésekor.");
    });
}


function fetchWeather(location) {
  const url = `${apiUrl}?q=${location}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      locationElement.textContent = data.name;
      temperatureElement.textContent = `${Math.round(data.main.temp)}°C`;
      pressure.innerHTML = `${data.main.pressure} hPa`;
      humidity.innerHTML = `${data.main.humidity} %`;
      wind.innerHTML = `${data.wind.speed} km/h`;
      cloudy.innerHTML = `${data.clouds.all} %`;

      const lat = data.coord.lat;
      const lon = data.coord.lon;

      getweather(lat, lon);
    })
    .catch(error => {
      console.error('Hiba történt', error);
    });
}

const getcity = () => {
  const city2 = locationInput.value.trim();
  if (!city2) return;
  const geocoding_url = `https://api.openweathermap.org/geo/1.0/direct?q=${city2}&limit=1&appid=${apiKey}`;

  fetch(geocoding_url)
    .then(res => res.json())
    .then(data => {
      if (!data.length) return alert("Hely nem található.");
      const { name, lat, lon } = data[0];
      fetchWeather(name);
    })
    .catch(() => {
      alert("Hiba történt a város keresésekor.");
    });
}

searchButton.addEventListener("click", getcity);