const apiKey = "ebd0d5abf1df4dcfb78145330253009";
const cityInput = document.getElementById("cityInput");
const getWeatherBtn = document.getElementById("myButton");
const weatherResult = document.getElementById("weatherResult");

getWeatherBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (!city) {
    weatherResult.textContent = "Please enter a city name.";
    return;
  }

  weatherResult.textContent = "Loading...";

  fetch(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(city)}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("City not found");
      }
      return response.json();
    })
    .then((data) => {
      const iconUrl = `https:${data.current.condition.icon}`;
      const condition = data.current.condition.text.toLowerCase();

      // 🌈 Choose emoji based on weather
      let weatherEmoji = "🌍"; // default
      if (condition.includes("sunny") || condition.includes("clear")) {
        weatherEmoji = "☀️";
      } else if (condition.includes("cloud")) {
        weatherEmoji = "☁️";
      } else if (condition.includes("rain")) {
        weatherEmoji = "🌧️";
      } else if (condition.includes("thunder")) {
        weatherEmoji = "🌩️";
      } else if (condition.includes("snow")) {
        weatherEmoji = "❄️";
      } else if (condition.includes("fog") || condition.includes("mist")) {
        weatherEmoji = "🌫️";
      } else if (condition.includes("wind")) {
        weatherEmoji = "🌬️";
      }

      weatherResult.innerHTML = `
        <div style="text-align:center;">
          <h3>${data.location.name}, ${data.location.country}</h3>
          <img src="${iconUrl}" alt="Weather Icon" style="width:80px;height:80px;">
          <h2>${weatherEmoji} ${data.current.condition.text}</h2>
          <p>🌡️ Temperature: ${data.current.temp_c} °C</p>
          <p>💧 Humidity: ${data.current.humidity}%</p>
          <p>🌬️ Wind Speed: ${data.current.wind_kph} kph</p>
        </div>
      `;
    })
    .catch((error) => {
      weatherResult.textContent = error.message;
    });
});
