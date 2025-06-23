// View of the map set to the latitude and longitude of Salzburg with a zoom of 13
const map = L.map('map').setView([47.8095, 13.0550], 13);

// Map initialization from the leaflet website
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Defining the circle variable 
var circle = L.circle([47.8095, 13.0550], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 500
});

const chargingLayer = L.layerGroup().addTo(map);
const fuelLayer = L.layerGroup().addTo(map);

// Overpass query for locations of charging stations
const chargingQuery = `
[out:json];
area[name="Salzburg"]->.searchArea;
node["amenity"="charging_station"](area.searchArea);
out center;
`;

// Name on mouse hover and other info on mouse click
fetch('https://overpass-api.de/api/interpreter', {
    method: 'POST',
    body: chargingQuery,
})
    .then(res => res.json())
    .then(data => {
        data.elements.forEach(el => {
            const latitude = el.lat;
            const longitude = el.lon;
            const tags = el.tags || {};

            const name = tags.name || 'Charging Station';
            const operator = tags.operator || 'Unknown operator';
            const opening_hours = tags.opening_hours || 'N/A';
            const socket = tags.socket_type || tags.socket || 'N/A';

            const marker = L.circle([latitude, longitude], {
                color: 'green',
                fillColor: '#3f3',
                fillOpacity: 0.5,
                radius: 50
            }).addTo(chargingLayer);

            marker.bindTooltip(name);
            marker.bindPopup(`
                <strong>${name}</strong><br>
                Operator: ${operator}<br>
                Opening hours: ${opening_hours}<br>
                Socket type: ${socket}
            `);
        });
    });


// Overpass query for locations of fuel stations
const fuelQuery = `
[out:json];
area[name="Salzburg"]->.searchArea;
node["amenity"="fuel"](area.searchArea);
out center;
`;

// Name on mouse hover and other info on mouse click
fetch('https://overpass-api.de/api/interpreter', {
    method: 'POST',
    body: fuelQuery,
})
    .then(res => res.json())
    .then(data => {
        data.elements.forEach(el => {
            const latitude = el.lat;
            const longitude = el.lon;
            const tags = el.tags || {};

            const name = tags.name || 'Fuel Station';
            const operator = tags.operator || 'Unknown operator';
            const opening_hours = tags.opening_hours || 'N/A';
            const brand = tags.brand || 'Unknown brand';
            const fuel_diesel = tags['fuel:diesel'] ? 'Yes' : 'No';
            const fuel_gasoline = tags['fuel:gasoline'] ? 'Yes' : 'No';

            const marker = L.circle([latitude, longitude], {
                color: 'blue',
                fillColor: '#30f',
                fillOpacity: 0.5,
                radius: 50
            }).addTo(fuelLayer);

            marker.bindTooltip(name);
            marker.bindPopup(`
                <strong>${name}</strong><br>
                Operator: ${operator}<br>
                Opening hours: ${opening_hours}</br>
                Brand: ${brand}<br>
                Diesel: ${fuel_diesel}<br>
                Gasoline: ${fuel_gasoline}
            `);
        });
    });

const legend = L.control({ position: 'bottomleft' });

// Legend added to the bottom left
legend.onAdd = function () {
    const div = L.DomUtil.create('div', 'info legend');
    div.innerHTML = `
        <h4>Charging stations vs gas stations</h4>
        <input type="checkbox" id="toggle-fuel" checked>
        <i style="background:blue; width: 20px; height: 20px; display: inline-block;"></i><b> Gas stations</b><br>
        <input type="checkbox" id="toggle-charging" checked>
        <i style="background:green; width: 20px; height: 20px; display: inline-block;"></i><b> Charging stations</b><br>
    `;
    return div;
};

legend.addTo(map);

map.whenReady(() => {
    const fuelCheckbox = document.getElementById('toggle-fuel');
    const chargingCheckbox = document.getElementById('toggle-charging');

    if (fuelCheckbox) {
        fuelCheckbox.addEventListener('change', function () {
            if (this.checked) {
                map.addLayer(fuelLayer);
            } else {
                map.removeLayer(fuelLayer);
            }
        });
    }
    if (chargingCheckbox) {
        chargingCheckbox.addEventListener('change', function () {
            if (this.checked) {
                map.addLayer(chargingLayer);
            } else {
                map.removeLayer(chargingLayer);
            }
        });
    }
});