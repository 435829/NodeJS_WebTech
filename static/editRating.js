/**
 * Created by bolin on 4-11-2017.
 */
function editRating() {

    var ratingID = sessionStorage.getItem("ratingIDToEdit");
    var newRating = document.getElementById("newRating").value;
    var token = sessionStorage.getItem("token");

    $.ajax({
        url: "http://localhost:3000/api/ratings/" + ratingID + "/edit",
        type: "PUT",

        headers: {
            "authorization": token
        },
        data: JSON.stringify({
            rating: newRating
        }),
        contentType: 'application/json; charset=utf-8',
        success: function () {
            window.location.href = "http://localhost:3000/ratingPage.html";
            alert("Rating edited");
        },
        error: function (res) {
            setErrorMessage();
            console.log(res);
        }
    });
}