
module.exports = function(_){

    return {
      SetRouting: function(router){
        router.get('/group/:name', this.groupPage); // the :name allows us to take is after the /    you can find it in controllers/users.js: successRedirect
      },
      groupPage: function(req, res){
        const room = req.params.name;
        res.render('group', {groupName:room, username: req.session.username});
      }
         }
}
