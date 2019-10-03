<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link rel="stylesheet" href="../css/bootstrap.min.css">
    <link rel="stylesheet" href="../css/main.css">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"
          integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf" crossorigin="anonymous">
    <script type="text/javascript">
        <?php include("../root_url.php") ?>
        var frontendServerHost = "<?php echo $frontendServerHost; ?>";
        var authServerHost = "<?php echo $authServerHost; ?>";
        var cardServerHost = "<?php echo $cardServerHost; ?>";
        var mainServerHost = "<?php echo $mainServerHost; ?>";
    </script>
</head>
<body>
<div class="container-fluid">
    <!--  Navigation  -->
    <?php
    $nav_item = [
        "Home" => "../index.php",
        "Client Menu" => "../index.php",
        "Card Menu" => "../index.php",
    ];
    $active_item = "";
    include("../navigation.php");
    ?>

    <div id="errorMessage" class="alert alert-danger fixed-bottom hide" role="alert"></div>

    <!--  Header  -->
    <?php
    $headerText = "Registration";
    include("../header.php");
    ?>

    <div class="container">
        <form class="mr-auto form jumbotron mt-2 py-4 w-100" action="">
            <div class="row">
                <div class="form-group col- col-md-6 position-relative mb-0">
                    <label class="" for="login">Login:</label>
                    <input type="text" class="form-control text-dark mb-4 w-100" id="login" placeholder="Login">
                    <div id="loginError" class="small text-danger position-absolute fixed-bottom ml-4"></div>
                </div>
            </div>
            <div class="row">
                <div class="form-group col- col-md-6 position-relative mb-0">
                    <label class="" for="name">Name:</label>
                    <input type="text" class="form-control text-dark mb-4 w-100" id="name" placeholder="Name">
                    <div id="nameError" class="small text-danger position-absolute fixed-bottom ml-4"></div>
                </div>
                <div class="form-group col- col-md-6 position-relative mb-0">
                    <label class="" for="surname">Surname:</label>
                    <input type="text" class="form-control text-dark mb-4 w-100" id="surname" placeholder="Surname">
                    <div id="surnameError" class="small text-danger position-absolute fixed-bottom ml-4"></div>
                </div>
            </div>
            <div class="form-group px-0 mb-0 w-100">
                <label class="" for="day">Birthday:</label>
                <div class="row w-100 m-0 justify-content-between">
                    <div class="col- col-md-4 position-relative mt-3 mt-md-0 p-0 pr-md-3 pl-md-0">
                        <input type="text" class="form-control form-inline text-dark mb-4 w-100" id="day"
                               placeholder="Day">
                        <div id="dayError" class="small text-danger position-absolute fixed-bottom ml-2"></div>
                    </div>
                    <div class="col- col-md-4 position-relative mt-3 mt-md-0 p-0 px-md-3">
                        <input type="text" class="form-control form-inline text-dark mb-4 w-100" id="month"
                               placeholder="Month">
                        <div id="monthError" class="small text-danger position-absolute fixed-bottom ml-2"></div>
                    </div>
                    <div class="col- col-md-4 position-relative mt-3 mt-md-0 p-0 pl-md-3 pr-md-0">
                        <input type="text" class="form-control form-inline text-dark mb-4 w-100" id="year"
                               placeholder="Year">
                        <div id="yearError" class="small text-danger position-absolute fixed-bottom ml-2"></div>
                    </div>
                </div>
            </div>
            <div class="form-group px-0 mb-0 w-100">
                <label class="" for="country">Address:</label><br>
                <div class="row w-100 m-0 justify-content-between">
                    <div class="col- col-md-6 p-0">
                        <div class="row m-0 justify-content-between pr-md-5">
                            <div class="col- col-md-5 position-relative p-0 mt-3 mt-md-0">
                                <input type="text" class="form-control form-inline text-dark mb-4 w-100" id="country"
                                       placeholder="Country">
                                <div id="countryError"
                                     class="small text-danger position-absolute fixed-bottom ml-2"></div>
                            </div>
                            <div class="col- col-md-5 position-relative p-0 mt-3 mt-md-0">
                                <input type="text" class="form-control form-inline text-dark mb-4 w-100" id="city"
                                       placeholder="City">
                                <div id="cityError" class="small text-danger position-absolute fixed-bottom ml-2"></div>
                            </div>
                        </div>
                    </div>
                    <div class="col- col-md-6 p-0">
                        <div class="row m-0 justify-content-between pl-md-5">
                            <div class="col- col-md-5 position-relative p-0 mt-3 mt-md-0">
                                <input type="text" class="form-control form-inline text-dark mb-4 w-100" id="street"
                                       placeholder="Street">
                                <div id="streetError"
                                     class="small text-danger position-absolute fixed-bottom ml-2"></div>
                            </div>
                            <div class="col- col-md-5 position-relative p-0 mt-3 mt-md-0">
                                <input type="text" class="form-control form-inline text-dark mb-4 w-100" id="postcode"
                                       placeholder="Postcode">
                                <div id="postcodeError"
                                     class="small text-danger position-absolute fixed-bottom ml-2"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row w-100 mx-auto">
                <div class="form-group col- col-md-6 position-relative mb-0 px-0 pr-md-3">
                    <label class="" for="email">Email:</label>
                    <input type="text" class="form-control text-dark mb-4 w-100" id="email" placeholder="Email">
                    <div id="emailError" class="small text-danger position-absolute fixed-bottom ml-2"></div>
                </div>
                <div class="form-group col- col-md-6 position-relative mb-0 px-0 pl-md-3">
                    <label class="" for="phone">Phone:</label>
                    <div class="input-group mb-4 w-100">
                        <div class="input-group-prepend">
                            <button id="phonePrefix" class="btn btn-outline-secondary dropdown-toggle" type="button"
                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">+380 (UA)
                            </button>
                            <div id="phoneDropDown" class="dropdown-menu">
                                <a class="dropdown-item" href="#">+380 (UA)</a>
                                <a class="dropdown-item" href="#">+780 (RU)</a>
                                <a class="dropdown-item" href="#">+333 (EU)</a>
                            </div>
                        </div>
                        <input id="phone" type="text" class="form-control" aria-label="Text input with dropdown button">
                    </div>
                    <div id="phoneError" class="small text-danger position-absolute fixed-bottom ml-2"></div>
                </div>
            </div>
            <div class="row w-100 mx-auto">
                <div class="form-group col- col-md-6 position-relative mb-0 px-0 pr-md-3">
                    <label class="" for="password">Password:</label>
                    <input type="password" class="form-control text-dark mb-4 w-100" id="password"
                           placeholder="Password">
                    <div id="passwordError" class="small text-danger position-absolute fixed-bottom ml-2"></div>
                    <div id="passwordWarning" class="small text-warning position-absolute fixed-bottom ml-2"></div>
                    <div id="passwordSuccess" class="small text-success position-absolute fixed-bottom ml-2"></div>
                </div>
            </div>
            <button id="registerButton" type="button" class="btn btn-dark w-100 mt-3">Register</button>
        </form>
    </div>

    <!--  Footer  -->
    <?php
    include("../footer.php");
    ?>
</div>


<script src="../js/jquery-3.4.1.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js"
        integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q"
        crossorigin="anonymous"></script>
<script src="../js/bootstrap.min.js"></script>
<script type="text/javascript" src="../files/countries.json"></script>
<script src="../js/main-functions.js"></script>
<script src="../js/main.js"></script>
<script src="../js/client/client-functions.js"></script>
<script src="../js/client/registration.js"></script>
</body>
</html>