var layers = []

function deletemarker(lat,lon){

        for (var i = 0; i < layers.length; i++) {

            if (layers[i]._latlng.lat==lat && layers[i]._latlng.lng==lon){

                map.removeLayer(layers[i]);
                layers.splice(i, 1); //borra el de la posicion i
                break;
            }
        };
}

function show_info(no){

    var accomodation = accomodations[no];
    var lat = accomodation.geoData.latitude;
    var lon = accomodation.geoData.longitude;
    var url = accomodation.basicData.web;
    var name = accomodation.basicData.name;
    var desc = accomodation.basicData.body;
    var imgs = accomodation.multimedia.media;
    var cat = accomodation.extradata.categorias.categoria.item[1]['#text'];
    var subcat = accomodation.extradata.categorias.categoria
        .subcategorias.subcategoria.item[1]['#text'];

    $('#info').html('<h2>' + name + '</h2>'
        + '<p>Type: ' + cat + ', subtype: ' + subcat + '</p>'
        + desc);

    ///////--CAROUSEL--////////////
    $("#carousel-indicators").html("");
    $("#carousel-imgs").html("");
    var first = ["class='active'"," active"]; // esto se pone en el primero solo

    for (var i = 0; i < imgs.length; i++) {

        $("#carousel-indicators").append("<li data-target='#carousel' data-slide-to='" + i +"' " + first[0] + "></li>");
        $("#carousel-imgs").append("<div class='item" + first[1] + "'>" +
                "<img src='" + imgs[i].url + "' alt='" + i + "'>" +
                "</div>");

        first = ["",""];
    };
    if (imgs.length != 0)
        $("#carousel").show();

}


function show_accomodation(){

    var no = $(this).attr('no');
    var accomodation = accomodations[no];
    var lat = accomodation.geoData.latitude;
    var lon = accomodation.geoData.longitude;
    var url = accomodation.basicData.web;
    var name = accomodation.basicData.name;
    var markerexists = false;
    

    var marker = L.marker([lat, lon]);
   
    for (var i = 0; i < layers.length; i++) {

        if (layers[i]._latlng.lat==lat && layers[i]._latlng.lng==lon){
            markerexists = true;
            marker = layers[i];
            break;
        }
    }
    if (!markerexists){

        layers.push(marker);
        marker.addTo(map)
            .bindPopup('<a no="'+ no +'" href="' + url + '">' + name + '</a><br/>' + "<a href='#desc'>+ info</a><button id='delete' onclick='deletemarker("+lat+","+lon+")'></button>")
       
    }
    marker.openPopup();
    map.setView([lat, lon], 15); 

};

function get_accomodations(){

    $.getJSON("json/alojamientos.json", function(data) { 

        accomodations = data.serviceList.service;
        $('#get').html('<p>Alojamientos encontrados: ' + accomodations.length + '</p>');

        var list = '<ul>'
        for (var i = 0; i < accomodations.length; i++) {
            list = list + '<li no=' + i + '>' + accomodations[i].basicData.title + '</li>';
        }
        list = list + '</ul>';
        $('#list').html(list);

        $('#list li').click(show_accomodation);
        
    });
};


$(document).ready(function() {

      $('#tabs').tab();

    map = L.map('map').setView([40.4175, -3.708], 11);
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    $("#get").click(get_accomodations);


    map.on('popupopen', function() {

        //conseguit la posicion de la lista que le pase al popup
        show_info($(this._popup._content).attr('no'));
 
    });

    

});
