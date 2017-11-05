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
            if (token === null) {
                setErrorMessage();
            }
            console.log(res);
        }
    });
}

function showRatings(ratingData) {
    var table_div = $("#user_ratings");

    var htmlString = '<table border = "1" style="border-color: white" cellpadding="5"><tr><th>Gebruikersnaam</th><th>Film</th><th>Aantal sterren</th><th></th><th></th></tr>';

    var pos = 0;
    ratingData.forEach(function () {
        htmlString += '<tr><td>' + ratingData[pos].username + '</td>' +
            '<td>' + ratingData[pos].film_title + '</td>' +
            '<td>' + ratingData[pos].sterren + '</td>' +
            '<td bgcolor="red" style="color: white" onclick="deleteRating(\'' + ratingData[pos]._id + '\')">Verwijder</td>' +
            '<td bgcolor="#224172" style="color: white; margin-left: 10px" onclick="goToEditPage(\'' + ratingData[pos]._id + '\')">Wijzig</td></tr>';
        pos++;
    });
    htmlString += '</table>';
    table_div.prepend($(htmlString));
}

function deleteRating(ratingID) {

    var token = sessionStorage.getItem("token");

    $.ajax({
        url: "http://localhost:3000/api/ratings/" + ratingID + "/delete",
        type: "DELETE",

        headers: {
            "authorization": token
        },
        contentType: 'application/json; charset=utf-8',
        success: function () {
            alert("Rating deleted");
            window.location.href = "http://localhost:3000/ratingPage.html";
        },
        error: function (res) {
            if (token === null) {
                setErrorMessage();
            }
            console.log(res);
        }
    });
}

function goToEditPage(ratingID) {
    sessionStorage.setItem("ratingIDToEdit", ratingID);
    window.location.href = "http://localhost:3000/editRating.html";
}


function setErrorMessage() {
    var errorMessageDiv = $("#error_message");

    errorMessageDiv.prepend("<div>Log in om deze pagina te kunnen bekijken</div>");
    document.getElementById("ratingTableTitle").innerHTML = "";
    document.getElementById("verwijderMessage").innerHTML = "";
    document.getElementById("wijzigMessage").innerHTML = "";

}