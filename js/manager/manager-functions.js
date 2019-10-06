function getRandomColor() {
    var color = "";
    for (var i = 0; i < 3; i++) {
        var sub = Math.floor(Math.random() * 256).toString(16);
        color += (sub.length == 1 ? "0" + sub : sub);
    }
    return "#" + color;
}

function getLogin() {
    return window.localStorage.getItem("login");
}

function setLogin(login) {
    window.localStorage.setItem("login", login);
}

function getManagerAccessToken() {
    return window.localStorage.getItem("managerAccess");
}

function setManagerAccessToken(access) {
    window.localStorage.setItem("managerAccess", access);
}

function getManagerRefreshToken() {
    return window.localStorage.getItem("managerRefresh");
}

function setManagerRefreshToken(refresh) {
    window.localStorage.setItem("managerRefresh", refresh);
}

function refreshManagerAccessToken() {
    $.ajax({
        type: "POST",
        contentType: 'application/x-www-form-urlencoded',
        url: 'http://' + authServerHost + '/auth/realms/bank/protocol/openid-connect/token',
        dataType: 'json',
        data: jQuery.param({
            grant_type: "refresh_token",
            client_id: "ADMIN-UI",
            refresh_token: getManagerRefreshToken()
        }),

        success: function (data, textstatus, error) {
            var tokens = data;
            var accessToken = tokens.access_token;
            var refreshToken = tokens.refresh_token;
            setManagerAccessToken(accessToken);
            setManagerRefreshToken(refreshToken);
        },

        error: function (xhr, ajaxOptions, thrownError) {
            window.location.href = "../../index.php";
        }
    });
}

function clearClientsInfoTable() {
    var doc = document;
    var tableRows = doc.querySelector("#clientInfoTable").children;
    var initialLength = tableRows.length;
    if (initialLength > 1) {
        for (var i = 0; i < initialLength - 1; i++) {
            doc.querySelector("#clientInfoTable tr:last-child").remove();
        }
    }
}

function showClientsInfo() {
    var doc = document;
    clearClientsInfoTable();
    $.ajax({
        type: "GET",
        contentType: 'application/JSON',
        url: 'http://' + mainServerHost + '/manager/clients',
        dataType: 'json',
        crossOrigin: true,
        headers: {
            "Authorization": "bearer " + getManagerAccessToken(),
        },

        success: function (data, textstatus, error) {
            var clients = data;
            console.log(clients);

            var clientInfoTable = doc.getElementById("clientInfoTable");
            var clientInfoRow = doc.getElementById("clientInfo");

            for (var i = 0; i < clients.length; i++) {
                var clientInfo = clients[i];
                doc.querySelector("#clientInfoTable tr:last-child th").innerText = i;
                doc.querySelector("#clientInfoTable tr:last-child .table__login").innerText = clientInfo.login;
                doc.querySelector("#clientInfoTable tr:last-child .table__name").innerText = clientInfo.name;
                doc.querySelector("#clientInfoTable tr:last-child .table__surname").innerText = clientInfo.surname;
                doc.querySelector("#clientInfoTable tr:last-child .table__date")
                    .innerText = clientInfo.birthday.day + "/" + clientInfo.birthday.month + "/" + clientInfo.birthday.year;
                doc.querySelector("#clientInfoTable tr:last-child .table__address")
                    .innerText = clientInfo.address.country + ', ' + clientInfo.address.city + ', ' + clientInfo.address.street + ' ' + clientInfo.address.postcode;
                doc.querySelector("#clientInfoTable tr:last-child .table__email").innerText = clientInfo.email;
                doc.querySelector("#clientInfoTable tr:last-child .table__phone").innerText = clientInfo.phone;

                var clientInfoRowClone = clientInfoRow.cloneNode(true);
                clientInfoTable.appendChild(clientInfoRowClone);
            }
            clientInfoTable.removeChild(clientInfoTable.lastChild);
        },

        error: function (xhr, ajaxOptions, thrownError) {
            switch (xhr.status) {
                case 0:
                    refreshManagerAccessToken();
                    showClientsInfo();
                    break;
                default: {
                    var errorJson = xhr.status;
                    message = errorJson.error_description;
                    onsole.log(xhr.responseText);
                    document.getElementById("errorMessage").innerText = message;
                }
            }
        }
    });
}

function clearCreditCardTable() {
    var doc = document;
    var tableRows = doc.querySelector("#cardsInfoTable").children;
    var initialLength = tableRows.length;
    if (initialLength > 1) {
        for (var i = 0; i < initialLength - 1; i++) {
            doc.querySelector("#cardsInfoTable tr:last-child").remove();
        }
    }
}

function showCreditCardList() {
    var doc = document;
    clearCreditCardTable();
    $.ajax({
        type: "GET",
        contentType: 'application/JSON',
        url: 'http://' + mainServerHost + '/manager/cards',
        dataType: 'json',
        headers: {
            "Authorization": "bearer " + getManagerAccessToken(),
        },
        success: function (data, textstatus, error) {
            var cardList = data;
            console.log(cardList);

            var cardInfoTable = doc.getElementById("cardsInfoTable");
            var cardInfoRow = doc.getElementById("cardInfo");

            for (var i = 0; i < cardList.length; i++) {
                var cardInfo = cardList[i];
                doc.querySelector("#cardsInfoTable tr:last-child th").innerText = i;
                doc.querySelector("#cardsInfoTable tr:last-child .table__number").innerText = cardInfo.number;
                doc.querySelector("#cardsInfoTable tr:last-child .table__date")
                    .innerText = ((cardInfo.date.month < 10) ? ("0" + cardInfo.date.month) : cardInfo.date.month) + "/" + cardInfo.date.year;
                doc.querySelector("#cardsInfoTable tr:last-child .table__code").innerText = cardInfo.code;
                doc.querySelector("#cardsInfoTable tr:last-child .table__sum").innerText = cardInfo.sum;
                doc.querySelector("#cardsInfoTable tr:last-child .table__name").innerText = cardInfo.client.surname + " " + cardInfo.client.name;
                doc.querySelector("#cardsInfoTable tr:last-child .table__status").innerText = cardInfo.status;
                doc.querySelector("#cardsInfoTable tr:last-child .table__status").addEventListener('click', function (event) {
                    changeCardStatus(event.target);
                }, false);

                if (cardInfo.status === "BLOCKED") {
                    doc.querySelector("#cardsInfoTable tr:last-child").classList.add("bg-danger");
                } else {
                    doc.querySelector("#cardsInfoTable tr:last-child").classList.remove("bg-danger");
                }

                var cardInfoRowClone = cardInfoRow.cloneNode(true);
                cardInfoTable.appendChild(cardInfoRowClone);
            }
            cardInfoTable.removeChild(cardInfoTable.lastChild);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            switch (xhr.status) {
                case 0:
                    refreshManagerAccessToken();
                    showCreditCardList();
                    break;
                default: {
                    var errorJson = xhr.status;
                    message = errorJson.error_description;
                    console.log(xhr.responseText);
                    document.getElementById("errorMessage").innerText = message;
                }
            }
        }
    });
}

function changeCardStatus(target) {
    var prevStatus = target.innerText;

    var cardInfoElement = target.parentNode.parentNode;
    var cardNumber = cardInfoElement.querySelector(".table__number").innerText;

    $.ajax({
        type: "PUT",
        contentType: 'application/JSON',
        url: 'http://' + mainServerHost + '/manager/' + cardNumber + '/change',
        crossOrigin: true,
        headers: {
            "Authorization": "bearer " + getManagerAccessToken()
        },

        success: function (data, textstatus, error) {
            console.log("success");
            if (prevStatus == "OPEN") {
                target.innerText = "BLOCKED";
                cardInfoElement.classList.add("bg-danger");
            } else {
                target.innerText = "OPEN";
                cardInfoElement.classList.remove("bg-danger");
            }
        },

        error: function (xhr, ajaxOptions, thrownError) {
            switch (xhr.status) {
                case 0:
                    refreshManagerAccessToken();
                    changeCardStatus(target);
                    break;
                default: {
                    var errorJson = xhr.status;
                    message = errorJson.error_description;
                    console.log(xhr.responseText);
                    document.getElementById("errorMessage").innerText = message;
                }
            }
        }
    });
}

function clearActiveClientsInfoTable() {
    var clientCards = doc.querySelector("#activeClients").children;
    var clientCardsLength = clientCards.length;
    if (clientCardsLength > 1) {
        for (var i = 0; i < clientCardsLength - 1; i++) {
            doc.querySelector("#activeClients").removeChild(doc.querySelector("#activeClients").lastChild);
        }
    }
}

function showActiveClientsList(activeUsers) {
    var doc = document;
    clearActiveClientsInfoTable();
    var activeClientsElement = doc.getElementById("activeClients");
    var activeClientCard = doc.getElementById("activeClientCard");
    if (activeUsers.length !== 0) {
        activeClientCard.classList.remove("d-none");
    }

    for (var i = 0; i < activeUsers.length; i++) {
        let user = activeUsers[i];

        var lastActiveClientCard = doc.querySelector("#activeClients .card:last-child");
        lastActiveClientCard.querySelector(".card-title").innerText = user;
        // lastActiveClientCard.querySelector(".card-body__button").onclick = function (event) {
        //     connectToClient(user);
        // };
        $(lastActiveClientCard).on('click touchstart', '.card-body__button', function() {
            connectToClient(user);
        });
        var activeClientCardClone = activeClientCard.cloneNode(true);
        activeClientCardClone.removeAttribute("id");
        activeClientsElement.appendChild(activeClientCardClone);
    }
    activeClientsElement.removeChild(activeClientsElement.lastChild);
}

function sendMessage() {
    var messageBody = doc.getElementById("sendMessage").value;
    var receiver = doc.getElementById("messageSender").innerText;
    var jsonSend = {};
    jsonSend["type"] = "PRIVATE";
    jsonSend["receiver"] = receiver;
    jsonSend["message"] = messageBody;
    ws.send(JSON.stringify(jsonSend));

    var messengerBody = doc.getElementById("messengerBody");
    var sendMessageElement = doc.getElementById("sendMessageBlock");
    var sendMessageElementClone = sendMessageElement.cloneNode(true);
    sendMessageElementClone.classList.remove("d-none");
    messengerBody.appendChild(sendMessageElementClone);

    doc.querySelector("#messengerBody div:last-child div").innerText = messageBody;
    doc.getElementById("messengerBody").scrollTop = doc.getElementById("messengerBody").scrollHeight;
    doc.getElementById("sendMessage").value = "";
}

function sendComment() {
    var messageBody = document.getElementById("sendComment").value;
    var jsonSend = {};
    jsonSend["type"] = "COMMENT";
    jsonSend["message"] = messageBody;
    ws.send(JSON.stringify(jsonSend));

    doc.getElementById("sendComment").value = "";
}

function sendLogout() {
    var jsonSend = {};
    jsonSend["type"] = "LOGOUT";
    ws.send(JSON.stringify(jsonSend));
    window.location.href = "../../index.php";
}

function homeWebSocketFunction(ws) {
    doc.getElementById("sendCommentButton").addEventListener("click", sendComment);
    window.addEventListener("unload", sendLogout);
    doc.getElementById("logoLink").addEventListener("click", sendLogout);

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
                    ws = new SockJS("http://" + mainServerHost + "/manager-socket?Authorization=" + getManagerAccessToken());
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
                refreshManagerAccessToken();
                ws = new SockJS("http://" + mainServerHost + "/manager-socket?Authorization=" + getManagerAccessToken());
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
                var menuElementList = doc.querySelector("#navbarSupportedContent ul").childNodes;
                var menuElement = menuElementList[3];
                menuElement.classList.add("new-message-icon");
                break;
            }

            case "COMMENT": {
                var messageSender = receiveJson.sender;
                var messageBody = receiveJson.message;


                var comments = doc.getElementById("comments");
                var sendCommentElement = doc.getElementById("sendCommentBlock");
                var sendCommentElementClone = sendCommentElement.cloneNode(true);
                sendCommentElementClone.classList.remove("d-none");
                sendCommentElementClone.classList.add("d-flex");
                comments.insertBefore(sendCommentElementClone, comments.childNodes[0]);

                doc.querySelector("#comments div:first-child div div").innerText = messageBody;
                doc.querySelector("#comments div:first-child div span").innerText = messageSender;
                doc.getElementById("sendComment").value = "";
                break;
            }
        }
    }
}

function clientsWebSocketFunction(ws) {
    doc.getElementById("sendButton").addEventListener("click", sendMessage);
    doc.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            sendMessage();
        }
    });
    doc.getElementById("sendCommentButton").addEventListener("click", sendComment);
    window.addEventListener("unload", sendLogout);
    doc.getElementById("logoLink").addEventListener("click", sendLogout);

    ws.onopen = function () {
        console.log("Socket connection establish!");
    };

    ws.onclose = function (event) {
        if (event.wasClean) {
            console.log("Socket is disconnected!");
        } else {
            switch (event.status) {
                case '401': {
                    refreshManagerAccessToken();
                    ws = new SockJS("http://" + mainServerHost + "/manager-socket?Authorization=" + getManagerAccessToken());
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
                refreshManagerAccessToken();
                ws = new SockJS("http://" + mainServerHost + "/manager-socket?Authorization=" + getManagerAccessToken());
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
            case "ACTIVE_CLIENT_LIST": {
                var activeUsers = receiveJson.activeUsers;
                showActiveClientsList(activeUsers);
                break;
            }

            case "PRIVATE": {
                var menuElementList = doc.querySelector("#navbarSupportedContent ul").childNodes;
                var menuElement = menuElementList[3];
                menuElement.classList.add("new-message-icon");
                doc.getElementById("pills-settings-tab").classList.add("new-message-icon");

                var messageSender = receiveJson.sender;
                var messageBody = receiveJson.message;
                doc.getElementById("messageSender").innerText = messageSender;

                var messengerBody = doc.getElementById("messengerBody");
                var receiveMessageElement = doc.getElementById("receiveMessageBlock");
                var receiveMessageElementClone = receiveMessageElement.cloneNode(true);
                receiveMessageElementClone.classList.remove("d-none");
                messengerBody.appendChild(receiveMessageElementClone);

                doc.querySelector("#messengerBody div:last-child div").innerText = messageBody;
                doc.getElementById("messengerBody").scrollTop = doc.getElementById("messengerBody").scrollHeight;
                break;
            }

            case "COMMENT": {
                var messageSender = receiveJson.sender;
                var messageBody = receiveJson.message;


                var comments = doc.getElementById("comments");
                var sendCommentElement = doc.getElementById("sendCommentBlock");
                var sendCommentElementClone = sendCommentElement.cloneNode(true);
                sendCommentElementClone.classList.remove("d-none");
                sendCommentElementClone.classList.add("d-flex");
                comments.insertBefore(sendCommentElementClone, comments.childNodes[0]);

                doc.querySelector("#comments div:first-child div div").innerText = messageBody;
                doc.querySelector("#comments div:first-child div span").innerText = messageSender;
                doc.getElementById("sendComment").value = "";
                break;
            }
        }
    }
}

function connectToClient(client) {
    console.log('Connection to ' + client);
    window.localStorage.setItem("connectedClient", client);
    doc.getElementById("messageSender").innerText = client;
    doc.getElementById("pills-settings-tab").click();
}