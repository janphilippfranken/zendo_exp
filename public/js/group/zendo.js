//$(document).ready(function(){

//////////////////////////////////////////
//THIS CONTAINS THE JAVASCRIPT FOR A TRIAL
//////////////////////////////////////////

//Declaring some global variables
//var world;

var bodies = []; // instances of b2Body (from Box2D)
var actors = []; // instances of Bitmap (from IvanK)
var ix_co = undefined;
var CO_damping = 10;
var damping = 0.1;
var mouse_initially_entered_frame = false;
var pixel_ratio =  window.devicePixelRatio;
var ratio = 100 * pixel_ratio; //1 meter == 100 pixels (worry about pixel_ratio later!)
var half_ratio = ratio/3; //A smaller size for buttons (rescales life size pieces for the buttons);
var rotate = 0; //-1 for rotating anticlockwise, 1 for rotating clockwise, 0 for neither.
var f1 = new TextFormat("Helvetica-Light", 25 * pixel_ratio, 0x000000, false, false, "right");
var f2 = new TextFormat("Helvetica-Light", 20 * pixel_ratio, 0x777777, false, false, "left");
var f3 = new TextFormat("Helvetica-Light", 60 * pixel_ratio, 0x000000, false, false, "left");
var f4 = new TextFormat("Helvetica-Light", 20 * pixel_ratio, 0x000000, false, false, "left");
var f5 = new TextFormat("Helvetica-Light", 20 * pixel_ratio, 0x999999, false, false, "center");
f5.align = TextFormatAlign.JUSTIFY;

var removed = [];
var trialdata = [];
var pieces = [0,0,0,0,0,0,0,0,0];
var max_pieces = [2,2,2,2,2,2,2,2,2];
var trial_pics = [];
var id_count = 0;//Counts up how many objects were (ever) added
var test_count = 0;
var n_tests = 8;
var phase = 0;
var selected = [false, false, false, false, false, false, false,false];
var selectedPost = [false, false, false, false, false, false, false,false];
var epsilon = Math.PI/6;
var effect;
var eff_time = 2000;//0;//How long to sparkle for when you test
var rule_name = "Buddah"; //The default



//Declaring the Box2d functions I use
var   b2Vec2      = Box2D.Common.Math.b2Vec2,
b2BodyDef   = Box2D.Dynamics.b2BodyDef,
b2Body      = Box2D.Dynamics.b2Body,
b2FixtureDef    = Box2D.Dynamics.b2FixtureDef,
b2World     = Box2D.Dynamics.b2World,
b2PolygonShape  = Box2D.Collision.Shapes.b2PolygonShape,
b2ContactListener = Box2D.Dynamics.b2ContactListener;



function Start(fun, ss, tt, rn, counterbalance, posit_ix_, tr_count)
{

    trial_num = tr_count;
    posit_ix = posit_ix_;
    //Create the stage
    stage = new Stage("c");

    CurrentRule = parent.eval(fun);//Set the rule up globally (check it works)
    console.log(CurrentRule);
    start_state = ss;
    test_trials = tt;
	  rule_name = rn;

    id_count = 0;//Make sure the id count is reset when you start a new trial
    test_count = 0;//0;
	  trial_pics = [];
	  phase = 0;
    //var pixel_ratio =  window.devicePixelRatio;
    trialdata = [];



    // background
    // var bg = new Bitmap( new BitmapData("border.png") );
    // bg.scaleX = bg.scaleY = stage.stageHeight/512;
    // stage.addChild(bg);

    world = new b2World(new b2Vec2(0, 10));
	  world.SetContactListener(listener);


    var bxFixDef   = new b2FixtureDef();   // box  fixture definition
    bxFixDef.shape = new b2PolygonShape();
    bxFixDef.density = 1;
    bxFixDef.friction = 1.5;
    bxFixDef.restitution = 0;
    var bodyDef = new b2BodyDef();
    bodyDef.type = b2Body.b2_staticBody;

    // create ground
    bxFixDef.shape.SetAsBox(stage.stageWidth/ratio, (stage.stageHeight/ratio)/6);//10m by 1m static box
    bodyDef.position.Set(0, stage.stageHeight/ratio);//Places it in the bottom 1m of the window
    ground = world.CreateBody(bodyDef);
    ground.CreateFixture(bxFixDef);

    groundActor = new Sprite();
    groundActor.graphics.beginFill(0x926239, .3);
    groundActor.graphics.drawRect(0,0, stage.stageWidth, stage.stageHeight/6);
    groundActor.graphics.endFill();
    groundActor.graphics.beginFill(0x000000, .7);
    groundActor.graphics.drawRect(0,0, stage.stageWidth, 0.05*stage.stageHeight/6);
    groundActor.graphics.endFill();

    stage.addChild(groundActor);
    //s.x=(stage.stageWidth)/2
    groundActor.y=stage.stageHeight * (5/6);

    ground.SetUserData({type:"ground", id:"ground"});

    console.log('ground', ground);

    bxFixDef.shape.SetAsBox(1, 100);//1 meter wide by 100 meter high walls
    // left wall
    bodyDef.position.Set(-1, 3);
    world.CreateBody(bodyDef).CreateFixture(bxFixDef);
    // right wall
    bodyDef.position.Set(stage.stageWidth/ratio+1, 3);
    world.CreateBody(bodyDef).CreateFixture(bxFixDef);

    // Both images are supposed to be 200 x 200 px
    //var bxBD = new BitmapData("../images/box.png");

    //Create a polygon shape for the box2d objects

    all_points = {small:{
                        rhs:[{x: 0.2, y: 0}, {x: 0.3, y: 0}, {x: 0.05, y:0.667}, {x: -0.05, y:0.667}],
                        lhs:[{x: -0.2, y: 0}, {x: -0.3, y: 0}, {x: -0.05, y:0.667}, {x: 0.05, y:0.667}]
                        },

                    med:{
                        rhs:[{x: 0.3, y: 0}, {x: 0.4, y: 0}, {x: 0.05, y:1}, {x: -0.05, y:1}],
                        lhs:[{x: -0.3, y: 0}, {x: -0.4, y: 0}, {x: -0.05, y:1}, {x: 0.05, y:1}]
                        },

                    large:{
                        rhs:[{x: 0.4, y: 0}, {x: 0.5, y: 0}, {x: 0.05, y:1.333}, {x: -0.05, y:1.333}],
                        lhs:[{x: -0.4, y: 0}, {x: -0.5, y: 0}, {x: -0.05, y:1.333}, {x: 0.05, y:1.333}]
                        }
                };

    //The colours of the blocks
    cols = [0xff0000, 0x00ff00, 0x0000ff];




    ////////////////////
    //Add test a button
    ////////////////////
    btn = new Sprite();

    btn.graphics.beginFill(0x000000, 1);
    btn.graphics.drawRoundRect(-1*half_ratio, -.5*half_ratio, 2*half_ratio, half_ratio, 6, 6);
    btn.graphics.endFill();

    btn.graphics.beginFill(0xeeeeee, 1);
    btn.graphics.drawRoundRect(-1*half_ratio+2, -.5*half_ratio + 1, 2*half_ratio-4, half_ratio-2, 3, 3);
    btn.graphics.endFill();

    var t1 = new TextField();
    t1.selectable = false; // default is true
    t1.setTextFormat(f1);
    t1.text = 'Test';
    t1.width = t1.textWidth;
    t1.height = t1.textHeight;
    //t1.obj_id = actors.length;
    btn.addChild(t1);
    t1.x = -t1.textWidth / 2;
    t1.y = -t1.textHeight / 2;//-25;

    btn.buttonMode = true;

    stage.addChild(btn);

    btn.x = stage.stageWidth * 0.95;
    btn.y = stage.stageHeight * 0.93;
    btn.addEventListener(MouseEvent.CLICK, TestDevice);
    btn.addEventListener(MouseEvent.MOUSE_OVER, onMOv);
    btn.addEventListener(MouseEvent.MOUSE_OUT , onMOu);


    ////////////////////
    //Add a Continue button (for sending the image to the neighbour)
    ////////////////////
    cbtn = new Sprite();

    cbtn.graphics.beginFill(0x000000, 1);
    cbtn.graphics.drawRoundRect(-1.75*half_ratio, -.5*half_ratio, 3.5*half_ratio, half_ratio, 6, 6);
    cbtn.graphics.endFill();

    cbtn.graphics.beginFill(0xeeeeee, 1);
    cbtn.graphics.drawRoundRect(-1.75*half_ratio+2, -.5*half_ratio + 1, 3.5*half_ratio-4, half_ratio-2, 3, 3);
    cbtn.graphics.endFill();

    var t2 = new TextField();
    t2.selectable = false; // default is true
    t2.setTextFormat(f1);
    t2.text = 'Continue';
    t2.width = t2.textWidth;
    t2.height = t2.textHeight;
    cbtn.addChild(t2);
    t2.x = -t2.textWidth / 2;
    t2.y = -t2.textHeight / 2;//-25;

    cbtn.buttonMode = true;

    stage.addChild(cbtn);

    cbtn.x = stage.stageWidth /2 - t1.textWidth/2;//stage.stageWidth * 0.90;//
    cbtn.y = stage.stageHeight * 0.93;

    cbtn.addEventListener(MouseEvent.CLICK, Continue);
    cbtn.addEventListener(MouseEvent.MOUSE_OVER, onMOv);
    cbtn.addEventListener(MouseEvent.MOUSE_OUT , onMOu);
    cbtn.visible = false;

    ////////////////////
    //Add a Continue button // for the posterior
    ////////////////////
    cbtnPost = new Sprite();

    cbtnPost.graphics.beginFill(0x000000, 1);
    cbtnPost.graphics.drawRoundRect(-1.75*half_ratio, -.5*half_ratio, 3.5*half_ratio, half_ratio, 6, 6);
    cbtnPost.graphics.endFill();

    cbtnPost.graphics.beginFill(0xeeeeee, 1);
    cbtnPost.graphics.drawRoundRect(-1.75*half_ratio+2, -.5*half_ratio + 1, 3.5*half_ratio-4, half_ratio-2, 3, 3);
    cbtnPost.graphics.endFill();

    var t3 = new TextField();
    t3.selectable = false; // default is true
    t3.setTextFormat(f1);
    t3.text = 'Continue';
    t3.width = t3.textWidth;
    t3.height = t3.textHeight;
    cbtnPost.addChild(t3);
    t3.x = -t3.textWidth / 2;
    t3.y = -t3.textHeight / 2;//-25;

    cbtnPost.buttonMode = true;

    stage.addChild(cbtnPost);

    cbtnPost.x = stage.stageWidth /2 - t1.textWidth/2;//stage.stageWidth * 0.90;//
    cbtnPost.y = stage.stageHeight * 0.93;

    cbtnPost.addEventListener(MouseEvent.CLICK, ContinuePosterior);
    cbtnPost.addEventListener(MouseEvent.MOUSE_OVER, onMOv);
    cbtnPost.addEventListener(MouseEvent.MOUSE_OUT , onMOu);
    cbtnPost.visible = false;


    ///////////////////
    //Create the pieces
    ///////////////////



    /////////////////
    //Add the piece buttons
    /////////////////
    piece_buttons = [];
    for (var i=0; i<9; i++)
    {
    	var btn_order = ([[0,1,2,3,4,5,6,7,8],
    	                 [6,7,8,0,1,2,3,4,5],
						 [3,4,5,6,7,8,0,1,2],

    	                 [8,7,6,5,4,3,2,1,0],
    	                 [2,1,0,8,7,6,5,4,3],
    	                 [5,4,3,2,1,0,8,7,6],

    	                 [0,3,6,1,4,7,2,5,8],
    	                 [2,5,8,0,3,6,1,4,7],
    	                 [1,4,7,2,5,8,0,3,6],

    	                 [8,5,2,7,4,1,6,3,0],
    	                 [6,3,0,8,5,2,7,4,1],
    	                 [7,4,1,6,3,0,8,5,2]])[counterbalance];
        //Set the colour and local coordinates
        col = cols[Math.floor(i/3)];
        points = [all_points.small, all_points.med, all_points.large][i%3];

        var s = new Sprite();


        //Frame
        s.graphics.beginFill(0xeeeeee, .9);
        s.graphics.drawRect(-1*half_ratio, -.3*half_ratio, 2*half_ratio, 2*half_ratio);
        s.graphics.endFill();

        s.graphics.lineStyle(1, 0x000000);
        s.graphics.moveTo(-1*half_ratio, -.3*half_ratio);
        s.graphics.lineTo(1*half_ratio, -.3*half_ratio);
        s.graphics.lineTo(1*half_ratio, 1.7*half_ratio);
        s.graphics.lineTo(-1*half_ratio, 1.7*half_ratio);
        s.graphics.lineTo(-1*half_ratio, -.3*half_ratio);

        //Right hand side
        s.graphics.beginFill(col, .5);
        s.graphics.moveTo(points.rhs[0].x*half_ratio, points.rhs[0].y*half_ratio);
        for (var j=1; j<points.rhs.length; j++)
        {s.graphics.lineTo(points.rhs[j].x*half_ratio, points.rhs[j].y*half_ratio);}
        s.graphics.endFill();

        //Left hand side
        s.graphics.beginFill(col, .5);
        s.graphics.moveTo(points.lhs[0].x*half_ratio, points.lhs[0].y*half_ratio);
        for (var j=1; j<points.rhs.length; j++)
        {s.graphics.lineTo(points.lhs[j].x*half_ratio, points.lhs[j].y*half_ratio);}
        s.graphics.endFill();

        //Surface
        s.graphics.beginFill(col, .1);
        s.graphics.moveTo(points.rhs[1].x*half_ratio, points.rhs[1].y*half_ratio);
        s.graphics.lineTo(points.rhs[2].x*half_ratio, points.rhs[2].y*half_ratio);
        s.graphics.lineTo(points.lhs[2].x*half_ratio, points.lhs[2].y*half_ratio);
        s.graphics.lineTo(points.lhs[1].x*half_ratio, points.lhs[1].y*half_ratio);
        s.graphics.endFill();
        s.button_ix = i;

        //Place the button
        s.x = 0.05*stage.stageWidth + 0.1 * stage.stageWidth * btn_order[i];
        s.y = stage.stageHeight * (97/100);

        s.rotation = 180; //Flips it the right way up

        s.buttonMode = true;



        stage.addChild(s);
        s.addEventListener(MouseEvent.CLICK, AddPiece);

        piece_buttons.push(s);
    }


    NextTest();

}


function NextTest()
{
    console.log('fired next test');

	if (test_count<start_state.length)
	{
		///////////////////////////////////////////////////
		//Present initial configuration(s) without control
		///////////////////////////////////////////////////
		phase = 1;

		parent.d3.select("#query2").html(parent.prompt_phase1);

		stage.addEventListener(Event.ENTER_FRAME, onEF);

	    console.log('start state', start_state[test_count]);

        for (var i=0; i<start_state[test_count].ids.length; i++)
        {
        	//var e = {target:{button_ix:start_state.TODO}}
        	var description = {colour:start_state[test_count].colours[i], xpos:start_state[test_count].xpos[i],ypos:start_state[test_count].ypos[i],
        		rotation:start_state[test_count].rotations[i], size:start_state[test_count].sizes[i]};
            AddPiece(null, description);
        }
		for (var i=0; i<piece_buttons.length; i++)
        {
            piece_buttons[i].visible = false;
        }

	} else if (test_count<n_tests)
	{
		////////////////////
		//Free choice trials
		////////////////////
		phase = 2;

		parent.d3.select("#query2").html(parent.prompt_phase2);

		for (var i=0; i<piece_buttons.length; i++)
        {
            piece_buttons[i].visible = true;
        }

	    stage.addEventListener(Event.ENTER_FRAME, onEF);
	    stage.addEventListener(MouseEvent.MOUSE_DOWN, AssumeControl);
	    stage.addEventListener(MouseEvent.MOUSE_UP, RenegeControl);
	    stage.addEventListener(KeyboardEvent.KEY_DOWN, RotateOn);
	    stage.addEventListener(KeyboardEvent.KEY_UP, RotateOff);
	    stage.addEventListener(MouseEvent.RIGHT_CLICK, RemovePiece, false);

	    parent.document.getElementById('game_frame').addEventListener("mouseout", RenegeControl);
	} else {

		////////////
		//Test phase
		////////////
		// stage.removeEventListener(Event.ENTER_FRAME, onEF);//TRYING TO FIX DOUBLE SPEED PROBLEM on t>1... DIDN'T WORK
	 //    stage.removeEventListener(MouseEvent.MOUSE_DOWN, AssumeControl);
	 //    stage.removeEventListener(MouseEvent.MOUSE_UP, RenegeControl);
	 //    stage.removeEventListener(KeyboardEvent.KEY_DOWN, RotateOn);
	 //    stage.removeEventListener(KeyboardEvent.KEY_UP, RotateOff);
	 //    stage.removeEventListener(MouseEvent.RIGHT_CLICK, RemovePiece, false);

		phase = 3;

		btn.visible = false;
		cbtn.visible =false;

		parent.d3.select("#query2").html(parent.prompt_phase3);

		for (var i=0; i<piece_buttons.length; i++)
        {
            piece_buttons[i].visible = false;
        }

        // for (var i=0; i<trial_pics.length; i++)
        // {
        // 	stage.removeChild(trial_pics[i]);
        // }
        // trial_pics = [];

        for (var i=0; i<test_trials.length; i++)
        {
            trialdata.push(test_trials[i])
        	DrawHistory(trialdata, true, phase);
        }

        var t1 = new TextField();
        t1.selectable = false; // default is true
        t1.setTextFormat(f4);
        t1.text = "Which of the arrangements below emit " + rule_name +  " waves?";
        t1.width = t1.textWidth;
        t1.height = t1.textHeight;
        stage.addChild(t1);
        t1.x = stage.stageWidth/2 - t1.textWidth/2;
        t1.y = stage.stageHeight*0.425;

	}

}

function AddPiece(e, description)
{
    //console.log(e);

    //Piece type is a number between 1 and 9 corresponding to the button that was pushed,
    //or recoverable from the description
    if (description==undefined)
    {
    	console.log('clicked on piece', e.target.button_ix);

        piece_type = e.target.button_ix;

        console.log('piece_type', piece_type, 'col',Math.floor(piece_type/3), 'size', piece_type%3);
    } else {

    	piece_type = (description.colour==='green')*3 + (description.colour==='blue')*6 +
    	(description.size===2)*1 + (description.size===3)*2;
    	console.log('piece_type from description', (description.colour==='green')*3,
    	            (description.colour==='blue')*6,
    	(description.size===2)*1, (description.size===3)*2)
    }

    if (pieces[piece_type]<max_pieces[piece_type])
    {

        col = cols[Math.floor(piece_type/3)];
        raw_points = [all_points.small, all_points.med, all_points.large][piece_type%3];

        var points = {rhs:[], lhs:[]};

        for (var j = 0; j < raw_points.rhs.length; j++) {

            var vec = new b2Vec2();
            vec.Set(raw_points.rhs[j].x, raw_points.rhs[j].y);
            points.rhs[j] = vec;

            var vec2 = new b2Vec2();
            vec2.Set(raw_points.lhs[raw_points.lhs.length-j-1].x, raw_points.lhs[raw_points.lhs.length-j-1].y);
            points.lhs[j] = vec2;
        }

        var bodyDef = new b2BodyDef();
        bodyDef.type = b2Body.b2_dynamicBody;

        var rhsFixDef   = new b2FixtureDef();   // box  fixture definition
        rhsFixDef.shape = new b2PolygonShape();
        rhsFixDef.density = 1;
        rhsFixDef.restitution = 0.05;
        rhsFixDef.shape.SetAsArray(points.rhs, points.rhs.length);


        var lhsFixDef   = new b2FixtureDef();   // box  fixture definition
        lhsFixDef.shape = new b2PolygonShape();
        lhsFixDef.density = 1;
        rhsFixDef.restitution = 0.05;
        lhsFixDef.shape.SetAsArray(points.lhs, points.lhs.length);


        if (description==undefined)
        {
	        bodyDef.position.Set(Math.random()*7,3);
        } else {
        	bodyDef.position.Set(description.xpos, description.ypos)
        }


        //////////////////
        //The Box2d object
        //////////////////

        var body = world.CreateBody(bodyDef);

        body.CreateFixture(rhsFixDef);    //rhs
        body.CreateFixture(lhsFixDef);    //lhs

        //console.log('masses', ComputeMass(body));

        bodies.push(body);

        if (description==undefined)
        {
	        body.SetAngle(Math.PI + Math.random()*2 - 1);//0.1 - 0.05
	    } else {
	    	body.SetAngle(description.rotation);
	    }


        //body.SetLinearDamping(1);
        body.SetAngularDamping(.5);
        body.SetUserData({type:"piece", size:[1,2,3][piece_type%3],
        colour:['red','green','blue'][Math.floor(piece_type/3)],
        id:(bodies.length-1)});//(bodies.length-1)

        /////////////////////////
        //The visualization of them
        /////////////////////////
        var actor = new Sprite();


        //Right hand side
        actor.graphics.beginFill(col, 0.5);
        // actor.graphics.drawRect(-hw*ratio,-hh*ratio,2*hw*ratio,2*hh*ratio);
        actor.graphics.moveTo(raw_points.rhs[0].x*ratio, raw_points.rhs[0].y*ratio);
        for (var j=1; j<raw_points.rhs.length; j++)
        {
            actor.graphics.lineTo(raw_points.rhs[j].x*ratio, raw_points.rhs[j].y*ratio);
        }
        actor.graphics.endFill();

        //Left hand side
        actor.graphics.beginFill(col, 0.5);

        actor.graphics.moveTo(raw_points.lhs[0].x*ratio, raw_points.lhs[0].y*ratio);
        for (var j=1; j<raw_points.rhs.length; j++)
        {
            actor.graphics.lineTo(raw_points.lhs[j].x*ratio, raw_points.lhs[j].y*ratio);
        }
        actor.graphics.endFill();

        //Surface
        actor.graphics.beginFill(col, 0.1);

        actor.graphics.moveTo(raw_points.rhs[1].x*ratio, raw_points.rhs[1].y*ratio);

        actor.graphics.lineTo(raw_points.rhs[2].x*ratio, raw_points.rhs[2].y*ratio);
        actor.graphics.lineTo(raw_points.lhs[2].x*ratio, raw_points.lhs[2].y*ratio);
        actor.graphics.lineTo(raw_points.lhs[1].x*ratio, raw_points.lhs[1].y*ratio);

        actor.graphics.endFill();

        actor.obj_id = actors.length;//id_count;
        id_count  = id_count+1;//Increment this every time a piece is added

        actor.piece_type = piece_type;

        //actor.addEventListener(MouseEvent.MOUSE_MOVE, Jump);
        stage.addChild(actor);
        actors.push(actor);

        pieces[piece_type] = pieces[piece_type]+1;
        console.log('added:', piece_type, 'pieces', pieces);
    } else {
        var w1 = new TextField();
        w1.selectable = false; // default is true
        w1.setTextFormat(f2);
        w1.text = 'You may not add more than two of the same type of piece.';
        w1.width = w1.textWidth;
        w1.height = w1.textHeight;
        stage.addChild(w1);
        w1.x = stage.stageWidth/2 - w1.textWidth/2;
        w1.y = stage.stageHeight/2;
        console.log('w1', w1, w1.textWidth);
        setInterval(RemoveMessage, 1500, w1);
        //parent.alert('You may place at most two of each type of piece.');

    }
}







function onEF(e)
{
    world.Step(1/60,  3,  3);//1 / 60
    world.ClearForces();

    if (e.target.mouseX > 0 | e.target.mouseY > 0) {
        mouse_initially_entered_frame = true;
    }

    if (mouse_initially_entered_frame == true) {
        xPos = e.target.mouseX;
        yPos = e.target.mouseY;
    }

    for(var i=0; i<actors.length; i++)
    {
        var body  = bodies[i];
        var actor = actors [i];
        var p = body.GetPosition();
        actor.x = p.x * ratio;   // updating actor
        actor.y = p.y * ratio;
        actor.rotation = body.GetAngle()*180/Math.PI;
    }

    if (ix_co != undefined) {

        var body = bodies[ix_co]; //Select the fist or controlled puck

        var tmp = body.GetLinearVelocity();
        //var fistSpeed = Math.sqrt(Math.pow(tmp.x, 2), Math.pow(tmp.y, 2))

        var xCO = body.GetPosition().x; //Position of controlled object
        var yCO = body.GetPosition().y; //Position of controlled object

        //This is pretty heuristic force increases rapidly for farther distances from cursor
        //but is also damped by the current velocity to prevent it getting too crazy
        var xVec = .2*Math.pow((xPos / ratio - xCO), 1); //fistSpeed;
        var yVec = .2*Math.pow((yPos / ratio - yCO), 1); //fistSpeed;
        //console.log('trying to control', ix_co, xVec, yVec, xPos, yPos, ratio, xCO, yCO);
        var arm_force = new b2Vec2(xVec, yVec);

        var centre = body.GetWorldCenter();


        body.ApplyImpulse(arm_force, centre);

        if (rotate!=0)
        {
          body.ApplyTorque(rotate * body.GetMass()*2);//Apply a spin when key is pressed (proportional to mass of object)
        } else {
          //body.ApplyTorque(-0.1 * body.GetAngularVelocity());
        }

        if (body.GetAngularVelocity()>8)
        {

          body.SetAngularVelocity(8);

        } else if ( body.GetAngularVelocity() < (-8))
        {
          body.SetAngularVelocity(-8);
        }

        //console.log('angular velocity', body.GetAngularVelocity());
    }
}

function RemovePiece(e)
{
    console.log('remove piece triggered');

    var id = e.target.obj_id;//The unique id

    if (id != undefined) {
        // var arr_position = actors.indexOf(e.target);
        var piece_type = e.target.piece_type;
        pieces[piece_type] = pieces[piece_type]-1;

        stage.removeChild(actors[id]);
        world.DestroyBody(bodies[id]);

        var rema = actors.splice(id, 1);
        var remb = bodies.splice(id,1);
        removed.push({actor:rema,body:remb});//Keep all the removed actors/bodies here in case we need em

        for (i = 0; i<actors.length; ++i)
        {
            //Renumber the objects that remain
            actors[i].obj_id = i;
            bodies[i].m_userData.id=i;
        }
    } else {
        console.log('missed removal!', e.target);
    }
    console.log('pieces', pieces);
}

function AssumeControl(e) {

    //Reset damping parameter of previously controlled object if necessary
    if (e.target.obj_id != undefined) {
        ix_co = actors.indexOf(e.target);
        console.log('took control of', ix_co, bodies[ix_co].m_userData); //, e.target
        bodies[ix_co].m_linearDamping = CO_damping;

        //We want high angular damping for the controlled object so it doesn't spin too much
        bodies[ix_co].SetAngularDamping(7.5);

    } else {
        console.log('missed!', e.target);
    }
}

//Reset damping parameter of previously controlled object if necessary
function RenegeControl(e) {
    if (ix_co != undefined) {
        bodies[ix_co].m_linearDamping = damping;
        bodies[ix_co].SetAngularDamping(.5);
        console.log('reneging!', ix_co);
        ix_co = undefined;
    }
}

function RotateOn(e){
    if(e.keyCode == 88 | e.keyCode == 39)
    {
      //39
      if (rotate!=1)  {console.log('pressing right');}
        rotate=1;


    } else if (e.keyCode == 90 | e.keyCode == 37)
    {
      //37
    if (rotate!=-1)  {console.log('pressing left');}
        rotate=-1;

    } else {
        rotate=0;
        console.log('pressing something else');
    }
}

function RotateOff(e){
  rotate=0;
}

function SelectOption(e)
{
	console.log('selected option', e.target, e.target.option_ix);
	if (selected[e.target.option_ix] === false)
	{
		selected[e.target.option_ix] = true;
		e.target.alpha = 1;
	} else if (selected[e.target.option_ix] === true)
	{
		selected[e.target.option_ix] = false;
		e.target.alpha = 0;
	}

	var n_selected = 0;

	for (var i=0; i<selected.length; i++)
	{
		n_selected = n_selected + selected[i];
	}

	if (n_selected>0 & n_selected<8)
	{
		cbtn.visible = true;//$('#next_trial', window.parent.document).show();
	} else {
		cbtn.visible = false;//$('#next_trial', window.parent.document).hide();
	}
}



function SelectOptionPosterior(e)
{
	console.log('selected option', e.target, e.target.option_ix);
	if (selectedPost[e.target.option_ix] === false)
	{
		selectedPost[e.target.option_ix] = true;
		e.target.alpha = 1;
	} else if (selectedPost[e.target.option_ix] === true)
	{
		selectedPost[e.target.option_ix] = false;
		e.target.alpha = 0;
	}

	var n_selected = 0;

	for (var i=0; i<selectedPost.length; i++)
	{
		n_selected = n_selected + selectedPost[i];
	}

	if (n_selected>0 & n_selected<8)
	{
		cbtnPost.visible = true;

	} else {
		cbtnPost.visible = false;
	}
}


//////////////
//Store Contact
//////////////



var listener = new b2ContactListener();
listener.BeginContact = function(contact) {
    var tmp = [];
    var tmp2 = [contact.GetFixtureA().GetBody().GetUserData(),
    contact.GetFixtureB().GetBody().GetUserData()];//.sort(); //Contact entities

}

function onMOv(e){
    e.target.alpha = 1.0;
    //TODO FIX THE HIGHLIGHTING\
}

function onMOu(e){ e.target.alpha = 0.7; }

function TestDevice(e){

	var check=true;
	var sum_piece = 0;
	for (var i=0; i<pieces.length; i++)
    {
        sum_piece+=pieces[i];
    }
    if (sum_piece===0)
    {
    	check = false;

    	var w1 = new TextField();
        w1.selectable = false; // default is true
        w1.setTextFormat(f2);
        w1.text = 'You must add at least one piece.';
        w1.width = w1.textWidth;
        w1.height = w1.textHeight;
        stage.addChild(w1);
        w1.x = stage.stageWidth/2 - w1.textWidth/2;
        w1.y = stage.stageHeight/2;
        console.log('w1', w1, w1.textWidth);
        setInterval(RemoveMessage, 1500, w1);
    }
	//Its a bit too sensitive...
	//var atRestCheck = true;
    // for (i=0; i<bodies.length; i++)
     //     {
     //       if (bodies[i].IsAwake()===true & removed[i]===false)
     //       {
     //         atRestCheck=false;
     //       }
     //     }

    if (check==true)
    {
		test_count = test_count+1;


        stage.removeEventListener(Event.ENTER_FRAME, onEF);
	    stage.removeEventListener(MouseEvent.MOUSE_DOWN, AssumeControl);
	    stage.removeEventListener(MouseEvent.MOUSE_UP, RenegeControl);
	    stage.removeEventListener(KeyboardEvent.KEY_DOWN, RotateOn);
	    stage.removeEventListener(KeyboardEvent.KEY_UP, RotateOff);
	    stage.removeEventListener(MouseEvent.RIGHT_CLICK, RemovePiece);

        console.log('performing a test!');

		for (var i=0; i<piece_buttons.length; i++)
        {
            piece_buttons[i].visible = false;
        }

        //dataURL = c.toDataURL("image/png");
        //console.log('dataURL',dataURL); NOW WHAT
        var ids = [];
        var colours = [];
        var sizes = [];
        var xposs = [];
        var yposs = [];
        var rotations = [];
        var orientations = [];
        var contact = [];
        var grounded = [];

        pieces = [0,0,0,0,0,0,0,0,0];


        for (i=0; i<bodies.length; i++)
        {
            body = bodies[i];
            console.log('body', i, body.GetUserData());

            ids.push(body.GetUserData().id);
            colours.push(body.GetUserData().colour);
            sizes.push(body.GetUserData().size);

            xposs.push(body.GetPosition().x);
            yposs.push(body.GetPosition().y);
            // positions.push({x:body.GetPosition().x, y:body.GetPosition().y});

            var rot = body.GetAngle()
            rotations.push(rot);
            while (rot > (2 * Math.PI))
            {
            	console.log('rotating positive', rot);
                rot = rot -2*Math.PI;
            }
            while (rot < 0)
            {
            	console.log('rotating negative', rot);
                rot = rot+2*Math.PI;
            }
            if (Math.abs(rot - Math.PI) < epsilon)
            {
                orientations.push('upright')
            } else if (Math.abs(rot-1.2475) < epsilon)
            {
                orientations.push('lhs')
            } else if (Math.abs(rot-5.0375) < epsilon)
            {
                orientations.push('rhs')
            } else {
                orientations.push('strange')
            }

            contact.push([i]);
            grounded.push('no');
        }
		console.log('performing a test!3');

        for (i=0; i<bodies.length; i++)
        {

            //Loops over points of contact
            for (var cont = bodies[i].GetContactList(); cont!=null; cont = cont.next)
            {
                //Report the two entities being considered
                console.log(' touching ',
                    cont.other.GetUserData(), cont.contact.IsTouching());

                //If they are actually touching:
                if (cont.other.GetUserData()!==null & cont.contact.IsTouching()===true)
                {
                    //Get the touched object id
                    var cur_id = cont.other.GetUserData().id;
                    //Make sure its not talking about touching itself
                    if (cur_id!=i)
                    {
                        console.log('actually touching', i, cur_id);
                        //Check if its been added to i
                        var already_in_subj=false;
                        var already_in_obj=false;
                        for (var j=0; j<contact[i].length; j++)
                        {
                            if (contact[i][j]==cur_id)
                            {
                                already_in_subj=true;
                            }
                        }

                        if (cur_id!='ground')
                        {
                        	for (var j=0; j<contact[cur_id].length; j++)
	                        {
	                            if (contact[cur_id][j]==i)
	                            {
	                                already_in_obj=true;
	                            }
	                        }

                            if (already_in_obj===false)
	                        {
	                            contact[cur_id].push(i);
	                        }

         	               //Add it if not
	                        if (already_in_subj===false)
	                        {
	                            contact[i].push(cont.other.GetUserData().id);
	                        }
                        } else {
                        	grounded[i]='yes';
                        }
                    }//If id isn't i
                }//If they are actually touching
            }//Loop over cont over contacts for i
        }//Loop i over objects

		trialdata.push({ids:ids, colours:colours, sizes:sizes, xpos:xposs, ypos:yposs, rotations:rotations, orientations:orientations,
            contact:contact, grounded:grounded});

		console.log('positions', xposs, yposs, 'rotations', rotations, 'ids', ids, 'contact', contact);

		buddah_nature = CurrentRule(trialdata[trialdata.length-1]);
		//Add the decision
		trialdata[trialdata.length-1].follow_rule = buddah_nature;

		w2 = new TextField();
        w2.selectable = false; // default is true
        w2.setTextFormat(f1);

		if (buddah_nature==true)
		{

			var b = new BitmapData("/images/stars.png");
			effect = new Bitmap(b);
			stage.addChild(effect);
			effect.scaleX = effect.scaleY = 875/1500 * window.devicePixelRatio;
			console.log('layer testing', stage.getChildIndex(effect));
			stage.setChildIndex(effect, 0);
			console.log('layer testing', stage.getChildIndex(effect));
			Tweener.addTween(effect, {x:0, y:-6000*(875/1500), transition:"linear", time:eff_time/1000});
			w2.text = 'This arrangement DOES emit ' + rule_name+ ' waves!';
		} else {
			w2.text = 'This arrangement DOES NOT emit ' + rule_name + ' waves.';
		}

        w2.width = w2.textWidth;
        w2.height = w2.textHeight;
        setTimeout(AddMessage, eff_time/4, w2);
        w2.x = stage.stageWidth/2 - w2.textWidth/2;
        w2.y = stage.stageHeight/2;


		setTimeout(ClearUp, eff_time);


    } else {

      console.log("cant test, some condition not met");
    }
};

function ClearUp()
{
	stage.removeChild(effect);
	stage.removeChild(w2);

	//Remove bodies and actors
    for (i=0; i<bodies.length; i++)
    {
        stage.removeChild(actors[i]);
        world.DestroyBody(bodies[i]);
    }
	actors = [];
	bodies = [];
	id_count = 0;

	DrawHistory(trialdata, buddah_nature, phase);

	if (test_count == n_tests)
	{
		// cbtn.visible = true;
		// btn.visible = false;
        stage.removeChild(groundActor);
        world.DestroyBody(ground);
	}

	NextTest();

}



function DrawHistory(td, bn, phase)
{
  	//console.log('drawing history');

       t = (td.length-1);

    //bn = CurrentRule(td[t]);

    var trial_pic = new Sprite();

    trial_pics.push(trial_pic);
    var frame_height=0.75;

    //console.log('drawing history', frame_height);
    //Frame
    trial_pics[t].graphics.lineStyle(5, 0x777777);
    trial_pics[t].graphics.moveTo(0, 0);
    trial_pics[t].graphics.lineTo(stage.stageWidth, 0);
    trial_pics[t].graphics.lineTo(stage.stageWidth, stage.stageHeight*frame_height);
    trial_pics[t].graphics.lineTo(0, stage.stageHeight*frame_height);
    trial_pics[t].graphics.endFill();

    //Floor
    trial_pics[t].graphics.beginFill(0x926239, 0.3);
    trial_pics[t].graphics.drawRect(0,(stage.stageHeight*frame_height) - stage.stageHeight/6, stage.stageWidth, stage.stageHeight/6);
    trial_pics[t].graphics.endFill();
    trial_pics[t].graphics.beginFill(0x000000, 0.7);
    trial_pics[t].graphics.drawRect(0,(stage.stageHeight*frame_height) - stage.stageHeight/6, stage.stageWidth, 0.05*(stage.stageHeight/6));
    trial_pics[t].graphics.endFill();

    var objects = [];
    //Loop over objects
    for (i = 0; i<td[t].ids.length; i++)
    {

        if (td[t].colours[i]==='red') {col=cols[0];}
        else if (td[t].colours[i]==='green') {col=cols[1];}
        else if (td[t].colours[i]==='blue') {col=cols[2];}

        if (td[t].sizes[i]==1) {raw_points=all_points.small;}
        else if (td[t].sizes[i]==2) {raw_points=all_points.med;}
        else if (td[t].sizes[i]==3) {raw_points=all_points.large;}

        //console.log('raw_points', raw_points, 'col',col);


        objects.push(new Sprite());

        //Right hand side
        objects[i].graphics.beginFill(col, 0.5);
        // obj.graphics.drawRect(-hw*ratio,-hh*ratio,2*hw*ratio,2*hh*ratio);
        objects[i].graphics.moveTo(raw_points.rhs[0].x*ratio, raw_points.rhs[0].y*ratio);
        for (var j=1; j<raw_points.rhs.length; j++)
        {
          objects[i].graphics.lineTo(raw_points.rhs[j].x*ratio, raw_points.rhs[j].y*ratio);
        }
        objects[i].graphics.endFill();

        //Left hand side
        objects[i].graphics.beginFill(col, 0.5);

        objects[i].graphics.moveTo(raw_points.lhs[0].x*ratio, raw_points.lhs[0].y*ratio);
        for (var j=1; j<raw_points.rhs.length; j++)
        {
            objects[i].graphics.lineTo(raw_points.lhs[j].x*ratio, raw_points.lhs[j].y*ratio);
        }
        objects[i].graphics.endFill();

        //Surface
        objects[i].graphics.beginFill(col, 0.1);

        objects[i].graphics.moveTo(raw_points.rhs[1].x*ratio, raw_points.rhs[1].y*ratio);

        objects[i].graphics.lineTo(raw_points.rhs[2].x*ratio, raw_points.rhs[2].y*ratio);
        objects[i].graphics.lineTo(raw_points.lhs[2].x*ratio, raw_points.lhs[2].y*ratio);
        objects[i].graphics.lineTo(raw_points.lhs[1].x*ratio, raw_points.lhs[1].y*ratio);

        objects[i].graphics.endFill();
        trial_pics[t].addChild(objects[i]);

        objects[i].x = ratio*td[t].xpos[i];
        objects[i].y = ratio*td[t].ypos[i] - (stage.stageHeight*(1-frame_height));
        objects[i].rotation = td[t].rotations[i]*180/Math.PI;
        //console.log(objects[i]);
    }

    if (phase!==3)
    {
    	if (bn===true)
	    {
	        var bd  = new BitmapData('/images/star2.png');//tick.png');

	    } else if (bn===false)
	    {
	        var bd = new BitmapData('/images/whitestar.png');//cross.png');
	    }
		objects.push(new Bitmap(bd));
		trial_pics[t].addChild(objects[objects.length-1]);
		objects[objects.length-1].x=stage.stageWidth*(8/10);
		objects[objects.length-1].y=stage.stageHeight*(1/10);
		objects[objects.length-1].scaleX=objects[objects.length-1].scaleY=0.5 * window.devicePixelRatio;

		var w3 = new TextField();
	    w3.selectable = false; // default is true
	    w3.setTextFormat(f3);

	    if (test_count<(start_state.length+1))
	    {
	    	w3.text = test_count + '.  (example)';
	    } else {
	    	w3.text = test_count + '.';
	    }
	 	w3.width = w3.textWidth;
	    w3.height = w3.textHeight;
	    trial_pics[t].addChild(w3);
	    w3.x = stage.stageWidth/20;
	    w3.y = stage.stageHeight/20;

        stage.addChild(trial_pics[t]);

        console.log('testing stage width for constancy:', stage.stageWidth, trial_pics[t].width, 'pic t:', t);

	    trial_pics[t].width = trial_pics[t].width/4;//stage.stageWidth/4;
	    trial_pics[t].height = trial_pics[t].height/4;//(stage.stageHeight*frame_height)/4;
	    trial_pics[t].x=(t%4)*(stage.stageWidth/4);
	    trial_pics[t].y=Math.floor(t/4)*((stage.stageHeight*frame_height)/4);
    } else {

        //add an translucent overlay that people can click on
        var overlay = new Sprite();
		overlay.graphics.beginFill(0x000000, 0.1);
	    overlay.graphics.moveTo(0, 0);
	    overlay.graphics.lineTo(stage.stageWidth, 0);
	    overlay.graphics.lineTo(stage.stageWidth, stage.stageHeight*frame_height);
	    overlay.graphics.lineTo(0, stage.stageHeight*frame_height);
	    overlay.graphics.endFill();
		overlay.option_ix = t-8;
		overlay.alpha = 0;
    console.log(overlay);
		trial_pics[t].addChild(overlay);

        stage.addChild(trial_pics[t]);

	    // trial_pics[t].width = stage.stageWidth/4;
	    // trial_pics[t].height = stage.stageHeight/4;
	    // trial_pics[t].x=(t%4)*(stage.stageWidth/4);
	    // trial_pics[t].y=Math.floor(t/4)*(stage.stageHeight/4) + stage.stageHeight/8;
        trial_pics[t].width = trial_pics[t].width/4;//stage.stageWidth/4;
        trial_pics[t].height = trial_pics[t].height/4;//(stage.stageHeight*frame_height)/4;

        trial_pics[t].x=(posit_ix[t-8]%4)*(stage.stageWidth/4);

        trial_pics[t].y=Math.floor(posit_ix[t-8]/4)*((stage.stageHeight*frame_height)/4) + stage.stageHeight/8;

	    trial_pics[t].addEventListener(MouseEvent.CLICK, SelectOption);
    }

}//Draw history

// function ClickTextbox(e)
// {
//     t3.text = "";
//     t3.removeEventListener(MouseEvent.CLICK, ClickTextbox);
// }

// function UpdateTextbox(e)
// {
//     console.log(t3.text.length);
// }

function preparingForPosterior(){
  for (var i = 0; i < trial_pics.length-8; i++) {
    trial_pics[i].visible = false;
  }
  // remove the select overlay
  for (var i = 8; i < trial_pics.length; i++) {
    var numCh = trial_pics[i].numChildren
    trial_pics[i]._children[numCh-1].alpha = 0;
    //trial_pics[i].removeChild(trial_pics[i]._children[numCh-1]);
    trial_pics[i].removeEventListener(MouseEvent.CLICK, SelectOption);
    trial_pics[i].addEventListener(MouseEvent.CLICK, SelectOptionPosterior);
}
    // hide button
    cbtn.visible = false;
}
/////////////////////// H E L P E R S    F U N C T I O N S
// COPY THESE TO NEW FILES
function waitingAreaOrNo(user_OTHERfinished) {
  // display or not the waiting area
  if((typeof(parent.who_finished ) === "undefined") || parent.who_finished.length % 2 === 0 ){ // if this is the first to finish the trial

    // Add the waiting area here
    parent.document.getElementById('waiting-area-after-trial').style.display = "block";
    parent.document.getElementById('user-finished2').innerHTML = user_OTHERfinished;

  }else{ // this is the second to finish the game
    //  displayes the image block only for themselves
    //parent.document.getElementById('images-div').style.display = "block";
    parent.document.getElementById('button-to-posterior-div').style.display = "block";
    parent.who_finished = [];
  }
}
function getUserDetails(){
  players_info = parent.players_info;
  var room = parent.document.getElementById("groupName").value;// this will be the user who finished first
  var user_finished = parent.document.getElementById("username").value;// this will be the user who finished first
  var user = players_info[user_finished][0]; // that's the info on whether the user is user1 or user2
  // now we'll take the name of the other user (not the one who finished now)
  var idx_OTHERfinished = Math.abs(Object.keys(players_info).indexOf(user_finished) - 1); // this formula will always give us the other number from 0 and 1. e.g if it's 0, it'll give us 1 etc
  var user_OTHERfinished = Object.keys(players_info)[idx_OTHERfinished];
  return {user, user_OTHERfinished}
}
function pasteScreenShot(trialdata) {
  var userD = getUserDetails();
  var user = userD.user;
  var user_OTHERfinished = userD.user_OTHERfinished;


  // put image of what the player did to the YOU section of user x
  var youIframe = parent.document.getElementById('you-image-'+user);
  var youIframeContent = (youIframe.contentWindow || youIframe.contentDocument);
  parent.document.getElementById('images-'+user).style.display = "block";
  parent.document.getElementById('images-div').style.display = "block"; // we need to momentarily display it before drawing into it because it doesn't work if it is hidden
  youIframeContent.draw_generalisations(trialdata, selected, posit_ix, 'you-image-'+user);
  parent.document.getElementById('images-div').style.display = "none";
  parent.document.getElementById(user+"-other-name").innerHTML = user_OTHERfinished; // this is the name of the user2


}// END OF PASTE SCREENSHOT

function draw_ticks_posterior() {
  // adding ticks on the posterior where appropriate
  objects = [];
  for (var t = 8; t < trial_pics.length; t++) {

    if(selected[t-8] === true){
      var bd  = new BitmapData('/images/tick.png');//tick.png');
      objects.push(new Bitmap(bd));
      trial_pics[t].addChild(objects[objects.length-1]);
      objects[objects.length-1].x=stage.stageWidth*(8/10);
      objects[objects.length-1].y=stage.stageHeight*(1/10);
      objects[objects.length-1].scaleX=objects[objects.length-1].scaleY=0.5 * window.devicePixelRatio;

    }
     if(parent.other_selected[t-8] === true){
      var bd  = new BitmapData('/images/tick_post.png');//tick.png');
      objects.push(new Bitmap(bd));
      trial_pics[t].addChild(objects[objects.length-1]);
      objects[objects.length-1].x=stage.stageWidth*(2/10);
      objects[objects.length-1].y=stage.stageHeight*(1/10);
      objects[objects.length-1].scaleX=objects[objects.length-1].scaleY=0.5 * window.devicePixelRatio;
    }
  }
}



////////////////////////////////// E N D  O F  H E L P E R S //////////////////////////////
function AddMessage(pointer)
{
    stage.addChild(pointer);
}

function RemoveMessage(pointer)
{
    stage.removeChild(pointer);
}

function Continue(e)
{

  // getting screenshot of the canva
  //var height = Math.round(stage.stageHeight); // dimensions of the iframe
  //var width = Math.round(stage.stageWidth);
  //var dataURL = ""; //screenShot(width, height);
  // paste screenshot to the YOU side of the user
  pasteScreenShot(trialdata);


  // destroy  the upper pics and removing the old overlay and create a new one
  //preparingForPosterior();

  // hidding only the iframe (leave inside query2)
  parent.document.getElementById("game_frame").style.height = "191px";
  // display textarea (button included)
  parent.document.getElementById('phase4-div').style.display = "block";
  parent.d3.select("#query2").html(parent.prompt_phase4);

  // updating images divisions width from here
  //var images = parent.document.getElementsByClassName('res-image');
  //for (var i = 0; i < images.length; i++) {
  //  images[i].width = 400;
  //}

}



function ContinuePosterior(e){ // reference from the button continue from the posterior


// hide game
parent.document.getElementById('game').style.display = "none";
// hide images
parent.document.getElementById('images-div').style.display = "none";
// display phase 5
parent.document.getElementById('phase5-div').style.display = "block";

}
