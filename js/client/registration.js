var doc = document;

doc.addEventListener("DOMContentLoaded", myLoad);
let countries;
$.getJSON("../files/countries.json", function (json) {
    countries = json;
});

function myLoad() {
    doc.getElementById("registerButton").addEventListener("click", registerNewUser);
    $("#errorMessage").hide();
    addValidationEvents();
}

function registerNewUser() {
    $("#errorMessage").hide();
    doc.getElementById("errorMessage").innerHTML = "";
    if (validateRegistrationData()) {
        $.ajax({
            type: "POST",
            contentType: "application/JSON",
            url: 'http://' + mainServerHost + '/registration',
            crossOrigin: true,
            data: JSON.stringify({
                "login": doc.getElementById("login").value,
                "name": doc.getElementById("name").value,
                "surname": doc.getElementById("surname").value,
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
                console.log("Registration success!");
                window.location.href = '../../index.php';
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

function validateRegistrationData() {
    var result = true;
    if (!validateComponentLengthAndOneWord("login", false, 3, 15, "Login must have from 3 to 15 characters!") ||
        !validateComponentStartsWithLetterAndContainsLettersAndDigits("login", "Login must start with letter, and contains no symbols!")) {
        result = false;
    }
    if (!validateComponentLengthAndOneWord("name", false, 3, 20, "Name must have from 3 to 15 characters!") ||
        !validateComponentOnlyLetters("name", "Name contains only letters!")) {
        result = false;
    }
    if (!validateComponentLengthAndOneWord("surname", false, 3, 20, "Surname must have from 3 to 15 characters!") ||
        !validateComponentOnlyLetters("surname", "Surname contains only letters!")) {
        result = false;
    }
    if (!validateDay("day", "Day must have XX format!")) {
        result = false;
    }
    if (!validateMonth("month", "Month must have XX format!")) {
        result = false;
    }
    if (!validateYear("year", "Year must have XXXX format!")) {
        result = false;
    }
    if (!validateCountry("country", "Country not exists!")) {
        result = false;
    }
    if (!validateCity("city", "City not exists!")) {
        result = false;
    }
    if (!validateComponentOnlyLetters("street", "Incorrect street!") ||
        !validateComponentLengthAndOneWord("street", false, 3, 20, "Incorrect street")) {
        result = false;
    }
    if (!validatePostCode("postcode", "Incorrect postcode!")) {
        result = false;
    }
    if (!validateEmail("email", "Incorrect email!")) {
        result = false;
    }
    if (!validatePhoneNumberPart("phone", "Incorrect phone!")) {
        result = false;
    }
    if (!validatePassword("password", "Incorrect password!")) {
        result = false;
    }
    return result;
}

function addValidationEvents() {
    doc.getElementById("login").addEventListener("keyup", function (event) {
        removeRedMessage("login");
        validateComponentLengthAndOneWord("login", false, 3, 15, "Login must have from 3 to 15 characters!");
        validateComponentStartsWithLetterAndContainsLettersAndDigits("login", "Login must start with letter, and contains no symbols!")
    });
    doc.getElementById("name").addEventListener("keyup", function (event) {
        removeRedMessage("name");
        validateComponentLengthAndOneWord("name", false, 3, 20, "Name must have from 3 to 15 characters!");
        validateComponentOnlyLetters("name", "Name contains only letters!");
    });
    doc.getElementById("surname").addEventListener("keyup", function (event) {
        removeRedMessage("surname");
        validateComponentLengthAndOneWord("surname", false, 3, 20, "Surname must have from 3 to 15 characters!");
        validateComponentOnlyLetters("surname", "Surname contains only letters!");
    });
    doc.getElementById("day").addEventListener("keyup", function (event) {
        removeRedMessage("day");
        validateDay("day", "Day must have XX format!");
    });
    doc.getElementById("month").addEventListener("keyup", function (event) {
        removeRedMessage("month");
        validateMonth("month", "Month must have XX format!");
    });
    doc.getElementById("year").addEventListener("keyup", function (event) {
        removeRedMessage("year");
        validateYear("year", "Year must have XXXX format!");
    });
    doc.getElementById("country").addEventListener("keyup", function (event) {
        removeRedMessage("country");
        validateCountry("country", "Country not exists!");
    });
    doc.getElementById("city").addEventListener("keyup", function (event) {
        removeRedMessage("city");
        validateCity("city", "City not exists!");
    });
    doc.getElementById("street").addEventListener("keyup", function (event) {
        removeRedMessage("street");
        validateComponentLengthAndOneWord("street", false, 3, 20, "Incorrect street");
        validateComponentOnlyLetters("street", "Incorrect street!");
    });
    doc.getElementById("postcode").addEventListener("keyup", function (event) {
        removeRedMessage("postcode");
        validatePostCode("postcode", "Incorrect postcode!");
    });
    doc.getElementById("email").addEventListener("keyup", function (event) {
        removeRedMessage("email");
        validateEmail("email", "Incorrect email!");
    });
    doc.getElementById("phone").addEventListener("keyup", function (event) {
        removeRedMessage("phone");
        validatePhoneNumberPart("phone", "Incorrect phone!");
    });
    var phoneDropDown = doc.querySelector("#phoneDropDown");
    for (let i = 0; i < phoneDropDown.childNodes.length; i++) {
        phoneDropDown.childNodes[i].addEventListener("click", function (event) {
            event.preventDefault();
            doc.getElementById("phonePrefix").innerHTML = event.target.innerText;
        });
    }
    doc.getElementById("password").addEventListener("keyup", function (event) {
        removeRedMessage("password");
        removeYellowMessage("password");
        removeGreenMessage("password");
        validatePassword("password", "Incorrect password!");
    });
}

function addRedMessage(elementId, message) {
    removeYellowMessage(elementId);
    removeGreenMessage(elementId);
    doc.getElementById(elementId).classList.add("border-danger");
    if (doc.getElementById(elementId + "Error")) {
        doc.getElementById(elementId + "Error").innerHTML = message;
    }
}

function addYellowMessage(elementId, message) {
    removeRedMessage(elementId);
    removeGreenMessage(elementId);
    doc.getElementById(elementId).classList.add("border-warning");
    doc.getElementById(elementId + "Warning").innerHTML = message;
}

function addGreenMessage(elementId, message) {
    removeRedMessage(elementId);
    removeYellowMessage(elementId);
    doc.getElementById(elementId).classList.add("border-success");
    doc.getElementById(elementId + "Success").innerHTML = message;
}

function removeRedMessage(elementId) {
    doc.getElementById(elementId).classList.remove("border-danger");
    if (doc.getElementById(elementId + "Error")) {
        doc.getElementById(elementId + "Error").innerHTML = "";
    }
}

function removeYellowMessage(elementId) {
    doc.getElementById(elementId).classList.remove("border-warning");
    if (doc.getElementById(elementId + "Warning")) {
        doc.getElementById(elementId + "Warning").innerHTML = "";
    }
}

function removeGreenMessage(elementId) {
    doc.getElementById(elementId).classList.remove("border-success");
    if (doc.getElementById(elementId + "Success")) {
        doc.getElementById(elementId + "Success").innerHTML = "";
    }
}

function validateComponentLengthAndOneWord(elementId, nullable = true, minLength = 0, maxLength = 45, message) {
    var element = doc.getElementById(elementId);
    var result = true;

    var regExpString = '^([\\S]{' + minLength.toString() + ',' + maxLength.toString() + '})$';
    var regExp = new RegExp(regExpString);
    if (!regExp.test(element.value)) {
        addRedMessage(elementId, message);
        result = false;
    }

    return result;
}

function validateComponentOnlyLetters(elementId, message) {
    var element = doc.getElementById(elementId);

    var result = true;

    var regExpString = '^([A-Za-z]*)$';
    var regExp = new RegExp(regExpString);
    if (!regExp.test(element.value)) {
        addRedMessage(elementId, message);
        result = false;
    }

    return result;
}

function validateComponentStartsWithLetterAndContainsLettersAndDigits(elementId, message) {
    var element = doc.getElementById(elementId);

    var result = true;

    var regExpString = '^(([A-Za-z]+[A-Za-z0-9]*)?)$';
    var regExp = new RegExp(regExpString);
    if (!regExp.test(element.value)) {
        addRedMessage(elementId, message);
        result = false;
    }

    return result;
}

function validateDay(elementId, message) {
    var element = doc.getElementById(elementId);

    var result = true;

    var regExpString = '^([0-9]{2})$';
    var regExp = new RegExp(regExpString);
    if (!regExp.test(element.value)) {
        addRedMessage(elementId, message);
        result = false;
    }

    return result;
}

function validateMonth(elementId, message) {
    var element = doc.getElementById(elementId);

    var result = true;

    var regExpString = "^([[0-3]{1}[0-9]{1}]?)$";
    var regExp = new RegExp(regExpString);
    if (!regExp.test(element.value)) {
        addRedMessage(elementId, message);
        result = false;
    }

    if (Number(element.value) > 31 || Number(element.value) < 1) {
        addRedMessage(elementId, message);
        result = false;
    }

    return result;
}

function validateYear(elementId, message) {
    var element = doc.getElementById(elementId);

    var result = true;

    var regExpString = '^([[1-2]{1}[0|9]{1}[0-9]{2}]?)$';
    var regExp = new RegExp(regExpString);
    if (!regExp.test(element.value)) {
        addRedMessage(elementId, message);
        result = false;
    }

    if (Number(element.value) > 2019 || Number(element.value) < 1900) {
        addRedMessage(elementId, message);
        result = false;
    }

    return result;
}

function validateCountry(elementId, message) {
    var element = doc.getElementById(elementId);
    var result = false;

    for (let countriesKey in countries) {
        if (countriesKey === element.value) {
            result = true;
            break;
        }
    }

    if (result === false) {
        addRedMessage(elementId, message);
    }

    return result;
}

function validateCity(elementId, message) {
    var element = doc.getElementById(elementId);
    var result = false;

    for (let countriesKey in countries) {
        for (let i = 0; i < countries[countriesKey].length; i++) {
            if (countries[countriesKey][i] === element.value) {
                result = true;
                break;
            }
        }
    }

    if (result === false) {
        addRedMessage(elementId, message);
    }

    return result;
}

function validatePostCode(elementId, message) {
    var element = doc.getElementById(elementId);

    var result = true;

    var regExpString = '^([0-9]{1,5})$';
    var regExp = new RegExp(regExpString);
    if (!regExp.test(element.value)) {
        addRedMessage(elementId, message);
        result = false;
    }

    return result;
}

function validateEmail(elementId, message) {
    var element = doc.getElementById(elementId);
    var result = true;


    var regExpString = '^[a-zA-Z0-9.!#$%&\'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$';
    var regExp = new RegExp(regExpString);
    if (!regExp.test(element.value)) {
        addRedMessage(elementId, message);
        result = false;
    }

    return result;
}

function validatePhoneNumberPart(elementId, message) {
    var element = doc.getElementById(elementId);
    var result = true;


    var regExpString = '^([0-9]{10})$';
    var regExp = new RegExp(regExpString);
    if (!regExp.test(element.value)) {
        addRedMessage(elementId, message);
        result = false;
    }

    return result;
}

function validatePassword(elementId) {
    var element = doc.getElementById(elementId);
    var result = true;

    var regExpStringFirst = '^([\\S]{3,50})$';
    var regExpStringSecond = '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[#$^+=!*()@%&]).{8,50}$';
    var regExpFirst = new RegExp(regExpStringFirst);
    var regExpSecond = new RegExp(regExpStringSecond);
    addGreenMessage(elementId, "Success");
    if (!regExpSecond.test(element.value)) {
        addYellowMessage(elementId, "Special character and number!");
        if (!regExpFirst.test(element.value)) {
            addRedMessage(elementId, "To short password!");
            result = false;
        }
    }

    return result;
}



