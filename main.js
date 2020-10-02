import * as MapApiHandler from './modules/map/mapApiHandler.js';
import { getTemperatureByLatLng } from './modules/weather/weatherApiHandler.js';

const OFFCLASS = 'off';
const ONCLASS = 'on';

let weatherPointBtn = document.getElementById("weatherPoint_btn");
let weatherImg = document.getElementById("weatherImage");
let locationLbl = document.getElementById("location");
let timeLbl = document.getElementById("time");
let tempartureLbl = document.getElementById("temparture");
let humidityLbl = document.getElementById("humidity");
let descriptionLbl = document.getElementById("description");

weatherPointBtn.addEventListener("click", function () {
    if (weatherPointBtn.classList.contains(ONCLASS)) {
        weatherPointBtn.classList.remove(ONCLASS);
        weatherPointBtn.classList.add(OFFCLASS);
        MapApiHandler.deactivateGetLatLongOnMapClick();
    }
    else {
        weatherPointBtn.classList.remove(OFFCLASS);
        weatherPointBtn.classList.add(ONCLASS);
        MapApiHandler.activateGetLatLongOnMapClick();
    }
});

export const handleGetTempFromLatLng = (_lat, _lng) => {
    getTemperatureByLatLng(_lat, _lng);
}

export const showTemperature = ({ ...data }) => {
    console.log(data);
    setWeatherIcon(data.current.weather[0].icon);
    locationLbl.innerText = `Location: Lat:${data.lat}, Long: ${data.lon}`;
    let time = getHumanTime(data.current.dt);
    timeLbl.innerText = `Time: ${time}`;
    tempartureLbl.innerText = `Temperature: ${data.current.temp} °C`;
    humidityLbl.innerText = `Humidity: ${data.current.humidity} %`;
    descriptionLbl.innerText = `${data.current.weather[0].description}`;
};

const getHumanTime = (timestamp) => {
    var date = new Date(timestamp * 1000);
    // Hours part from the timestamp
    var hours = date.getHours();
    // Minutes part from the timestamp
    var minutes = "0" + date.getMinutes();

    // Will display time in 10:30 format
    return hours + ':' + minutes.substr(-2);
}

const setWeatherIcon = (iconCode)=>{
    let iconURL = `http://openweathermap.org/img/w/${iconCode}.png`;
    weatherImg.src = iconURL;
}