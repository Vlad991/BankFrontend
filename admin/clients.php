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
</head>
<body>
<div class="container-fluid">

    <!--  Navigation  -->
    <?php
    $nav_item = [
        "Home" => "./home.php",
        "Clients" => "./clients.php",
        "Managers" => "./managers.php",
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
                   aria-controls="pills-address" aria-selected="false">Addresses</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" id="pills-settings-tab" data-toggle="pill" href="#pills-settings"
                   role="tab"
                   aria-controls="pills-settings" aria-selected="false">Settings</a>
            </li>
        </ul>
        <div class="tab-content" id="pills-tabContent">
            <div class="tab-pane fade show active" id="pills-info" role="tabpanel" aria-labelledby="pills-info-tab">
                <div class="div-page p-0">
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
                            <th scope="col">Action</th>
                        </tr>
                        </thead>
                        <tbody id="clientInfoTable">
                        <tr id="clientInfo">
                            <th scope="row">1</th>
                            <td class="table__login">vlad99</td>
                            <td class="table__name">Vladyslav</td>
                            <td class="table__surname">Kuzma</td>
                            <td class="table__date">14/10/1999</td>
                            <td class="table__address">Ukraine, Kiev, Malosemelna 13</td>
                            <td class="table__email">vladkuzma99@gmail.com</td>
                            <td class="table__phone">+380 66 287 33 82</td>
                            <td><button class="btn btn-outline-light table__action">BLOCK</button></td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="tab-pane fade" id="pills-card" role="tabpanel" aria-labelledby="pills-card-tab">
                <div class="div-page">
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
                <div class="div-page">
                    Here should be clients addresses list, or something other...
                </div>
            </div>
            <div class="tab-pane fade" id="pills-settings" role="tabpanel" aria-labelledby="pills-settings-tab">
                <div class="div-page">
                    <p class="text-light">Here should be some admin settings.</p>
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
<script src="../js/admin/admin-functions.js"></script>
<script src="../js/admin/clients.js"></script>
</body>
</html>