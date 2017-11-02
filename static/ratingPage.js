/**
 * Created by bolin on 2-11-2017.
 */
function loadRatings() {
    var token = sessionStorage.getItem("token");

    $.ajax({
        url: "http://localhost:3000/api/ratings/",
        type: "GET",

        headers: {
            "authorization": token
        },
        contentType: 'application/json; charset=utf-8',
        success: function (jsonData) {
            showRatings(jsonData)
        },
        error: function (res) {
            setErrorMessage();
            console.log(res);
        }
    });
}

function showRatings(ratingData) {
    var table_div = $("#user_ratings");

    var htmlString = '<table border = "1" cellpadding="5"><tr><th>Username</th><th>Film</th><th>Aantal sterren</th></tr>';

    var pos = 0;
    ratingData.forEach(function () {
        htmlString += '<tr><td>' + ratingData[pos].username + '</td><td>' + ratingData[pos].film_title + '</td><td>' + ratingData[pos].sterren + '</td></tr>';
        pos++;
    });
    htmlString += '</table>';
    table_div.prepend($(htmlString));
}





function setErrorMessage(){
    var errorMessageDiv = $("#error_message");

    errorMessageDiv.prepend("<div>Log in om deze pagina te kunnen bekijken</div>")
}