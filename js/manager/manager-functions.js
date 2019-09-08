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

function clearClientsInfoTable() {
    var doc = document;
    var tableRows = doc.querySelector("#clientInfoTable").children;
    if (tableRows.length > 1) {
        for (var i = 0; i < tableRows.length - 1; i++) {
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
        url: 'http://127.0.0.1:8087/manager/clients',
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
    if (tableRows.length > 1) {
        for (var i = 0; i < tableRows.length - 1; i++) {
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
        url: 'http://127.0.0.1:8087/manager/cards',
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
        url: 'http://127.0.0.1:8087/manager/' + cardNumber + '/change',
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
                    var message = errorJson.message;
                    document.getElementById("errorMessage").innerText = message;
                }
            }
        }
    });
}

function clearActiveClientsInfoTable() {
    var doc = document;
    var clientCards = doc.querySelector("#activeClients").children;
    if (clientCards.length > 1) {
        for (var i = 0; i < clientCards.length - 1; i++) {
            doc.querySelector("#activeClients div:last-child").remove();
        }
    }
}

function showActiveClientsList(activeUsers) {
    var doc = document;
    clearActiveClientsInfoTable();
    var activeClientsElement = doc.getElementById("activeClients");
    var activeClientCard = doc.getElementById("activeClientCard");

    for(var i = 0; i < activeUsers.length; i++){
        var user = activeUsers[i];

        doc.querySelector("#activeClients div:last-child .card-title").innerText = user;
        doc.querySelector("#activeClients div:last-child .card-body__button").addEventListener('click', function () {
            connectToClient(user);
        }, false);

        var activeClientCardClone = activeClientCard.cloneNode(true);
        activeClientsElement.appendChild(activeClientCardClone);
    }
    activeClientsElement.removeChild(activeClientsElement.lastChild);
}

function connectToClient(client) {
    //todo
}