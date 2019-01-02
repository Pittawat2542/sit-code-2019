function initMap() {
    var map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: 13.652804, lng: 100.493642 },
      zoom: 17
    });
  
    var infowindow = new google.maps.InfoWindow();
    var service = new google.maps.places.PlacesService(map);
  
    service.getDetails(
      {
        placeId: "ChIJ9ZZzpVGi4jARI56-Js0p2C8"
      },
      function(place, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          var marker = new google.maps.Marker({
            map: map,
            position: place.geometry.location
          });
          google.maps.event.addListener(marker, "click", function() {
            infowindow.setContent(
              "<div><strong>" +
                place.name +
                "</strong><br>" +
                place.formatted_address +
                "</div>"
            );
            infowindow.open(map, this);
          });
        }
      }
    );
  }
  