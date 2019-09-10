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
</head>
<body>
<div class="container-fluid">

    <!--  Navigation  -->
    <?php
    $nav_item = [
        "Home" => "./home.php",
        "Client Menu" => "./client_menu.php",
        "Card Menu" => "./card_menu.php",
    ];
    $active_item = "Home";
    include("../navigation.php");
    ?>

    <!--  Header  -->
    <?php
    $headerText = "About MyBank...";
    include("../header.php");
    ?>

    <!--  Messenger  -->
    <?php
    include("./messenger.php");
    ?>

    <div id="errorMessage" class="container text-danger">Error: something went wrong!</div>

    <p class="jumbotron container bg-secondary">MyBank - is my Java Spring Web Application. In this app I use similarity
        of REST microservice architecture (Authorization Keycloak Service and Main Business Logic Service) that
        connected with JMS using Kafka. Frontend is written in pure Java.</p>

    <!--  Footer  -->
    <?php
    include("../footer.php");
    ?>

</div>


<script src="../js/jquery-3.4.1.min.js"></script>
<script src="../js/bootstrap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/sockjs-client@1/dist/sockjs.min.js"></script>
<script src="../js/main-functions.js"></script>
<script src="../js/main.js"></script>
<script src="../js/client/client-functions.js"></script>
<script src="../js/client/home.js"></script>
</body>
</html>