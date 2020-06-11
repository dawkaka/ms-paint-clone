import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./Main.css";
import * as serviceWorker from "./serviceWorker";
import  HomePanel from "./HomePanel";
import Canvas from "./Canvas";
class Main extends React.Component {
  constructor(props){
    super(props);
    this.state = {tool:"normalLine",lineSize:"3",DashLineSize:"3", selectedArea:
     {xStart:0,yStart:0,xEnd:0,yEnd:0},
      currentSelectedColor: {stroke:{strokeColor:"black",isActive:false},
      fill:{fillColor:"red",isActive:false}},
      isActiveFill: false,
      isActiveStroke: false,
      fill: "red",
      stroke: "black",

  }
  this.handleColorChange = this.handleColorChange.bind(this);
  this.handleActiveColorChange = this.handleActiveColorChange.bind(this);
  this.handleToolChange = this.handleToolChange.bind(this);
  this.handleLineSizeChange = this.handleLineSizeChange.bind(this);
  this.handleSelectedAreaChange = this.handleSelectedAreaChange.bind(this);
  this.handleDashLineSizeChange = this.handleDashLineSizeChange.bind(this);

}

 handleColorChange(color){

   if(this.state.isActiveFill === true){
     this.setState({fill: color});
   }else if(this.state.isActiveStroke === true){
     this.setState({stroke: color});
   }
 }
 handleActiveColorChange(parameter){
   if(parameter === "stroke"){
     this.setState({isActiveFill: false})
     this.setState({isActiveStroke:true})
   }else if(parameter === "fill"){
     this.setState({isActiveStroke: false})
     this.setState({isActiveFill: true })
   }
 }

 handleLineSizeChange(value,toChange){
   this.setState({lineSize: value});
   toChange.textContent = this.state.lineSize;
 }
 handleDashLineSizeChange(valuee,toChangee){
   this.setState({DashLineSize: valuee});
   toChangee.textContent = this.state.DashLineSize;
 }
 handleToolChange(value) {
   this.setState({tool:value})
 }

 handleSelectedAreaChange(){}

  render(){
    return (
      <div id = "main">
     <HomePanel mainState = {this.state} hacc = {this.handleActiveColorChange}
     hcc = {this.handleColorChange} hlsc = {this.handleLineSizeChange}
     hdlsc = {this.handleDashLineSizeChange} htc = {this.handleToolChange}/>
     <Canvas mainState = {this.state} />
     </div>
    );
  }
}
ReactDOM.render(
  <Main />, document.getElementById("root")
);
serviceWorker.unregister();
