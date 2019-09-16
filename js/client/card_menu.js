var doc = document;

doc.addEventListener("DOMContentLoaded", myLoad);
var ws = new SockJS("http://" + mainServerHost + "/client-socket?Authorization=" + getClientAccessToken());

function myLoad() {
    doc.getElementById("headerLogin").innerText = getLogin();
    dragElement(doc.getElementById("messenger"));
    showMessenger(doc.getElementById("messengerHeader"));
    showCreditCardInfo();
// Card Menu events
    doc.getElementById("v-pills-home-tab").addEventListener("click", showCreditCardInfo);
    doc.getElementById("sendSumButton").addEventListener("click", sendMoney);
    doc.getElementById("blockCardBtn").addEventListener("click", blockCard);

// WebSocket
    mainWebSocketFunction(ws);
};