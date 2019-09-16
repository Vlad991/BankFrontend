var doc = document;

doc.addEventListener("DOMContentLoaded", myLoad);
var ws = new SockJS("http://" + mainServerHost + "/manager-socket?Authorization=" + getManagerAccessToken());

function myLoad() {

// WebSocket
    homeWebSocketFunction(ws);
};