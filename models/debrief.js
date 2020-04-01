const mongoose = require('mongoose'); // requiring the module

const debriefSchema = mongoose.Schema({ // creating the schema (data structure which will save)

  date: {type: String, unique: false},
  time: {type: String, unique: false},
  age: {type: Number, unique: false},
  gender: {type: String, unique: false},
  initial_strategy: {type: String, unique: false},
  final_strategy: {type: String, unique: false},
  task_duration: {type: Array, unique: false},
  engaging: {type: String, unique: false},
  difficult: {type: String, unique: false},
  pol_orient: {type: String, unique: false},
  token_id: {type: String, unique: false},
  username: {type: String, unique: false},
  room: {type: String, unique: false}




  //userImage: {type: String, default: 'ddefault.png'}
});

module.exports = mongoose.model('debrief', debriefSchema); // exporting the user data
