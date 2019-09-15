var doc = document;

doc.addEventListener("DOMContentLoaded", myLoad);
var ws = new SockJS("http://127.0.0.1:8087/admin-socket?Authorization=" + getAdminAccessToken());

function myLoad() {

// WebSocket
    homeWebSocketFunction(ws);
};