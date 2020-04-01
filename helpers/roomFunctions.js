module.exports = function(_){
return{
              main: function(io){ // THIS FUNCTION GIVES STRAIGHT THE NAME OF THE ROOM BE IT NEW OR OLD
                var allRooms = this.getRooms(io); // getting all the rooms which have 5 letter (ignoring the personal ids)
                var crowding = this.roomsCrowding(allRooms, io);
                var availableRooms = this.availableRooms(crowding);
                var roomToGetIn = this.getInRoom(availableRooms);
                var usersInRooms = this.usersInRooms(io);
                return {
                  "availableRooms": availableRooms,
                  "allRooms" : allRooms,
                  "roomToGetIn": roomToGetIn,
                  "crowding": crowding,
                  "usersInRooms":usersInRooms
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
              var crowding = {};// an objecg with rooms and lengths
              _.forEach(rooms, function(room, i) {
              var clients = io.sockets.adapter.rooms[room];
                crowding[room] = clients.length;
              });
              return crowding;
            },

            availableRooms:function (crowding){
              var availableRooms = [];// an arrary with true and false
              _.forEach(crowding, function(length, room) {
                if (crowding[room] === 1){
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
