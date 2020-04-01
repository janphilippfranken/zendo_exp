const mongoose = require('mongoose'); // requiring the module

const userSchema = mongoose.Schema({ // creating the schema (data structure which will save)

  username: {type: String, unique: false},
  fullname: {type: String, unique: false, default:''},
  email: {type: String, unique: false},
  password: {type: String, default: ''},
  //userImage: {type: String, default: 'ddefault.png'}
});

module.exports = mongoose.model('User', userSchema); // exporting the user data
