const apiKey = 'cca7279eeda62ed554e7d981ad9fe05e';
const city = 'Isabela';
const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

fetch(url) 
    .then(response => response.json())
    .then(data => {
        const temperature = data.main.temp;
        const weatherDescription = data.weather[0].description;
        const iconCode = data.weather[0].icon;

        document.getElementById('city-name').textContent = city;
        document.getElementById('temperature').textContent = `${temperature}°F`;
        document.getElementById('weather-description').textContent = weatherDescription;
        document.getElementById('weather-icon').src = `http://openweathermap.org/img/wn/${iconCode}.png`;
    })
    .catch(error => console.error('Error fetching weather data', error));