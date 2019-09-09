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
    $headerText = "Need Help?";
    include("./header.php");
    ?>

    <div class="container text-info"><p>Some help information...</p></div>

    <!--  Footer  -->
    <?php
    include("./footer.php");
    ?>
</div>


<script src="js/jquery-3.4.1.min.js"></script>
<script src="js/bootstrap.min.js"></script>
<!--<script src="js/mdb.min.js"></script>-->
<script src="js/main-functions.js"></script>
</body>
</html>