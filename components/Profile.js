import React, { Component } from "react";
import '../public/assets/css/profile.css';
import FaCamera from 'react-icons/lib/fa/camera';

import ReactModal from 'react-modal';
class Profile extends React.Component {
      constructor(props) {
      super(props);
      this.state = {
      data: [],
      showModal: false,
      showModal2: false
    };
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleOpenModal2 = this.handleOpenModal2.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleCloseModal2 = this.handleCloseModal2.bind(this);
}

 handleClick(e) {
    e.preventDefault();
 }


  handleOpenModal () {
    this.setState({ showModal: true });
  }
  
  handleOpenModal2 () {
    this.setState({ showModal2: true });
  }
  
  handleCloseModal () {
    this.setState({ showModal: false });
  }
  
  handleCloseModal2 () {
    this.setState({ showModal2: false });
  }
  

    
     render(){
          return(
              <div>
                <div className="panel panel-default"> 
                <div className="panel-body">Panel Content</div>
                <div>
                    {/*<h3>{this.props.username}</h3>*/}
                <img src= {"../assets/img/empty_avatar.jpg"} style={{width: 120, height: 120}}/>
                 <FaCamera className="icon"/>Add photo
                  
                <ul>      
                         
                    <li>style motto: {}</li>
                    <li>blurb:{}</li>

                </ul>
                <button onClick={this.handleClick} className="btn btn-primary outline round btn-lg">edit</button>

                </div>
{/*   div for adding personal style images*/}
                    <div className="panel panel-default">
                     <div className="panel-body">Panel Content</div>
                            <div>
                                {/*<button onClick={this.handleOpenModal}>Trigger Modal</button>*/}
                                
                                <img src= {"../assets/img/blkwhite.jpg"} onClick={this.handleOpenModal}
                                 style={{width: 150, height: 150}}/>

                                  <img src= {"../assets/img/pink.jpg"} onClick={this.handleOpenModal2}
                                 style={{width: 150, height: 150}}/>

                                <ReactModal 
                                isOpen={this.state.showModal}
                                contentLabel="Modal Example"
                                
                                style={{
                                    
                                    content: {
                                       
                                        height:750,
                                        width: 750,
                                        top: 100,
                                        left: 400

                                    }
                                  }}
                                >
                                <p>{this.props.username}</p>

                                  <img src= {"../assets/img/blkwhite.jpg"} 
                                 style={{width: 500, height: 500}}/>
                                  <ul>      
                                     <li>style motto: {}</li>
                                    <li>blurb:{}</li>
                                 </ul>

                                <button onClick={this.handleCloseModal}>Close Modal</button>
                                </ReactModal>

{/*second modal*/}
                            <ReactModal 
           isOpen={this.state.showModal2}
           contentLabel="Modal #2 Global Style Override Example"
           style={{
                                    
                                    content: {
                                      
                                        height:750,
                                        width: 750,
                                        top: 100,
                                        left: 400

                                    }
                                  }}
           onRequestClose={this.handleCloseModal2}
        >
          <p>Modal 2 text!</p>

          <img src= {"../assets/img/pink.jpg"} 
                                 style={{width: 500, height: 500}}/>
          <button onClick={this.handleCloseModal2}>Close Modal</button>
        </ReactModal>

                            </div>
                     </div>
            </div>
          </div>
          )
      }
}

export default Profile;