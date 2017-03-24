
import ReactDOM from "react-dom";
import React from "react";
// // import Chat from "./Chat.js";
// import CurrentUserAndRoom from "./CurrentUserAndRoom.js";
// import ChatInput from "./ChatInput.js";
// import ChatHistory from "./ChatHistory.js";
import {connect } from 'react-redux';
import store from './Redux/redux.js';
import chathelper from "../app/utils/chathelper.js";
import io from 'socket.io-client';
import FileDragAndDrop from 'react-file-drag-and-drop';
// let socket = io(`http://localhost:8000`)
var socket = io.connect();


class GroupChatSection extends React.Component {
    constructor(props) {
        super(props);

        chathelper.updatechat_listener(store);
        chathelper.connected_users(store);
        chathelper.server_messages(store);
        chathelper.private_message(store);




    }
    addMessage(e, message) {
        // tell server to execute 'sendchat' and send along one paramete
        if (e.keyCode == 13) {
            chathelper.sendchat(message);
            store.dispatch({ 
                type: 'ADD_MESSAGE',
                message: ""
            })
        }
    }
    uploadFile(e) {
        // tell server to execute 'sendchat' and send along one paramete
        // if (e.keyCode == 13) {
        //     chathelper.sendchat(message);
        //     store.dispatch({ 
        //         type: 'ADD_MESSAGE',
        //         message: ""
        //     })
        // }
        console.log("calling this", e.target.value);
       
  

        // var uploadelem = this.fileInput.files;
        // console.log("uploadelem", uploadelem);
        chathelper.file_upload(e);
        
    }
    updateMessage(e){
        store.dispatch({ 
            type: 'ADD_MESSAGE',
            message: e.target.value
        })

    }
    componentDidMount() {
        this.textInput.focus();
        // var uploadelem = this.fileInput.files;
        // console.log("uploadelem", uploadelem);
        // chathelper.file_upload(uploadelem);
        
    }
    componentDidUpdate(){
        // scroll to bottom of chat history
        var node = this.refs.chathistory;
        console.log("node",node);
        console.log(node.scrollBottom);
        if (node.length > 0){
          node.scrollTop = -node.scrollHeight;
        }
        //  this.shouldScrollBottom = node.scrollTop + node.offsetHeight === node.scrollHeight;
        // node.scrollTo(0,node.body.scrollHeight);
    }
//     preventDefault(event) {
//     event.preventDefault();
//   }

//   drop(event) {

//     event.preventDefault();

//     var data;

//     try {
//       data = JSON.parse(event.dataTransfer.getData('text'));
//     } catch (e) {
//       // If the text data isn't parsable we'll just ignore it.
//       return;
//     }

//     // Do something with the data
//     window.alert(JSON.stringify(data, null, 2));

//   }
handleDrop(dataTransfer) {
    var files = dataTransfer.files;
    ///To do tmr
    // chathelper.file_upload("file", e, "file");
 
    // Do something with dropped files... 
  }
 

    render() {
        var style = {
  width: '100px',
  height: '100px'
};



       var chatmessage = this.props.chat;
       if (this.props.chat){
           if (this.props.chat.length !== 0){
                var resultComponents = this.props.chat.map(function(result) {
                    console.log(result.type)
                if (result.type === "file"){
                    var chatmessage = <img src={result.message} alt="File Not Found" />
                    console.log("chatmessage", chatmessage);
                } else {
                    var chatmessage =  <div className="col-md-8">{result.message}</div>
                }
              
                return <div className="row results" key={result._id}>
                    <div className="col-md-2"><strong>{result.username}</strong></div> 
                            { chatmessage }
                    <div className="col-md-2"></div>
                </div>
                });

           }

       }
       // if there is a message display it
       console.log("this.props.privatemessage", this.props.privatemessage);
       if (this.props.privatemessage){
           
            var alertMessage =   this.props.privatemessage;
       }
 
       // only make visible if there is a connected user - for now its username but later make it connected...if (this.props.connected)
       if ( this.props.username ){
           var headerText = <div><div className="row text-center"><div className="col-xs-12 col-md-12"><strong>Welcome {this.props.username}!</strong></div></div><div className="row text-center"><div className="col-xs-12 col-md-12">You are in the <strong>{this.props.currentroom} </strong>Room!</div></div></div>

            var chatDislay = <div>
                    <div className="row">
                        <div>
                            {headerText}
                        </div>
                    </div>
                    <div className="row text-center">
                           { alertMessage }
                    </div>
                    <hr />
             

                    <div className="chatbox row" ref="chathistory">
                        <div className="col-xs-12 col-md-12">    
                            <div className="row" >{resultComponents}</div>                     
                        <div>
                    </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-2"></div>
                            <div className="col-md-8">
                                <input type="file" id="siofu_input" label='Upload' accept='.png' name="file" ref="file" defaultValue={this.props.file} onChange={this.uploadFile} /><br /> 
                                      <div>
        <h1>Please drop your files</h1>
        <div style={style}>
          <FileDragAndDrop onDrop={this.handleDrop}>
            Drop files here...
          </FileDragAndDrop>
        </div>
      </div>
                                <input type="text" value={this.props.message}  onChange={this.updateMessage}  className="form-control"   onKeyUp={(e) => this.addMessage(e, this.props.message)} onDrop={this.uploadFile} ref={input => this.textInput = input} />
                            </div>
                        <div className="col-md-2"></div>
                    </div>
                </div>
       } else {

            var chatDislay = <div className="text-center">Apologies but there is currently no chat connection available. Please try again later.</div>

       }
    
        return (<div>
                  {chatDislay}
                </div>);
    }
};

const mapStateToProps = (store,ownProps) => {

    return {
        message: store.chatState.message,
        file: store.chatState.file,
        chat: store.chatState.chat,
        server: store.chatState.server,
        privatemessage: store.chatState.privatemessage,

    }

};

export default connect(mapStateToProps)(GroupChatSection);
// export default ChatSection;