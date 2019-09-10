var doc = document;

doc.addEventListener("DOMContentLoaded", myLoad);

function myLoad() {
    doc.getElementById("headerLogin").innerText = getLogin();
    doc.getElementById("logoLink").addEventListener("click", logout);
}
