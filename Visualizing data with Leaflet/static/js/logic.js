    var geojson = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

    var  API_KEY ="pk.eyJ1Ijoiam11dGhvbmR1IiwiYSI6ImNrNTFybHN6OTAwNTYzbG1wams4bHExOXoifQ.q38G3KUFfULG8NCNMgzyGQ"

    d3.json(geojson, function(response) {
        
        createFeatures(response.features);
    });

    function createFeatures(response) {

        // Create a map
        var myMap = L.map("map", {
            center: [37.77, -122.41],
            zoom: 5
        });
        
        L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
            attribution: "Map response &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagnitudeery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
            maxZoom: 18,
            id: "mapbox.streets",
            accessToken: API_KEY
          }).addTo(myMap);

        //   Create markers reflecting the magnitude depending on the col
        response.forEach(feature => {

            var magnitude = feature.properties.mag;

            var col = "";
            if (magnitude <= 1) {
                col = "#ccff33";
            }
            else if (magnitude <= 2) {
                col = "#ffff33";
            }
            else if (magnitude <= 3) {
                col = "#ffe680";
            }
            else if (magnitude <= 4) {
                col = " #ffc61a";
            }
            else if (magnitude <= 5) {
                col = "#cc8800";
            }
            else {
                col = "#ff8000";
            }
        // Set the circle property depending with the latitude and the longitude

            L.circle([feature.geometry.coordinates[1],
                     feature.geometry.coordinates[0]], {
                        fillcol: col,
                        fillOpacity: 0.75,
                        color: col,
                        radius: magnitude * 15000
                     }).bindPopup("<h3> Location: " + feature.properties.place + "<hr>magnitude: " + magnitude + "</h3>").addTo(myMap);
        });
        
        // make the legend

        var legend = L.control({position: 'bottomright'});

        legend.onAdd = function() {

            var div = L.DomUtil.create('div', 'info legend');

            var legend_label = ["0-1", "1-2", "2-3", "3-4", "4-5", "5+"];

            var color = ["#ccff33", "#ffff33", "#ffe680",
                            " #ffc61a", "#cc8800", "#ff8000"];
        	var empty = []

    color.forEach(function(limit, index) {
      empty.push("<li style=\"background-color: " + color[index] + "\">"+legend_label[index]+"</li>");
    });

    div.innerHTML += "<ul>" + empty.join("") + "</ul>";
    return div;
  };

        legend.addTo(myMap);

        }
    