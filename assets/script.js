function getWeather() {

    const location = document.getElementById("location").value;
  

    // Get weather data from API
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=metric&appid=20986e0e482c5a5e1fe8ea12091eb625`;
    
    fetch(url)
      .then(response => response.json())
      .then(data => {
        // Display forecast for 5 days
        let forecast = "";
        const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        const forecastContainer = document.querySelector(".forecast-container");

        //Removes existing forecast from DOM
        forecastContainer.innerHTML = "";

        for (let i = 0; i < data.list.length; i += 8) {
          const time = data.list[i].dt;
          const date = new Date(time * 1000);
          const dayOfWeek = daysOfWeek[date.getDay()];
          const iconCode = data.list[i].weather[0].icon;
          const tempCelsius = Math.round(data.list[i].main.temp);
          const description = data.list[i].weather[0].description;
  
          // Format forecast string with weather data
          const iconUrl = `http://openweathermap.org/img/w/${iconCode}.png`;
          const tempFahrenheit = Math.round((tempCelsius * 1.8) + 32);
          const forecastItem = `<div class="forecast-day">${dayOfWeek}: ${tempFahrenheit}°F <img src="${iconUrl}"> ${description}</div>`;
          forecastContainer.insertAdjacentHTML("beforeend", forecastItem);
        }
  
        // Update forecast display on webpage
        const weatherDiv = document.getElementById("weather");
        weatherDiv.innerHTML = forecast;

      })
      .catch(error => console.log(error));
  }
  