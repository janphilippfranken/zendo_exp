'use strict'
const Ips = require('../models/ips')
//const {Users} = require('../helpers/usersInGroup'); // EJ6 destructoring to get the Users class
//const users = new Users();
// in here we'll have some functions that will pertain
// to the users. Like for signing up, retrieving and adding
// data to the database etc

// we'll also set up the routes here like the post routes, the get routes
// and probably more

// this will make the function available to other files
module.exports = function(_, roomFunctions){

    return {
      SetRouting: function(router){
        router.get('/signup', this.getSignUp);  // the get method requests a representation of the specified resource. here: '/'
        //groupName = "help";
        router.post('/signup', this.postSignUp)
      },

      getSignUp:function(req, res){
        const ipInfo = req.ipInfo.ip;
        // checking to see if the ip exists. if yes, proceed, if no, no take part
        Ips.exists({ip:ipInfo}, function(err, result) {
          if(err){
            res.send(err);
          }else{ // if there is no error
            // either 0 or result
            if(0){ // put 0 in there if you don't want to exclude second-timers. else put result
              return res.render('no-take-part');
            } else {
              // //console.log(req.flash('error')) // this shouldn't be an empty list, check this when u can
              //var roomDetails = roomFunctions.main(io);
              //console.log(roomDetails);
              return res.render('signup', {messages: req.flash('error'), hasErrors: req.flash('error').length > 0}) // renders a file from the views folder along side with an object

            }
          }
        });
      },
      postSignUp: function(req, res){
        //
        //
        // var roomDetails = roomFunctions.main(io);
        // console.log(roomDetails);
        // var room = roomDetails["roomToGetIn"];
        // var isNew = roomDetails['isNew'];

        req.session.username = req.body.username;
        // if(!isNew){ // if the room it' not new, wait 5 seconds to make sure the content is available
        //   setTimeout(() => {
        return res.redirect('/instructions');//+room);
        //   }, 5000)
        // } else { // if the room is new, go in straight away
        //   return  res.redirect('/group/'+room);
        // }
      }
    }

}
