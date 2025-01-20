const options = {
  method: "GET",
  headers: {
    "x-rapidapi-key": "9958c92e3fmsh232ed284cbab050p16273bjsn37875020a191",
    "x-rapidapi-host": "global-weather-data2.p.rapidapi.com",
  },
};

const cities = ['Tokyo', 'Delhi', 'Shanghai', 'London', 'Dubai'];

const getWeather = async (city) => {
  const url = `https://global-weather-data2.p.rapidapi.com/getglobalweather?location=`+city;

  try {
    const response = await fetch(url, options);
    const rep = await response.json();
    console.log(rep);

    // Update individual city weather details
    document.getElementById("cityName").innerHTML = city;
    document.getElementById("TempC").innerHTML = rep.TempC;
    document.getElementById("TempF").innerHTML = rep.TempF;
    document.getElementById("Weather").innerHTML = rep.Weather;
    document.getElementById("WindDir").innerHTML = rep.WindDir;
    document.getElementById("WindSpeed").innerHTML = rep.WindSpeed;

    // Return the response object
    return rep;
  } catch (error) {
    console.error(error);
  }
}

const updateTable = async () => {
  for (let city of cities) {
    const rep = await getWeather(city);
    if (rep) {
      document.getElementById(`${city.toLowerCase()}-tempC`).innerHTML = rep.TempC;
      document.getElementById(`${city.toLowerCase()}-tempF`).innerHTML = rep.TempF;
      document.getElementById(`${city.toLowerCase()}-weather`).innerHTML = rep.Weather;
      document.getElementById(`${city.toLowerCase()}-windDir`).innerHTML = rep.WindDir;
      document.getElementById(`${city.toLowerCase()}-windSpeed`).innerHTML = rep.WindSpeed;
    }
  }
};

// Event listener for search functionality
document.getElementById('submit').addEventListener('click', async (e) => {
  e.preventDefault();
  const city = document.getElementById('city').value;
  await getWeather(city);
});

// Call updateTable to initialize weather data on page load
window.onload = updateTable;
