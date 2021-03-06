<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <link rel="icon" type="image/png" href="favicon.png"/>

    <link rel="stylesheet" href="/css/bootstrap.min.css" type="text/css">
    <link rel="stylesheet" media="all" type="text/css" href="/css/main.css">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"
          integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf" crossorigin="anonymous">
    <script type="text/javascript">
        <?php include("./root_url.php") ?>
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
        "Home" => "/index.php",
        "Client Menu" => "/index.php",
        "Card Menu" => "/index.php",
        "Active Clients" => "/index.php",
    ];
    $active_item = "";
    include("./navigation.php");
    ?>

    <div id="errorMessage" class="alert alert-danger fixed-bottom hide w-50 mx-auto" role="alert"></div>

    <!--  Header  -->
    <?php
    $headerText = "Welcome to MyBank!";
    include("./header.php");
    ?>

    <form id="loginForm" class="mx-auto form jumbotron" action="">
        <div class="form-group">
            <label for="login">Login:</label>
            <input type="text" class="form-control" id="login">
            <div id="loginError" class="small text-danger"></div>
        </div>
        <div class="form-group">
            <label for="password">Password:</label>
            <input type="password" class="form-control" id="password">
            <div id="passwordError" class="small text-danger"></div>
        </div>
        <div class="form-group form-check">
            <label class="form-check-label">
                <input class="form-check-input" type="checkbox"> Remember me
            </label>
        </div>
        <button id="loginButton" type="button" class="btn btn-dark w-100">Login</button>
        <a href="client/registration.php" class="nav-link mt-2 text-dark">Not registered yet?</a>
    </form>

    <!--  Footer  -->
    <?php
    include("./footer.php");
    ?>
</div>


<script src="js/jquery-3.4.1.min.js"></script>
<script src="js/bootstrap.min.js"></script>
<script src="js/main-functions.js"></script>
<script src="js/login.js"></script>
</body>
</html>