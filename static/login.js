/**
 * Created by bolin on 1-11-2017.
 */
function login() {

    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var apiURL = "http://localhost:3000/api/login/authenticate/";
    alert(apiURL);

    // alert(username + password);

    $.ajax({
        url: apiURL,
        type: "POST",

        data: JSON.stringify({
            username: username,
            password: password
        }),
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        success: function (jsonData) {
            alert(jsonData);
            sessionStorage.setItem("token", jsonData);
            alert(sessionStorage.getItem("token"));
        },
        error: function (res) {
            alert(apiURL);
            console.log(res);
        }
    });
}

function register() {

}