<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link rel="stylesheet" href="../css/bootstrap.min.css">
    <link rel="stylesheet" href="../css/main.css">
    <link rel="stylesheet" href="../css/card_menu.css">
    <style>
        input {
            webkit-box-shadow: 0 0 0 30px #161616 inset !important;
        }
    </style>
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
    $active_item = "Card Menu";
    include("../navigation.php");
    ?>

    <!--  Messenger  -->
    <?php
    include("./messenger.php");
    ?>

    <div class="row w-100">
        <div class="col- col-md-2 mt-5 ml-3">
            <div class="nav flex-md-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                <a class="nav-link active" id="v-pills-home-tab" data-toggle="pill" href="#v-pills-home" role="tab"
                   aria-controls="v-pills-home" aria-selected="true">Credit Card Info</a>
                <a class="nav-link" id="v-pills-profile-tab" data-toggle="pill" href="#v-pills-profile" role="tab"
                   aria-controls="v-pills-profile" aria-selected="false">Send Money</a>
                <a class="nav-link" id="v-pills-messages-tab" data-toggle="pill" href="#v-pills-messages" role="tab"
                   aria-controls="v-pills-messages" aria-selected="false">Block Card</a>
                <a class="nav-link" id="v-pills-settings-tab" data-toggle="pill" href="#v-pills-settings" role="tab"
                   aria-controls="v-pills-settings" aria-selected="false">Settings</a>
                <span id="errorMessage" class="text-danger"></span>
            </div>
        </div>
        <div class="col- col-md-8">
            <div class="tab-content" id="v-pills-tabContent">
                <div class="tab-pane fade show active" id="v-pills-home" role="tabpanel"
                     aria-labelledby="v-pills-home-tab">
                    <div class="div-page p-3 p-md-5">
                        <div class="credit-card p-3 jumbotron d-inline-block position-relative">
                            <div class="credit-card__bank d-inline-block ml-2 mr-5 text-light">
                                <img class="w-25 mr-2" src="../img/menu/logo.svg" alt="Logo">MyBank
                            </div>
                            <div class="credit-card__type d-inline-block ml-4 text-light">Credit card "Universal"</div>
                            <h3 id="cardNumber" class="credit-card__number position-absolute text-light">???? ???? ????
                                ????</h3>
                            <div id="cardDate" class="credit-card__date text-light position-relative">??/??</div>
                            <div id="cardName" class="credit-card__name text-light position-relative">????? ?????</div>
                        </div>
                        <div class="d-inline-block">
                            <div class="d-inline-block ml-4 ml-md-5">Sum: <span id="cardSum" class="text-info">0</span>$</div>
                            <div class="d-inline-block ml-4 ml-md-5">Status:
                                <span id="cardStatus" class="text-info">????</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="tab-pane fade" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab">
                    <div class="div-page p-3 p-md-5">
                        <form class="w-100">
                            <div class="form-group row col-md-6 m-0 mt-3 p-0">
                                <label for="senderCard">Sender Card</label>
                                <input type="text" class="form-control bg-transparent text-light border-light"
                                       id="senderCard" aria-describedby="emailHelp"
                                       placeholder="Enter your card number">
                            </div>
                            <div class="form-group row col-md-6 m-0 mt-3 p-0">
                                <label for="receiverCard">Receiver Card</label>
                                <input type="text" class="form-control bg-transparent text-light border-light"
                                       id="receiverCard" aria-describedby="emailHelp"
                                       placeholder="Enter receiver card number">
                            </div>
                            <div class="form-group row col-md-6 m-0 mt-3 p-0">
                                <label for="sum">Sum</label>
                                <input type="text" class="form-control bg-transparent text-light border-light"
                                       id="sum" aria-describedby="emailHelp"
                                       placeholder="Enter sum you want to send">
                            </div>
                            <div class="form-group row col-md-6 m-0 mt-3 p-0">
                                <label for="pinToSend">Pin</label>
                                <input type="password" class="form-control bg-transparent text-light border-light"
                                       id="pinToSend" placeholder="Your pin">
                            </div>
                            <span id="resultMessage" class="text-success"></span><br>
                            <button id="sendSumButton" type="button" class="btn btn-light mt-3 row col-md-6 m-0">Send</button>
                        </form>
                    </div>
                </div>
                <div class="tab-pane fade" id="v-pills-messages" role="tabpanel" aria-labelledby="v-pills-messages-tab">
                    <div class="div-page p-3 p-md-5">
                        <form class="w-100">
                            <div class="form-group row col-md-6 m-0 mt-3 p-0">
                                <label for="actionsCard">Card</label>
                                <input type="text" class="form-control bg-transparent border-light text-light" id="actionsCard" autocomplete="off" aria-describedby="emailHelp" placeholder="Enter your card number">
                            </div>
                            <div class="form-group row col-md-6 m-0 mt-3 p-0">
                                <label for="pinToBlock">Pin</label>
                                <input type="password" class="form-control bg-transparent border-light text-light" id="pinToBlock" placeholder="Your pin">
                            </div>
                            <button id="blockCardBtn" type="button" class="btn btn-light row col-md-6 m-0 mt-4">BLOCK</button>
                        </form>
                    </div>
                </div>
                <div class="tab-pane fade" id="v-pills-settings" role="tabpanel" aria-labelledby="v-pills-settings-tab">
                    <div class="div-page p-5">
                        <p>Here should be some credit card settings.</p>
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
<script src="../js/client/card_menu.js"></script>
</body>
</html>