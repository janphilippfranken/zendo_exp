function pasteScreenShot(dataURL) {
  if(typeof(parent.who_finished )== "undefined"){ // if this is the first to finish the game
    // put image of what the player did to the YOU section of user 1
    var youImageUser1 = parent.document.getElementById('you-image-user1');
    youImageUser1.src = dataURL;

    parent.document.getElementById('images-user1').style.display = "block";


    // Add the waiting area here
    parent.document.getElementById('waiting-area-after-trial').style.display = "block";
    parent.document.getElementById('UserWhoFinishesFirstName').innerHTML = parent.otherUser;

  }else{ // this is the second to finish the game
    // put image of what the player did to the YOU section of user 2
    var youImageUser2 = parent.document.getElementById('you-image-user2');
    youImageUser2.src = dataURL;
    parent.document.getElementById('images-user2').style.display = "block";

    parent.document.getElementById('images-div').style.display = "block";

  }

}
