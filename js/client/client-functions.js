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

function getCardNumber() {
    return window.localStorage.getItem("cardNumber");
}

function setCardNumber(cardNumber) {
    window.localStorage.setItem("cardNumber", cardNumber);
}

function getClientAccessToken() {
    return window.localStorage.getItem("clientAccess");
}

function setClientAccessToken(access) {
    window.localStorage.setItem("clientAccess", access);
}

function getClientRefreshToken() {
    return window.localStorage.getItem("clientRefresh");
}

function setClientRefreshToken(refresh) {
    window.localStorage.setItem("clientRefresh", refresh);
}

function refreshClientAccessToken() {
    $.ajax({
        type: "POST",
        contentType: 'application/x-www-form-urlencoded',
        url: 'http://' + authServerHost + '/auth/realms/bank/protocol/openid-connect/token',
        dataType: 'json',
        data: jQuery.param({
            grant_type: "refresh_token",
            client_id: "ADMIN-UI",
            refresh_token: getClientRefreshToken()
        }),
        success: function (data, textstatus, error) {
            var tokens = data;
            var accessToken = tokens.access_token;
            var refreshToken = tokens.refresh_token;
            setClientAccessToken(accessToken);
            setClientRefreshToken(refreshToken);
        },

        error: function (xhr, ajaxOptions, thrownError) {
            window.location.href = "../../index.php";
        }
    });
}

function getCreditCardAccessToken() {
    return window.localStorage.getItem("cardAccess");
}

function setCreditCardAccessToken(access) {
    window.localStorage.setItem("cardAccess", access);
}

function getCreditCardRefreshToken() {
    return window.localStorage.getItem("cardRefresh");
}

function setCreditCardRefreshToken(refresh) {
    window.localStorage.setItem("cardRefresh", refresh);
}

function refreshCreditCardAccessToken() {
    $.ajax({
        type: "POST",
        contentType: 'application/x-www-form-urlencoded',
        url: 'http://' + authServerHost + '/auth/realms/credit-card/protocol/openid-connect/token',
        dataType: 'json',
        data: jQuery.param({
            grant_type: "refresh_token",
            client_id: "ADMIN-UI",
            refresh_token: getCreditCardRefreshToken()
        }),
        success: function (data, textstatus, error) {
            var tokens = data;
            var accessToken = tokens.access_token;
            var refreshToken = tokens.refresh_token;
            setCreditCardAccessToken(accessToken);
            setCreditCardRefreshToken(refreshToken);
        },

        error: function (xhr, ajaxOptions, thrownError) {
            window.location.href = "../../index.php";
        }
    });
}

function showClientInfo() {
    var doc = document;
    $.ajax({
        type: "GET",
        contentType: 'application/JSON',
        url: 'http://' + mainServerHost + '/client/' + getLogin() + '/info',
        dataType: 'json',
        crossOrigin: true,
        headers: {
            "Authorization": "bearer " + getClientAccessToken(),
        },

        success: function (data, textstatus, error) {
            var clientInfo = data;
            console.log(clientInfo);
            doc.getElementById("clientLogin").innerText = clientInfo.login;
            doc.getElementById("clientName").innerText = clientInfo.name;
            doc.getElementById("clientSurname").innerText = clientInfo.surname;
            doc.getElementById("clientBirthday").innerText = clientInfo.birthday.day + '/' + clientInfo.birthday.month + '/' + clientInfo.birthday.year;
            doc.getElementById("clientAddress").innerText = clientInfo.address.country + ', ' + clientInfo.address.city + ', ' + clientInfo.address.street + ' ' + clientInfo.address.postcode;
            doc.getElementById("clientEmail").innerText = clientInfo.email;
            doc.getElementById("clientPhone").innerText = clientInfo.phone;
        },

        error: function (xhr, ajaxOptions, thrownError) {
            switch (xhr.status) {
                case 0:
                    refreshClientAccessToken();
//                    showClientInfo();
                    break;
                default: {
                    var errorJson = xhr.status;
                    var message = errorJson.message;
                    document.getElementById("errorMessage").innerText = "Error: " + message;
                }
            }
        }
    });
}

function showCreditCardList() {
    var doc = document;
    $.ajax({
        type: "GET",
        contentType: 'application/JSON',
        url: 'http://' + mainServerHost + '/client/' + getLogin() + '/cards',
        dataType: 'json',
        headers: {
            "Authorization": "bearer " + getClientAccessToken(),
        },
        success: function (data, textstatus, error) {
            var cardList = data;
            console.log(cardList);

            var creditCardElement = doc.getElementById("creditCard");
            cardListUl = doc.getElementById("cardList");

            for (var i = 0; i < cardList.length; i++) {
                var card = cardList[i];
                doc.querySelector("#cardList li:last-child div .credit-card__number").innerText = card.number;
                doc.querySelector("#cardList li:last-child div .credit-card__date").innerText =
                    ((card.date.month < 10) ? ("0" + card.date.month) : card.date.month) + "/" + card.date.year;
                doc.querySelector("#cardList li:last-child div .credit-card__name").innerText = card.client.surname + " " + card.client.name;
                doc.querySelector("#cardList li:last-child div").classList.remove("bg-dark");
                doc.querySelector("#cardList li:last-child div").style.background = getRandomColor();
                doc.querySelector("#cardList li:last-child div").addEventListener("click", function () {
                    goToCreditCardMenu(card.number);
                });

                var creditCardElementClone = creditCardElement.cloneNode(true);
                cardListUl.appendChild(creditCardElementClone);
            }
            cardListUl.removeChild(cardListUl.lastChild);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            switch (xhr.status) {
                case 0:
                    refreshClientAccessToken();
                    showCreditCardList();
                    break;
                default: {
                    var errorJson = xhr.status;
                    var message = errorJson.message;
                    document.getElementById("errorMessage").innerText = message;
                }
            }
        }
    });
}

function goToCreditCardMenu(cardNumber) {
    setCardNumber(cardNumber);
    window.location.href = "../../client/card_menu.php";
}

function showCreditCardInfo() {
    var doc = document;
    $.ajax({
        type: "GET",
        contentType: 'application/JSON',
        url: 'http://' + mainServerHost + '/card/' + getCardNumber() + '/info',
        dataType: 'json',
        headers: {
            "Authorization": "bearer " + getClientAccessToken(),
        },
        success: function (data, textstatus, error) {
            var cardInfo = data;
            console.log(cardInfo);

            doc.querySelector("#cardNumber").innerText = cardInfo.number;
            doc.querySelector("#cardDate").innerText =
                ((cardInfo.date.month < 10) ? ("0" + cardInfo.date.month) : cardInfo.date.month) + "/" + cardInfo.date.year;
            doc.querySelector("#cardName").innerText = cardInfo.client.surname + " " + cardInfo.client.name;
            doc.querySelector("#cardSum").innerText = cardInfo.sum;
            doc.querySelector("#cardStatus").innerText = cardInfo.status;
        },
        error: function (xhr, ajaxOptions, thrownError) {
            switch (xhr.status) {
                case 0:
                    refreshClientAccessToken();
                    showCreditCardInfo();
                    break;
                default: {
                    var errorJson = xhr.status;
                    var message = errorJson.message;
                    document.getElementById("errorMessage").innerText = message;
                }
            }
        }
    });
}

function sendMoney() {
    var doc = document;
    var senderCardNumber = doc.getElementById("senderCard").value;
    var receiverCardNumber = doc.getElementById("receiverCard").value;
    var sum = doc.getElementById("sum").value;
    var pin = doc.getElementById("pinToSend").value;

    getCardTokensFromAuthServer();

    doSendMoneyRequest();
}

function getCardTokensFromAuthServer() {
    var doc = document;
    var senderCardNumber = doc.getElementById("senderCard").value;
    var receiverCardNumber = doc.getElementById("receiverCard").value;
    var sum = doc.getElementById("sum").value;
    var pin = doc.getElementById("pinToSend").value;

    $.ajax({
        type: "POST",
        contentType: 'application/x-www-form-urlencoded',
        url: 'http://' + authServerHost + '/auth/realms/credit-card/protocol/openid-connect/token',
        crossOrigin: true,
        data: jQuery.param({
            grant_type: "password",
            client_id: "ADMIN-UI",
            username: senderCardNumber,
            password: pin
        }),

        success: function (xhr, ajaxOptions, thrownError) {
            var accessToken = xhr.access_token;
            var refreshToken = xhr.refresh_token;
            setCreditCardAccessToken(accessToken);
            setCreditCardRefreshToken(refreshToken);

            var array_access_token = accessToken.split('.');
            var base64Url = array_access_token[1];
            var accessTokenJSON = JSON.parse(window.atob(base64Url));
            var roles = accessTokenJSON.resource_access["card-web"].roles;

            // if (!roles[0].includes("ROLE_OWNER")) {
            //     window.location.href = "http://' + frontendServerHost + '/client/home.html";
            //     doc.getElementById("errorMessage").innerText = "Error: Incorrect pin!";
            // } todo
            console.log("success");
        },

        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status);
            var errorJson = JSON.parse(xhr.responseText);
            var message = errorJson.message;
            doc.getElementById("errorMessage").innerText = message;
        }
    });
}

function doSendMoneyRequest() {
    var doc = document;
    var senderCardNumber = doc.getElementById("senderCard").value;
    var receiverCardNumber = doc.getElementById("receiverCard").value;
    var sum = doc.getElementById("sum").value;

    $.ajax({
        type: "PUT",
        contentType: 'application/JSON',
        url: 'http://' + cardServerHost + '/card/' + senderCardNumber + '/send',
        headers: {
            "Authorization": "bearer " + getCreditCardAccessToken(),
        },
        data: JSON.stringify({
            "senderCardNumber": senderCardNumber,
            "receiverCardNumber": receiverCardNumber,
            "sum": sum
        }),

        success: function (data, textstatus, error) {
            console.log("success");
            doc.getElementById("resultMessage").innerText = "Result: success!";
        },

        error: function (xhr, ajaxOptions, thrownError) {
            switch (xhr.status) {
                case 0:
                    refreshCreditCardAccessToken();
//                    sendMoney();
                    break;
                default: {
                    var errorJson = xhr.status;
                    var message = errorJson.message;
                    document.getElementById("errorMessage").innerText = message;
                }
            }
        }
    });
}

function blockCard() {
    var doc = document;
    var cardNumber = doc.getElementById("actionsCard").value;
    var pin = doc.getElementById("pinToBlock").value;

    $.ajax({
        type: "POST",
        contentType: 'application/x-www-form-urlencoded',
        url: 'http://' + authServerHost + '/auth/realms/credit-card/protocol/openid-connect/token',
        crossOrigin: false,
        data: jQuery.param({
            grant_type: "password",
            client_id: "ADMIN-UI",
            username: cardNumber,
            password: pin
        }),

        success: function (xhr, ajaxOptions, thrownError) {
            var accessToken = xhr.access_token;
            var refreshToken = xhr.refresh_token;
            setCreditCardAccessToken(accessToken);
            setCreditCardRefreshToken(refreshToken);

            var array_access_token = accessToken.split('.');
            var base64Url = array_access_token[1];
            var accessTokenJSON = JSON.parse(window.atob(base64Url));
            var roles = accessTokenJSON.resource_access["card-web"].roles;

            if (!roles[0].includes("ROLE_OWNER")) {
                window.location.href = "../../client/home.php";
                doc.getElementById("errorMessage").innerText = "Error: Incorrect pin!";
            }
            console.log("success");
        },

        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status);
            var errorJson = JSON.parse(xhr.responseText);
            var message = errorJson.message;
            doc.getElementById("errorMessage").innerText = message;
        }
    });

    $.ajax({
        type: "PUT",
        contentType: 'application/JSON',
        url: 'http://' + cardServerHost + '/card/' + cardNumber + '/block',
        headers: {
            "Authorization": "bearer " + getCreditCardAccessToken()
        },

        success: function (data, textstatus, error) {
            console.log("success");
            doc.getElementById("resultMessage").innerText = "Result: success!";
        },

        error: function (xhr, ajaxOptions, thrownError) {
            switch (xhr.status) {
                case 0:
                    refreshCreditCardAccessToken();
                    blockCard();
                    break;
                default: {
                    var errorJson = xhr.status;
                    var message = errorJson.message;
                    document.getElementById("errorMessage").innerText = message;
                }
            }
        }
    });
}

function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(elmnt.id + "Header")) {
        // if present, the header is where you move the DIV from:
        document.getElementById(elmnt.id + "Header").onmousedown = dragMouseDown;
    } else {
        // otherwise, move the DIV from anywhere inside the DIV:
        elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        e = e || window.event;
        // e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        // e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

function showMessenger(element) {
    $(element).click(function () {
        if (!$("#messenger").hasClass("messenger-in")) {
            setTimeout(function () {
                $("#messenger").addClass('messenger-in');
            }, 200);
        }
    });
}

function hideMessenger(element) {
    $(element).click(function () {
        if ($("#messenger").hasClass("messenger-in")) {
            setTimeout(function () {
                $("#messenger").removeClass('messenger-in');
            }, 200);
        }
    });
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

function mainWebSocketFunction(ws) {
    doc.getElementById("sendButton").addEventListener("click", sendMessage);
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
                    refreshClientAccessToken();
                    ws = new SockJS('http://' + mainServerHost + '/client-socket?Authorization=' + getClientAccessToken());
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
                ws = new SockJS("http://" + mainServerHost + "/client-socket?Authorization=" + getClientAccessToken());
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