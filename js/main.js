import '../css/style.css';
import axios from 'axios';

const key = 'at_xQ4s4wzGXDzDpeGmfggC9aWmEFCjv';
const search = document.querySelector('#search');
const searchBtn = document.querySelector('#searchBtn');
const mapID = document.querySelector('#mapid');

const ip = document.querySelector('#ip');
const timezone = document.querySelector('#timezone');
const city = document.querySelector('#city');
const isp = document.querySelector('#isp');


let loading = true;
// Get The User IP info
window.onload =  function () {
    loader();
    init();
}

// Search For IP 
searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    
    loader();
    init();
})

// Initialize Details
async function init() {
    await axios.get(`https://geo.ipify.org/api/v1?apiKey=${key}&domain=${search.value}`).then(res => {
        ip.innerHTML = res.data.ip;
        isp.innerHTML = res.data.isp;
        city.innerHTML = res.data.location.city;
        timezone.innerHTML = 'UTC ' + res.data.location.timezone;
        initMap(res.data.location.lat,res.data.location.lng);
        loading = false;
    })
}

// Initialize Map
function initMap(lat,lng) {
    mapID.innerHTML = `<iframe width="100%" height="450" style="border:0" loading="lazy" allowfullscreen src="https://www.google.com/maps/embed/v1/place?key=AIzaSyCMNpRxrI9IQhJVKCYIkf3kMb71_AzaTpk&q=${lat},${lng}&zoom=14"></iframe>`;
}

// loader
function loader () {
    if (loading === true) {
        mapID.innerHTML = '<div class="flex justify-center items-center min-h-screen text-xl to-gray-800">Loading ... </div>';
        ip.innerHTML = 'loading ...';
        timezone.innerHTML = 'loading ...';
        city.innerHTML = 'loading ...';
        isp.innerHTML = 'loading ...';
    }
}

