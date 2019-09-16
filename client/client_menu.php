<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link rel="stylesheet" href="../css/bootstrap.min.css">
<!--    <link rel="stylesheet" href="css/mdb.css">-->
    <link rel="stylesheet" href="../css/main.css">
    <link rel="stylesheet" href="../css/client_menu.css">
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
        "Home" => "./home.php",
        "Client Menu" => "./client_menu.php",
        "Card Menu" => "./card_menu.php",
    ];
    $active_item = "Client Menu";
    include("../navigation.php");
    ?>

    <!--  Messenger  -->
    <?php
    include("./messenger.php");
    ?>

    <div class="row w-100">
        <div class="col- col-md-2 mt-5 ml-3">
            <div class="nav flex-md-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                <a class="nav-link active" id="v-pills-info-tab" data-toggle="pill" href="#v-pills-info" role="tab"
                   aria-controls="v-pills-info" aria-selected="true">Personal Info</a>
                <a class="nav-link" id="v-pills-cards-tab" data-toggle="pill" href="#v-pills-cards" role="tab"
                   aria-controls="v-pills-cards" aria-selected="false">Credit Cards</a>
                <a class="nav-link" id="v-pills-something-tab" data-toggle="pill" href="#v-pills-something" role="tab"
                   aria-controls="v-pills-something" aria-selected="false">Something</a>
                <a class="nav-link" id="v-pills-settings-tab" data-toggle="pill" href="#v-pills-settings" role="tab"
                   aria-controls="v-pills-settings" aria-selected="false">Settings</a>
                <span id="errorMessage" class="text-danger"></span>
            </div>
        </div>
        <div class="col- col-md-8">
            <div class="tab-content" id="v-pills-tabContent">
                <div class="tab-pane fade show active" id="v-pills-info" role="tabpanel" aria-labelledby="v-pills-info-tab">
                    <div class="div-page p-4 p-md-5">
                        <div class="">Login: <span id="clientLogin"></span></div>
                        <div class="">Name: <span id="clientName"></span></div>
                        <div class="">Surname: <span id="clientSurname"></span></div>
                        <div class="">Birthday: <span id="clientBirthday"></span></div>
                        <div class="">Address: <span id="clientAddress"></span></div>
                        <div class="">Email: <span id="clientEmail"></span></div>
                        <div class="">Phone: <span id="clientPhone"></span></div>
                    </div>
                </div>
                <div class="tab-pane fade" id="v-pills-cards" role="tabpanel" aria-labelledby="v-pills-cards-tab">
                    <div class="div-page p-4 p-md-5">
                        <nav class="">
                            <ul id="cardList" class="navbar-nav">
                                <li id="creditCard" class="position-relative">
                                    <div class="credit-card p-3 p-md-3 jumbotron">
                                        <div class="credit-card__bank d-inline-block ml-0 ml-md-2 mr-0 mr-md-5 text-light">
                                            <img class="w-25 mr-2 mr-md-2" src="../img/menu/logo.svg" alt="Logo">MyBank
                                        </div>
                                        <div class="credit-card__type d-inline-block ml-0 ml-md-4 text-light"> Credit card "Universal"</div>
                                        <h3 class="credit-card__number position-absolute text-light">???? ???? ???? ????</h3>
                                        <div class="credit-card__date text-light position-relative">??/??</div>
                                        <div class="credit-card__name text-light position-relative">?????? ??????</div>
                                    </div>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
                <div class="tab-pane fade" id="v-pills-something" role="tabpanel" aria-labelledby="v-pills-something-tab">
                    <div class="div-page p-4 p-md-5">
                        <p>Here can be some more information about client.</p>
                    </div>
                </div>
                <div class="tab-pane fade" id="v-pills-settings" role="tabpanel" aria-labelledby="v-pills-settings-tab">
                    <div class="div-page p-4 p-md-5">
                        <p>Here should be some client settings.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!--  Comments  -->
    <?php include("../comments.php") ?>

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
<script src="../js/client/client_menu.js"></script>
</body>
</html>