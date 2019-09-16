var doc = document;

doc.addEventListener("DOMContentLoaded", myLoad);
var ws = new SockJS("http://" + mainServerHost + "/admin-socket?Authorization=" + getAdminAccessToken());

function myLoad() {

// WebSocket
    homeWebSocketFunction(ws);
};