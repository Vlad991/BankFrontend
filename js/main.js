var doc = document;

doc.addEventListener("DOMContentLoaded", myLoad);

function myLoad() {
    doc.getElementById("loginButton").addEventListener("click", sendLoginPassword);
}

function sendLoginPassword() {
    $.ajax({
        type: "POST",
        contentType: 'application/x-www-form-urlencoded',
        url: 'http://127.0.0.1:8080/auth/realms/bank/protocol/openid-connect/token',
        crossOrigin: false,
        data: jQuery.param({
            grant_type: "password",
            client_id: "ADMIN-UI",
            username: doc.getElementById("login").value,
            password: doc.getElementById("password").value
        }),

        success: function (xhr, ajaxOptions, thrownError) {
            var accessToken = xhr.access_token;
            var refreshToken = xhr.refresh_token;
            window.localStorage.setItem("access", accessToken);
            window.localStorage.setItem("refresh", refreshToken);

            var array_access_token = accessToken.split('.');
            var base64Url = array_access_token[1];
            var accessTokenJSON = JSON.parse(window.atob(base64Url));
            var roles = accessTokenJSON.resource_access["bank-web"].roles;

            if (roles[0].includes("ROLE_ADMIN")) {
                window.location.href = "http://127.0.0.1/admin/home.html";
            } else if (roles[0].includes("ROLE_MANAGER")) {
                window.location.href = "http://127.0.0.1/manager/home.html";
            } else if (roles[0].includes("ROLE_CLIENT")) {
                window.location.href = "http://127.0.0.1/client/home.html";
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
}
