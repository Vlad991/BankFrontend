var doc = document;

doc.addEventListener("DOMContentLoaded", myLoad);

function myLoad() {
    doc.getElementById("registerButton").addEventListener("click", sendLogin);
}

function sendLogin() {
    console.log('sendLogin');
    $.ajax({
        type: "POST",
        contentType: "application/JSON",
        url: 'http://127.0.0.1:8087/registration',
        data: JSON.stringify({
            "login": doc.getElementById("login").value,
            "name": doc.getElementById("name").value,
            "surname": doc.getElementById("name").value,
            "birthday": {
                "day": doc.getElementById("day").value,
                "month": doc.getElementById("month").value,
                "year": doc.getElementById("year").value
            },
            "address": {
                "country": doc.getElementById("country").value,
                "city": doc.getElementById("city").value,
                "street": doc.getElementById("street").value,
                "postcode": doc.getElementById("postcode").value
            },
            "email": doc.getElementById("email").value,
            "phone": doc.getElementById("phone").value,
            "password": doc.getElementById("password").value
        }),

        success: function (xhr, ajaxOptions, thrownError) {
            window.location.href = 'http://127.0.0.1/index.html';
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
