document.addEventListener("DOMContentLoaded", () => {
    const apiKey = "cebe200328d4c1159cc06008251fd5a8";  // used to authenticate and access weather data
    const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";   //base URL for making requests to the OpenWeather API
    const searchBox = document.querySelector('.search input');
    const searchBtn = document.querySelector('.search button');
  
    async function checkWeather(city) {
      try {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        
        const data = await response.json();
    
        if (data.cod === 200) {
          document.querySelector('.weather').style.display = "flex";
          document.querySelector('.city').innerHTML = data.name;
          document.querySelector('.temp').innerHTML = Math.round(data.main.temp) + "°c";
          document.querySelector('.humidity').innerHTML = data.main.humidity + "%";
          document.querySelector('.wind').innerHTML = data.wind.speed + "km/h";
    
        } else {
          throw new Error('Weather information not available');
        }
      } catch (error) {
        console.error('Error fetching weather data:', error);
        const errorMessage = document.querySelector('.error-message');
        errorMessage.textContent = 'City not found or there was a network error. Please try again.';
        errorMessage.style.color = 'black';
      }
    }
  
    searchBtn.addEventListener("click", () => {
      checkWeather(searchBox.value);
    });
  });