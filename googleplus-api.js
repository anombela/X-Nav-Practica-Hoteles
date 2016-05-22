//esta es mi key personal
var apiKey = 'AIzaSyDiYcFJ-1glsvRMVeSAaTO-Y1dSEC3cGcg';

//Esto se cargara directamente y se usará mi key para autenticarme
function handleClientLoad() {
  gapi.client.setApiKey(apiKey);
  //makeApiCall();
}

// Load the API and make an API call.  Display the results on the screen.
//mode es por si es nuevo se añade al array , si no no se añade
function makeApiCall(id,hotel,mode) {
  gapi.client.load('plus', 'v1', function() {
    var request = gapi.client.plus.people.get({
      'userId': id  //AQUI PONGO MI NOMBRE
      // For instance:
      // 'userId': '+GregorioRobles'
    });
    request.execute(function(resp) {
      var heading = document.createElement('h4');
      var image = document.createElement('img');
      if (resp.image == undefined){
        alert('el id "' + id + '" no existe')
        return;
      }
      if (mode == "new"){
        hotel_users[hotel].push(id); //añade unid al array de usuarios del hotel
      }

      image.src = resp.image.url;
      heading.appendChild(image);
      heading.appendChild(document.createTextNode(resp.displayName));

      document.getElementById('content').appendChild(heading);
    });
  });
}
