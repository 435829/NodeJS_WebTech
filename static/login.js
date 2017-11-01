/**
 * Created by bolin on 1-11-2017.
 */
function login(username, password) {
    $.ajax({
        url: "http://localhost:3000/api/login/authenticate",
        type: "POST",

        contentType: 'application/json; charset=utf-8',
        data: {
            username: document.getElementById("username"),
            password: document.getElementById("password")
        },
        success: function (jsonData) {
            alert(jsonData);
        }
    });
}

function register() {

}