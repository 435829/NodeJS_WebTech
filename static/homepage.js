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
            loadAverageRating(jsonData)
            // var div = '<div class="col-lg-4 col-md-6 mb-4"><div class="card h-100"><a href="#"><img class="card-img-top" src="http://placehold.it/700x400" alt=""></a><div class="card-body"><h4 class="card-title"><a href="#">Item One</a></h4><h5>$24.99</h5><p class="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet numquam aspernatur!</p></div><div class="card-footer"><small class="text-muted">&#9733; &#9733; &#9733; &#9733; &#9734;</small></div></div></div>';

        }
    });
}

function loadAverageRating(filmData) {
    for (var i = 0; i < filmData.length; i++) {
        var ratingString = "";
        var apiURL = 'http://localhost:3000/api/films/' + filmData[i].titel + '/averageRating/';
        // alert(apiURL);
        $.ajax({
            // url: apiURL,
            url: apiURL,
            type: "GET",

            contentType: 'application/json; charset=utf-8',
            success: function (ratingData) {
                // alert("Data is binnen" + ratingData);
                var rating = ratingData;
                var fullStar = '&#9733; ';
                var emptyStar = '&#9734; ';
                // alert(filmData[i].titel);
                for (var g = 0; g < rating; g++) {
                    ratingString += fullStar;
                }
                for (var h = 0; h < 5 - rating; h++) {
                    ratingString += emptyStar;
                }
                alert(ratingString);
            }
        });
        // alert(jsonData[i].titel + " is geregisseerd door " + jsonData[i].regisseur);

    }
    // alert("Dit werkt tenminste");

}

