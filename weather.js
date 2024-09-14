const apiKey = 'cca7279eeda62ed554e7d981ad9fe05e';
const city = 'Isabela';
const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

fetch(url) 
    .then(response => response.json())
    .then(data => {
        const temperature = data.main.temp;
        const weatherDescription = data.weather[0].description;
        document.getElementById('weather').innerHTML =
            `current weather in ${city}: ${temperature}°farenheit, ${weatherDescription}`;
    })
    .catch(error => console.error('Error fetcvhing weather data', error));