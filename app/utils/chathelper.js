// import io from 'socket.io-client'
// let socket = io(`http://localhost:8000`)
import io from 'socket.io-client';


// const setDataSource = require('./datasource.js');

var socketEndpoint = "http://localhost:8080";
var socket = io(socketEndpoint, {
    'forceNew': false,
    'reconnect': false,
    transports: ['websocket']
});;

// Connect
var chathelper = {
        // var self = this;

        handle_connection: (store, username) => {
            var reduxstore = store;
            socket.on('connect', () => {
                var connected = true;
                if (connected) {
                    reduxstore.dispatch({type: "CONNECTED", connected: true})
                }
                socket.emit('adduser', username);
                console.log("connected", username);
            });
        
            socket.on('disconnect', () => {
                reduxstore.dispatch({type: "CONNECTED", connected: false})
                console.log("disconnected")
            });
        },

 
        adduser: (username, store) => {
        // this area needs cleaning up once FB auth implemented
            // var defaultRoom = "room1";
           
            // store.dispatch({ 
            //   type: 'UPDATE_ROOM',
            //   currentroom: defaultRoom,  // default room
            // })

        },

        // var chathelper = {

        //Opens the Group Component and sets  the default Room
        startchat: (username, store) => {
            // for now its the same as add user - this area needs cleaning up once FB auth implemented
            var defaultRoom = "room1";
            socket.emit('connectuser', username, defaultRoom);
            // set default room to the current room
            store.dispatch({ 
              type: 'UPDATE_ROOM',
              currentroom: defaultRoom,  // default room
            })
        },
         //Opens the Private Chat Component and has no default Room - the user must select a private chat
         // ***MAKE THESE DRY startchat and startprvtchat
        startprvtchat: (username, store) => {
            // for now its the same as add user - this area needs cleaning up once FB auth implemented
            var defaultRoom = "Private";
            socket.emit('connectuser', username, defaultRoom);
            // set default room
            store.dispatch({ 
              type: 'UPDATE_ROOM',
              currentroom: defaultRoom,  // no default room
            })
        },
        // this handles changes from one group room to another
        // chattype = Private or Group
        switchRoom: (newroom, chattype, store) => {
            socket.emit('switchRoom', newroom, chattype);
            // display current room -- need to get room for private chat
            // if (chattype = "Group"){
                // console.log(newroom, "newroom", "chattype", chattype);
                store.dispatch({ 
                type: 'UPDATE_ROOM',
                currentroom: newroom,
                })
            // } else  if (chattype = "Private"){
                // store.dispatch({ 
                //     type: 'UPDATE_ROOM',
                //     currentroom: newroom,
                // })
            // }
        
        },

        // sends group chat to server
        sendchat: (message, store) => {
            // console.log("message received", message)
            socket.emit('sendchat', message);
        },
        // // sends private chat to server
        // sendprvtchat: function(chatuser, message, store){
        //     socket.emit('sendprvtchat', chatuser, message);
        // },

// Listeners Section -- these wait for incoming data from the server and the data received triggers actions on the  dom - state changes
        // takes in the latest chat data 
        updatechat_listener: (store) => {
            socket.on('updatechat', function (data){
                // console.log("is the data in here", data)
                store.dispatch({ 
                    type: 'CHAT',
                    chat: data
                })
            })
        },
        // takes in the latest list of connected users
        connected_users: (store) => {
           socket.on('connectedusers', function (response){
            //   console.log("in connectedusers", response)
              // update the redux store
              store.dispatch({ 
                  type: 'USER_LIST',
                  users: response
              })
            })

        },

        // not currently working!!!
        // service messages from server - including requests for private chat
        server_messages: (store) => {

           socket.on('servermessage', function (response){
   //           console.log("in connectedusers", response)
              // update the redux store
              store.dispatch({ 
                  type: 'SERVER',
                  server: response
              })
            })
        },

        private_message: (store) => {

           socket.on('privatemessage', function (response){
            //   console.log("in private messages", response);
            //   var str = "{ hello: 'world', places: ['Africa', 'America', 'Asia', 'Australia'] }";
            //   var str = response;
            //   var responseToJSON = JSON.parse(JSON.stringify( str ));

            //   var chatWithUser = responseToJSON.username;
            //   console.log("chatWithUser", chatWithUser);
              // update the redux store
              store.dispatch({ 
                  type: 'PRIVATE_MESSAGE',
                  privatemessage: response
              })
            })
        }
    }

export default chathelper;
