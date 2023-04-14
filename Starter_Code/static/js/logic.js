// Creating the map object
var myMap = L.map("map", {
  center: [40.4637, -3.7492],
  zoom: 3
});

// Adding the tile layer - we are using openstreetmap for the map
//attribution tells where the map is coming from to people viewing
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// Use this link to get the GeoJSON data. - let is private/var is public - var is used here 
var link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

function getColor(depth) {
    if(depth > 90) {
     //   return "#ea2c2c"
     } else if (depth >70) {
       return "#ea822c"
     } else if (depth >50) {
       return "#ee9c00"
    } else if (depth >30) {
       return "#eecc00"
    } else if (depth >10) {
       return "#d4ee00"
    } else {
       return "98ee00"
    }
}

function getRadius(magnitude) {
    if(magnitude === 0) {
        return 1
    }
    return magnitude * 4
}

// Getting our GeoJSON data
d3.json(link).then(function(data) {
  console.log(data);

  function styleInfo(feature) {
    return {
        opacity: 2,
        fillOpacity: 2,
        fillColor: getColor(feature.geometry.coordinates[2]),
        color: "#000000",
        radius: getRadius(feature.properties.mag),
        stroke: true,
        weight: 0.5,
        
    }
  }


  L.geoJson(data, {
    pointToLayer: function(feature, latlng) {
        return L.circleMarker(latlng);
     },
    style: styleInfo,
    onEachFeature: function(feature, layer) {
        layer.bindPopup(`
            Magnitude: ${feature.properties.mag} <br>
            Depth: ${feature.geometry.coordinates[2]} <br>
            Location: ${feature.properties.place}
    `);
   }
  }).addTo(map);
})


