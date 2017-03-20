
import ReactDOM from "react-dom";
import React from "react";
import UserList from "./UserList.js";

class Users extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        // console.log("propse in users", this.props.users);
        return (<div className="user-list">
                    <strong>Connected Stylistas</strong>
                        <UserList users={this.props.users} privateChat={this.props.privateChat} currentroom={this.props.currentroom}/>
                        <div id="users"></div>
                </div>);
    }
};

export default Users;