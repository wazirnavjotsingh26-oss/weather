const apiKey = "8b4d7d2099a24a0115473160ea89fa89";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if(response.status == 404){
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    } else {
        var data = await response.json();

        // Update Text
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

        // Update Image Icon based on weather condition
        // OpenWeatherMap provides icon codes (e.g., "01d", "10d")
        const iconCode = data.weather[0].icon;
        weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

        // Display Weather
        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";

        // Change Background based on Weather Condition
        // We check the "main" field (Clouds, Rain, Clear, etc.)
        const weatherCondition = data.weather[0].main.toLowerCase();
        
        // Reset body classes
        document.body.className = ""; 
        
        // Add specific class if we have a background for it
        if (['clear', 'clouds', 'rain', 'snow', 'mist'].includes(weatherCondition)) {
            document.body.classList.add(weatherCondition);
        } else {
            // Default dark background for others (storm, dust, etc)
            document.body.classList.add("default"); 
        }
    }
}

searchBtn.addEventListener("click", ()=>{
    checkWeather(searchBox.value);
});

// Allow pressing "Enter" key to search
searchBox.addEventListener("keypress", (e) => {
    if (e.key === 'Enter') {
        checkWeather(searchBox.value);
    }
});