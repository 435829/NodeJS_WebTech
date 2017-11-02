/**
 * Created by bolin on 1-11-2017.
 */

function loadUsers() {

    var token = sessionStorage.getItem("token");

    $.ajax({
        url: "http://localhost:3000/api/users/",
        type: "GET",

        headers: {
            "authorization": token
        },
        contentType: 'application/json; charset=utf-8',
        success: function (jsonData) {
            showUsers(jsonData)
        },
        error: function (res) {
            console.log(res);
        }
    });

}

function showUsers(userData) {
    for (var i = 0; i < userData.length; i++) {
        alert(userData[i]);
        //TODO users op pagina zetten in mooi tabelletje
    }
}