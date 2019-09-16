function getRandomColor() {
    var color = "";
    for (var i = 0; i < 3; i++) {
        var sub = Math.floor(Math.random() * 256).toString(16);
        color += (sub.length == 1 ? "0" + sub : sub);
    }
    return "#" + color;
}

function getLogin() {
    return window.localStorage.getItem("adminLogin");
}

function setLogin(login) {
    window.localStorage.setItem("adminLogin", login);
}

function getAdminAccessToken() {
    return window.localStorage.getItem("adminAccess");
}

function setAdminAccessToken(access) {
    window.localStorage.setItem("adminAccess", access);
}

function getAdminRefreshToken() {
    return window.localStorage.getItem("adminRefresh");
}

function setAdminRefreshToken(refresh) {
    window.localStorage.setItem("adminRefresh", refresh);
}

function refreshAdminAccessToken() {
    $.ajax({
        type: "POST",
        contentType: 'application/x-www-form-urlencoded',
        url: 'http://' + authServerHost + '/auth/realms/bank/protocol/openid-connect/token',
        dataType: 'json',
        data: jQuery.param({
            grant_type: "refresh_token",
            client_id: "ADMIN-UI",
            refresh_token: getAdminRefreshToken()
        }),

        success: function (data, textstatus, error) {
            var tokens = data;
            var accessToken = tokens.access_token;
            var refreshToken = tokens.refresh_token;
            setAdminAccessToken(accessToken);
            setAdminRefreshToken(refreshToken);
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

function changeClientStatus(target) {
    var prevStatus = target.innerText;

    var clientInfoElement = target.parentNode.parentNode;
    var clientLogin = clientInfoElement.querySelector(".table__login").innerText;

    if (prevStatus == "BLOCK") {
        $.ajax({
            type: "PATCH",
            contentType: 'application/JSON',
            url: 'http://' + mainServerHost + '/admin/block/' + clientLogin,
            crossOrigin: true,
            data: "ADVERTISING",
            headers: {
                "Authorization": "bearer " + getAdminAccessToken()
            },

            success: function (data, textstatus, error) {
                console.log("success");
                target.innerText = "UNBLOCK";
                clientInfoElement.classList.add("bg-danger");
            },

            error: function (xhr, ajaxOptions, thrownError) {
                switch (xhr.status) {
                    case 0:
                        refreshAdminAccessToken();
                        changeClientStatus(target);
                        break;
                    default: {
                        var errorJson = xhr.status;
                        var message = errorJson.message;
                        document.getElementById("errorMessage").innerText = message;
                    }
                }
            }
        });
    } else {
        $.ajax({
            type: "DELETE",
            contentType: 'application/JSON',
            url: 'http://' + mainServerHost + '/admin/block/' + clientLogin,
            crossOrigin: true,
            headers: {
                "Authorization": "bearer " + getAdminAccessToken()
            },

            success: function (data, textstatus, error) {
                console.log("success");
                target.innerText = "BLOCK";
                clientInfoElement.classList.remove("bg-danger");
            },

            error: function (xhr, ajaxOptions, thrownError) {
                switch (xhr.status) {
                    case 0:
                        refreshAdminAccessToken();
                        // changeClientStatus(target);
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
}

function showClientsInfo() {
    var doc = document;
    clearClientsInfoTable();
    $.ajax({
        type: "GET",
        contentType: 'application/JSON',
        url: 'http://' + mainServerHost + '/admin/clients',
        dataType: 'json',
        crossOrigin: true,
        headers: {
            "Authorization": "bearer " + getAdminAccessToken(),
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
                doc.querySelector("#clientInfoTable tr:last-child .table__action").innerText = (clientInfo.blocked) ? "UNBLOCK" : "BLOCK";
                doc.querySelector("#clientInfoTable tr:last-child .table__action").addEventListener('click', function (event) {
                    changeClientStatus(event.target);
                }, false);

                if (clientInfo.blocked) {
                    doc.querySelector("#clientInfoTable tr:last-child").classList.add("bg-danger");
                } else {
                    doc.querySelector("#clientInfoTable tr:last-child").classList.remove("bg-danger");
                }

                var clientInfoRowClone = clientInfoRow.cloneNode(true);
                clientInfoTable.appendChild(clientInfoRowClone);
            }
            clientInfoTable.removeChild(clientInfoTable.lastChild);
        },

        error: function (xhr, ajaxOptions, thrownError) {
            switch (xhr.status) {
                case 0:
                    refreshAdminAccessToken();
                    showClientsInfo();
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
        url: 'http://' + mainServerHost + '/admin/cards',
        dataType: 'json',
        headers: {
            "Authorization": "bearer " + getAdminAccessToken(),
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
                    refreshAdminAccessToken();
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

function changeCardStatus(target) {
    var prevStatus = target.innerText;

    var cardInfoElement = target.parentNode.parentNode;
    var cardNumber = cardInfoElement.querySelector(".table__number").innerText;

    $.ajax({
        type: "PUT",
        contentType: 'application/JSON',
        url: 'http://' + mainServerHost + '/admin/' + cardNumber + '/change',
        crossOrigin: true,
        headers: {
            "Authorization": "bearer " + getAdminAccessToken()
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
                    refreshAdminAccessToken();
                    changeCardStatus(target);
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
                    refreshAdminAccessToken();
                    ws = new SockJS("http://" + mainServerHost + "/admin-socket?Authorization=" + getAdminAccessToken());
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
                refreshAdminAccessToken();
                ws = new SockJS("http://" + mainServerHost + "/admin-socket?Authorization=" + getAdminAccessToken());
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
                // var menuElementList = doc.querySelector("#navbarSupportedContent ul").childNodes;
                // var menuElement = menuElementList[3];
                // menuElement.classList.add("new-message-icon");
                // break;
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
    //todo
}