<nav class="navigation row navbar navbar-expand-lg sticky-top navbar-dark w-100">
    <div class="col-3 col-sm-1 col-lg-1 order-1">
        <a id="logoLink" href="http://<?= $frontendServerHost ?>/index.php" class="navbar-brand"><img class="logo-img" src="/img/menu/logo.svg" alt="Logo"></a>
    </div>
    <div class="col-3 col-sm-2 col-lg-auto order-3 order-lg-2">
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
    </div>
    <div class="col-lg-5 collapse navbar-collapse order-4 order-lg-3" id="navbarSupportedContent">
        <ul class="navbar-nav">
            <?php
            foreach ($nav_item as $key => $value) {
                if ($key != $active_item) {
                    $link = $value;
                    $title = $key;
                    $path = $_SERVER['DOCUMENT_ROOT'];
                    $path .= "/nav-item.php";
                    include($path);
                } else {
                    $link = $value;
                    $title = $key;
                    $path = $_SERVER['DOCUMENT_ROOT'];
                    $path .= "/nav-item-active.php";
                    include($path);
                }
            }
            ?>
        </ul>
    </div>
    <div class="col-6 col-sm-3 col-lg-3 offset-lg-2 offset-md-1 offset-sm-5 row justify-content-between order-2 order-lg-4 p-0">
        <div class="col-lg-3 col-8 h-100 d-block">
            <a href="http://<?= $frontendServerHost ?>/index.php" class="d-block w-100 mx-auto">
                <img class="profile-img mx-auto d-block" src="/img/menu/profile.svg" alt="Profile">
                <div id="headerLogin" class="text-light text-center login mx-auto">Log in!</div>
            </a>
        </div>
        <form action="" class="form-inline col-lg-9 col-4">
            <input type="text" class="form-control w-75 text-light bg-transparent mx-2 d-lg-block d-none" placeholder="Search" aria-label="Search">
            <button class="bg-transparent border-0" type="submit">
                <img class="loupe" src="/img/menu/search.svg" alt="Search">
            </button>
        </form>
    </div>
</nav>