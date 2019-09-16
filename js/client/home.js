var doc = document;

doc.addEventListener("DOMContentLoaded", myLoad);
var ws = new SockJS("http://" + mainServerHost + "/client-socket?Authorization=" + getClientAccessToken());

function myLoad() {
    doc.getElementById("headerLogin").innerText = getLogin();
    dragElement(doc.getElementById("messenger"));
    showMessenger(doc.getElementById("messenger"));
    hideMessenger(doc.getElementById("messengerImage"));

// WebSocket
    mainWebSocketFunction(ws);
};