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
        "Clients" => "./clients.php",
        "Settings" => "./settings.php",
    ];
    $active_item = "Clients";
    include("../navigation.php");
    ?>

    <div class="container">
        <ul class="nav nav-pills my-4" id="pills-tab" role="tablist">
            <li class="nav-item">
                <a class="nav-link active" id="pills-info-tab" data-toggle="pill" href="#pills-info" role="tab"
                   aria-controls="pills-info" aria-selected="true">Clients Info</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" id="pills-card-tab" data-toggle="pill" href="#pills-card" role="tab"
                   aria-controls="pills-card" aria-selected="false">Credit Cards Info</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" id="pills-address-tab" data-toggle="pill" href="#pills-address"
                   role="tab"
                   aria-controls="pills-address" aria-selected="false">Active Clients</a>
            </li>
            <li class="nav-item">
                <a class="nav-link position-relative" id="pills-settings-tab" data-toggle="pill" href="#pills-settings"
                   role="tab"
                   aria-controls="pills-settings" aria-selected="false">Connected Client</a>
            </li>
        </ul>
        <div class="tab-content" id="pills-tabContent">
            <div class="tab-pane fade show active" id="pills-info" role="tabpanel" aria-labelledby="pills-info-tab">
                <div class="div-page p-0 table-responsive">
                    <table class="table table-hover table-dark">
                        <thead class="thead-light">
                        <tr>
                            <th scope="col">#id</th>
                            <th scope="col">Login</th>
                            <th scope="col">Name</th>
                            <th scope="col">Surname</th>
                            <th scope="col">Birthday</th>
                            <th scope="col">Address</th>
                            <th scope="col">Email</th>
                            <th scope="col">Phone</th>
                        </tr>
                        </thead>
                        <tbody id="clientInfoTable">
                        <tr id="clientInfo">
                            <th scope="row"></th>
                            <td class="table__login"></td>
                            <td class="table__name"></td>
                            <td class="table__surname"></td>
                            <td class="table__date"></td>
                            <td class="table__address"></td>
                            <td class="table__email"></td>
                            <td class="table__phone"></td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="tab-pane fade" id="pills-card" role="tabpanel" aria-labelledby="pills-card-tab">
                <div class="div-page table-responsive">
                    <table class="table table-hover table-dark">
                        <thead class="thead-light">
                        <tr>
                            <th scope="col">#id</th>
                            <th scope="col">Number</th>
                            <th scope="col">Date</th>
                            <th scope="col">Code</th>
                            <th scope="col">Sum</th>
                            <th scope="col">Owner</th>
                            <th scope="col">Status</th>
                        </tr>
                        </thead>
                        <tbody id="cardsInfoTable">
                        <tr id="cardInfo">
                            <th scope="row">1</th>
                            <td class="table__number">1414 1234 5678 1234</td>
                            <td class="table__date">14/22</td>
                            <td class="table__code">345</td>
                            <td class="table__sum">1000$</td>
                            <td class="table__name">Kuzma Vladyslav</td>
                            <td><button class="table__status btn btn-outline-light">OPENED</button></td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="tab-pane fade" id="pills-address" role="tabpanel" aria-labelledby="pills-address-tab">
                <div id="activeClients" class="div-page row justify-content-around">
                    <div id="activeClientCard" class="card shadow my-3 bg-secondary d-none" style="width: 230px;height:386px;">
                        <img src="../img/client-card/boss.svg" class="card-img-top" alt="Man" style="width: 230px;">
                        <div class="card-body">
                            <h5 class="card-title">??????</h5>
                            <p class="card-text text-light">Online</p>
                            <button type="button" class="card-body__button btn btn-outline-success">Connect</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="tab-pane fade" id="pills-settings" role="tabpanel" aria-labelledby="pills-settings-tab">
                <div class="div-page">
                    <div id="messenger" class="messenger jumbotron p-0 shadow">
                        <div id="messengerHeader" class="messenger__header p-0 rounded-top bg-secondary">
                            <img src="../img/messanger/manager.svg" alt="Manager" class="img-fluid align-top rounded-circle border border-dark manager-img m-1">
                            <div id="" class="d-inline-block">
                                <span id="messageSender" class="text-warning">vlad99</span>
                                <div class="text-light">Online</div>
                            </div>
                        </div>
                        <div id="" class="messenger__body">
                            <div id="messengerBody" class="messages overflow-auto bg-dark p-2">
                                <div id="receiveMessageBlock" class="message-wrap d-none">
                                    <div class="send-message text-break text-left jumbotron d-inline-block m-1 p-1 bg-secondary">Hello!</div>
                                </div>
                                <div id="sendMessageBlock" class="message-wrap d-none">
                                    <div class="receive-message text-break text-right jumbotron float-right d-inline-block m-1 p-1 bg-secondary">Hello!</div>
                                </div>
                            </div>
                        </div>
                        <div id="messengerFooter" class="messenger__footer p-2">
                            <form action="" class="form send-form d-block mx-auto p-1 d-inline-flex bg-light border border-secondary rounded">
                                <div class="paperclip d-inline-block"><img src="../img/messanger/smile.svg" class="paperclip-img" alt="Smiles"></div>
                                <textarea class="send-area border-0 bg-light" name="" id="sendMessage" cols="20" rows="1"></textarea>
                                <button id="sendButton" type="button" class="send-button border-0 bg-light" value="Send">Send</button>
                            </form>
                        </div>
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
<script src="../js/manager/manager-functions.js"></script>
<script src="../js/manager/clients.js"></script>
</body>
</html>