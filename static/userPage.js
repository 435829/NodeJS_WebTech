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

    var table_div = $("#users_table");

    var htmlString = '<table><tr><th>Achternaam</th><th>Voornaam</th><th>Gebruikersnaam</th></tr>';

    var pos = 0;
    userData.forEach(function () {
        var lastName = userData[pos].achternaam;
        if (userData[pos].tussenvoegsels && userData[pos].tussenvoegsels !== 'niks') {
            lastName += ", " + userData[pos].tussenvoegsels;
        }
        htmlString += '<tr><td>' + lastName + '</td><td>' + userData[pos].voornaam + '</td><td>' + userData[pos].username + '</td></tr>';
        pos++;
    });
    htmlString += '</table>';
    table_div.prepend($(htmlString));


    // var table = $('<table></table>');

    // for (var i = 0; i < userData.length; i++) {
    //     //TODO users op pagina zetten in mooi tabelletje
    //     var row = $('<tr></tr>').addClass('bar').text("<td>" + userData[i].voornaam + "</td>" +
    //         "<td>" + userData[i].tussenvoegsels + "</td>" +
    //         "<td>" + userData[i].achternaam + "</td>" +
    //         "<td>" + userData[i].username + "</td>");
    //     table.append(row);
    // }
    // $("#users_table").prepend(table);
}