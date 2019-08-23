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
        url: 'http://127.0.0.1:8080/auth/realms/bank/protocol/openid-connect/token',
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
            window.location.href = "http://127.0.0.1/index.html";
        }
    });
}

function showClientInfo() {
    var doc = document;
    $.ajax({
        type: "GET",
        contentType: 'application/JSON',
        url: 'http://127.0.0.1:8087/client/' + getLogin() + '/info',
        dataType: 'json',
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
                    showClientInfo();
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