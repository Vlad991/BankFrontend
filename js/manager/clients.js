var doc = document;

doc.addEventListener("DOMContentLoaded", myLoad);
var ws = new SockJS("http://127.0.0.1:8087/manager-socket?Authorization=" + getManagerAccessToken());

function myLoad() {
    showClientsInfo();
    doc.getElementById("pills-info-tab").addEventListener("click", showClientsInfo);
    doc.getElementById("pills-card-tab").addEventListener("click", showCreditCardList);
    // doc.getElementById("pills-address-tab").addEventListener("click", function () {
    //     showActiveClientsList(ws);
    // });

    ws.onopen = function () {
        console.log("socket connection establish");
    };

    ws.onclose = function (event) {
        if (event.wasClean) {
            console.log("disconnected");
        } else {
            switch (event.status) {
                case '401': {
                    refreshManagerAccessToken();
                    ws = new SockJS("http://127.0.0.1:8087/manager-socket?Authorization=" + getManagerAccessToken());
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
                ws = new SockJS("http://127.0.0.1:8087/manager-socket?Authorization=" + getManagerAccessToken());
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
            case "ACTIVE_CLIENT_LIST":{
                var activeUsers = receiveJson.activeUsers;
                showActiveClientsList(activeUsers);
                break;
            }
            case "PRIVATE": {
                // var messageSender = receiveJson.sender;
                // var messageBody = receiveJson.message;
                // doc.getElementById("messageSender").innerText = "Manager " + messageSender;
                //
                // var messengerBody = doc.getElementById("messengerBody");
                // var receiveMessageElement = doc.getElementById("receiveMessage");
                // var receiveMessageElementClone = receiveMessageElement.cloneNode(true);
                // messageBody.appendChild(receiveMessageElementClone);
                //
                // doc.querySelector("#messengerBody div:last-child div").innerText = messageBody;
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