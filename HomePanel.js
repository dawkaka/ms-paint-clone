import React from "react";
import "./HomePanel.css";
import Shapes from "./Shapes.js";
import File from "./File.js";
class HomePanel extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className = "home-panel-container">
      <File />
      <Shapes homeState = {this.props.mainState} hsc = {this.props.htc}/>
      <LineSize homeState = {this.props.mainState} hlsc = {this.props.hlsc}
      hdlsc = {this.props.hdlsc} htc = {this.props.htc}/>
      <Color homeState = {this.props.mainState} hacc = {this.props.hacc}
       hcc = {this.props.hcc}/>
       </div>
    )
  }
}
class LineSize extends React.Component{
  constructor(props){
    super(props)
    this.handleChange = this.handleChange.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
    this.handleToolChange = this.handleToolChange.bind(this);
  }


  handleChange(event) {
  let slide = document.getElementById("line-size-slider");
    let disp = document.getElementById("line-display");
  this.props.hlsc(slide.value,disp);
}

  handleChange2(event){
    let slide = document.getElementById("dash-line-slider");
    let disp = document.getElementById("dash-line-display");
    this.props.hdlsc(slide.value,disp);
  }
 handleToolChange(event) {
   document.getElementById(this.props.homeState.tool).classList.remove("shape-active");
   this.props.htc(event.target.value);
 }
  render(){
    return(
      <div className = "line-size-container">
      <div className = "line-container">
       <input type = "range" min = "1" max = "8" value = {this.props.homeState.lineSize}
       className = "slider" id="line-size-slider"
       onChange = {this.handleChange}/>
       </div>
       <center>
       <div className = "line-display" id = "line-display">
       {this.props.homeState.lineSize}</div>
       </center>
       <div className = "line-container">
       <input type = "range" className="slider" id = "dash-line-slider"
       min = "1" max = "8" value = {this.props.homeState.DashLineSize}
       onChange = {this.handleChange2}/>
       </div>
       <center>
       <div className = "line-display" id = "dash-line-display">
       {this.props.homeState.DashLineSize}</div>
       </center>
       <div className = "line-type-big-container">
       <div className = "line-type-container-normal">
       <input type = "radio" value = "normalLine" id = "normalLine" name = "line-type"
       className = "line-type" onChange = {this.handleToolChange}/>
       <div className = "dip"></div>
       </div>
      <div className = "line-type-container-dashed">
      <input type = "radio" value = "dashedLine" id = "dashedLine" name = "line-type"
      className = "line-type" onChange = {this.handleToolChange}/>
      <div className = "dip"></div>
      </div>
      </div>
      </div>
    )
  }
}
class Color extends React.Component {
  constructor(props) {
    super(props)
    this.state = {colors:["red","yellow","green","orange","blue","indigo",
    "violet","skyblue","pink","orangered","aqua","gray","silver","brown",
    "black","blueviolet","white","magenta","coral","darkcyan","darkgray","fuchsia",
    "deepskyblue","indianred","orangered","aqua","gray","silver","brown",
    "black","cyan","lightgreen"]};
    this.handleColorClick = this.handleColorClick.bind(this);
    this.handleActiveColorClick = this.handleActiveColorClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleColorClick(event){
   let color = event.target.style.backgroundColor;
    this.props.hcc(color);
  }
  handleActiveColorClick(event){
    if(event.target.id === "strokeColor") {
      document.getElementById("fillColor").classList.remove("selected-active")
      event.target.classList.add("selected-active")
      this.props.hacc("stroke");
    }else {
      document.getElementById("strokeColor").classList.remove("selected-active")
      event.target.classList.add("selected-active")
      this.props.hacc("fill");
    }
  }
  handleChange(event){
    let color = event.target.value;
    this.props.hcc(color)
  }
  render(){
    let i = -1;
    let colors = this.state.colors.map(color => {
      let divStyle = {
        backgroundColor: color,
        height: "17px",
        width: "22px"
      }
      i++
      return(
        <div  key = {i} className = "used-color" style = {divStyle}
        onClick = {this.handleColorClick}></div>
      )
    });
    let activeStyle1 = {
      backgroundColor: this.props.homeState.stroke
    }
    let activeStyle2 = {
      backgroundColor: this.props.homeState.fill
    }
    return(
      <div className = "color-container">
      <div className = "active-colors">
        <div className = "active-color-container">
       <div className = "active-color" id = "strokeColor"
       style = {activeStyle1} onClick= {this.handleActiveColorClick}></div>
       <p>stroke<br/> color</p>
       </div>
       <div className = "active-color-container">
       <div className = "active-color" id = "fillColor"
       style = {activeStyle2} onClick = {this.handleActiveColorClick}></div>
       <p>fill<br/> color</p>
      </div>
      </div>
        <div className = "used-colors-container">
        {colors}
        </div>
        <div className = "color-picker-container">
        <input type = "color"  onChange = {this.handleChange}/>
        <p> select a color by clicking the color picker</p>
        </div>
        </div>
    )
  }
}

export default HomePanel;
