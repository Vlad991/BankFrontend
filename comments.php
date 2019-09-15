<div class="jumbotron container bg-transparent p-4">
    <h2 class="header text-light text">Comments</h2>
    <div id="comments" class="comments">
        <div id="sendCommentBlock" class="comment flex-wrap align-items-end jumbotron bg-transparent w-75 h-100 p-3 m-2 d-none">
            <span class="comment__icon h-100"><img class="img-fluid align-top rounded-circle border border-dark manager-img m-1" src="/img/client-card/boss.svg" alt="man" style="width: 46px; height: 46px"></span>
            <div class="comment__text-block jumbotron p-2 bg-light w-75 m-0 mb-3 ml-2">
                <div class="comment__text"></div>
                <span class="comment__sender text-success"></span>
                <span class="comment__time text-secondary float-right">23:59 14.10.2019</span>
            </div>
        </div>
    </div>
    <form action="" class="form w-100 m-4">
        <textarea name="" id="sendComment" cols="30" rows="5" class="w-100 p-3 border-light text-light"
                  placeholder="Leave your comment"
                  style="resize: none; border-radius: 5px; background: rgba(255,255,255,0.1); outline: none"></textarea>
        <button id="sendCommentButton" type="button" class="btn btn-dark btn-outline-success">Send Comment</button>
    </form>
</div>