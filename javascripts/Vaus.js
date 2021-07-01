"use strict";

import Objects from "./Objects.js";

class Vaus {
  positionX = 560;
  positionY = 1000;
  width = 270;
  height = 60;
  
  movingInterval = null;
  speed = 10;
  rightPressed = false;
  leftPressed = false;


  constructor() {
    document.addEventListener("keydown", (event) => {
      if (event.key == "ArrowLeft" || event.key == "a") {
        //this.rightPressed = false;
        this.leftPressed = true;
      } else if (event.key == "ArrowRight" || event.key == "d") {
        //this.leftPressed = false;
        this.rightPressed = true;
      }
    });
    document.addEventListener("keyup", (event) => {
      if (event.key == "ArrowLeft" || event.key == "a") {
        this.leftPressed = false;
      } else if (event.key == "ArrowRight" || event.key == "d") {
        this.rightPressed = false;
      }
    });
  }
  
  move() {
    if (this.leftPressed) {
      if (this.positionX - this.speed-this.width/2 > 0) this.positionX -= this.speed;
    } else if (this.rightPressed) {
      if (this.positionX + this.speed + this.width/2 < 1120) this.positionX += this.speed;
    }
  }
}
export default Vaus;