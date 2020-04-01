//  these models are going to be required jut once, that's y we add them here
// using require rather that putting them in the container using dependable
const express = require('express');
const bodyParser = require('body-parser'); // allows us to get data from our form
const ejs = require('ejs'); // we using ejs as a templating engine (instead of html i think)
const http = require('http'); // this is already installed
const container = require('./container'); // this contains all the modules and
// functions (e.g., from helper and controllers folders). so we are fetching
// the file container which has in in the export.module method
//const validator = require('express-validator');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');
const flash = require('connect-flash');
//const passport = require('passport');
const socketIO = require('socket.io')
const {Users} = require('./helpers/usersInGroup'); // EJ6 destructoring to get the Users class
const compression = require('compression'); // neccessary for web deployment (compresses the files, makes app faster)
const helmet = require('helmet'); // security porpuses

const MongoClient = require('mongodb').MongoClient;

// this resolves every module registered in the conteiner
container.resolve(function(users, _, group){

  // adding mongoose connection to the database
  const uri = process.env.MONGODB_URI;
  // "mongodb://janphilipp1995:Kletterchen1995@cluster0-shard-00-00-9uthh.mongodb.net:27017,cluster0-shard-00-01-9uthh.mongodb.net:27017,cluster0-shard-00-02-9uthh.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority"
  mongoose.connect(uri, {useNewUrlParser:true, useUnifiedTopology: true })
  //const client = new MongoClient(uri, { useNewUrlParser: true });
  //client.connect(uri);


  // in here we pass the configeration of our application
  const app = SetupExpress(); // all of our setup will be in that setup which is == app

  function SetupExpress(){ // this function is the definition of the above one
    const app = express(); // this app is different than the other above. different variable space
    const server = http.createServer(app); // setting up our server. we might change this later
    // when we make use of socket.io
    io = socketIO(server, {
      //pingTimeout: 95000,
    }); // adding multiple sockets to the server
    server.listen(process.env.PORT || 3000, function(users){ // firing up our server
      console.log('Listening on port 3000');
    });

    ConfigureExpress(app); // this is a function defined below

    require('./socket/groupchat')(io, Users); // enables us to open the io connection

    // setting up ROUTERS using express-promise-router
    const router = require('express-promise-router')(); // we require this here
    // because we are not gonna make use of it anywhere else
    users.SetRouting(router); // this is a function coming from the users file in
    // the controllers folder (we have access to this functions becasue we are
    // using dependable, and we've also added it in the arguments list of the current function)
    group.SetRouting(router);
    // to make use of the router we use
    app.use(router);

    app.use(function(req, res){
      res.render('404'); // when user tries to reach a page tha deosn't exist
    });
  }


  // inside here we pass the configurations for e.g., body parser, ejs, socket.io, passport etc
  function ConfigureExpress(app){

    app.use(compression());
    app.use(helmet());

    // we want express to make use of every file inside the public folder
    app.use(express.static('public')); // with this, every file in public folder
    // will be available to use
    app.use(cookieParser()); // allows to use cookies / save cookies in the browser
    app.set('view engine', 'ejs'); //the view engine is ejs. views are the files
    // we see like the html files, but we have ejs files

    // to make use of bodyParses we use
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    //app.use(validator()); //validates user credentials etc

    app.use(session({ // allows to save sessions
      secret: process.env.SECRET_KEY,
      resave: true,
      saveUninitialized: true,
      saveInitialized: true,
      store: new MongoStore({mongooseConnection: mongoose.connection}) // save data to database
    }))

    app.use(flash()); // this allows us to use flash messages
    //app.use(passport.initialize());
    //app.use(passport.session());

    // we want to set lodash as a global variable so to be able to used inside
    // our ejs files as well. express module has a locals method which helps us
    // do so
    app.locals._ = _;


  }
});
