const apikey = "c870a0b6ec14a0f224df5c1ae409dbed";
const apiurl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const currentLocationWeather = "https://api.openweathermap.org/data/2.5/weather";
const currentLocation = "https://timeapi.io/api/time/current/coordinate";

const searchBar = document.querySelector(".search-bar-input");
const searchBtn = document.querySelector(".search-btn");
const button = document.getElementById("getloacation");
const searchBarInput = document.querySelector('.search-bar-input');
const searchData = document.querySelector('.search-data');
console



button.addEventListener("click", async () => {
  navigator.geolocation.getCurrentPosition(gotlocation, faildToGet);
});

function gotlocation(position) {


  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;

 

  // Update the latitude and longitude display
  document.querySelector(".current-location-lat").innerHTML = `${latitude}`;
  document.querySelector(".current-lon").innerHTML = `${longitude}`;

  // Fetch the weather data for the current location
  fetchWeatherByCoordinates(latitude, longitude);

  // Optionally, fetch the time by location
  updateTimeBylocation(latitude, longitude);
}

function faildToGet() {
  console.log("Failed to get location.");
}

async function fetchWeatherByCoordinates(latitude, longitude) {
  const weatherApiUrl = `${currentLocationWeather}?lat=${latitude}&lon=${longitude}&units=metric&appid=${apikey}`;
  
  try {
    const response = await fetch(weatherApiUrl);
    const data = await response.json();

    
    document.querySelector(".current-city").innerHTML = data.name;
    document.querySelector(".country-code").innerHTML = data.sys.country;
    document.querySelector(".current-temp").innerHTML = Math.round(data.main.temp) + "&#176;C";
    document.querySelector(".current-weather").innerHTML = data.weather[0].main;
    document.querySelector(".current-wind").innerHTML = data.wind.speed + " km/h";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
  } catch (error) {
    console.log("Error fetching weather:", error);
  }
}

async function updateTimeBylocation(latitude, longitude) {
  const timeApiUrl = `${currentLocation}?latitude=${latitude}&longitude=${longitude}`;
  
  try {
    const response = await fetch(timeApiUrl);
    const data = await response.json();
  } catch (error) {
    console.log("Error fetching time:", error);
  }
}

async function checkWeather(city) {
  const response = await fetch(apiurl + city + `&appid=${apikey}`);
  const data = await response.json();

   if(data.cod==="404"){
    searchData.style.display="none";
    alert("wrong city name")
   }
  document.querySelector("#search-city").innerHTML = data.name;
  document.querySelector(".country-code").innerHTML = data.sys.country;
  document.querySelector(".searchTemp").innerHTML = Math.round(data.main.temp) + "&#176;C";
  document.querySelector(".searchTempSide").innerHTML = Math.round(data.main.temp) + "&#176;C";
  document.querySelector("#search-weather").innerHTML = data.weather[0].main;
  document.querySelector("#search-wind").innerHTML = data.wind.speed + " km/h";
  document.querySelector("#search-humidity").innerHTML = data.main.humidity + "%";
  document.querySelector(".searchLat").innerHTML=data.coord.lat;
  document.querySelector(".searchLong").innerHTML=data.coord.lat;
}

searchBtn.addEventListener("click", () => {
  checkWeather(searchBar.value);
});


searchBar.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    checkWeather(searchBar.value);
  }
});
 
let daysArray = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

let currentTime=new Date()
let hrs= document.querySelector(".current-hour");
let minutes=document.querySelector(".current-minutes")
let seconds=document.querySelector(".current-seconds")
let date=document.querySelector(".currentDate")
let days=document.querySelector(".day")

setInterval(()=>{
  let currentcontent=new Date();

  hrs.innerHTML=currentcontent.getHours()+":" +" ";
  minutes.innerHTML=(currentcontent.getMinutes()<10?" 0":"")+currentcontent.getMinutes();
  date.innerHTML=(currentcontent.getDate()<10?"0":"")+currentcontent.getDate()
  
  days.innerHTML = daysArray[currentcontent.getUTCDay()];
}, 1000);

function displaySearchData(){
  if(searchBarInput.value.trim()!==""){
    searchData.style.display = "flex"; 
  }
}
searchBarInput.addEventListener('keypress', function(event) {
  if (event.key === 'Enter') {
    displaySearchData();
  }
});
window.onload = function() {
  setTimeout(function() {
    alert('click permision button below to start'); 
  }, 2000); 
};