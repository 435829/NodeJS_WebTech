/**
 * Created by Robert on 18-10-2017.
 */
function loadFilms() {
    // alert('Hello world');
    // $.get('http://localhost:3000/api/films/', function (films) {
    $.ajax({
        url: "http://localhost:3000/api/films/",
        type: "GET",

        contentType: 'application/json; charset=utf-8',
        success: function (jsonData) {
            for (var i = 0; i < jsonData.length; i++) {
                alert(jsonData[i].titel + " is geregisseerd door " + jsonData[i].regisseur);
            }
        }
    });
}

