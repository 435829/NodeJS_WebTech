/**
 * Created by bolin on 1-11-2017.
 */
function loadFilm() {
    var filmTitle = sessionStorage.getItem("filmForDetails");
    loadFilmByTitle(filmTitle);

}

function loadFilmByTitle(filmTitle) {
    var url = "http://localhost:3000/api/films/" + filmTitle;
    $.ajax({
        url: url,
        type: "GET",

        contentType: 'application/json; charset=utf-8',
        success: function (film) {
            printDetailFilmWithPoster(film);
            // alert(film.regisseur);

        }
    });


}

function printDetailFilmWithPoster(film) {
    var filmTitlePlus = film.titel.split(' ').join('+');
    var url = "http://www.omdbapi.com/?apikey=8867358f&t=" + filmTitlePlus;
    $.ajax({
        url: url,
        type: "GET",
        success: function (json) {
            var ratingString = getRatingStringDetail(film.gem_beoordeling);
            $("#film_container").prepend($('<div id="film" class="col-lg-4 col-md-6 mb-4">' +
                '<h1 style="width:1000px;">' + film.titel + " (" + film.datum + ") " + '</h1>' +
                '<img class="card-img-top" src=' + json.Poster + ' alt=' + film.titel +
                '>' +
                '<p class="card-text" style="width:1000px;">' + film.beschrijving + '</p>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div class="card h-100">' +
                '<a href="#"><div class="card-img-top"></div></a>' +
                '<p>Mensen geven deze film gemiddeld ' + film.gem_beoordeling + ' sterren</p> ' +
                '<form method="POST" action=javascript:rateFilm()>' +
                'Mijn beoordeling:<br>' +
                '<input type="text" name="myRating" id="myRating"><br><br>' +
                ' <input type="submit" value="Bevestig"><br>' +
                '</form>' +
                '<p style="color: red" id="error_new_rating"></p> '
            ))
            ;
        },
        error: function (err) {
            alert("ERROR:" + err);
        }
    });
}

function getRatingStringDetail(rating) {
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

function rateFilm() {
    var filmTitle = sessionStorage.getItem("filmForDetails");
    var newRating = document.getElementById("myRating").value;
    var token = sessionStorage.getItem("token");

    if (newRating < 0 || newRating > 5 || newRating % 0.5 !== 0) {
        $("#error_new_rating").text("Ongeldige waarde");
    } else if (!token) {
        alert("Voor deze functie dient u ingelogd te zijn");
    } else {

        $.ajax({
            url: "http://localhost:3000/api/ratings/rate/",
            type: "POST",

            headers: {
                "authorization": token
            },
            data: JSON.stringify({
                rating: newRating,
                filmTitle: filmTitle
            }),
            contentType: 'application/json; charset=utf-8',
            success: function () {
                window.location.href = "http://localhost:3000/ratingPage.html";
                alert("Rating toegevoegd");
            },
            error: function (res) {
                setErrorMessage();
                console.log(res);
            }
        });
    }
}