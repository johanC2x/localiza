var appModel = function () {
    var self = {
        map : null,
        infowindow : null,
        autocomplete : null,
        searchBox : null
    };

    self.initMap = function(){
        map = new GMaps({
            div: '#mapa',
            zoom: 13,
            lat: -12.043333,
            lng: -77.028333
        });
        map.addMarker({
            lat: -12.043333,
            lng: -77.028333
        });
    };

    self.searchMap = function(){
        var form = document.forms["frm_map_search"].getElementsByTagName("input");
        if(form.length > 0){
            var blank = false;
            for (var index = 0; index < form.length; index++) {
                var input = form[index];
                if(document.getElementById(input.id).value === ""){
                    blank = true;
                    return false;
                }
            }
            if(!blank){
                var map_address = document.getElementById("map_address").value;
                var map_pref = document.getElementById("map_pref").value;
                GMaps.geocode({
                    address: map_address,
                    callback: function(results, status) {
                        if (status === 'OK') {
                            var latlng = results[0].geometry.location;
                            /* BUSCANDO DIRECCIÓN EN MAPA */
                            var pyrmont = {lat: latlng.lat(), lng: latlng.lng()};
                            self.map = new google.maps.Map(document.getElementById('mapa'), {
                                center: pyrmont,
                                zoom: 16,
                                mapTypeId: 'roadmap'
                            });
                            self.infowindow = new google.maps.InfoWindow();
                            var service = new google.maps.places.PlacesService(self.map);
                            service.nearbySearch({
                                location: pyrmont,
                                radius: 500,
                                type: [map_pref]
                            }, self.callback);
                        }
                    }
                });
            }
        }
    };

    self.callback = function(results, status){
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            for (var i = 0; i < results.length; i++) {
                self.createMarker(results[i]);
            }
        }
    };

    self.createMarker = function(place){
        var placeLoc = place.geometry.location;
        var marker = new google.maps.Marker({
            map: self.map,
            position: place.geometry.location
        });

        google.maps.event.addListener(marker, 'click', function() {
            self.infowindow.setContent(place.name);
            self.infowindow.open(self.map, this);
        });
    };

    self.autocompletePlaces = function(){
        var input = document.getElementById('map_pref');
        self.searchBox = new google.maps.places.SearchBox(input);
    };

    return self;
}(jQuery);