import React from "react";
import "./File.css"
class File extends React.Component{
  constructor(props) {
    super(props)
  }
  render(){
    return(

  <div className = "file-container">
  <NewFile />
  <div id ="buttons">
  <Save />
  <Load />
  </div>
</div>
)
}
}
class NewFile extends React.Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    let c = document.getElementById("form");
    c.style.display = "block";
  }
  render() {
    return (
      <center>
      <div id = "new-file-container">
      <div id = "new-file" onClick = {this.handleClick}> + </div>
      </div>
      </center>
    )
  }
}
class Save extends React.Component {
  constructor(props) {
     super(props)
     this.handleSave = this.handleSave.bind(this);
  }
  handleSave() {
    function elt(type, props, ...children) {
          let dom = document.createElement(type);
          if (props) Object.assign(dom, props);
          for (let child of children) {
           if (typeof child != "string") dom.appendChild(child);
          else dom.appendChild(document.createTextNode(child));
          }
           return dom;
       }
    let c = document.getElementById("canvas");
    let data = c.toDataURL();
    let link = elt("a", {
         href: data,
      download: "pixelart.jpg"
       });
          document.body.appendChild(link);
       link.click();
      link.remove();

  }
  render(){
    return (
      <button className= "save-load-button" onClick = {this.handleSave}>
      Save </button>
    )
  }
}
class Load extends React.Component {
  constructor(props){
    super(props)
  }
  render() {
    return(
      <button className= "save-load-button">Load</button>
    )
}
}
export default File;
