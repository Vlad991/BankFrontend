var doc = document;

doc.addEventListener("DOMContentLoaded", myLoad);

function myLoad() {
    logout();
    $("#errorMessage").hide();
    doc.getElementById("loginButton").addEventListener("click", sendLoginPassword);
    doc.getElementById("logoLink").addEventListener("click", logout);
}

function sendLoginPassword() {
    $("#errorMessage").hide();
    doc.getElementById("errorMessage").innerHTML = "";
    setInterval(function () {
        validateLoginPassword(doc.getElementById("login"), doc.getElementById("password"));
    }, 200);
    if (validateLoginPassword(doc.getElementById("login"), doc.getElementById("password"))) {
        window.localStorage.setItem("login", doc.getElementById("login").value);
        $.ajax({
            type: "POST",
            contentType: 'application/x-www-form-urlencoded',
            url: 'http://' + authServerHost + '/auth/realms/bank/protocol/openid-connect/token',
            crossOrigin: true,
            data: jQuery.param({
                grant_type: "password",
                client_id: "ADMIN-UI",
                username: doc.getElementById("login").value,
                password: doc.getElementById("password").value
            }),

            success: function (xhr, ajaxOptions, thrownError) {
                var accessToken = xhr.access_token;
                var refreshToken = xhr.refresh_token;

                var array_access_token = accessToken.split('.');
                var base64Url = array_access_token[1];
                var accessTokenJSON = JSON.parse(window.atob(base64Url));
                var roles = accessTokenJSON.resource_access["bank-web"].roles;

                if (roles.includes("ROLE_ADMIN")) {
                    window.localStorage.setItem("adminAccess", accessToken);
                    window.localStorage.setItem("adminRefresh", refreshToken);
                    window.location.href = "../admin/home.php";
                } else if (roles.includes("ROLE_MANAGER")) {
                    window.localStorage.setItem("managerAccess", accessToken);
                    window.localStorage.setItem("managerRefresh", refreshToken);
                    window.location.href = "../manager/home.php";
                } else if (roles.includes("ROLE_CLIENT")) {
                    window.localStorage.setItem("clientAccess", accessToken);
                    window.localStorage.setItem("clientRefresh", refreshToken);
                    window.location.href = "../client/home.php";
                }
                console.log("success");
            },

            error: function (xhr, ajaxOptions, thrownError) {
                console.log(xhr.status);
                var errorJson;
                var message;
                if (typeof xhr.responseText === undefined) {
                    errorJson = "No error information!";
                    message = errorJson;
                } else {
                    errorJson = JSON.parse(xhr.responseText);
                    console.log(errorJson);
                    if (errorJson.message === undefined) {
                        message = errorJson.error_description;
                    } else {
                        message = errorJson.message;
                    }
                }
                doc.getElementById("errorMessage").innerText = message;
                $("#errorMessage").show();
                $("#errorMessage").alert();
            }
        });
    } else {
        console.error("Wrong input data!");
    }
}

function validateLoginPassword(loginElement, passwordElement) {
    var login = loginElement.value;
    var password = passwordElement.value;
    var result = true;
    loginElement.classList.remove("border-danger");
    doc.getElementById("loginError").innerHTML = "";
    passwordElement.classList.remove("border-danger");
    doc.getElementById("passwordError").innerHTML = "";
    if (!login) {
        loginRedMessage("Login is required!");
        result = false;
    }

    if (!password) {
        passwordRedMessage("Password is required!");
        result = false;
    }

    if (login.length < 3 || login.length > 10) {
        loginRedMessage("Login must have 3 to 10 characters!");
        result = false;
    }

    if (password.length < 3 || password.length > 10) {
        passwordRedMessage("Password must have 3 to 10 characters!");
        result = false;
    }

    return result;
}

function loginRedMessage(message) {
    doc.getElementById("login").classList.add("border-danger");
    doc.getElementById("loginError").innerHTML = message;
}

function passwordRedMessage(message) {
    doc.getElementById("password").classList.add("border-danger");
    doc.getElementById("passwordError").innerHTML = message;
}
