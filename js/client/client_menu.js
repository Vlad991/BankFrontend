var doc = document;

doc.addEventListener("DOMContentLoaded", myLoad);
var ws = new SockJS("http://" + mainServerHost + "/client-socket?Authorization=" + getClientAccessToken());

function myLoad() {
    doc.getElementById("headerLogin").innerText = getLogin();
    dragElement(doc.getElementById("messenger"));
    showMessenger(doc.getElementById("messengerHeader"));
    showClientInfo();

// Client Menu events
    doc.getElementById("v-pills-info-tab").addEventListener("click", showClientInfo);
    doc.getElementById("v-pills-cards-tab").addEventListener("click", showCreditCardList);

// WebSocket
    mainWebSocketFunction(ws);
};