import React, { Component } from "react";
import update from 'react/lib/update';
import ReactDOM from "react-dom";
import { DragDropContext } from 'react-dnd';
import HTML5Backend, { NativeTypes } from 'react-dnd-html5-backend';
import Clothesbin from './Clothesbin';
import Image from './Image';
import Magazine from './Magazine';
import ItemTypes from './ItemTypes';
import {connect } from 'react-redux';
import store from './Redux/redux.js';
import chathelper from "../app/utils/chathelper.js";
import helper from "../app/utils/helper.js";
var html2canvas = require('html2canvas');


@DragDropContext(HTML5Backend)
class ClosetPicker extends React.Component {
   constructor(props) {
      super(props);
      // chathelper.updatecloset_listener(store);
      this.resetClothesbins = this.resetClothesbins.bind(this);
      this.uploadFile = this.uploadFile.bind(this);
      chathelper.new_magazine_item_listener(store);
      this.state = {
        clothesbins: [
            { accepts: [ItemTypes.TOP], lastDroppedItem: null },
            { accepts: [ItemTypes.BAG], lastDroppedItem: null},
            { accepts: [ItemTypes.ACCESSORY], lastDroppedItem: null },
            { accepts: [ItemTypes.FLAIR], lastDroppedItem: null},
            { accepts: [ItemTypes.SHOES], lastDroppedItem: null},
            { accepts: [ItemTypes.BOTTOM,ItemTypes.DRESS], lastDroppedItem: null }
          
        ],
      // images: [
      //  { id: '201393774', type: ItemTypes.BOTTOM,src:'../assets/img/bottom_201393774.png' },
      //   { id: '201234566', type: ItemTypes.BOTTOM,src:'../assets/img/bottom_201234566.png' },
      //   { id: '199987425', type: ItemTypes.TOP, src:'../assets/img/top_199987425.png' },
      //   { id: '201591292', type: ItemTypes.DRESS, src: '../assets/img/dress_201591292.png' },
      //   { id: '567ec3a81fe', type: ItemTypes.BAG, src: '../assets/img/bag_567ec3a81fe.png' },
      //   { id: '203456789', type: ItemTypes.ACCESSORY, src: '../assets/img/watch_203456789.png' },
      //   { id: '683904dea', type: ItemTypes.FLAIR, src: '../assets/img/flair_683904dea.png' },
      //   { id: '202012027', type: ItemTypes.SHOES, src: '../assets/img/shoes_202012027.png' },
      // ],
      droppedImageIds: [],
    };
  }

  resetClothesbins(){
  // just sets them back to inital state
this.setState({
        clothesbins: [
          { accepts: [ItemTypes.TOP], lastDroppedItem: null },
          { accepts: [ItemTypes.BAG], lastDroppedItem: null},
          { accepts: [ItemTypes.ACCESSORY], lastDroppedItem: null },
          { accepts: [ItemTypes.FLAIR], lastDroppedItem: null},
          { accepts: [ItemTypes.SHOES], lastDroppedItem: null},
          { accepts: [ItemTypes.BOTTOM,ItemTypes.DRESS], lastDroppedItem: null }]});

           this.setState({droppedImageIds: []});

}

isDropped(imageId) {
    return this.state.droppedImageIds.indexOf(imageId) > -1;
  }
  componentDidMount(){
    // get images for each section
 
    helper.getImages(store, "top");
    helper.getImages(store, "bottom");
    helper.getImages(store, "accessory");
    helper.getImages(store, "shoes");
    helper.getImages(store, "bag");
    helper.getImages(store, "dress");
    helper.getImages(store, "flair");
    ReactDOM.findDOMNode(this.inputEntry).value = "";
    // set to default initially
    store.dispatch({ 
      type: 'ITEM_CHANGE',
      item: "SELECT"
    })

    store.dispatch({ 
      type: 'SUCCESSFUL_SAVE',
      imagesavedsuccess: false
    })
  }
  componentWillUpdate() {
    console.log("componentWillUpdate", this.props)
  }
  componentWillMount(){
     console.log("compoenet will mount", this.props)
  }
uploadFile(e) {
  var itemType = ReactDOM.findDOMNode(this.closetItemType).value;
  // console.log(itemType, "itemType");
  // console.log("calling this$$$", e.target.value);
  // Make sure a valid type entered before saving file
  // console.log("this.props.itemtype", this.props.itemtype);
   // Make sure a valid type entered before saving file
  // console.log("itemtype", itemType);
  //reset old error message
  store.dispatch({ 
  type: 'CLOSET_ERROR',
  closeterror: false
})
  if (this.props.item !== "SELECT"){
     helper.uploadToCloset(e, itemType, store);   
  } 
  else {
    // send error message
    store.dispatch({ 
      type: 'CLOSET_ERROR',
      closeterror: true
    })
     
   
    // send error message
    // store.dispatch({ 
    //   type: 'INPUT_FILE',
    //   file: e.target.files
    // })

  }

}
 handleClick(e) {
  var userid = this.props.userid;
e.preventDefault();
console.log("clothes items", document.getElementsByClassName('clothes-items')[1].innerHTML);
 html2canvas(document.getElementsByClassName('clothes-items'), {
      background: '#fff',
      logging: true,
      // useCORS: true,
      // taintTest: true,
      allowTaint: true,
      onrendered: function (canvas) {  
                // console.log(canvas.toJSON());
                    var img = canvas.toDataURL();
                   

//  console.log(img,"img");
                    // fs = require('fs');
                    // sys = require('sys');
                    // string generated by canvas.toDataURL()
                    // // var img = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0"
                    //     + "NAAAAKElEQVQ4jWNgYGD4Twzu6FhFFGYYNXDUwGFpIAk2E4dHDRw1cDgaCAASFOffhEIO"
                    //     + "3gAAAABJRU5ErkJggg==";
                    // strip off the data: url prefix to get just the base64-encoded bytes
                    
                    var data = img.replace(/^data:image\/\w+;base64,/, "");
                   
                  //  if (this.props.userid) {

                      // console.log(this.props.userid, "userid");
                    // console.log("store", store.getState());
 
                    // var userid = component.props.userid;
        

                    chathelper.img_upload(data, userid);
                 
                    // var userid = this.props.userid;

                  //  }
                   
                
                    // .replace(/^data:image\/png;base64,/, "");
                    // var binaryData = new Buffer(img, 'base64').toString('binary');
                    // console.log(img);
                    // console.log("img", img);
                

                    // canvas.toBlob(function(blob) {
                    //   // var newImg = document.createElement('img'),
                    //       // url = URL.createObjectURL(blob);
                    //       console.log("blob", blob);
                    //       chathelper.img_upload(blob);
                    //   // newImg.onload = function() {
                    //   //   // no longer need to read the blob so it's revoked
                    //     // URL.revokeObjectURL(url);
                    //   // };
                    // })



                   
                     window.open(img);
        }
  
  });
}
handleItemType(e){
  // console.log("item type chagne this$$$", e.target.id);
  store.dispatch({ 
      type: 'TYPE_CHANGE',
      itemtype: e.target.value
  })
  store.dispatch({ 
      type: 'ITEM_CHANGE',
      item: e.target.value
  })
  store.dispatch({ 
    type: 'SUCCESSFUL_SAVE',
    imagesavedsuccess: false
  })



  // reset any old file in input box
  ReactDOM.findDOMNode(this.inputEntry).value = "";

}


   render() {
       
    // let {dashboard, dispatch} = this.props;
    //   let {sideNavExpanded, onDisplay, closetItems} = dashboard;
      
    //   let clothesImages = Object.keys(closetItems).map((imgKey,index)=> {

    //       return <img id={imgKey} key={imgKey} src={closetItems[imgKey].src}/>
    //   })

/////*********Jess I removed this for now as its causing an errorn and i cnant test heroku sorry! It crashes the server. */
          // {clothesbins.map(({ accepts, lastDroppedItem, className }, index) =>
          
          //   <Clothesbin
          //     accepts={accepts}
          //     lastDroppedItem={lastDroppedItem}
          //     onDrop={item => this.handleDrop(index, item)}
          //     key={index}
          //   />,
          // )}

const { images, clothesbins } = this.state; 
var {topResults, dressResults, bottomResults, shoeResults,bagResults,accessoryResults,  flairResults} = "";


if (this.props.top){
  topResults = this.props.top.map((result, index) =>

                            <Image
                            id={result.imageid}
                            src={result.src}
                            type={result.type}
                            isDropped={this.isDropped(result.src)}
                            key={result.type+'_'+index}
                            />,
                        )

} 
if (this.props.dress){
  dressResults = this.props.dress.map((result, index) =>
                            <Image
                            id={result.imageid}
                            src={result.src}
                            type={result.type}
                            isDropped={this.isDropped(result.src)}
                            key={result.type+'_'+index}
                            />,
                        )

}
if (this.props.bottom){
  bottomResults = this.props.bottom.map((result, index) =>
                            <Image
                            id={result.imageid}
                             src={result.src}
                            type={result.type}
                            isDropped={this.isDropped(result.src)}
                            key={result.type+'_'+index}
                            />,
                        )

}

if (this.props.shoes){
  shoeResults = this.props.shoes.map((result, index) =>
                            <Image
                            id={result.imageid}
                             src={result.src}
                            type={result.type}
                            isDropped={this.isDropped(result.src)}
                            key={result.type+'_'+index}
                            />,
                        )

}

if (this.props.bag){
  bagResults = this.props.bag.map((result, index) =>
                            <Image
                            id={result.imageid}
                            src={result.src}
                            type={result.type}
                            isDropped={this.isDropped(result.src)}
                            key={result.type+'_'+index}
                            />,
                        )

}

if (this.props.accessory){
  accessoryResults = this.props.accessory.map((result, index) =>
                            <Image
                            id={result.imageid}
                             src={result.src}
                            type={result.type}
                            isDropped={this.isDropped(result.src)}
                            key={result.type+'_'+index}
                            />,
                        )

}
if (this.props.flair){
  flairResults = this.props.flair.map((result, index) =>
                            <Image
                            id={result.imageid}
                             src={result.src}
                            type={result.type}
                            isDropped={this.isDropped(result.src)}
                             key={result.type+'_'+index}
                            />,
                        )

}
      var error = "";
      if (this.props.closeterror){
         error = <div><strong>Please enter a valid clothing TYPE for your item!</strong><br/></div>
      }
      var message = "";
      if (this.props.imagesavedsuccess){
         message = "File Successfully Saved";
      }
      return (

<section className="closet-container">
        
    <div id='clothesSet' className="col-md-6 closet-block rel"> 

        <div className="clothes-items backdrop" style={{ overflow: 'hidden', clear: 'both' }}>
              {clothesbins.map(({ accepts, lastDroppedItem, className }, index) =>
          
             <Clothesbin
               accepts={accepts}
               lastDroppedItem={lastDroppedItem}
               onDrop={item => this.handleDrop(index, item)}
               key={index}
             />,
           )}
      </div>

         <button onClick={(e) => this.handleClick(e)}  className="btn btn-pink outline round btn-lg">Save</button>
        <button onClick={this.resetClothesbins} className="btn btn-pink outline round btn-lg">Reset</button>       

    </div>
    <div className="col-md-6 closet-block rel">
        <div className="row">
          <div className="form-group">
              {error}
            <label for="sel1">Select list Item Type, then upload file:</label>
                <select class="form-control" ref={ref => this.closetItemType = ref} onChange={(e) => this.handleItemType(e)} id="closetItemType">
                    <option defaultValue="selected" value="SELECT">SELECT</option>
                    <option id="bottom" value="bottom">BOTTOM</option>
                    <option id="top" value="top">TOP</option>
                    <option id="dress" value="dress">DRESS</option>
                    <option id="bag" value="bag">BAG</option>
                    <option id="accessory" value="accessory">ACCESSORY</option>
                    <option id="flair" value="flair">FLAIR</option>
                    <option id="shoes" value="shoes">SHOES</option>
                </select>
          </div> 
        <input type="file" id="siofu_input" label='Upload' accept='.png' name="file" ref="file" onChange={(e) => this.uploadFile(e)} ref = {ref => this.inputEntry = ref}/><br /> 
         {message}
      </div>
      <div className="row"> 
            
          <div className="closet-tabs-container">
              <div className="clothes-items scroll-flow">
                    <ul className='nav nav-tabs nav-justified'>
                
                        <li role="presentation"><a href='#'><img src='../assets/img/i-shirt.png'></img></a></li>
                        <li role="presentation"><img src='../assets/img/i-pants.png'></img></li>
                        <li role="presentation"><img src='../assets/img/i-dress.png'></img></li>
                        <li role="presentation"><img src='../assets/img/i-shoes.png'></img></li>
                        <li role="presentation"><img src='../assets/img/i-purse.png'></img></li>
                        <li role="presentation"><img src='../assets/img/i-accessory.png'></img></li>
                        <li role="presentation"><img src='../assets/img/i-flair.png'></img></li>
                        <li role="presentation"><img src='../assets/img/i-background.png'></img></li>
                    </ul>
                         {/*<ul className="nav nav-tabs"> 
                        <div className="row">*/}
                            {/*<li>Shoes</li>*/}
                            {shoeResults}
                        {/*</div>*/}
                        {/*<div className="row">*/}
                            {/*<li>Tops</li>*/}
                            {topResults}
                         {/*</div>*/}
                         {/*<div className="row">*/}
                            {/*<li>Dresses</li>*/}
                            { dressResults}
                        {/*</div>*/}
                         {/*<div className="row">*/}
                            {/*<li>Bags</li>*/}
                            { bagResults}
                        {/*</div>*/}
                         {/*<div className="row">*/}
                            {/*<li>Accessories</li>*/}
                            { accessoryResults}
                        {/*</div>*/}
                        {/*<div className="row">*/}
                            {/*<li>Flair</li>*/}
                            {flairResults}
                        {/*</div>*/}
                        {/*<div className="row">*/}
                            {/*<li>Bottoms</li>*/}
                            {bottomResults}

              </div>
          <div className="magazine">        
              <ul>
                <Magazine />
              </ul>
          </div>

                  <div id="gallery">
                        

                    {/*{clothesImages}*/}
                    <div style={{ overflow: 'hidden', clear: 'both' }}>//this is where the sets will go?</div>
                </div>

            </div>
        </div>
   
    </div>
</section>
      )
   }
   handleDrop(index, item) {
    const { id } = item;

    this.setState(update(this.state, {
      clothesbins: {
        [index]: {
          lastDroppedItem: {
            $set: item,
          },
        },
      },
      droppedImageIds: id ? {
        $push: [id],
      } : {},
    }));
  }
}

const mapStateToProps = (store,ownProps) => {

    return {
        test: store.chatState.test,
        userid: store.chatState.userid,
        updateClosetPicker: store.closetState.updateClosetPicker,
        updateClosetItems: store.closetState.updateClosetItems,
        images: store.closetState.images,
        itemtype: store.closetState.itemtype,
        closeterror: store.closetState.closeterror,
        item: store.closetState.item,
        file: store.closetState.file, 
        imagesavedsuccess: store.closetState.imagesavedsuccess, 
        top: store.closetState.top, 
        bottom: store.closetState.bottom, 
        shoes: store.closetState.shoes, 
        bag: store.closetState.bag, 
        accessory: store.closetState.accessory, 
        dress: store.closetState.dress, 
        flair: store.closetState.flair,   
    }

};

export default connect(mapStateToProps)(ClosetPicker);

           
