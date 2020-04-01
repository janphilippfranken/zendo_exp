// creating a list of the enabled users inside the group using ES6 class method
class Users {
  constructor(){ // defining a constructor (like init in python?)
    this.users = [];


  }

  // a method to add the user data in the users array above
  AddUserData(id, name, room){ // this is how we define a function in a class
    var users = {id, name, room}; // this is called object destructuring: when the key and the value of an object is the same (google it)
    this.users.push(users); // the 'this.users' refers to the array in the constructor
    return users;
  }

  // removing the user that disconnects from the array of the users
  // this also uses the disconnect event from the io
  RemoveUser(id){
    var user = this.GetUser(id); // getting all the ids
    if(user){
      this.users = this.users.filter((user) => {
        // filter out every id which is equal to the id passed in the function
        return user.id !== id
      });
      return user
    }
  }

  // getting the id of the user (this is a helper function for the RemoveUser method)
  GetUser(id){
    var getUser = this.users.filter((userId) => {
      return userId.id === id; // it'll look through the this.users array and for each element that id === argument id
      // will be return into seperate arrays
    })[0]; // from each user will return an array, so with [0] we take the first elemnent which is id
    return getUser
  }

  // get a list of the users who are connected in the room
  GetUsersList(room){
    var users = this.users.filter((user) => { // filtering using an arrow function
      return user.room === room // returning all the rooms from the users array (pay attention to the arrow functdion argument), that maches the room in the argument of the function
    });
      // what we need to do now, is to extract only the name of the results
      // we got above (user.room === room), because these results contain
      // more information than just the name
    var namesArray = users.map((user) =>  user.name);

      return namesArray; // giving it back
    }
  }



module.exports = {Users}; // exporting the class using ES6 destructuring
