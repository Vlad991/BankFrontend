var doc = document;

doc.addEventListener("DOMContentLoaded", myLoad);
var ws = new SockJS("http://127.0.0.1:8087/client-socket?Authorization=" + getClientAccessToken());

function myLoad() {
    doc.getElementById("headerLogin").innerText = getLogin();

// Socket events
    doc.getElementById("sendButton").addEventListener("click", sendMessage);
//    doc.getElementById("comment").addEventListener("click", sendComment); //todo
    window.addEventListener("unload", sendLogout);

    ws.onopen = function () {
        console.log("socket connection establish");
    };

    ws.onclose = function (event) {
        if (event.wasClean) {
            console.log("disconnected");
        } else {
            switch (event.status) {
                case '401': {
                    refreshClientAccessToken();
                    ws = new SockJS("http://127.0.0.1:8087/client-socket?Authorization=" + getClientAccessToken());
                    break;
                }
                default: {
                    doc.getElementById("errorMessage").value = event.status;
                }
            }
        }
    };

    ws.onerror = function (event) {
        switch (event.status) {
            case '401': {
                refreshClientAccessToken();
                ws = new SockJS("http://127.0.0.1:8087/client-socket?Authorization=" + getClientAccessToken());
                break;
            }
            default: {
                doc.getElementById("errorMessage").value = event.status;
            }
        }
    };

    ws.onmessage = function (event) {
        var receiveJson = JSON.parse(event.data);
        switch (receiveJson.type) {
            case "PRIVATE": {
                var messageSender = receiveJson.sender;
                var messageBody = receiveJson.message;
                doc.getElementById("messageSender").innerText = "Manager " + messageSender;

                var messengerBody = doc.getElementById("messengerBody");
                var receiveMessageElement = doc.getElementById("receiveMessage");
                var receiveMessageElementClone = receiveMessageElement.cloneNode(true);
                messengerBody.appendChild(receiveMessageElementClone);

                doc.querySelector("#messengerBody div:last-child div").innerText = messageBody;
                break;
            }

            case "COMMENT": {
                // var mess = "<B>"+receiveJson.sender+":"+receiveJson.message+"</B>";
                // document.getElementById("income-messages").innerText+=mess;
                // var br_tag = document.createElement("br");
                // document.createElement("income-messages").appendChild(br_tag);
                //todo comment interface
                break;
            }
        }
    }
};

function sendMessage() {
    var messageBody = doc.getElementById("sendMessage").value;
    var receiver = doc.getElementById("messageSender").innerText.split(" ")[1];
    var jsonSend = {};
    jsonSend["type"] = "PRIVATE";
    jsonSend["receiver"] = receiver;
    jsonSend["message"] = messageBody;
    ws.send(JSON.stringify(jsonSend));

    var messengerBody = doc.getElementById("messengerBody");
    var sendMessageElement = doc.getElementById("sendMessageBlock");
    var sendMessageElementClone = sendMessageElement.cloneNode(true);
    messengerBody.appendChild(sendMessageElementClone);

    doc.querySelector("#messengerBody div:last-child div").innerText = messageBody;
    doc.getElementById("messengerBody").scrollTop = doc.getElementById("messengerBody").scrollHeight;
    doc.getElementById("sendMessage").value = "";
}

function sendComment() {
    // var mess = document.getElementById("outcome-messages").value;
    // var jsonSend = {};
    // jsonSend["type"] = "BROADCAST";
    // jsonSend["message"] = mess;
    // ws.send(JSON.stringify(jsonSend));
    //todo comments
}

function sendLogout() {
    var jsonSend = {};
    jsonSend["type"] = "LOGOUT";
    ws.send(JSON.stringify(jsonSend));
    window.location.href = "../../index.php";
}