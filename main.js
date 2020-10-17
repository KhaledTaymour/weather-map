import * as MapApiHandler from './modules/map/mapApiHandler.js';
import { getTemperatureByLatLng, getWeatherIcon } from './modules/weather/weatherApiHandler.js';

const OFFCLASS = 'off';
const ONCLASS = 'on';

let initialWeatherCard = document.querySelector('#initial_weather_card');
let weatherContainer = document.querySelector('#weather_container');
let mapZone = document.querySelector('#map_zone');
let weatherPointBtn = document.getElementById("weatherPoint_btn");
let locationLbl = document.getElementById("location");
let tempartureLbl = document.getElementById("temparture");
let humidityLbl = document.getElementById("humidity");
let descriptionLbl = document.getElementById("description");
let weatherIcon = document.querySelector('#weather_icon');
let isFirstQuery = true;

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mapZone && mapZone.classList.contains('cursor-cross')) {
        switchGettingWeather(false);
    }
});

const switchGettingWeather = (isOn) => {
    if (isOn) {
        mapZone.classList.add('cursor-cross');
        weatherPointBtn.classList.remove(OFFCLASS);
        weatherPointBtn.classList.add(ONCLASS);
        MapApiHandler.activateGetLatLongOnMapClick();
    }
    else {
        mapZone.classList.remove('cursor-cross');
        weatherPointBtn.classList.remove(ONCLASS);
        weatherPointBtn.classList.add(OFFCLASS);
        MapApiHandler.deactivateGetLatLongOnMapClick();
    }
}

weatherPointBtn.addEventListener("click", function () {
    if (weatherPointBtn.classList.contains(ONCLASS)) {
        switchGettingWeather(false);
    }
    else {
        switchGettingWeather(true);
    }
});

export const handleGetTempFromLatLng = (_lat, _lng) => {
    getTemperatureByLatLng(_lat, _lng);
}

export const showTemperature = ({ ...data }) => {
    console.log(locationLbl, data);
    locationLbl.innerText = `Location: Lat:${data.lat}, Long: ${data.lon}`;
    tempartureLbl.innerText = `Temperature: ${data.current.temp} °C`;
    humidityLbl.innerText = `Humidity: ${data.current.humidity} %`;
    descriptionLbl.innerText = `${data.current.weather[0].description}`;
    showWeatherIcon(data.current.weather[0].icon, true);
    if (isFirstQuery) {
        initialWeatherCard.style.display = 'none';
        weatherContainer.style.display = 'block';
        isFirstQuery = false;
    }
};

const showWeatherIcon = (iconCode, isIconSizeDoubled) => {
    let currentWeatherIcon = getWeatherIcon(iconCode, isIconSizeDoubled);
    weatherIcon.src = currentWeatherIcon;
}