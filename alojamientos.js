
function show_accomodation(){

    var accomodation = accomodations[$(this).attr('no')];
    var lat = accomodation.geoData.latitude;
    var lon = accomodation.geoData.longitude;
    var url = accomodation.basicData.web;
    var name = accomodation.basicData.name;
    var desc = accomodation.basicData.body;

    //var img = accomodation.multimedia.media[0].url;
    var imgs = accomodation.multimedia.media;

    var cat = accomodation.extradata.categorias.categoria.item[1]['#text'];
    var subcat = accomodation.extradata.categorias.categoria
        .subcategorias.subcategoria.item[1]['#text'];
    L.marker([lat, lon]).addTo(map)
	   .bindPopup('<a href="' + url + '">' + name + '</a><br/>')
	   .openPopup();
    map.setView([lat, lon], 15);
    $('#info').html('<h2>' + name + '</h2>'
        + '<p>Type: ' + cat + ', subtype: ' + subcat + '</p>'
        + desc);

    ///////--CAROUSEL--////////////
    $("#carousel-indicators").html("");
    $("#carousel-imgs").html("");
    var first = ["class='active'"," active"]; // esto se pone en el primero solo

    for (var i = 0; i < imgs.length; i++) {
        console.log(imgs[i].url);
        $("#carousel-indicators").append("<li data-target='#carousel' data-slide-to='" + i +"' " + first[0] + "></li>");
        $("#carousel-imgs").append("<div class='item" + first[1] + "'>" +
                "<img src='" + imgs[i].url + "' alt='" + i + "'>" +
                "</div>");

        first = ["",""];
    };
    $("#carousel").show();

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
        $('li').click(show_accomodation);
    });
};

$(document).ready(function() {
    map = L.map('map').setView([40.4175, -3.708], 11);
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    $("#get").click(get_accomodations);
});
