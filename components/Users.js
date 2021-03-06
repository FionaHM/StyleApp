
import ReactDOM from "react-dom";
import React from "react";
import UserList from "./UserList.js";

class Users extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {

        return (<div className="user-list">
                    <strong>Connected Stylistas</strong>
                        <UserList users={this.props.users} switchRoom={this.props.switchRoom} currentroom={this.props.currentroom} currentuser={this.props.currentuser} chatWithUser={this.props.chatWithUser}/>
                        <div id="users"></div>
                </div>);
    }
};

export default Users;