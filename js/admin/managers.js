var doc = document;

doc.addEventListener("DOMContentLoaded", myLoad);
var ws = new SockJS("http://127.0.0.1:8087/admin-socket?Authorization=" + getAdminAccessToken());

function myLoad() {
    showClientsInfo();
    doc.getElementById("pills-info-tab").addEventListener("click", showClientsInfo);
    doc.getElementById("pills-card-tab").addEventListener("click", showCreditCardList);

// WebSocket
//     clientsWebSocketFunction(ws);
};