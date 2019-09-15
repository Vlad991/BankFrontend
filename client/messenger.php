<div id="messenger" class="container-fluid__messenger messenger jumbotron p-0 shadow">
    <div id="messengerHeader" class="messenger__header p-0 rounded-top bg-secondary">
        <img src="../img/messanger/manager.svg" alt="Manager"
             class="img-fluid align-top rounded-circle border border-dark manager-img m-1">
        <div id="" class="d-inline-block">
            Manager <span id="messageSender" class="text-warning">vlad99</span>
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
