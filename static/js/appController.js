$(function () {
    var self = appModel;

    if($("#mapa").length){
        self.initMap();
        self.autocomplete = new google.maps.places.Autocomplete((document.getElementById('map_address')),{types:['geocode']});
        self.autocompletePlaces();
    }

    document.getElementById("btn_search_map").onclick = function () {
        self.searchMap();
    };

});