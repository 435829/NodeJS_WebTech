/**
 * Created by bolin on 2-11-2017.
 */

function loadUserInfo() {
    var token = sessionStorage.getItem("token");
    var username = sessionStorage.getItem("username");

    $.ajax({
        url: "http://localhost:3000/api/users/" + username,
        type: "GET",

        headers: {
            "authorization": token
        },
        contentType: 'application/json; charset=utf-8',
        success: function (jsonData) {
            showSingleUser(jsonData, username)
        },
        error: function (res) {
            setErrorMessage();
            console.log(res);
        }
    });
}

function showSingleUser(userData, username) {
    var table_div = $("#single_user");
    var username_h3 = $("#username_single");

    username_h3.prepend("<h3>" + username + "</h3>");

    table_div.prepend($("<table>" +
        "<tr>" +
        "<th>Voornaam</th>" +
        "<td>" + userData.voornaam + "</td>" +
        "</tr>" +
        "<tr>" +
        "<th>Achternaam</th>" +
        "<td>" + userData.achternaam + "</td>" +
        "</tr>" +
        "</table>"))
}

function setErrorMessage(){
    var errorMessageDiv = $("#error_message");

    errorMessageDiv.prepend("<div>Log in om deze pagina te kunnen bekijken</div>")
}