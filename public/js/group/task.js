var trial = 0;
var trials = _.shuffle([0,1,2,3,4,5,6,7,8,9]);
var start_time = new Date();
var start_task_time;
var end_time;
var scenes = [];
var selected = [];
var free_responses = ['','','','','','','','','',''];
var subject_data = [];
var ready_to_start = false;
var upi;
var score = [0,0,0,0,0,0,0,0,0,0];
var total_score = 0;
var rules_text = ['There is a red cone',
	'All the cones are the same size',
	'No cones are upright',
	'Exactly one cone is blue',
	'At least one cone is blue and small',
	'All cones are either blue or small',
	'There is a red cone that is bigger than all non-red cones',
	'There are (at least) two cones touching',
	'A blue cone is touching a red cone',
	'A cone is stacked on top of another cone'];

// MAIN TRIAL BEHAVIOUR
//////////////////////////
function goto_task()
{
	$('#instructions').hide();
	$('#debrief').hide();
	$('#main_task').show();
	$('#completed').hide();
	start_task_time = new Date();
	ready_to_start = true;
	advance_trial();
}

function goto_debrief()
{
		//Calculate score
		score = [0,0,0,0,0,0,0,0,0,0];
		total_score = 0;
		for (var i=0; i<selected.length; i++)
		{
			for (var j=0; j<selected[i].length; j++)
			{
				if (selected[i][j]==true && j<4)
				{
					score[i]++;
					total_score++;
				} else if (selected[i][j]==false && j>=4)
				{
					score[i]++;
					total_score++;
				}
			}
	}
	$('#instructions').hide();
	$('#main_task').hide();
	$('#debrief').show();
	$('#completed').hide();
}

function goto_complete() {
	$('#instructions').hide();
	$('#main_task').hide();
	$('#debrief').hide();
	$('#completed').show();
	$('#score_tb').html('<h2>You got ' + total_score + ' of 80 points in total.</h2><ol>' +
    '<li>Rule was: <i>' + rules_text[trials[0]] + '. </i>You categorised <b>' + score[0] +
    '</b> of 8 test scenes correctly.<br>Your rule guess was: <i>' + free_responses[0] + '.</i></li>' +
    '<li>Rule was: <i>' + rules_text[trials[1]] + '. </i>You categorised <b>' + score[1] +
    '</b> of 8 test scenes correctly.<br>Your rule guess was: <i>' + free_responses[1] + '.</i></li>' +
    '<li>Rule was: <i>' + rules_text[trials[2]] + '. </i>You categorised <b>' + score[2] +
    '</b> of 8 test scenes correctly.<br>Your rule guess was: <i>' + free_responses[2] + '.</i></li>' +
    '<li>Rule was: <i>' + rules_text[trials[3]] + '. </i>You categorised <b>' + score[3] +
    '</b> of 8 test scenes correctly.<br>Your rule guess was: <i>' + free_responses[3] + '.</i></li>' +
    '<li>Rule was: <i>' + rules_text[trials[4]] + '. </i>You categorised <b>' + score[4] +
    '</b> of 8 test scenes correctly.<br>Your rule guess was: <i>' + free_responses[4] + '.</i></li>' +
    '<li>Rule was: <i>' + rules_text[trials[5]] + '. </i>You categorised <b>' + score[5] +
    '</b> of 8 test scenes correctly.<br>Your rule guess was: <i>' + free_responses[5] + '.</i></li>' +
    '<li>Rule was: <i>' + rules_text[trials[6]] + '. </i>You categorised <b>' + score[6] +
    '</b> of 8 test scenes correctly.<br>Your rule guess was: <i>' + free_responses[6] + '.</i></li>' +
    '<li>Rule was: <i>' + rules_text[trials[7]] + '. </i>You categorised <b>' + score[7] +
    '</b> of 8 test scenes correctly.<br>Your rule guess was: <i>' + free_responses[7] + '.</i></li>' +
    '<li>Rule was: <i>' + rules_text[trials[8]] + '. </i>You categorised <b>' + score[8] +
    '</b> of 8 test scenes correctly.<br>Your rule guess was: <i>' + free_responses[8] + '.</i></li>' +
    '<li>Rule was: <i>' + rules_text[trials[9]] + '. </i>You categorised <b>' + score[9] +
    '</b> of 8 test scenes correctly.<br>Your rule guess was: <i>' + free_responses[9] + '.</i></li></ol>');
	$('#completion_code_tb').text(upi);
}

function store_data() {
	var iframe = document.getElementById("game_frame");
	if (iframe)
	{
		var iframeContent = (iframe.contentWindow || iframe.contentDocument);
		scenes[trial-1] = iframeContent.trialdata;
		selected[trial-1] = iframeContent.selected;
		free_responses[trial-1] = $('#free_response_tb').val();
	} else {
		alert('missing iframe');
	}
	advance_trial();
}

function advance_trial() {
	trial++;
	//console.log("executed advance trial", trial);

	if (trial<trials.length)
	{
		$('#trial_counter').text('Question ' + trial + ' of 10');
		//Refresh the iframe (when it is loads it should trigger the trial)
		document.getElementById("game_frame").src += '';

	} else if (trial>trials.length) {
		end_time = new Date();
		goto_debrief();
	}
}

function comp_checker() {

	//Pull the selected values
	var q = [$('#comp_q1').val(),$('#comp_q2').val(),
	$('#comp_q3').val(),$('#comp_q4').val(),
	$('#comp_q5').val()];

   // Add the correct answers here
   answers = ["true","false","true","false","false"];

   if(q[0] == answers[0]
      && q[1] == answers[1]
      && q[2] == answers[2]
      &&  q[3] == answers[3]
      &&  q[4] == answers[4]){
   		// Allow the start
   	alert('You got everything correct! Press "Start" to begin the experiment.');
   	$('#done_comp').show();
   	$('#comp_check_btn').hide();
   } else {
    	// Throw them back to the start of the instructions
    	// Remove their answers and have them go through again
    	alert('You answered at least one question incorrectly! Please try again.');

    	$('#comp_q1').prop('selectedIndex', 0);
    	$('#comp_q2').prop('selectedIndex', 0);
    	$('#comp_q3').prop('selectedIndex', 0);
    	$('#comp_q4').prop('selectedIndex', 0);
    	$('#comp_q5').prop('selectedIndex', 0);
    	$('#done_comp').hide();
    	$('#comp_check_btn').show();
    	$('#ins1').show();
    	$('#comprehension').hide();
    };
  }

// Checks whether all questions were answered
function comp_change_checker() {
	var q = [$('#comp_q1').val(),$('#comp_q2').val(),
	$('#comp_q3').val(),$('#comp_q4').val(),
	$('#comp_q5').val()];

	//Make sure start button is disabled because the answers haven't been checked
	$('#done_comp').hide();

 	//Only release the check button if there is a response on all questions
 	if (q[0] === 'noresp' || q[1] === 'noresp' || q[2] === 'noresp' || q[3] === 'noresp' || q[4] === 'noresp')
 	{
 		$('#comp_check_btn').hide();
 	} else {
 		$('#comp_check_btn').show();
 	}
 };

 function response_change_checker() {
 	var text_resp = $('#free_response_tb').val();

	//Make sure start button is disabled because the answers haven't been checked
	$('#task_btn').hide();//prop('disabled', true);

 	//Only release the check button if there is a response on all questions
 	if (text_resp.length>6)
 	{
 		$('#task_btn').show();
 	} else {
 		$('#task_btn').hide();
 	}
 };



////////////////
// INITIAL VIEW:
////////////////
function start()
{
	// Initially block both the check button and the start button
	$('#done_comp').hide();//prop('disabled', true);
	$('#comp_check_btn').hide();//prop('disabled', true);

	$('#instructions').show();
	$('#main_task').hide();
	$('#debrief').hide();

	// DECORATE THE BUTTONS ETC
	$('#task_btn').click(store_data);

	$('#free_response_tb').on('input', function() {
		response_change_checker();
	});
	// INSTRUCTION SLIDE BEHAVIOUR
	// Step through slides
	$('#ins1btn').click(function () {
		$('#ins1').hide();
		$('#ins2').show();
	});

	$('#ins2btn').click(function () {
		$('#ins2').hide();
		$('#ins3').show();
	});

	$('#ins3btn').click(function () {
		$('#ins3').hide();
		$('#ins4').show();
	});

	$('#ins4btn').click(function () {
		$('#ins4').hide();
		$('#ins5').show();
	});

	$('#ins5btn').click(function () {
		$('#ins5').hide();
		$('#ins6').show();
	});

	$('#ins6btn').click(function () {
		$('#ins6').hide();
		$('#comprehension').show();
	});

	// Start the main task function (just causes a refresh)
	$('#done_comp').click(function () {
		console.log('STARTING TASK');
		goto_task();
	});

	$('#done_debrief').click(function() {
		//Assemble subject data
		subject_data = {
			upi:upi,
			trials:trials,
			score:score,
			feedback:$('#feedback').val(),
			age_years:$('#ageyear').val(),
			age_months:$('#agemonth').val(),
			gender:$('#sex').val(),
			difficulty:$('#difficulty').val(),
			engagement:$('#engagement').val(),
			freeresps:free_responses
		}

		save_data();
	})

	// Listen for actions on radio buttons for when all questions answered
	$('.comp_questions').change(function() {
		comp_change_checker();
	});

	// Answer checker function
	$('#comp_check_btn').click(function () {
		comp_checker();
	});

	upi = MakeUPI();

	//Loaded from rules.js prior to running this script
	rules = [Rule1, Rule2, Rule3, Rule4, Rule5, Rule6, Rule7, Rule8, Rule9, Rule10];
    rule_names = ['Zeta' ,'Phi' ,'Upsilon' ,'Iota' ,'Kappa' ,'Omega' ,'Mu' ,'Nu' ,'Xi', 'Psi'];
    //rule_names = ['Geosyog' ,'Plasill' ,'Bioyino' ,'Waratel' ,'Sepatoo' ,'Moderock' ,'Replitz' ,'Pegmode' ,'Mizule', 'Lazap'];
    $.ajax({
    	dataType: "json",
    	url: "/json/zendo_cases.json",
    	async: false,
    	success: function(data) {

    		console.log("Got trial data");
    		zendo_cases = data;
            // start2();
          }
        });
  }



  function run_trial()
  {

	// rand_trial = Math.floor(Math.random()*9);
	rand_counter = Math.floor(Math.random()*11);

	prompt_phase1 = '<p id="prompt2" align="left">&#8226 Here are some objects.<br>' +
	'&#8226 Click "<b>Test</b>" to see if they emit <b>'  +
	rule_names[trials[trial-1]] + '</b> waves.</p>';

	prompt_phase2 = '<p id="prompt2" align="left">&#8226 Now choose your own arrangement.  Click on the squares at the bottom to add objects to the scene.<br>' +
	'&#8226 Once added, <b>left hold click</b> on objects to move them, use "<b>Z</b>"/"<b>X</b>" to rotate, and <b>right click</b> to remove.<br>' +
	'&#8226 When you have the arrangement you want, click "<b>Test</b>" to see if it emits <b>'  +
	rule_names[trials[trial-1]] + '</b> waves.<br>' +
	'&#8226 Outcomes of your previous tests are shown at the top.  You get <b>8</b> tests in total.<br>' +
	'&#8226 A yellow star means your arrangement did follow the rule,  an empty star means it did not.</p>';

	prompt_phase3 = '<p id="prompt2" align="left">&#8226 Here are 8 new arrangements<br>' +
	'&#8226 Select which ones you think emit <b>'  +
	rule_names[trials[trial-1]] + '</b> waves<br>' +
	'&#8226 You must select at least 1 and less than all 8.<b>';

	prompt_phase4 = '<p id="prompt2"><b>Please describe in your own words what makes a scene emit radiation.<br></b></p>' +
	'&#8226 Try to make your description as <b>specific</b> as possible<br>' +
	'&#8226 Use <b>unambiguous</b> phrases like "There must be at least..." / "There are at most.." / "There is exactly one..."<br>' +
	'&#8226 <b>Remember:</b> the rule could be to do with any of the properties of the cones or their relationships, ' +
	'but has nothing to do with the name or what you did on previous tests<br>' +
	'&#8226 If you can think of more than one rule that could be true, please list them<br>' +
	'&#8226 If you cannot think of any rule that could be true, please say so<br>' +
	'&#8226 Type your answer (at least 15 characters) in the box below to continue<br>'


	//Prep data
	examples = zendo_cases[trials[trial-1]].t.slice(0,1);
	test_cases = zendo_cases[trials[trial-1]].t.slice(1).concat(zendo_cases[trials[trial]].f.slice(1));

	var iframe = document.getElementById("game_frame");

	if (iframe) {
		var iframeContent = (iframe.contentWindow || iframe.contentDocument);
		console.log('Starting iframe');
		iframeContent.Start(rules[trials[trial-1]], examples, test_cases, rule_names[trials[trial-1]], rand_counter);
	}


	$('#free_response_prompt').hide();
	$('#free_response_tb').hide();
	$('#task_btn').hide();
}

function description_phase()
{
	$("#prompt_tb").html(prompt_phase4);
	$('#free_response_tb').show();
	window.scrollTo(0,600);
}

function iframe_loaded() {
	console.log('iframe loaded');
	if (ready_to_start == true)
	{
		run_trial();
	}
}


function MakeUPI()
{
	//Create a upi
	var text = "";
	var possible = "abcdefghijklmnopqrstuvwxyz";
	for( var i=0; i < 10; i++ )
	{
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	return text;
}

function save_data()
{
	subject_str = JSON.stringify(subject_data);
	results_str = JSON.stringify({scenes:scenes, selected:selected});

	jQuery.ajax({
		url: '/php/save_data.php',
		type:'POST',
		data:{subject:subject_str, results:results_str},
		success:function(data)
		{
			console.log('Sent data to database');
			goto_complete();
		},
		error:function(xhr, status, error)
		{
			//Just print out what comes back if it doesn't work
			console.log(xhr, status, error);
		}
	})
}
//END
