// Api doc: https://openweathermap.org/current

const api = {
  key: "73bff582adc5e4a03568f4847cf1ecf9",
  base: "https://api.openweathermap.org/data/2.5/",
};

const fetchWeatherByCity = (city) => {
  fetch(`${api.base}weather?q=${city}&units=metric&appid=${api.key}`)
    .then((response) => {
      if (!response.ok) {
        alert(`No city found with name: ${city}`);
        throw new Error("City not found");
      }
      return response.json();
    })
    .then((data) => displayWeather(data));
};

const displayWeather = (data) => {
  const { name } = data;
  const { icon, description } = data.weather[0];
  const { temp } = data.main;

  document.querySelector(".city").innerText = "Weather now in " + name;
  document.querySelector(".temp").innerText = temp.toPrecision(2) + "°C";
  document.querySelector(".description").innerText = description;
  document.querySelector(".icon").src =
    "https://openweathermap.org/img/wn/" + icon + "@2x.png";
  document.querySelector(".weather").classList.remove("loading");
};

const successLocation = (pos) => {
  const crd = pos.coords;
  fetch(
    `${api.base}weather?lat=${crd.latitude}&lon=${crd.longitude}&units=metric&appid=${api.key}`
  )
    .then((response) => response.json())
    .then((data) => displayWeather(data));
};

const errorLocation = (err) => {
  console.warn(`ERROR(${err.code}): ${err.message}`);
};

navigator.geolocation.getCurrentPosition(successLocation, errorLocation);

document.querySelector(".search button").addEventListener("click", () => {
  fetchWeatherByCity(document.querySelector(".search-bar").value);
});

document.querySelector(".search-bar").addEventListener("keyup", (event) => {
  if (event.key == "Enter") {
    fetchWeatherByCity(document.querySelector(".search-bar").value);
  }
});
