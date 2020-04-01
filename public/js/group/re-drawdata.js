

// to make that work, copy paste the commented-out code on the console
// //parent.document.getElementById('game_frame').contentWindow.location.reload();#
// //parent.document.getElementById('game_frame').contentWindow.location.reload();#
// document.getElementById('game').style.visibility = "visible";
// document.getElementById('waiting_area').style.display = "none";
// var iframe = document.getElementById("game_frame");
// iframe.style.border = 'ridge';
// var iframeContent = (iframe.contentWindow || iframe.contentDocument);
// iframeContent.redraw_trial();

function redraw_trial() {
  xx={"_id":{"$oid":"5e7de8f78b60370be8875d2e"},"prior":[false,false,false,false,false,false,true,false],"posterior":[false,false,false,false,false,true,false,true],"disp_order":[10,14,15,11,9,12,13,8],"username":"c2","room":"g69B5","trial":1,"data":[{"ids":[0,1,2,3,4],"colours":["blue","blue","green","green","green"],"sizes":[1,2,1,2,3],"xpos":[0.30944369669435245,3.9222517188342847,5.337497543375092,3.1133034877344836,5.411614347832926],"ypos":[4.128333333333334,4.128333333333334,4.128333333333334,4.128333333333334,4.128333317262491],"rotations":[3.1415926535897936,3.1415926535897927,3.141592653589793,3.1415926535897927,3.1415926851012492],"orientations":["upright","upright","upright","upright","upright"],"contact":[[0],[1,3],[2],[3,1],[4]],"grounded":["yes","yes","yes","yes","yes"],"follow_rule":true},{"ids":[0],"colours":["green"],"sizes":[3],"xpos":[3.5399469050249466],"ypos":[4.003551139419507],"rotations":[2.8967673766502764],"orientations":["upright"],"contact":[[0]],"grounded":["yes"],"follow_rule":false},{"ids":[0],"colours":["green"],"sizes":[2],"xpos":[6.522185342431844],"ypos":[3.8814616256778733],"rotations":[2.4899601650855874],"orientations":["strange"],"contact":[[0]],"grounded":["yes"],"follow_rule":false},{"ids":[0],"colours":["green"],"sizes":[3],"xpos":[6.373023178699021],"ypos":[3.8333333333333304],"rotations":[2.860494435726678],"orientations":["upright"],"contact":[[0]],"grounded":["no"],"follow_rule":false},{"ids":[0],"colours":["green"],"sizes":[3],"xpos":[5.11342008519501],"ypos":[3.792726571739928],"rotations":[3.870677752447086],"orientations":["strange"],"contact":[[0]],"grounded":["yes"],"follow_rule":false},{"ids":[0],"colours":["green"],"sizes":[3],"xpos":[3.3734076715684695],"ypos":[4.120821141472426],"rotations":[3.1515109616334267],"orientations":["upright"],"contact":[[0]],"grounded":["yes"],"follow_rule":false},{"ids":[0],"colours":["green"],"sizes":[3],"xpos":[3.76290882497983],"ypos":[3.8574298527594855],"rotations":[2.578159851521298],"orientations":["strange"],"contact":[[0]],"grounded":["yes"],"follow_rule":false},{"ids":[0],"colours":["green"],"sizes":[2],"xpos":[4.0724192054438095],"ypos":[3.7521138078637795],"rotations":[4.3324518189008],"orientations":["strange"],"contact":[[0]],"grounded":["yes"],"follow_rule":false},{"ids":[0,1,2,3,4,5,6,7],"colours":["red","blue","blue","red","red","green","red","blue"],"sizes":[3,1,2,2,3,2,1,2],"xpos":[3.73068127782473,5.21143043275308,0.628029634657912,5.41985831114537,3.73221495043733,2.6881904061602,2.69592462610732,4.6441478837753],"ypos":[4.15955293434237,3.88040887163376,3.77952636825576,4.00866939013447,3.84618730815599,4.16046505787232,3.36197381341272,4.15735107629793],"rotations":[3.14513282779734,5.0677355060028,5.0513292843393,2.88192941289468,3.14453575957132,3.13858862708556,2.60114260528712,3.14253353812844],"contact":[[0,4],[1,3],2,[3,1,7],[4,0],[5,6],[6,5],[7,3]],"grounded":["yes","yes","yes","no","no","yes","no","yes"]},{"ids":[0,1,2,3,4],"colours":["green","red","red","blue","blue"],"sizes":[3,3,3,1,1],"xpos":[0.494087661193018,3.9483348516538,5.27168256714865,5.34332261433319,0.73624872055367],"ypos":[4.03747541930378,4.15789345817489,3.68793264237984,3.6957884966519,3.12182877557111],"rotations":[3.39186622255945,3.13985318391394,5.03796059957422,0.88254982855712,3.37051889969503],"contact":[[0,4],1,[2,3],[3,2],[4,0]],"grounded":["yes","yes","yes","yes","no"]},{"ids":[0,1,2,3],"colours":["red","blue","blue","green"],"sizes":[1,1,2,2],"xpos":[3.18059163568182,0.310290458717288,3.1806567054277,2.31556998810598],"ypos":[4.16168723431181,4.15876638336768,4.1487939044355,4.15777861520172],"rotations":[3.14159140357956,3.14265904643877,3.14147445775215,3.14506697679819],"contact":[[0,2],1,[2,0],3],"grounded":["yes","yes","no","yes"]},{"ids":[0,1,2],"colours":["red","blue","blue"],"sizes":[2,1,1],"xpos":[4.18368803941992,0.414042657065262,2.15035350734386],"ypos":[3.77956682056473,4.15748311487421,3.8762597297667],"rotations":[1.23393916549627,3.14433838895914,1.21175410086331],"contact":[{"V1":0,"V2":1,"V3":2}],"grounded":["yes","yes","yes"]},{"ids":[0,1,2,3],"colours":["red","blue","green","green"],"sizes":[1,2,3,2],"xpos":[3.51554594721066,0.952630095552302,1.15938786102465,4.3365248890533],"ypos":[4.15861023322789,3.78844050360235,3.68324865018165,3.81210635173936],"rotations":[3.13374769948046,1.95279692618981,5.03789515425762,2.09958352806452],"contact":[[0,3],1,2,[3,0]],"grounded":["yes","yes","yes","yes"]},{"ids":[0,1,2,3,4,5,6],"colours":["red","green","green","red","red","green","blue"],"sizes":[2,2,1,2,3,1,2],"xpos":[6.87642919084431,0.500811040908878,6.83118798955539,0.500811040908877,2.84733119936067,4.8509860534385,6.36697442237732],"ypos":[4.16175085069598,4.16166666666667,3.43496091839389,3.86081693802354,3.68420776646255,3.88048305615273,3.30313545616522],"rotations":[3.14149734712368,3.14159265358979,3.21473720201577,3.1415926535898,5.03748075887867,5.06844557980735,3.76206868572812],"contact":[[0,6,2],[1,3],[2,0,6],[3,1],4,5,[6,0,2]],"grounded":["yes","yes","no","no","yes","yes","no"]},{"ids":[0,1,2,3],"colours":["green","red","green","green"],"sizes":[3,2,3,1],"xpos":[0.68898442305447,3.35991414777035,6.19696481477246,0.285852488312505],"ypos":[4.14082379374931,3.77953993499473,3.68347394204074,3.22090721981064],"rotations":[3.17946147794873,5.05131141313782,1.24390261182064,2.78305328423849],"contact":[[0,3],1,2,[3,0]],"grounded":["yes","yes","yes","no"]},{"ids":[0,1,2,3,4,5],"colours":["blue","green","red","green","red","red"],"sizes":[2,1,3,3,2,2],"xpos":[1.90901458039544,3.20404317572615,5.35557787085149,2.21502873493383,4.45133508655654,0.411178438002497],"ypos":[4.15997299836821,3.9724254650111,3.68341260130509,3.66870790290145,3.29547827552602,4.15884184210246],"rotations":[3.14582683698787,3.82418159605204,1.24456815445981,4.50974799681394,6.86637263771617,3.14292060739547],"contact":[[0,3],[1,3],[2,4],[3,0,1],[4,2],5],"grounded":["yes","yes","yes","yes","yes","yes"]}],"__v":0}
  td = xx.data;

  ratio = 100 * 1; //1 meter == 100 pixels (worry about pixel_ratio later!)
  prior_choices = xx.prior;
  post_choices = xx.posterior;
  posit_ix = xx.disp_order;
  rule_name = "xx.rule";
  description = "xx.description";

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
            var bd  = new BitmapData('/images/tick.png');//tick.png');
            objects.push(new Bitmap(bd));
            trial_pics[t].addChild(objects[objects.length-1]);
            objects[objects.length-1].x=stage.stageWidth*(8/10);
            objects[objects.length-1].y=stage.stageHeight*(1/10);
            objects[objects.length-1].scaleX=objects[objects.length-1].scaleY=0.5 * window.devicePixelRatio;

        }

        if (t < 12) // if they are the first 4 generalisations
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
              var bd  = new BitmapData('/images/tick_post.png');//tick.png');
              objects.push(new Bitmap(bd));
              trial_pics[t].addChild(objects[objects.length-1]);
              objects[objects.length-1].x=stage.stageWidth*(2/10);
              objects[objects.length-1].y=stage.stageHeight*(1/10);
              objects[objects.length-1].scaleX=objects[objects.length-1].scaleY=0.5 * window.devicePixelRatio;

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

    if (test_count < 8) {
      var phase = 1;
    }else{
      var phase = 3;
    }

  DrawHistory(td, phase);

  } // outter for Loop

}
