import React from "react";
import "./Canvas.css";

class Canvas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {draw: false, drawInProcess:false,
      canvasLeft:0,canvasTop: 0, canvasWidth: 700, canvasHeight: 380,
      startRectX: 0, startRectY:0, endRectX: 0, endRectY: 0, index: 0
    }
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleCanvasChange = this.handleCanvasChange.bind(this);
  }
  componentDidMount(){
    let c = document.getElementById("canvas");
    let ctx = c.getContext("2d");
    ctx.canvas.width = this.state.canvasWidth;
    ctx.canvas.height = this.state.canvasHeight;

  }
  handleMouseDown(event) {
    if(this.props.mainState.tool === "line"){
      let rect = document.getElementById("canvas").getBoundingClientRect();
      if(this.state.drawInProcess === true){
        let c = document.getElementById("canvas");
        let ctx = c.getContext('2d');
        ctx.strokeStyle = this.props.mainState.stroke;
        ctx.lineWidth  = this.props.mainState.lineSize;
        ctx.beginPath();
        ctx.moveTo(this.state.startRectX, this.state.startRectY);
        ctx.lineTo(event.pageX - rect.left, event.pageY - rect.top);
        ctx.stroke();
      }else{
      this.setState({draw: true, startRectX: event.pageX - rect.left,
      startRectY: event.pageY - rect.top});
    }
    }else{
      let rect = document.getElementById("canvas").getBoundingClientRect();
      this.setState({draw: true, startRectX: event.pageX - rect.left,
      startRectY: event.pageY - rect.top});
    }

  }
  handleMouseUp(event){
    if(this.props.mainState.tool === "line"){
      this.setState({drawInProcess: !this.state.drawInProcess});
      if(this.state.drawInProcess === true){
        this.setState({startRectX: 0, startRectY:0,
        endRectY: 0, endRectX: 0, draw:false});
      }
    }else{
    this.setState({draw:false, drawInProcess: false, startRectX: 0, startRectY:0,
    endRectY: 0, endRectX: 0});
  }
  }
  handleMouseMove(event) {
    if(this.state.draw === false) return;
    let c = document.getElementById("canvas");
    let ctx = c.getContext("2d");
    ctx.strokeStyle = this.props.mainState.stroke;
    ctx.fillStyle = this.props.mainState.fill;
    ctx.lineWidth = this.props.mainState.lineSize;
    ctx.lineCap = "round";
    let rect = c.getBoundingClientRect();
    switch (this.props.mainState.tool) {
      case "normalLine":
      ctx.strokeStyle = this.props.mainState.stroke;
         if(this.state.drawInProcess === true) {
           ctx.lineTo(event.pageX - rect.left,
             event.pageY - rect.top);
          ctx.moveTo(event.pageX - rect.left,
             event.pageY - rect.top);
           ctx.stroke();

         }else {
           ctx.beginPath();
           ctx.lineTo(event.pageX - rect.left,
             event.pageY  - rect.top);
           ctx.stroke();
           this.setState({drawInProcess: true});
         }
        break;
        case "dashedLine":

        ctx.lineWidth = this.props.mainState.DashLineSize;
        ctx.lineCap = "round";
           if(this.state.drawInProcess === true) {
             ctx.moveTo(event.pageX - rect.left,event.pageY -  rect.top);
             ctx.lineTo(event.pageX - rect.left,
               event.pageY - rect.top);
            ctx.moveTo(event.pageX - rect.left,
               event.pageY - rect.top);
             ctx.stroke();

           }else {
             ctx.beginPath();
             ctx.lineTo(event.pageX - rect.left,
               event.pageY  - rect.top);
             ctx.stroke();
             this.setState({drawInProcess: true});
           }
        break;
        case "rectangle":
        if(this.state.drawInProcess === true){
          if(this.state.endRectX  < 0 && this.state.endRectY < 0){
            ctx.clearRect(this.state.startRectX - 2,this.state.startRectY - 2,
            this.state.endRectX - rect.left + 2,
             this.state.endRectY - rect.top  + 2);
          }else if(this.state.endRectX < 0 && this.state.endRectX > 0){
            ctx.clearRect(this.state.startRectX,this.state.startRectY,
            this.state.endRectX - rect.left + 2,
             this.state.endRectY - rect.top + 2);
          }else if(this.state.endRectX > 0 && this.state.endRectY < 0){
            ctx.clearRect(this.state.startRectX,this.state.startRectY,
            this.state.endRectX - rect.left ,
             this.state.endRectY - rect.top );
          }else{
          ctx.clearRect(this.state.startRectX,this.state.startRectY,
          this.state.endRectX - rect.left + 2, this.state.endRectY - rect.top + 2);
        }
          ctx.fillRect(this.state.startRectX,this.state.startRectY,
            event.pageX - this.state.startRectX - rect.left,
          event.pageY - this.state.startRectY - rect.top);
          ctx.strokeRect(this.state.startRectX,this.state.startRectY,
            event.pageX - this.state.startRectX - rect.left,
          event.pageY - this.state.startRectY - rect.top)
          ctx.fill();

          this.setState({endRectX: event.pageX - this.state.startRectX ,
             endRectY: event.pageY - this.state.startRectY});
        }else{

      ctx.fillRect(this.state.startRectX,this.state.startRectY,
        event.pageX - this.state.startRectX - rect.left,
        event.pageY - this.state.startRectY - rect.top);
      ctx.fill();
      ctx.stroke();
      this.setState({endRectX: event.pageX - this.state.startRectX,
         endRectY: event.pageY - this.state.startRectY,drawInProcess:true});
    }
        break;
        case "circle":
        if(this.state.drawInProcess === true){
        let centerX = (event.pageX - rect.left - this.state.startRectX)/2;
        let centerY = (event.pageY - rect.top - this.state.startRectY)/2;
        ctx.arc(this.state.startRectX + centerX,
           this.state.startRectY + centerY,Math.abs(centerX),0,7);
          ctx.fill();
          this.setState({endRectX: event.pageX - this.state.startRectX ,
             endRectY: event.pageY - this.state.startRectY});
        }else{
      ctx.beginPath();
      let centerX = (event.pageX - rect.left - this.state.startRectX)/2;
      let centerY = (event.pageY - rect.top - this.state.startRectY)/2;
      ctx.arc(this.state.startRectX + centerX,
         this.state.startRectY + centerY,Math.abs(centerX),0,7);
      ctx.fill();
      this.setState({endRectX: event.pageX - this.state.startRectX,
         endRectY: event.pageY - this.state.startRectY,drawInProcess:true});
    }

         break;
        case "triangle":
           if(this.state.drawInProcess === true){
             ctx.clearRect(this.state.startRectX,this.state.startRectY,
             this.state.endRectX - rect.left + 2, this.state.endRectY - rect.top + 2);

             ctx.moveTo(this.state.startRectX,this.state.startRectY);
             let xHalf = event.pageY - rect.top;
             ctx.lineTo(this.state.startRectX + (xHalf/2),xHalf);
             ctx.lineTo(this.state.startRectX - (xHalf/2),xHalf);
             ctx.fill();
           }else{
             ctx.beginPath();
             ctx.moveTo(this.state.startRectX,this.state.startRectY);
             let xHalf = event.pageY - rect.top;
             ctx.lineTo(this.state.startRectX + (xHalf/2),xHalf);
             ctx.lineTo(this.state.startRectX - (xHalf/2),xHalf);
             ctx.fill();
           }

         break;
      default:

    }

  }
  handleClose() {
    let c = document.getElementById("form");
    c.style.display = "none";
  }
  handleCanvasChange(){
    let width = document.getElementById("width").value;
    let height = document.getElementById("height").value;
    if(width > 50 && height > 50){
      let c = document.getElementById("canvas");
      let ctx = c.getContext("2d");
      ctx.canvas.width  = Math.min(width,this.state.canvasWidth);
      ctx.canvas.height = Math.min(height,this.state.canvasHeight);
    }
  this.handleClose();
  }
  render() {
    return (
      <div>
      <center>
      <canvas className ="canvas" id = "canvas"
      onMouseDown = {this.handleMouseDown} onMouseUp = {this.handleMouseUp}
      onMouseMove = {this.handleMouseMove}></canvas>
      </center>
      <div id = "form">
      <div id = "close" onClick = {this.handleClose}> X </div>
      <input type ="number" id = "width" placeholder = "Enter Width" />
      <input type = "number" id = "height" placeholder = "Enter Height"/>
      <button id = "form-button" onClick = {this.handleCanvasChange}>OK</button>
      </div>
      </div>
    )
  }
}
export default Canvas;
