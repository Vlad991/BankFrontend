var doc = document;

doc.addEventListener("DOMContentLoaded", myLoad);

function myLoad() {
    doc.getElementById("headerLogin").innerText = (getLogin() == null) ? "Log in!" : getLogin();
    doc.getElementById("logoLink").addEventListener("click", logout);
}
