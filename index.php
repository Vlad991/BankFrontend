<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link rel="stylesheet" href="css/bootstrap.min.css">
<!--    <link rel="stylesheet" href="css/mdb.css">-->
    <link rel="stylesheet" href="css/main.css">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"
          integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf" crossorigin="anonymous">
</head>
<body>
<div class="container-fluid">

    <!--  Navigation  -->
    <?php
    $nav_item = [
        "Home" => "/index.php",
        "Client Menu" => "/index.php",
        "Card Menu" => "/index.php",
        "Active Clients" => "/index.php",
    ];
    $active_item = "";
    include("./navigation.php");
    ?>

    <!--  Header  -->
    <?php
    $headerText = "Welcome to MyBank!";
    include("./header.php");
    ?>

    <form class="mx-auto form jumbotron" action="">
        <div class="form-group">
            <label for="login">Login:</label>
            <input type="text" class="form-control" id="login">
        </div>
        <div class="form-group">
            <label for="password">Password:</label>
            <input type="password" class="form-control" id="password">
        </div>
        <div class="form-group form-check">
            <label class="form-check-label">
                <input class="form-check-input" type="checkbox"> Remember me
            </label>
        </div>
        <button id="loginButton" type="button" class="btn btn-dark w-100">Login</button>
        <a href="client/registration.php" class="nav-link mt-2 text-dark">Not registered yet?</a>
        <span id="errorMessage" class="text-danger">Error: something went wrong!</span>
    </form>

    <!--  Footer  -->
    <?php
    include("./footer.php");
    ?>
</div>


<script src="js/jquery-3.4.1.min.js"></script>
<script src="js/bootstrap.min.js"></script>
<!--<script src="js/mdb.min.js"></script>-->
<script src="js/main-functions.js"></script>
<script src="js/login.js"></script>
</body>
</html>