<div class="jumbotron container bg-transparent p-4">
    <h2 class="header text-light text">Comments</h2>
    <div class="comments">
        <?php
        $commentText = "Hello, my name is Vasya, and I want to become a client of your bank! What I should do?Hello, my name is Vasya, and I want to become a client of your bank! What I should do?";
        $commentSender = "Vasya Vasilevich";
        $commentTime = "23:59 14.10.2019";
        include("../comment.php");
        ?>
        <?php
        $commentText = "MyBank - is my Java Spring Web Application. In this app I use similarity of REST microservice architecture (Authorization Keycloak Service and Main Business Logic Service) that connected with JMS using Kafka. Frontend is written in pure Java.";
        $commentSender = "Petya Petrovich";
        $commentTime = "13:09 18.10.2018";
        include("../comment.php");
        ?>
    </div>
    <form action="" class="form w-100 m-4">
        <textarea name="" id="" cols="30" rows="5" class="w-100 p-3 border-light text-light" placeholder="Leave your comment" style="resize: none; border-radius: 5px; background: rgba(255,255,255,0.1); outline: none"></textarea>
        <button type="button" class="btn btn-dark btn-outline-success">Send Comment</button>
    </form>
</div>