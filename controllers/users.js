'use strict'
const User = require('../models/user'); // fetching the userSchema in the user model
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
        //console.log(req.flash('error')) // this shouldn't be an empty list, check this when u can
        var roomDetails = roomFunctions.main(io);
        console.log(roomDetails);
        return res.render('signup', {messages: req.flash('error'), hasErrors: req.flash('error').length > 0}) // renders a file from the views folder along side with an object
      },
      postSignUp: function(req, res){
        const newUser = new User();

        newUser.username = req.body.username;
        newUser.fullname = req.body.username;
        newUser.email = req.body.username;
        newUser.password = new Date();

        newUser.save(function(err) {
          if (err)return handleError(err);
        });

        var roomDetails = roomFunctions.main(io);
        console.log(roomDetails);
        var room = roomDetails["roomToGetIn"];


        req.session.username = req.body.username;
        return  res.redirect('/group/'+room);
      }
    }

}
