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

    var table = $('<table></table>');

    for (var i = 0; i < userData.length; i++) {
        //TODO users op pagina zetten in mooi tabelletje
        var row = $('<tr></tr>').addClass('bar').text("<td>" + userData[i].voornaam + "</td>" +
            "<td>" + userData[i].tussenvoegsels + "</td>" +
            "<td>" + userData[i].achternaam + "</td>" +
            "<td>" + userData[i].username + "</td>");
        table.append(row);
    }
    $('#row_users_table').append(table);
}