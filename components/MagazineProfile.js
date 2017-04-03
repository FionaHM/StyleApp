
import ReactDOM from "react-dom";
import React from "react";
import {connect } from 'react-redux';
import store from './Redux/redux.js';
import helper from "../app/utils/helper.js";


class MagazineProfile extends React.Component {
    constructor(props) {
        super(props);
        
    }
    handleImageClick(e, image, description){
        console.log("in here", image, description);
        store.dispatch({ 
            type: 'SINGLE_IMAGE_MODAL',
            singleImageModal: true
        })
        console.log("event",e);
        this.setState({largeImage: image, largeDescription: description  } )

    }
    componentDidMount(){
        // reset local props
        this.setState({largeImage: "", largeDescription: ""  } )
        // set to false initally
        store.dispatch({ 
            type: 'SINGLE_IMAGE_MODAL',
            singleImageModal: false
        })
    }
    closeImage(){
        // reset to all images
        store.dispatch({ 
            type: 'SINGLE_IMAGE_MODAL',
            singleImageModal: false
        })

    }
    render() {
        var component = this;
        console.log('profile mags: ',this.props.profilemagazines);   
        // toggle between large image and summary
        if (this.props.singleImageModal){
           var resultComponents =  
            <div className="results">
                     <div className="thumbnail">
                    <img src={this.state.largeImage}   onClick={(e) => component.closeImage()}/>                 
                    <p><strong>{this.state.largeDescription}</strong></p>
                </div>
            </div>

        } else if (!this.props.singleImageModal){
             if (this.props.profilemagazines){
          
                var resultComponents = this.props.profilemagazines.map(function(result) {
                // dont hyperlink current room
           
                return <div className="results" key={result._id}>
                        <div className="col-sm-6 col-md-4">
                            <div className="thumbnail">
                            <img src={result.src}   onClick={(e) => component.handleImageClick(e, result.src, result.description)}/>
                            <div className="caption">
                                <p><strong>{result.description}</strong></p>
                            </div>
                          </div>
                        </div>
                    </div>
                })
            }

        }
       
       
// <a href="/chat/{{resultComponents}}" onclick="switchRoom(\'{resultComponents}\')"> {resultComponents} </a><
        return (<div>
                    <div className="col-xs-12 magazines"><h1>Magazines</h1>
                        <div className="row results">{resultComponents}</div>
                    </div>  
                </div>) 
            }
};



const mapStateToProps = (store,ownProps) => {

    return {
        
        userid: store.chatState.userid,
        profilemagazines:store.mainState.profilemagazines,
        singleImageModal: store.mainState.singleImageModal,

   
    }

}

export default connect(mapStateToProps)(MagazineProfile);