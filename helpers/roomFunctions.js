module.exports = function(_){
return{
              main: function(io){ // THIS FUNCTION GIVES STRAIGHT THE NAME OF THE ROOM BE IT NEW OR OLD
                var allRooms = this.getRooms(io); // getting all the rooms which have 5 letter (ignoring the personal ids)
                var crowding = this.roomsCrowding(allRooms, io);
                var timeStamp = this.roomsTime(allRooms, io);
                var availableRooms = this.availableRooms(crowding, timeStamp);
                var roomToGetIn = this.getInRoom(availableRooms);
                var usersInRooms = this.usersInRooms(io);
                return {
                  "availableRooms": availableRooms,
                  "allRooms" : allRooms,
                  "roomToGetIn": roomToGetIn,
                  "crowding": crowding,
                  "usersInRooms":usersInRooms,
                  "timeStamp":timeStamp
                      };
},

            getRooms:function(io){
              var roomsOjb = io.sockets.adapter.rooms;
              var allRooms = Object.keys(roomsOjb);
              var rooms = [];
              // allRooms has also id's as rooms and we don't want them
              allRooms.forEach(function(el, i){
                if(el.length === 5){rooms.push(el)}
              });
              return rooms;
            },

            roomsCrowding:function(rooms, io){
              var crowding = {};// an objecg with rooms and lengths and time
              _.forEach(rooms, function(room, i) {
              var clients = io.sockets.adapter.rooms[room];
                crowding[room] = clients.length;
              });
              return crowding;
            },
            roomsTime:function(rooms, io){
              var timeStamp = {};// an objecg with rooms and lengths and time
              _.forEach(rooms, function(room, i) {
              var clients = io.sockets.adapter.rooms[room];
                timeStamp[room] = clients.time;
              });
              return timeStamp;
            },
            availableRooms:function (crowding, timeStamp){
              var availableRooms = [];// an arrary with true and false
              _.forEach(crowding, function(length, room) {
                var remainingT =  new Date() - timeStamp[room];
                console.log(remainingT);
                if ((crowding[room] === 1) && (remainingT < 600000) && (remainingT > 5000)){ // if it's active for less than 10 mins and older than 3 seconds,
                  availableRooms.push(room);
                }
              });
              return availableRooms;

            },

            getInRoom:function(availableRooms){
              var newRoomName = this.generateroom(5);
              var firstRoom = availableRooms[0];
              if(typeof(firstRoom) == "undefined"){// if there is no available room
                return newRoomName;
              }else{
                return firstRoom;
                }
              },

            generateroom: function(length) {
             var result           = '';
             var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
             var charactersLength = characters.length;
             for ( var i = 0; i < length; i++ ) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
             }
             return result;

           },

           usersInRooms:function(io){
             var roomsOjb = io.sockets.adapter.rooms;
             var allRooms = Object.keys(roomsOjb);
             var usersInRooms = {};
             // allRooms has also id's as rooms and we don't want them
             allRooms.forEach(function(el, i){
               if(el.length === 5){
                 usersInRooms[el] = Object.keys(roomsOjb[el].sockets);
               }
             });
             return usersInRooms;
           }
         }
       }
