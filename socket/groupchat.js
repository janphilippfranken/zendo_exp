// SERVER SIDE
const trialSchema = require('../models/trial'); // fetching the userSchema in the user model
const debriefSchema = require('../models/debrief'); // fetching the userSchema in the user model
const roomFunctions = require('../helpers/roomFunctions');

module.exports = function(io, Users){
  // bringing in the users class with all the methods to remove, add etc uers from the user list
  users = new Users(); // the new keyword creates a new constructor (instance in python lang?)
  user_names = {};
  trial_num = {};
  who_finished = {};



  // inside the following connection we put every event that we listen or send
  io.on('connection', socket => {// that enables the server to lister to the connections event

    socket.on('go-to-debrief', ()=>{
      socket.isAvailable = false;
    });
    //////////////////////////////////////////
    // Getting trial data from client
    /////////////////////////////////////////
    socket.on('trialData', data => {
      let room = data.room;
      who_finished[room] = []; // initialising here the who_finished array to use it later at the canvas message
      io.to(room).emit('trialDataBackToClient', data);
    });
    /////////////////////////////////////////

    socket.on('error_waiting_area', (room) => {
      io.to(room).emit('goto_deb');
    });


// receive dataURL for the screenshot on the server side and emit it privately
    socket.on('canvasData', (data)=>{

          trial_num[data.room] = data.trial_num;
          const sender = data.sender;
          const message = data.trialdata;
          const room = data.room;
          // adding who finished in the room
          who_finished[room].push(sender);
          if (who_finished[room].length === 2){
            who_finished[room] = [];
          }
          var who_finished_inRoom = who_finished[room];

          socket.broadcast.to(room).emit('canvasDataBackToClient',{
                  // who finished
                  who_finished: who_finished_inRoom,
                  //The sender's username
                  sender : data.sender,
                  //Message sent to receiver
                  trialdata : message,
                  //what the user selected
                  selected : data.selected,
                  // position of the generalisations
                  posit_ix : data.posit_ix
              });



      });



    // listenning to the joint event coming from the client
    socket.on('join', (params) => { // event is the data sent from the event called join
      // decide which room to join here
      socket.username = params.username;
      socket.isAvailable = true;

      const connClients = Object.keys(io.sockets.connected);
      const idxOfI = connClients.indexOf(params.token_id);
      connClients.splice(idxOfI, 1); // connected clients without me
      for(let clID of connClients){
         if(io.sockets.connected[clID].isAvailable){ // if available client is found
                // set my availability
                socket.isAvailable = false;
                // set neighbours availability
                io.sockets.connected[clID].isAvailable = false;
                // find a room
                let roomDetails = roomFunctions.main(io);
                params.room = roomDetails['roomToGetIn'];
                // put us in the room
                socket.join(params.room);// this method allows users to connect to a particular channel, takes argument room name
                io.sockets.connected[clID].join(params.room);// this method allows users to connect to a particular channel, takes argument room name
                users.GetUsersList(params.room)
                users.AddUserData(socket.id, socket.username, params.room);
                users.AddUserData(io.sockets.connected[clID].id, io.sockets.connected[clID].username, params.room);

                // setting up the time the room started to exist
                if(typeof(io.sockets.adapter.rooms[params.room]['time']) === 'undefined'){
                  // we'll enter here only when the first user log in
                  io.sockets.adapter.rooms[params.room]['time'] = new Date();
                }
                setTimeout(() => {
                  console.log('Users '+socket.username+' and '+io.sockets.connected[clID].username+'  have joined room '+ params.room); // this will be displayed to the terminal
                  socket.broadcast.to(params.room).emit('usersList', {params:params, users:users.GetUsersList(params.room)}); // sending the userlist to the client from getting it using the function defined in the Users classz
                }, 5000);
            }
        }

        console.log();


      //callback(); // this callback is neccessary because when we sent the message from
      // the client side, we also added a function ('join', params, function) so
      // the callback reflects that function
    });

    // store data from debrief
    socket.on('debriefData', data => {
      const new_debrief = new debriefSchema();
      new_debrief.date = data.date;
      new_debrief.time = data.time;
      new_debrief.age = data.age;
      new_debrief.gender = data.gender;
      new_debrief.initial_strategy = data.initial_strategy;
      new_debrief.final_strategy = data.final_strategy;
      new_debrief.task_duration = data.task_duration;
      new_debrief.engaging = data.engaging;
      new_debrief.difficult = data.difficult;
      new_debrief.pol_orient = data.pol_orient;
      new_debrief.token_id = data.token_id;
      new_debrief.username = data.username;
      new_debrief.room = data.room;

      new_debrief.save(function(err) {
        if (err)return handleError(err);
      });

      users.RemoveUser(socket.id);
      socket.disconnect();
    });

    socket.on('storeData', data =>{
      // store to mongoDB
      const new_trial = new trialSchema();
      new_trial.username = data.sender;
      new_trial.room = data.room;
      new_trial.trial = trial_num[data.room];
      new_trial.data = data.trialdata;
      new_trial.prior = data.selected;
      new_trial.posterior = data.selectedPost;
      new_trial.disp_order = data.posit_ix;
      new_trial.rule = data.rule_name;
      new_trial.ph4_answer = data.ph4_answer;
      new_trial.ph5_answer = data.ph5_answer;
      new_trial.trustworthy_q = data.trustworthy_q;
      new_trial.expertise_q = data.expertise_q;
      new_trial.token_id = data.token_id;
      new_trial.save(function(err) {
        if (err)return handleError(err);
      });
      console.log("Got the data from user: ", data.sender, "and trial: ", trial_num[data.room]);
    });
  // creating a listenning event that every time a user disconnects, then the
  // function from the User class RemoveUser is going to be triggered and Remove user data
  socket.on('drop_me_out', () => {
    socket.disconnect();
    var user = users.RemoveUser(socket.id);
    if(user){

      console.log(io.sockets.adapter.rooms);
      console.log("User "+socket.username+" disconnected ");
      console.log(user);
      io.to(user.room).emit('usersList', {params:'', users:users.GetUsersList(user.room), user_left:user}); // getting the user list using the function defined in the Users class
    }
  });

  socket.on('disconnect', () => {
    var user = users.RemoveUser(socket.id);
    if(user){
      console.log(user);
      console.log(io.sockets.adapter.rooms);
      console.log("User "+socket.username+" disconnected ");
      io.to(user.room).emit('usersList', {params:'', users:users.GetUsersList(user.room), user_left:user}); // getting the user list using the function defined in the Users class
    }
  });
  });
}
