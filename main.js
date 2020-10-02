import * as MapApiHandler from './modules/map/mapApiHandler.js';
import {getTemperatureByLatLng} from './modules/weather/weatherApiHandler.js';

const OFFCLASS = 'off';
const ONCLASS = 'on';

let weatherPointBtn = document.getElementById("weatherPoint_btn");
let locationLbl = document.getElementById("location");
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

export const handleGetTempFromLatLng = (_lat, _lng)=>{
    getTemperatureByLatLng(_lat, _lng);
}

export const showTemperature = ({...data})=>{
    console.log(locationLbl, data);
    locationLbl.innerText = `Location: Lat:${data.lat}, Long: ${data.lon}`;
    tempartureLbl.innerText = `Temperature: ${data.current.temp} °C`;
    humidityLbl.innerText = `Humidity: ${data.current.humidity} %`;
    descriptionLbl.innerText = `${data.current.weather[0].description}`;
};