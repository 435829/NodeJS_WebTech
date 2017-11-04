/**
 * Created by Robert on 18-10-2017.
 */
function loadFilms() {
    // $("#wait").style.display = '';
    $.ajax({
        url: "http://localhost:3000/api/films/",
        type: "GET",

        contentType: 'application/json; charset=utf-8',
        success: function (jsonData) {
            jsonData.forEach(function (film) {
                var ratingString = "";
                var rating = film.gem_beoordeling;
                var fullStar = '&#9733; ';
                var emptyStar = '&#9734; ';
                for (var g = 0; g < rating; g++) {
                    ratingString += fullStar;
                }
                for (var h = 0; h < 5 - rating; h++) {
                    ratingString += emptyStar;
                }
                $("#row").prepend($('<div id="film" class="col-lg-4 col-md-6 mb-4"><div class="card h-100"><a href="#"><img class="card-img-top" src="http://placehold.it/700x400" alt=""></a><div class="card-body"><h4 class="card-title"><a href="#">' +
                    film.titel + '</a></h4><h5>' +
                    film.datum + '</h5><p class="card-text">' +
                    film.beschrijving + '</p></div><div class="card-footer"><small class="text-muted">'
                    + ratingString
                    + '</small></div></div></div>'));
                var filmDiv = document.getElementById("film");
                filmDiv.onclick = function () {
                    loadFilm(film, ratingString);
                }

            });

            var el = document.getElementById('wait');
            el.parentNode.removeChild(el);
            el.style.display = 'none';
        }
    });



}
