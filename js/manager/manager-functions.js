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
        url: 'http://127.0.0.1:8080/auth/realms/bank/protocol/openid-connect/token',
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
            window.location.href = "http://127.0.0.1/index.html";
        }
    });
}

function showClientsInfo() {
    var doc = document;
    $.ajax({
        type: "GET",
        contentType: 'application/JSON',
        url: 'http://127.0.0.1:8087/manager/clients',
        dataType: 'json',
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
                doc.querySelector("#clientInfoTable tr:last-child table__login").innerText = clientInfo.login;
                doc.querySelector("#clientInfoTable tr:last-child table__name").innerText = clientInfo.name;
                doc.querySelector("#clientInfoTable tr:last-child table__surname").innerText = clientInfo.surname;
                doc.querySelector("#clientInfoTable tr:last-child table__date").innerText = clientInfo.date;
                doc.querySelector("#clientInfoTable tr:last-child table__address").innerText = clientInfo.address;
                doc.querySelector("#clientInfoTable tr:last-child table__email").innerText = clientInfo.email;
                doc.querySelector("#clientInfoTable tr:last-child table__phone").innerText = clientInfo.phone;

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
                    var message = errorJson.message;
                    document.getElementById("errorMessage").innerText = message;
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
        url: 'http://127.0.0.1:8087/client/' + getLogin() + '/cards',
        dataType: 'json',
        headers: {
            "Authorization": "bearer " + getClientAccessToken(),
        },
        success: function (data, textstatus, error) {
            var cardList = data;
            console.log(cardList);

            var creditCardElement = doc.getElementById("creditCard");
            cardListUl = doc.getElementById("cardList");

            for (var i = 1; i < cardList.length; i++) {
                var card = cardList[i];
                doc.querySelector("#cardList li:last-child div .credit-card__number").innerText = card.number;
                doc.querySelector("#cardList li:last-child div .credit-card__date").innerText = card.date;
                doc.querySelector("#cardList li:last-child div .credit-card__name").innerText = card.client.surname + card.client.name;
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
    window.location.href = "http://127.0.0.1/client/card_menu.html";
}

function showCreditCardInfo() {
    var doc = document;
    $.ajax({
        type: "GET",
        contentType: 'application/JSON',
        url: 'http://127.0.0.1:8087/card/' + getCardNumber() + '/info',
        dataType: 'json',
        headers: {
            "Authorization": "bearer " + getClientAccessToken(),
        },
        success: function (data, textstatus, error) {
            var cardInfo = data;
            console.log(cardInfo);

            doc.querySelector("#cardNumber").innerText = cardInfo.number;
            doc.querySelector("#cardDate").innerText = cardInfo.date;
            doc.querySelector("#cardName").innerText = cardInfo.client.surname + cardInfo.client.name;
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

    $.ajax({
        type: "POST",
        contentType: 'application/x-www-form-urlencoded',
        url: 'http://127.0.0.1:8080/auth/realms/credit-card/protocol/openid-connect/token',
        crossOrigin: false,
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

            if (!roles[0].includes("ROLE_OWNER")) {
                window.location.href = "http://127.0.0.1/client/home.html";
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
        url: 'http://127.0.0.1:8087/card/' + senderCardNumber + '/send',
        dataType: 'json',
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
                    sendMoney();
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
        url: 'http://127.0.0.1:8080/auth/realms/credit-card/protocol/openid-connect/token',
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
                window.location.href = "http://127.0.0.1/client/home.html";
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
        url: 'http://127.0.0.1:8087/card/' + cardNumber + '/block',
        dataType: 'json',
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