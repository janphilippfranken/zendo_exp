module.exports = function(_){

    return {
      SetRouting: function(router){
        router.get('/instructions', this.instructionsPage); // the :name allows us to take is after the /    you can find it in controllers/users.js: successRedirect
        router.post('/instructions', this.postInstructionsPage); // the :name allows us to take is after the /    you can find it in controllers/users.js: successRedirect

      },
      instructionsPage: function(req, res){
        if(typeof(req.session.username) == 'undefined'){
          return  res.redirect('/signup');//+room);
        } else {
          return res.render('instructions', {groupName:'room', username: req.session.username});
        }

      },
      postInstructionsPage: function(req, res) {
        return res.redirect('/group');//+room);

      }
         }
}
