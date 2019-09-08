var doc = document;

doc.addEventListener("DOMContentLoaded", myLoad);

function myLoad() {
    doc.getElementById("loginButton").addEventListener("click", sendLoginPassword);
    doc.getElementById("logoLink").addEventListener("click", logout);
}

function sendLoginPassword() {
    window.localStorage.setItem("login", doc.getElementById("login").value);
    $.ajax({
        type: "POST",
        contentType: 'application/x-www-form-urlencoded',
        url: 'http://127.0.0.1:8080/auth/realms/bank/protocol/openid-connect/token',
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
                window.location.href = "http://127.0.0.1/admin/home.html";
            } else if (roles.includes("ROLE_MANAGER")) {
                window.localStorage.setItem("managerAccess", accessToken);
                window.localStorage.setItem("managerRefresh", refreshToken);
                window.location.href = "http://127.0.0.1/manager/home.html";
            } else if (roles.includes("ROLE_CLIENT")) {
                window.localStorage.setItem("clientAccess", accessToken);
                window.localStorage.setItem("clientRefresh", refreshToken);
                window.location.href = "http://127.0.0.1/client/home.html";
            }
            console.log("success");
        },

        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status);
            var errorJson;
            var message;
            if (typeof xhr.responseText !== 'undefined') {
                errorJson = "No error information!";
                message = errorJson;
            } else {
                errorJson = JSON.parse(xhr.responseText);
                message = errorJson.message;
            }
            doc.getElementById("errorMessage").innerText = message;
        }
    });
}
