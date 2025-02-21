const apiKey = `4b731f7a3571d16ad64d420990d121ad`;
const apiURL = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=`;

const searchBox = document.querySelector('.search input');
const searchButton = document.querySelector('.search button');
const weatherIcon = document.querySelector('.weather-icon');
const errorDiv = document.querySelector('.error'); 
const weatherDiv = document.querySelector('.weather'); 

async function getWeather(city) {
    if (!city.trim()) {
        errorDiv.style.display = 'block';
        errorDiv.innerText = "Please enter a city name!";
        weatherDiv.style.display = 'none';
        return;
    }

    try {
        const response = await fetch(apiURL + city + `&appid=${apiKey}`);

        if (!response.ok) {
            throw new Error("City not found"); 
        }

        const data = await response.json();

        document.querySelector('.city').innerText = data.name;
        document.querySelector('.temp').innerText = Math.round(data.main.temp) + '°C';
        document.querySelector('.humidity p').innerText = data.main.humidity + '%';
        document.querySelector('.wind p').innerText = data.wind.speed + ' km/h';

        
    if (data.weather[0].main === 'Clouds') {
        weatherIcon.src = 'images/clouds.png';
      } else if (data.weather[0].main === 'Drizzle') {
        weatherIcon.src = 'images/drizzle.png';
      } else if (data.weather[0].main === 'Mist') {
        weatherIcon.src = 'images/mist.png';
      } else if (data.weather[0].main === 'Rain') {
        weatherIcon.src = 'images/rain.png';
      } else if (data.weather[0].main === 'Snow') {
        weatherIcon.src = 'images/snow.png';
      } else if (data.weather[0].main === 'Clear') {
        weatherIcon.src = 'images/clear.png';
      }
  
        weatherDiv.style.display = 'block';
        errorDiv.style.display = 'none';

    } catch (error) {
        errorDiv.style.display = 'block';
        errorDiv.innerText = "City not found! Please enter a valid city.";
        weatherDiv.style.display = 'none';
    }
}

searchButton.addEventListener('click', () => {
    getWeather(searchBox.value);
});

searchBox.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        getWeather(searchBox.value);
    }
});
