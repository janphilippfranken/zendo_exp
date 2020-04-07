

// to make that work, copy paste the commented-out code on the console
// //parent.document.getElementById('game_frame').contentWindow.location.reload();#
// //parent.document.getElementById('game_frame').contentWindow.location.reload();#
// parent.document.getElementById('game_frame').contentWindow.location.reload()
// clearInterval(waiting_lobby)
// document.getElementById('game').style.visibility = "visible";
// document.getElementById('waiting_area').style.display = "none";
// var iframe = document.getElementById("game_frame");
// iframe.style.border = 'ridge';
// var iframeContent = (iframe.contentWindow || iframe.contentDocument);
// iframeContent.redraw_trial_();

function redraw_trial_() {
  xx={"_id":{"$oid":"5e89f122479419001639ae39"},"evidence":[false,false,false,true,false,false,true,false],"prior":[true,true,true,true,true,false,true,true],"posterior":[true,true,true,true,false,false,true,false],"disp_order":[9,12,11,13,15,10,8,14],"username":"RJ123","room":"TDvs5","trial":1,"data":[{"ids":[0,1,2],"colours":["green","blue","green"],"sizes":[1,2,1],"xpos":[0.3695943902506767,3.3550150804889523,2.7203088242630797],"ypos":[4.128333333333334,4.128333333333334,4.043406777668482],"rotations":[3.1415926535897936,3.1415926535897922,2.8545798207955833],"orientations":["upright","upright","upright"],"contact":[[0],[1,2],[2,1]],"grounded":["yes","yes","yes"],"follow_rule":true},{"ids":[0],"colours":["blue"],"sizes":[3],"xpos":[4.924161432206277],"ypos":[4.124688687494529],"rotations":[3.1431770772098746],"orientations":["upright"],"contact":[[0]],"grounded":["yes"],"follow_rule":true},{"ids":[0,1],"colours":["blue","green"],"sizes":[3,1],"xpos":[0.9706837032076508,2.949313009764078],"ypos":[4.124776543276837,4.124201057386008],"rotations":[3.142800696885129,3.1404670701363178],"orientations":["upright","upright"],"contact":[[0],[1]],"grounded":["yes","yes"],"follow_rule":true},{"ids":[0],"colours":["blue"],"sizes":[1],"xpos":[2.06538974788546],"ypos":[4.124452319055338],"rotations":[3.144768966688161],"orientations":["upright"],"contact":[[0]],"grounded":["yes"],"follow_rule":true},{"ids":[0,1],"colours":["blue","red"],"sizes":[1,1],"xpos":[5.416273856424508,6.083792613807354],"ypos":[4.125020393903281,4.124524942453623],"rotations":[3.1473897212059243,3.144970338888782],"orientations":["upright","upright"],"contact":[[0],[1]],"grounded":["yes","yes"],"follow_rule":true},{"ids":[0,1,2,3,4],"colours":["blue","red","green","green","green"],"sizes":[1,2,1,2,3],"xpos":[1.3556826918246059,2.7623533949002006,4.029546952792973,5.952223352037853,3.367290781172932],"ypos":[4.125124771388795,3.748885893413424,4.078428646334982,4.120585679298665,3.5013367886895397],"rotations":[3.143961287903089,5.0511831194301315,3.308639033458622,3.1518466033934494,4.200051258822736],"orientations":["upright","rhs","upright","upright","strange"],"contact":[[0],[1,4,2],[2,1,4],[3],[4,1,2]],"grounded":["yes","yes","yes","yes","no"],"follow_rule":false},{"ids":[0,1],"colours":["red","green"],"sizes":[2,2],"xpos":[6.037225739016584,6.03583058564126],"ypos":[4.127047917608318,3.8227298065106075],"rotations":[3.140972965694113,3.141039097667289],"orientations":["upright","upright"],"contact":[[0,1],[1,0]],"grounded":["yes","no"],"follow_rule":false},{"ids":[0,1,2],"colours":["blue","red","green"],"sizes":[1,2,2],"xpos":[1.4726479551041185,6.886258446208271,1.4710560861015043],"ypos":[4.12691954437049,4.124521593724977,4.112908311810613],"rotations":[3.136771955887615,3.137849699998893,3.1243886732189163],"orientations":["upright","upright","upright"],"contact":[[0,2],[1],[2,0]],"grounded":["yes","yes","no"],"follow_rule":false},{"ids":[0],"colours":["red"],"sizes":[1],"xpos":[0.980966455584144],"ypos":[4.15692217898732],"rotations":[3.14075602080225],"contact":[{"V1":0}],"grounded":["yes"]},{"ids":[0,1],"colours":["blue","blue"],"sizes":[2,2],"xpos":[5.53919900438758,1.65854079923742],"ypos":[4.15829751656101,4.15751198256046],"rotations":[3.14294469336728,3.13947439604659],"contact":[{"V1":0,"V2":1}],"grounded":["yes","yes"]},{"ids":[0,1,2],"colours":["blue","red","blue"],"sizes":[1,1,1],"xpos":[2.91233558185412,3.62676822308812,1.29792616640764],"ypos":[4.1571699418337,4.15734457821355,3.87855314146574],"rotations":[3.14061931424498,3.14080979983927,1.21335141178178],"contact":[{"V1":0,"V2":1,"V3":2}],"grounded":["yes","yes","yes"]},{"ids":[0,1,2,3],"colours":["blue","red","blue","green"],"sizes":[1,1,2,1],"xpos":[2.95609825059217,3.96209693679724,2.2390687716568,6.71224095289635],"ypos":[4.15768622476784,4.15787716497594,4.15807459370596,3.87670727460735],"rotations":[3.13919121672235,3.14161554480523,3.13998936351093,5.07284064751327],"contact":[{"V1":0,"V2":1,"V3":2,"V4":3}],"grounded":["yes","yes","yes","yes"]},{"ids":[0,1,2],"colours":["green","red","red"],"sizes":[1,3,1],"xpos":[1.21736009446034,6.88866095105911,4.29219484852988],"ypos":[4.15714834736316,4.15848443530156,4.15761681621936],"rotations":[3.14148035908309,3.14030543965137,3.14298105798337],"contact":[{"V1":0,"V2":1,"V3":2}],"grounded":["yes","yes","yes"]},{"ids":[0,1,2,3,4],"colours":["green","blue","green","red","red"],"sizes":[2,2,2,2,3],"xpos":[3.83090657832267,2.38910717821051,3.54259339814947,1.00881638670343,0.483372753490727],"ypos":[4.15913936320131,4.15701392299474,3.77761038379749,3.76166694023043,3.53535261859211],"rotations":[3.13980420303635,3.14077430032494,1.87848516525718,1.57196158476873,2.81423018257197],"contact":[[0,2],[1,2],[2,0,1],[3,4],[4,3]],"grounded":["yes","yes","yes","yes","no"]},{"ids":[0,1,2],"colours":["red","blue","green"],"sizes":[2,2,2],"xpos":[6.08097769326034,5.78861976198164,1.25011232086784],"ypos":[3.78458058527285,4.1039571708585,3.7795894526631],"rotations":[5.04856954343186,3.00593527717321,5.05105310034866],"contact":[[0,1],[1,0],2],"grounded":["yes","yes","yes"]},{"ids":[0,1,2,3],"colours":["red","green","red","red"],"sizes":[2,2,2,1],"xpos":[4.475106476545,0.413561660061233,6.37662276433712,5.00296952327856],"ypos":[4.1607559072369,4.15829244701068,3.77944860362373,3.87681059949227],"rotations":[3.14176346787067,3.1433043689908,5.0514105380658,5.07138540402654],"contact":[{"V1":0,"V2":1,"V3":2,"V4":3}],"grounded":["yes","yes","yes","yes"]}],"rule":"Omega","ph4_answer":"There cannot be any two cones that are overlapping vertically.","ph5_answer":"The cones must be all blue or all small.","token_id":"WjsXkIQV1LXVlJmcAAAJ","__v":0}
  td = xx.data;
  var pixel_ratio =  window.devicePixelRatio;

  ratio = 100 * pixel_ratio; //1 meter == 100 pixels (worry about pixel_ratio later!)
  prior_choices = xx.prior;
  post_choices = xx.posterior;
  evidence = xx.evidence;
  posit_ix = [8,9,10,11,12,13,14,15];//xx.disp_order;
  rule_name = "rule: "+xx.rule;
  description = "Participant's description: "+xx.ph4_answer;

  var f3 = new TextFormat("Helvetica-Light", 60 * pixel_ratio, 0x000000, false, false, "left");
  var format_rule = new TextFormat("Helvetica-Light", 30 * pixel_ratio, 0x000000, false, false, "left");
  var format_desc = new TextFormat("Helvetica-Light", 25 * pixel_ratio, 0x000000, false, false, "left");

  trial_pics = [];
  stage = new Stage("c");
  cols = [0xff0000, 0x00ff00, 0x0000ff];
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

  function DrawHistory(td, phase)
  {
      //console.log('drawing history');
      //test_count = test_count + 1
      //bn = emit_waves[test_count];
  //phase = 3
         t = test_count;

      //bn = CurrentRule(td[t]);

      var trial_pic = new Sprite();

      trial_pics.push(trial_pic);
      var frame_height=.75;

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

      if (phase < 3)
      {
        if (td[t].follow_rule===true)
        {
            var bd  = new BitmapData('/images/star2.png');//tick.png');

        } else if (td[t].follow_rule===false)
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

        if (test_count==0)
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
      } else if (phase === 3) {

        if (prior_c===true)
        {
            var bd  = new BitmapData('/images/Prior.png');//tick.png');
            objects.push(new Bitmap(bd));
            trial_pics[t].addChild(objects[objects.length-1]);
            objects[objects.length-1].x=stage.stageWidth*(2/10);
            objects[objects.length-1].y=stage.stageHeight*(1/10);
            objects[objects.length-1].scaleX=objects[objects.length-1].scaleY=0.75 * window.devicePixelRatio;

        }

        if (t < -12) // if they are the first 4 generalisations
        {
            console.log(posit_ix, t, posit_ix[t-8]);
            var bd  = new BitmapData('/images/star2.png');//tick.png');
            objects.push(new Bitmap(bd));
            trial_pics[t].addChild(objects[objects.length-1]);
            objects[objects.length-1].x=stage.stageWidth*(5/10);
            objects[objects.length-1].y=stage.stageHeight*(1/10);
            objects[objects.length-1].scaleX=objects[objects.length-1].scaleY=0.5 * window.devicePixelRatio;

        }
          stage.addChild(trial_pics[t]);

          trial_pics[t].width = trial_pics[t].width/4;//stage.stageWidth/4;
          trial_pics[t].height = trial_pics[t].height/4;//(stage.stageHeight*frame_height)/4;

          trial_pics[t].x=(posit_ix[t-8]%4)*(stage.stageWidth/4);

          trial_pics[t].y=Math.floor(posit_ix[t-8]/4)*((stage.stageHeight*frame_height)/4) + stage.stageHeight/8;

          if (post_c===true)
          {
              var bd  = new BitmapData('/images/Posterior.png');//tick.png');
              objects.push(new Bitmap(bd));
              trial_pics[t].addChild(objects[objects.length-1]);
              objects[objects.length-1].x=stage.stageWidth*(8/10);
              objects[objects.length-1].y=stage.stageHeight*(1/10);
              objects[objects.length-1].scaleX=objects[objects.length-1].scaleY=.75 * window.devicePixelRatio;

          }

          if (evid===true)
          {
              var bd  = new BitmapData('/images/evidence.png');//tick.png');
              objects.push(new Bitmap(bd));
              trial_pics[t].addChild(objects[objects.length-1]);
              objects[objects.length-1].x=stage.stageWidth*(5/10);
              objects[objects.length-1].y=stage.stageHeight*(1/10);
              objects[objects.length-1].scaleX=objects[objects.length-1].scaleY=0.75 * window.devicePixelRatio;

          }


      }// closing of phase 3
      if(t === 0){ // add the rule just once
        var rule_text = new TextField();
          rule_text.selectable = false; // default is true
          rule_text.setTextFormat(format_rule);
          rule_text.text = rule_name;

          rule_text.width = rule_text.textWidth;
          rule_text.height = rule_text.textHeight;
          rule_text.x = stage.stageWidth/40;
          rule_text.y = stage.stageHeight/2.5;
          stage.addChild(rule_text);
      }
      if(t === 1){ // add participants description here
        var desc_text = new TextField();
          desc_text.selectable = false; // default is true
          desc_text.setTextFormat(format_desc);
          desc_text.text = description;

          desc_text.width = desc_text.textWidth;
          desc_text.height = desc_text.textHeight;
          desc_text.x = stage.stageWidth/40;
          desc_text.y = stage.stageHeight/1.12;
          stage.addChild(desc_text);
      }

  }//Draw history




  for (var test_count = 0; test_count < 16; test_count++) {
    var prior_c = prior_choices[test_count - 8];
    var post_c = post_choices[test_count - 8];
    var evid = evidence[test_count - 8];
    if (test_count < 8) {
      var phase = 1;
    }else{
      var phase = 3;
    }

  DrawHistory(td, phase);

  } // outter for Loop

}
