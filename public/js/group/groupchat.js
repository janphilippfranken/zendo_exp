//  CLIENT SIDE

$(document).ready(function(){
  gameStarted = false; // the game hasn't started yet (need this for when people drop out before the end of the instructions)

  $('#wait-more-button').click(function() {
    document.getElementById('waiting-area-text').style.display = "none";
    document.getElementById('wait-more-button').disabled = "true";

  });

  $('#go-to-debrief-button').click(function() {
    goto_debrief();
  });

  // 2 functions for when losing focus
  const gainFocus = (e) => {
    try {
      clearInterval(no_focus);
    } catch (e) {
      console.log(e);
    }
  };
  const lostControl = (e) => {

    if (document.hasFocus() || !gameStarted){
      // do nothing
    } else {

      let countDownSec = 30;

      // Update the count down every 1 second
      no_focus = setInterval(function() {
      if (countDownSec < 1) {
        $.notify("Please make sure that you focus on the hit.", {  autoHideDelay: 105000});
        var snd = new Audio("data:audio/wav;base64,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qJrx4KOQjahZxWbcZgztj2c49nKmkId44S71j0c8eV9yDK6uPRzx5X18eDvjvQ6yKo9ZSS6l//8elePK/Lf//IInrOF/FvDoADYAGBMGb7FtErm5MXMlmPAJQVgWta7Zx2go+8xJ0UiCb8LHHdftWyLJE0QIAIsI+UbXu67dZMjmgDGCGl1H+vpF4NSDckSIkk7Vd+sxEhBQMRU8j/12UIRhzSaUdQ+rQU5kGeFxm+hb1oh6pWWmv3uvmReDl0UnvtapVaIzo1jZbf/pD6ElLqSX+rUmOQNpJFa/r+sa4e/pBlAABoAAAAA3CUgShLdGIxsY7AUABPRrgCABdDuQ5GC7DqPQCgbbJUAoRSUj+NIEig0YfyWUho1VBBBA//uQZB4ABZx5zfMakeAAAAmwAAAAF5F3P0w9GtAAACfAAAAAwLhMDmAYWMgVEG1U0FIGCBgXBXAtfMH10000EEEEEECUBYln03TTTdNBDZopopYvrTTdNa325mImNg3TTPV9q3pmY0xoO6bv3r00y+IDGid/9aaaZTGMuj9mpu9Mpio1dXrr5HERTZSmqU36A3CumzN/9Robv/Xx4v9ijkSRSNLQhAWumap82WRSBUqXStV/YcS+XVLnSS+WLDroqArFkMEsAS+eWmrUzrO0oEmE40RlMZ5+ODIkAyKAGUwZ3mVKmcamcJnMW26MRPgUw6j+LkhyHGVGYjSUUKNpuJUQoOIAyDvEyG8S5yfK6dhZc0Tx1KI/gviKL6qvvFs1+bWtaz58uUNnryq6kt5RzOCkPWlVqVX2a/EEBUdU1KrXLf40GoiiFXK///qpoiDXrOgqDR38JB0bw7SoL+ZB9o1RCkQjQ2CBYZKd/+VJxZRRZlqSkKiws0WFxUyCwsKiMy7hUVFhIaCrNQsKkTIsLivwKKigsj8XYlwt/WKi2N4d//uQRCSAAjURNIHpMZBGYiaQPSYyAAABLAAAAAAAACWAAAAApUF/Mg+0aohSIRobBAsMlO//Kk4soosy1JSFRYWaLC4qZBYWFRGZdwqKiwkNBVmoWFSJkWFxX4FFRQWR+LsS4W/rFRb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRib3kuZGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwNGh0dHA6Ly93d3cuc291bmRib3kuZGUAAAAAAAAAACU=");
        snd.play();
        clearInterval(no_focus);
        }
        console.log(no_focus);
        countDownSec = countDownSec - 1;
      }, 1000);

    } // else statement
  };
  // adding event listeners for when losing and gaining focus
  window.addEventListener('blur', lostControl);
  window.addEventListener('focus', gainFocus);

  /////////////////////////////////////////////////
  // setting up the game
  //////////////////////////////////////////////////
  // since both participants undergo the same trial
  // we'll need to set up the random variables once
  // and share them between the participants

  // setting up a timer for the participant who joined in first
  // Set the time we're counting down to
    var countDownSec = 600;

    // Update the count down every 1 second
    waiting_lobby = setInterval(function() {

      // Time calculations for minutes and seconds
      var minutes = Math.floor((countDownSec % (60 * 60)) / 60);
      var seconds = Math.floor(countDownSec % 60);

      // Output the result in an element with id="demo"
      document.getElementById("lobby-count-down").innerHTML = minutes+":"+seconds;

      // If the count down is over, write some text
      if (countDownSec < 1) {
        clearInterval(waiting_lobby); // deleting the function so it's stop counting
        //goto_debrief();
        // display the waiting option here
        document.getElementById('decision-waiting-lobby').style.display = "block";
        //document.getElementById('wait-more-button').style.display = "block";
      }
      countDownSec = countDownSec - 1;
    }, 1000);


  socket = io({reconnection: false}); // we pass here the global io variable (it comes from the views/group.ejs one of the scripts at the bottom of the file (socket.io.js))


  socket.on('goto_deb', () => {
    goto_debrief();
  });
  // getting trial data from server
  socket.on('trialDataBackToClient', data =>{
    // clearing the count down
    clearInterval(waiting_lobby); // deleting the countdown function so it's stop counting

    // parameters of the start function

    rules = data.rules;
    rand_trial = data.rand_trial;
    examples = data.examples;
    test_cases = data.test_cases;
    rule_names = data.rule_names;
    rand_counter = data.rand_counter;
    posit_ix = data.posit_ix;
    rand_counter_order = data.rand_counter_order;
    trials_order = data.trials_order;
    zendo_cases = data.zendo_cases;
    prompt_phase1 = data.prompt_phase1;
    prompt_phase2 = data.prompt_phase2;
    prompt_phase3 = data.prompt_phase3;
    prompt_phase4 = data.prompt_phase4;

    trial_num = data.trial_num;


    // a global variable with the user names and details (who entered first)
    players_info = data.players_info;

    gameStarted = true;
    start_task_time = new Date();
    //document.getElementById('game').style.display = "block";
  document.getElementById("groupName").value = data.room;
  var iframe = document.getElementById("game_frame");
  document.getElementById('game').style.visibility = "visible";
  document.body.style['overflow-y'] = "auto"
  document.getElementById('waiting_area').style.display = "none";
  if (iframe) {
      var iframeContent = (iframe.contentWindow || iframe.contentDocument);
      while (typeof iframeContent.Start === 'undefined') {
          //console.log('h');
      }
      try {
        iframeContent.Start(rules[rand_trial], examples, test_cases, rule_names[rand_trial], rand_counter, posit_ix, trial_num);
        //document.getElementById('game').style.display = "none";
        // Adding the instructions Here
        //document.getElementById('ins_1').style.display = "block";
      }
      catch(err) {
        console.log(err);
        // if something happens this player goes to deb
        socket.emit('error_waiting_area', data.room)
      } // closing catch
    } // closing of if statement
  });
  /////////////////////////////////////////////////
  // IMPORTANT VARIABLES (need to make this clearer)
  //////////////////////////////////////////////////
  var group = $('#groupName').val(); // with this we get the group name we've assigned to channel (it is in the controllers/users.js: successRedirect)
  // we'll use it to communicate events only in that room using joint
  var username = $('#username').val(); // getting the useranme of the sender

  //////////////////////////////////////////////////
// grabing data from the canvas and adding a print screened image
  socket.on('canvasDataBackToClient', (data)=>{
    who_finished = data.who_finished;
    var this_user = document.getElementById("username").value;// this will be the user who finished first
    var userX = players_info[this_user][0]; //the current user is user1 or 2

    // put image of what the player did to the OTHER section of user 2
    var otherIframe = document.getElementById('other-image-'+userX);
    var otherIframeContent = (otherIframe.contentWindow || otherIframe.contentDocument);

    document.getElementById('images-div').style.display = "block";
    document.getElementById('images-'+userX).style.display = "block";// we need to momentarily display it before drawing into it because it doesn't work if it is hidden

    other_selected = data.selected;
    otherIframeContent.draw_generalisations(data.trialdata, data.selected, data.posit_ix, 'other-image-'+userX);

    if(who_finished.length == 1){
      // here will enter only the guy who finishes SECOND
      // momentarily displaying division so we can draw the iframe on it
      // this goes only for the player who finishes secodn
      document.getElementById('images-div').style.display = "none";// we need to momentarily display it before drawing into it because it doesn't work if it is hidden
      //document.getElementById('images-'+userX).style.display = "none";// we need to momentarily display it before drawing into it because it doesn't work if it is hidden
    }

    // also make the whole division for the images visible

    if (who_finished.length % 2 == 0){
      // here will enter only the player who finishes FIRST
      // hide waiting area
      document.getElementById('images-div').style.display = "block";
      document.getElementById('waiting-area-after-trial').style.display = "none";
      document.getElementById('button-to-posterior-div').style.display = "block";


    }



    //document.getElementById('images-div').style.display = "block";
  });

  socket.on('connect', function(){ // this listens to the connect event each time a user is connected
    // emmitting joint events (event only to one room)
    token_id = socket.id;
    var params = {
        room: group,
        username: username,
        token_id: token_id
      }

    socket.emit('join', params);
  });



  socket.on('usersList', function(data){ // the users argument is from the client side the array of the users
    var users = data.users;
    if (users.length === 1){

      // THIS WILL EVALUATE TO TRUE ONLY WHEN SOMEBODY LEAVES DURING THE GAME
      if (gameStarted){
        document.getElementById('user-left').style.display = "block";
        $.notify("Unfortunately, user " +data.user_left.name+ " just left the game");
        goto_debrief();
      } else {
        $.notify("Unfortunately, user " +data.user_left.name+ " just left the game. Please wait until another participant joins.");
        setTimeout(() => {
          window.onbeforeunload = '';
          location.reload(true);
        },3000);
        // go from the beginning and make myself available
      }

    } else if (users.length === 2){

      try{
      // only player 1 will ever reach that point
      // if there are two users, get the data game for the trial
      // and emmit it back to the server

      StartIframe(); // getting data



      var sender = document.getElementById("username").value; // this is the name of the player1
      const room = data.params.room;
      document.getElementById("groupName").value = room;


      var user1 = sender; // this is the name of the user1 (the participant who enters first)
      var user2 = data.params.username;
      var players_info = {}; // creating an array of user's details (because this is only user's 1 side, we're gonna emmit it to the server and from there to both users)
      players_info[user1] = ["user1"];
      players_info[user2] = ["user2"];
      // playing sound
      var snd = new Audio("data:audio/wav;base64,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qJrx4KOQjahZxWbcZgztj2c49nKmkId44S71j0c8eV9yDK6uPRzx5X18eDvjvQ6yKo9ZSS6l//8elePK/Lf//IInrOF/FvDoADYAGBMGb7FtErm5MXMlmPAJQVgWta7Zx2go+8xJ0UiCb8LHHdftWyLJE0QIAIsI+UbXu67dZMjmgDGCGl1H+vpF4NSDckSIkk7Vd+sxEhBQMRU8j/12UIRhzSaUdQ+rQU5kGeFxm+hb1oh6pWWmv3uvmReDl0UnvtapVaIzo1jZbf/pD6ElLqSX+rUmOQNpJFa/r+sa4e/pBlAABoAAAAA3CUgShLdGIxsY7AUABPRrgCABdDuQ5GC7DqPQCgbbJUAoRSUj+NIEig0YfyWUho1VBBBA//uQZB4ABZx5zfMakeAAAAmwAAAAF5F3P0w9GtAAACfAAAAAwLhMDmAYWMgVEG1U0FIGCBgXBXAtfMH10000EEEEEECUBYln03TTTdNBDZopopYvrTTdNa325mImNg3TTPV9q3pmY0xoO6bv3r00y+IDGid/9aaaZTGMuj9mpu9Mpio1dXrr5HERTZSmqU36A3CumzN/9Robv/Xx4v9ijkSRSNLQhAWumap82WRSBUqXStV/YcS+XVLnSS+WLDroqArFkMEsAS+eWmrUzrO0oEmE40RlMZ5+ODIkAyKAGUwZ3mVKmcamcJnMW26MRPgUw6j+LkhyHGVGYjSUUKNpuJUQoOIAyDvEyG8S5yfK6dhZc0Tx1KI/gviKL6qvvFs1+bWtaz58uUNnryq6kt5RzOCkPWlVqVX2a/EEBUdU1KrXLf40GoiiFXK///qpoiDXrOgqDR38JB0bw7SoL+ZB9o1RCkQjQ2CBYZKd/+VJxZRRZlqSkKiws0WFxUyCwsKiMy7hUVFhIaCrNQsKkTIsLivwKKigsj8XYlwt/WKi2N4d//uQRCSAAjURNIHpMZBGYiaQPSYyAAABLAAAAAAAACWAAAAApUF/Mg+0aohSIRobBAsMlO//Kk4soosy1JSFRYWaLC4qZBYWFRGZdwqKiwkNBVmoWFSJkWFxX4FFRQWR+LsS4W/rFRb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRib3kuZGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwNGh0dHA6Ly93d3cuc291bmRib3kuZGUAAAAAAAAAACU=");
      $.notify("User: " +data.params.username+ " has just joined in!", "success");
      snd.play().catch(err => console.log(err));


      socket.emit('trialData', {
        prompt_phase1,
        prompt_phase2,
        prompt_phase3,
        prompt_phase4,
        rules,
        examples,
        test_cases,
        rule_names,
        rand_trial,
        trials_order,
        rand_counter_order,
        zendo_cases,
        rand_counter,
        posit_ix,
        trial_num,
        sender, room, players_info});

      } // closing of try
      catch(err){
        console.log(err);
        goto_debrief();
      }

    }//closing of else if
    params = data.params;
    users = data.users;


  }); // closing of usersList


  // emmiting an even from the client side to the server
  // keep in mind that each time u emit an event on the client side,
  // u have to go to the server side as well and listen for that event
  /////////////////////// H E L P E R S    F U N C T I O N S
  // COPY THESE TO NEW FILES
  function getUserDetails(){
    players_info = players_info;
    var room = document.getElementById("groupName").value;// this will be the user who finished first
    var user_finished = document.getElementById("username").value;// this will be the user who finished first
    var user = players_info[user_finished][0]; // that's the info on whether the user is user1 or user2
    // now we'll take the name of the other user (not the one who finished now)
    var idx_OTHERfinished = Math.abs(Object.keys(players_info).indexOf(user_finished) - 1); // this formula will always give us the other number from 0 and 1. e.g if it's 0, it'll give us 1 etc
    var user_OTHERfinished = Object.keys(players_info)[idx_OTHERfinished];
    return {user, user_OTHERfinished}
  }
  function waitingAreaOrNo(user_OTHERfinished) {
    // display or not the waiting area
    if((typeof(who_finished ) === "undefined") || who_finished.length % 2 === 0 ){ // if this is the first to finish the trial

      // Add the waiting area here
      document.getElementById('waiting-area-after-trial').style.display = "block";
      document.getElementById('user-finished2').innerHTML = user_OTHERfinished;

    }else{ // this is the second to finish the game
      //  displayes the image block only for themselves
      parent.document.getElementById('images-div').style.display = "block";
      document.getElementById('button-to-posterior-div').style.display = "block";
      who_finished = [];

    }
  }
  /////////////////////// H E L P E R S    F U N C T I O N S END ////////////////
  $('#phase4btn').click(function () {
    // hide textarea (button included) and remove text after you store it
    ph4_answer = document.getElementById('phase4-text').value;
    if(ph4_answer.length < 15){
      alert('Your answer must be at least 15 characters, thank you!')
    }else{
      document.getElementById('phase4-div').style.display = "none";

      // displaying iframe (but hide iframe division)
      document.getElementById('game').style.display = "none";
      document.getElementById("game_frame").style.height = "500px";

      // deciding on waiting area
      var userD = getUserDetails();
      var user_OTHERfinished = userD.user_OTHERfinished;
      waitingAreaOrNo(user_OTHERfinished);
      // sending data to client
      var sender = document.getElementById("username").value;
      var room = document.getElementById("groupName").value;
      var iframe = document.getElementById('game_frame');
      var iframeC = (iframe.contentWindow || iframe.contentDocument);
      var trialdata = iframeC.trialdata;
      var trial_num = iframeC.trial_num;
      var selected = iframeC.selected;
      var posit_ix = iframeC.posit_ix;
      iframeC.preparingForPosterior();
      document.getElementById('phase4-text').value = "";
      socket.emit('canvasData', {sender, room, trialdata, trial_num, selected, posit_ix});
    }


  });

  // continue to posterior button
  $('#button-to-posterior').click(function () {
    $('#button-to-posterior-div').hide();
    $('#game').show();
    document.getElementById('game').style.position = 'absolute';
    document.getElementById('game').style.top = "100px";
    document.getElementById('game').style.overflow = 'hidden';
    document.getElementById('game_frame').style.border = 'none';
    d3.select("#query2").html(prompt_phase3);
    // drawing the ticks on the posterior
    var iframe = document.getElementById('game_frame');
    var iframeC = (iframe.contentWindow || iframe.contentDocument);
    iframeC.draw_ticks_posterior();

  });


  $('#phase5btn').click(function(){
    ph5_answer = document.getElementById('phase5-text').value;
    // collecting data from accuracy
    ew_q_list = []
    $('#ewQ_FORM input:checked').each(function(){
      ew_q_list.push(this.value);
    });
    if (ph5_answer.length >= 15 && ew_q_list.length === 2) {
      document.getElementById('phase5-div').style.display = "none";
      // displaying iframe (but hide iframe division)
      document.getElementById('game').style.display = "none";
      var iframe = document.getElementById('game_frame');
      var iframeC = (iframe.contentWindow || iframe.contentDocument);
      var sender = document.getElementById("username").value;
      var room = document.getElementById("groupName").value;
      var trialdata = iframeC.trialdata;
      var selected = iframeC.selected;
      var posit_ix = iframeC.posit_ix;
      var selectedPost = iframeC.selectedPost;
      var rule_name = iframeC.rule_name;
      // removing option of the accuacy question
      [].slice.call(document.querySelectorAll('form input[type="radio"]')).filter(function(element, index) {
        return element.checked = false;
      })
      document.getElementById('phase5-text').value = "";
      expertise_q = ew_q_list[0];
      trustworthy_q = ew_q_list[1];
      socket.emit('storeData', {
        ph4_answer,
        ph5_answer,
        trustworthy_q,
        expertise_q,
        sender,
        room,
        trialdata,
        selected,
        posit_ix,
        selectedPost,
        rule_name,
        token_id,
      });
      StartIframe2();
    }
      else {
        alert('Your answer must include at least 15 characters, and you also need to provide an anser for both subsequent questions!')
      }
  });

  //////////////////////////////////////////////
    // MAIN STEPS INVOLVED IN THE TASK
    //////////////////////////////////////////////


  //////////////////////// debrief  ////////////////////////////////////
  var error_message = "<h1>Oops!</h1><p>Something went wrong submitting your HIT. " +
  "This might happen if you lose your internet connection. Press the button to resubmit.</p><button id='resubmit'>Resubmit</button>";

//Listen for all fields being complete
posttest_button_disabler = function () {
	if($("#feedback").val() === '' || $("#age").val() === '' || $("#sex").val() === 'noresp' || $("#engagement").val() === '--' || $("#difficulty").val() === '--' || $("#pol_orientation").val() === '--' || $("#init_strat").val() === '' || $("#final_strat").val() === '') {
		$('#done_debrief').prop('disabled',true);
	} else{
		$('#done_debrief').prop('disabled',false);
	}
}

prompt_resubmit = function() {
	document.body.innerHTML = error_message;
	$("#resubmit").click(resubmit);
};
//Assign the (dis)abler function to all posttestQ class objects
$(".posttestQ").change(function () {
	posttest_button_disabler();
})


// Block enter in age field
$("#ageinput").keydown(function(event){
	if(event.keyCode == 13) {
		event.preventDefault();
		console.log('blocked enter in age field');
		return false;
	}
});

$("#done_debrief").click(function(){


	console.log('FINISHED TASK');

	var end_time = new Date();
  var username = document.getElementById("username").value;
  var room = document.getElementById("groupName").value;

	var data = {
			date:String(end_time.getFullYear()) + '_' +
				String(end_time.getMonth() + 1).padStart(2, '0') + '_' +
				String(end_time.getDate() + 1).padStart(2, '0'),
			time:String(end_time.getHours()+ 1).padStart(2, '0') + '_' +
				String(end_time.getMinutes() + 1).padStart(2, '0')+ '_' +
				String(end_time.getSeconds() + 1).padStart(2, '0'),
			age:$("#ageinput").val(),
			gender:$("#sex").val(),
			feedback:$('#feedback').val(),
			initial_strategy: $('#init_strat').val(),
			final_strategy: $('#final_strat').val(),
			//instructions_duration:start_task_time - start_time,
			task_duration:end_time - start_task_time,
			engaging:$("#engagement").val(),
			difficult:$("#difficulty").val(),
			pol_orient:$("#pol_orientation").val(),
			token_id: token_id,
      username: username,
      room: room};

    // send to server
    socket.emit('debriefData', data);

    $('#debrief').hide();
    $('#thank-you').show();
    $('#compl_code').text(token_id);

		//goto_complete(token_id);
	});

  // thank you button
  $("#btn-thank-you").click(function(){
    // here add the code to kick them out if the plan a doesn't work, else delete
  });

goto_debrief = function () {
  //$("#ins_1").hide();
  $("#game").hide();
  $('#waiting_area').hide();
  $("#debrief").show();
  socket.emit("go-to-debrief");
  document.body.style['overflow-y'] = "auto"
};
// we don't need this after all, we're using reload
const goto_beginning = () => {
    $('#ins_1').hide();
    $('#ins_2').hide();
    $('#ins_3').hide();
    $('#ins_4').hide();
    $('#ins_5').hide();
    $('#ins_6').hide();
    $('#ins_7').hide();
    $('#ins_8').hide();
    $('#comprehension_quiz').hide();
    document.getElementById('waiting_area').style.display = "block";
    var countDownSec = 600;

    // Update the count down every 1 second
    waiting_lobby = setInterval(function() {

      // Time calculations for minutes and seconds
      var minutes = Math.floor((countDownSec % (60 * 60)) / 60);
      var seconds = Math.floor(countDownSec % 60);

      // Output the result in an element with id="demo"
      document.getElementById("lobby-count-down").innerHTML = minutes+":"+seconds;

      // If the count down is over, write some text
      if (countDownSec < 1) {
        clearInterval(waiting_lobby); // deleting the function so it's stop counting
        goto_debrief();
      }
      countDownSec = countDownSec - 1;
    }, 1000);
};
goto_task = function () {
  //$("#ins_1").hide();
  $("#game").show();
};

}); // closing of function ready

//////////////////////////////////////////////
//////////////////////////////////////////////
