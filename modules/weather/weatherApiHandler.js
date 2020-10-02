import {showTemperature} from '../../main.js';
import {API_KEY} from '../../apiKey.js';

const lang = navigator.language;

export const getTemperatureByLatLng = (_lat, _lng)=>{
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${_lat}&lon=${_lng}&appid=${API_KEY}&units=metric&lang=${lang}`)
    .then(res => res.json())
    .then(data => showTemperature(data))
    .catch(err => console.log(err));
}