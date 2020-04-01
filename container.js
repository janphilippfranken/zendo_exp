const dependable = require('dependable');
const path = require('path'); //no need to install this, it's a built in module

const container = dependable.container();
// this helps us install multiple modules at once and we could use them
// inside our project by just calling them onse, instead of having to
// use const require('modulename') each time
const myModules = [
  ['_', 'lodash'], // first element is the name we give to the module, second is the actual name
  ['mongoose', 'mongoose'],
  ['passport', 'passport']
];
// a for loop that goes through the array with the modules and registering them
myModules.forEach(function(val){
  container.register(val[0], function(){ // val[0] is the name we give to the module
    return require(val[1]); // val[1] is the actual name
  });
});

// the controllers and helpers folder will contain various functions
// so we use this container.load method to be able to make use of these funcdtion
// without having to call them each time
container.load(path.join(__dirname, '/controllers'));
container.load(path.join(__dirname, '/helpers'));

// this functions now registers the container having the modules in it
container.register('container', function(){ // 'container' point to the name we gave to the const container = dependable.container();
  return container
});

module.exports = container; //this allows us to make use of the container
// in other files
