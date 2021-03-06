
import ReactDOM from "react-dom";
import React from "react";
import {connect } from 'react-redux';
import store from './Redux/redux.js';
import chathelper from "../app/utils/chathelper.js";
 


class LaunchChat extends React.Component {
    constructor(props) {
        super(props)
        // Functions must be bound manually with ES6 classes or Another way is to bind them inline, where you use them 
        this.updateUsername = this.updateUsername.bind(this);

    }
    updateUsername(e){
        // dispatches updates to redux store to update the state 
        store.dispatch({ 
            type: 'ADD_USERNAME',
            testusername: e.target.value
        })
    }
    saveUsername(e){
        // dispatches updates to redux store to update the state 
        if (e.keyCode == 13) {
         chathelper.adduser(e.target.value, store);
         e.target.value="";
        
       }
       
    }
    componentDidMount() {
        this.textInput.focus();
    }
    render() {

        return (<div className="row text-center" id="usernameinput">
                    <div className="col-md-12">
                    <strong>USERNAME</strong>   Temp Instructions: Hit Enter to Save Username then select the room.
                    <input type="text" value={this.props.testusername}  onChange={this.updateUsername}  onKeyUp={this.saveUsername} className="form-control"   ref={input => this.textInput = input}/>
                    </div>
                </div>);
    }
};



const mapStateToProps = (store,ownProps) => {
    return {
        username: store.userState.username,
        connected: store.chatState.connected,

    }
};

// const mapStateToProps = (state) => {
//     return {
//         fileList: state.fileList
//     };
// };
// module.exports = Search;
export default connect(mapStateToProps)(LaunchChat);
