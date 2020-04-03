const mongoose = require('mongoose'); // requiring the module

const ipSchema = mongoose.Schema({ // creating the schema (data structure which will save)

  ip: {type: String, unique: false}

  //userImage: {type: String, default: 'ddefault.png'}
});

module.exports = mongoose.model('ips', ipSchema); // exporting the user data
