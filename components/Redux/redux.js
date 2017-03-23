// the reducer function
import {createStore, combineReducers } from 'redux';

//  The below are required and map to the components dispatcher
const chatReducer = (state={}, action) => {
    switch(action.type){
        case 'USER_LIST':
            return Object.assign({},state, {users: action.users});
        case 'ROOM_LIST':
            return Object.assign({},state, {rooms: action.rooms});
        case 'UPDATE_ROOM':
            return Object.assign({},state, {currentroom: action.currentroom});
        case 'ADD_USERNAME':
            return Object.assign({},state, {username: action.username});
        case 'ADD_MESSAGE':
            return Object.assign({},state, {message: action.message});
        case 'CHAT':
            return Object.assign({},state, {chat: action.chat});
        case 'SERVER':
            return Object.assign({},state, {server: action.server});
        case 'PRIVATE_MESSAGE':
            return Object.assign({},state, {privatemessage: action.privatemessage});
        case 'CONNECTED':
            return Object.assign({},state, {connected: action.connected});
        }
    return state;
}
//  The below are required and map to the components dispatcher
const userReducer = (state={}, action) => {
  
    switch(action.type){
        case 'ADD_USERNAME':
            console.log("add usernamer", action.username);
            return Object.assign({},state, {username: action.username});
        case 'IS_LOGGED_IN':
          console.log("logged in", action.loggedin);
            return Object.assign({},state, {loggedin: action.loggedin});
        }
    return state;
}

const reducers = combineReducers({
    chatState : chatReducer,
    userState : userReducer,
})

var store = createStore(reducers);

export default store;


