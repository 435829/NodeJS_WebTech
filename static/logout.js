/**
 * Created by bolin on 2-11-2017.
 */
function logout() {
    if (window.sessionStorage.getItem("token") !== null) {
        window.sessionStorage.clear();
        alert("U bent uitgelogd");
    }
}