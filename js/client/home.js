var doc = document;

doc.addEventListener("DOMContentLoaded", myLoad);
var ws = new SockJS("http://127.0.0.1:8087/client-socket?Authorization=" + getClientAccessToken());

function myLoad() {
    doc.getElementById("headerLogin").innerText = getLogin();
    dragElement(doc.getElementById("messenger"));
    showMessenger(doc.getElementById("messengerHeader"));

// WebSocket
    mainWebSocketFunction(ws);
};