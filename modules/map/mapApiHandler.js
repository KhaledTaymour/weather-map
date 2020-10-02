import {handleGetTempFromLatLng} from '../../main.js'

//#region add map
const mymap = L.map('map_zone').setView([20, 20], 2);

const tileURL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const attribution = 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors';
const tiles = L.tileLayer(tileURL, {attribution});

tiles.addTo(mymap);

let marker;
//#endregion

//#region watermark
L.Control.Watermark = L.Control.extend({
    onAdd: function(mymap) {
        var img = L.DomUtil.create('img');

        img.src = '../../assets/favicon.ico';
        img.style.width = '50px';

        return img;
    },

    onRemove: function(mymap) {
        // Nothing to do here
    }
});

L.control.watermark = function(opts) {
    return new L.Control.Watermark(opts);
}

L.control.watermark({ position: 'bottomleft' }).addTo(mymap);
//#endregion

const handleClick = (e)=>{
    handleMarkers(e.latlng.lat, e.latlng.lng);
    handleGetTempFromLatLng(e.latlng.lat, e.latlng.lng);
}

export const activateGetLatLongOnMapClick = ()=>{
    mymap.addEventListener('click', handleClick );
};

export const deactivateGetLatLongOnMapClick = ()=>{
    mymap.removeEventListener('click', handleClick );
    mymap.off('click', handleClick);
};

const handleMarkers = (_lat, _lng) =>{
    if (marker != undefined) {
        mymap.removeLayer(marker);
    }
    marker = L.marker([_lat, _lng]).addTo(mymap);
}