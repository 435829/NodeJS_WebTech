/**
 * Created by Robert on 18-10-2017.
 */
function loadFilms() {
    // alert('Hello world');
    // $.get('http://localhost:3000/api/films/', function (films) {
    jQuery.ajax({
        url: "http://localhost:3000/api/films/",
        type: "GET",

        contentType: 'application/json; charset=utf-8',
        success: function (resultData) {
            alert("Succes");
            var JSON = JSON.parse(resultData);
            alert(JSON[1].film_title);
            // alert(resultData);

        },
        error: function (jqXHR, textStatus, errorThrown) {
        },
    });
}

