import React from "react";
import "./Shapes.css";

class Shapes extends React.Component{
  constructor(props) {
     super(props)
    this.handleShapeClick = this.handleShapeClick.bind(this);
  }
  componentDidMount(){
  }
  handleShapeClick(event){
    let str = event.target.src;
    str = str.substr(str.lastIndexOf("/") + 1);
    str = str.substr(0, str.length - 4);
    let shapes = ["rectangle","circle","love","topArrow","rightArrow",
                    "triangle","leftArrow","downArrow","star","polygon","line"];
    let currentTool = this.props.homeState.tool;
  if(shapes.includes(currentTool)) {
    document.getElementById(currentTool).classList.remove("shape-active");
  }
    event.target.classList.add("shape-active");
    this.props.hsc(str);
  }

  render() {
    return (
      <div className = "shapes-container">
      <div className = "shape-container">
      <img src = "./rectangle.png" id = "rectangle" onClick = {this.handleShapeClick}  alt = ""/>
      </div>
      <div className = "shape-container">
      <img src = "./line.png" id = "line"onClick = {this.handleShapeClick} alt = ""/>
      </div>
      <div className = "shape-container">
      <img src = "./circle.png" id = "circle"onClick = {this.handleShapeClick} alt = ""/>
      </div>
      <div className = "shape-container">
      <img src = "./triangle.png" id = "triangle"onClick = {this.handleShapeClick} alt = ""/>
      </div>
      <div className = "shape-container">
      <img src = "./star.png" id = "star"onClick = {this.handleShapeClick} alt = ""/>
      </div>
      <div className = "shape-container">
      <img src = "./polygon.png" id = "polygon"onClick = {this.handleShapeClick} alt = ""/>
      </div>
      <div className = "shape-container">
      <img src = "/leftArrow.png" id = "leftArrow"onClick = {this.handleShapeClick} alt = ""/>
      </div>
      <div className = "shape-container">
      <img src = "/downArrow.png" id = "downArrow"onClick = {this.handleShapeClick} alt = ""/>
      </div>
      <div className = "shape-container">
      <img src = "/rightArrow.png" id = "rightArrow"onClick = {this.handleShapeClick} alt = ""/>
      </div>
      <div className = "shape-container">
      <img src = "/topArrow.png" id = "topArrow"onClick = {this.handleShapeClick} alt = ""/>
      </div>
      <div className = "shape-container">
      <img src = "/love.png" id = "love"onClick = {this.handleShapeClick} alt = ""/>
      </div>
      </div>
    )
  }
}
export default Shapes;
