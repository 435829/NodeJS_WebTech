/**
 * Created by bolin on 1-11-2017.
 */
function login() {

    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var apiURL = "http://localhost:3000/api/login/authenticate/";

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
            alert("U bent ingelogd");
            sessionStorage.setItem("token", jsonData);
        },
        error: function (res) {
            alert(apiURL);
            console.log(res);
        }
    });
}

function register() {

    var username = document.getElementById("register_username").value;
    var password = document.getElementById("register_password").value;
    var voornaam = document.getElementById("register_voornaam").value;
    var tussenvoegsels = document.getElementById("register_tussenvoegsels").value;
    var achternaam = document.getElementById("register_achternaam").value;
    var apiURL = "http://localhost:3000/api/users/register";

    $.ajax({
        url: apiURL,
        type: "POST",

        data: JSON.stringify({
            username: username,
            password: password,
            voornaam: voornaam,
            tussenvoegsels: tussenvoegsels,
            achternaam: achternaam}),

        contentType: 'application/json; charset=utf-8',
        success: function () {
            alert("U bent geregistreerd");
        },
        error: function (res) {
            alert(res);
            console.log(res);
        }

    })
}