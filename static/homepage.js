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
                printFilmWithPoster(film);
            });

            var el = document.getElementById('wait');
            el.parentNode.removeChild(el);
            el.style.display = 'none';
        }
    });


}

function getRatingString(rating) {
    var ratingString = "";
    var fullStar = '&#9733; ';
    var emptyStar = '&#9734; ';
    for (var g = 0; g < rating; g++) {
        ratingString += fullStar;
    }
    for (var h = 0; h < 5 - rating; h++) {
        ratingString += emptyStar;
    }
    return ratingString;
}

function getFilmPoster(title) {
    var url = "http://www.omdbapi.com/?apikey=8867358f&t=night+at+the+museum";
    $.ajax({
        url: url,
        type: "GET",
        // contentType: 'application/json; charset=utf-8',
        success: function (json) {
            // alert(json.Poster);

            return json.Poster;
        },
        error: function (err) {
            alert("ERROR:" + err);
        }
    });
}

function printFilmWithPoster(film) {
    var filmTitlePlus = film.titel.split(' ').join('+');
    var url = "http://www.omdbapi.com/?apikey=8867358f&t=" + filmTitlePlus;
    $.ajax({
        url: url,
        type: "GET",
        success: function (json) {
            var ratingString = getRatingString(film.gem_beoordeling);
            var filmToShow = film;
            $("#row").prepend($('<div id="film" class="col-lg-4 col-md-6 mb-4"><div class="card h-100" onclick="goToFilmPage(\'' + film.titel + '\')"><a href="#"><img class="card-img-top" src=' +
                json.Poster +
                ' alt=""></a><div class="card-body"><h4 class="card-title"><a href="#" >' +
                film.titel + '</a></h4><h5>' +
                film.datum + '</h5><p class="card-text">' +
                film.beschrijving + '</p></div><div class="card-footer"><small class="text-muted">'
                + ratingString
                + '</small></div></div></div>'));
            var filmDiv = document.getElementById("film");
            filmDiv.onclick = function () {
                loadFilm(film, ratingString);
            }
        },
        error: function (err) {
            alert("ERROR:" + err);
        }
    });
}

function goToFilmPage(filmtitle) {
    sessionStorage.setItem("filmForDetails", filmtitle);
    window.location.href = "http://localhost:3000/filmPage.html";
}
