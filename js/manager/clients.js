var doc = document;

doc.addEventListener("DOMContentLoaded", myLoad);
var ws = new SockJS("http://" + mainServerHost + "/manager-socket?Authorization=" + getManagerAccessToken());

function myLoad() {
    showClientsInfo();
    doc.getElementById("pills-info-tab").addEventListener("click", showClientsInfo);
    doc.getElementById("pills-card-tab").addEventListener("click", showCreditCardList);

// WebSocket
    clientsWebSocketFunction(ws);
};