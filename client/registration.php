<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link rel="stylesheet" href="../css/bootstrap.min.css">
<!--    <link rel="stylesheet" href="css/mdb.css">-->
    <link rel="stylesheet" href="../css/main.css">
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

    <!--  Header  -->
    <?php
    $headerText = "Registration";
    include("../header.php");
    ?>

    <div class="container">
        <form class="mr-auto form jumbotron bg-dark mt-2" action="">
            <div class="form-group">
                <label class="text-light" for="login">Login:</label>
                <input type="text" class="form-control bg-dark text-light" id="login" placeholder="Login">
            </div>
            <div class="form-group">
                <label class="text-light" for="name">Name:</label>
                <input type="text" class="form-control bg-dark text-light" id="name" placeholder="Name">
            </div>
            <div class="form-group">
                <label class="text-light" for="surname">Surname:</label>
                <input type="text" class="form-control bg-dark text-light" id="surname" placeholder="Surname">
            </div>
            <div class="form-group">
                <label class="text-light" for="day">Birthday:</label><br>
                <input type="text" class="form-control form-inline bg-dark text-light w-25 mr-4 d-inline-block" id="day"
                       placeholder="Day">
                <input type="text" class="form-control form-inline bg-dark text-light w-25 mr-4 d-inline-block"
                       id="month" placeholder="Month">
                <input type="text" class="form-control form-inline bg-dark text-light w-25 d-inline-block" id="year"
                       placeholder="Year">
            </div>
            <div class="form-group">
                <label class="text-light" for="country">Address:</label><br>
                <input type="text" class="form-control form-inline bg-dark text-light w-25 mr-1 d-inline-block" id="country"
                       placeholder="Country">
                <input type="text" class="form-control form-inline bg-dark text-light w-25 mr-1 d-inline-block" id="city"
                       placeholder="City">
                <input type="text" class="form-control form-inline bg-dark text-light w-25 mr-1 d-inline-block" id="street"
                       placeholder="Street">
                <input type="text" class="form-control form-inline bg-dark text-light w-75 mr-1 mt-2 d-inline-block" id="postcode"
                       placeholder="Postcode">
            </div>
            <div class="form-group">
                <label class="text-light" for="email">Email:</label>
                <input type="text" class="form-control bg-dark text-light" id="email" placeholder="Email">
            </div>
            <div class="form-group">
                <label class="text-light" for="phone">Phone:</label>
                <input type="text" class="form-control bg-dark text-light" id="phone" placeholder="Phone">
            </div>
            <div class="form-group">
                <label class="text-light" for="password">Password:</label>
                <input type="password" class="form-control bg-dark text-light" id="password" placeholder="Password">
            </div>
            <span id="errorMessage" class="text-danger">Error: something went wrong!</span>
            <button id="registerButton" type="button" class="btn btn-light w-100 mt-3">Register</button>
        </form>
    </div>

    <!--  Footer  -->
    <?php
    include("../footer.php");
    ?>
</div>


<script src="../js/jquery-3.4.1.min.js"></script>
<script src="../js/bootstrap.min.js"></script>
<script src="../js/main-functions.js"></script>
<script src="../js/main.js"></script>
<script src="../js/client/client-functions.js"></script>
<script src="../js/client/registration.js"></script>
</body>
</html>