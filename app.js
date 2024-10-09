const apikey="c870a0b6ec14a0f224df5c1ae409dbed";
const apiurl="https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const currentLocation="https://timeapi.io/api/time/current/coordinate"
const currentWeatherData="https://api.openweathermap.org/data/2.5/weather?"
const searchBar = document.querySelector(".search-bar-input");
const searchBtn = document.querySelector(".search-btn");
const  button= document.getElementById("getloacation")

button.addEventListener("click", async()=>{
	navigator.geolocation.getCurrentPosition(gotlocation,faildToGet)
	
	
});

function gotlocation(position){
	console.log("got location");

	const latitude=position.coords.latitude;
	const longitude=position.coords.longitude;
	console.log( "lat" ,latitude);
	console.log("long", longitude);
	
	    document.querySelector(".current-location-lat").innerHTML=`${latitude}`
		document.querySelector(".current-lon").innerHTML=`${longitude}`
		
		fetchWeatherBycordinates(latitude,longitude);	

	updateTimeBylocation(latitude,longitude);
}
function faildToGet(){
	console.log("faild to get location.")
}
async function fetchWeatherBycordinates(latitude,longitude) {
	const weatherApiurl=`$ { currentWeatherData}?lat=${latitude}&lon=${longitude}&units=metric&appid=${apikey}`
	try {
		const response = await fetch(currentLocation);
		const data = await response.json();
		// console.log("Weather data:", data);
	
		// Update the weather display with the current data
		document.querySelector(".current-city").innerHTML = data.name;
		document.querySelector(".country-code").innerHTML = data.sys.country;
		document.querySelector("#searchTemp").innerHTML = Math.round(data.main.temp) + "&#176;C";
		document.querySelector(".current-weather").innerHTML = data.weather[0].main;
		document.querySelector(".current-wind").innerHTML = data.wind.speed + " km/h";
		document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
	  } catch (error) {
		console.log("Error fetching weather:", error);
	  }
	
}

async function updateTimeBylocation(latitude,longitude) {
	const timeapi=`${currentLocation}?latitude=${latitude}&longitude=&{longitude}`
	try {
		const response = await fetch(timeApiUrl);
		const data = await response.json();
		console.log("Current time data:", data);
	
		// Optionally, update the time display (if you have a time field)
		document.querySelector(".current-time").innerHTML = `Current Time: ${data.dateTime}`;
	  } catch (error) {
		console.log("Error fetching time:", error);
	  }
	
}

async function checkWeather(city) {
	const response=	await fetch(apiurl+ city+`&appid=${apikey}`);
	var data= await response.json();
	console.log("output is",data.name);
	

	document.querySelector(".current-city").innerHTML = data.name;
	document.querySelector(".country-code").innerHTML = data.sys.country;
	document.querySelector("#searchTemp").innerHTML = Math.round(data.main.temp) + "&#176;C";
	document.querySelector(".current-weather").innerHTML = data.weather[0].main;
	document.querySelector(".current-wind").innerHTML = data.wind.speed +" km/h";
	document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
}



searchBtn.addEventListener("click", () => {
    checkWeather(searchBar.value);
});

// Search when pressing Enter
searchBar.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        checkWeather(searchBar.value);
    }
})