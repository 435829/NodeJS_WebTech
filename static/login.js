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
            sessionStorage.setItem("token", jsonData);
            sessionStorage.setItem("username", username);
            window.location.href = "http://localhost:3000/index.html" ;
            alert("U bent ingelogd");
        },
        error: function () {
            window.location.href = "http://localhost:3000/login.html" ;
            alert("Verkeerde gebruikersnaam/wachtwoord combinatie")
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
            window.location.href = "http://localhost:3000/index.html" ;
        },
        error: function () {
            window.location.href = "http://localhost:3000/register.html" ;
            alert("Niet alle velden zijn ingevuld");
        }

    })
}