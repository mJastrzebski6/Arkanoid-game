"use strict";

import Objects from "./Objects.js";

class Ball {
  positionX = 560;
  positionY = 950;
  radius = 20;
  speedX = 8;
  speedY = -8;

  constructor() {}

  move() {
    if (Objects.board.gameStatus == false) return;
    this.blocksCollision();
    this.vausCollision();
    this.wallCollision();
    this.positionX += this.speedX;
    this.positionY += this.speedY;
  }

  vausCollision() {
    if (this.positionY < 900) return;
    if (this.speedX > 0) {
      // hits from the left
      if (
        this.positionY < Objects.vaus.positionY + Objects.vaus.height/2 &&
        this.positionY > Objects.vaus.positionY - Objects.vaus.height/2 &&
        this.positionX + this.radius >= Objects.vaus.positionX - Objects.vaus.width/2 && 
        this.positionX < Objects.vaus.positionX
      )
        this.speedX = -this.speedX;
    }
    if (this.speedX < 0) {
      // hits from the right
      if (
        this.positionY < Objects.vaus.positionY + Objects.vaus.height/2 &&
        this.positionY > Objects.vaus.positionY - Objects.vaus.height/2 &&
        this.positionX - this.radius <= Objects.vaus.positionX + Objects.vaus.width/2 && 
        this.positionX > Objects.vaus.positionX
      )
        this.speedX = -this.speedX;
    }
    if (this.speedY > 0) {
      // hits from top
      if (
        this.positionY + this.radius > Objects.vaus.positionY - Objects.vaus.height/2 &&
        this.positionY - this.radius < Objects.vaus.positionY &&
        this.positionX > Objects.vaus.positionX - Objects.vaus.width/2 &&
        this.positionX < Objects.vaus.positionX + Objects.vaus.width/2
      ){
        let fraction = (this.positionX-Objects.vaus.positionX+Objects.vaus.width/2)/Objects.vaus.width;
        if(fraction > 0.5) fraction = 1 - fraction;

        if(this.speedX<0) this.speedX = -22 * (0.5- fraction);
        else this.speedX = 22 * (0.5- fraction);
        this.speedY = -Math.sqrt(128 - this.speedX*this.speedX);
      }
    }
  }

  wallCollision() {
    if (this.speedX > 0) {
      if (this.positionX + this.speedX + this.radius >= 1120) {
        // right wall collision
        this.speedX = -this.speedX;
      }
    } 
    else {
      if (this.positionX + this.speedX - this.radius < 0) {
        // left wall collision
        this.speedX = -this.speedX;
      }
    }
    if (this.speedY > 0) {
      if (this.positionY + this.speedY + this.radius*2 >= 1200) {
        // bottom collision + end
        Objects.board.gameStatus = false;
        document.getElementById("loadBoardButton").style.visibility = "visible";
        document.getElementById("startGameButton").style.visibility = "visible";
        document.getElementById("loadDefaultBoard1").style.visibility = "visible";
        document.getElementById("loadDefaultBoard2").style.visibility = "visible";
      }
    } 
    else {
      if (this.positionY + this.speedY - this.radius < 0) {
        // top collision
        this.speedY = -this.speedY;
      }
    }
  }

  blocksCollision() {
    let cords = this.whereIsBall();
    if (cords != undefined) {
      loopY: for(let i = cords[0]-1; i<=cords[0]+1; i++){
        loopX: for(let j = cords[1]-1; j<=cords[1]+1; j++){
          if(i < 0 || i>=30) continue;
          if(j < 0 || j>=14) continue;
          if(Objects.board.boardArray[i][j][0] == -1) continue;

          let result = this.oneBlockCollision(i, j);
          if(result[0] == true){
            if(result[1] == "x"){
              Objects.board.boardArray[i][j][0] = -1;
              Objects.board.boardArray[i][j][1] = -1;
              this.speedX = -this.speedX;
              break loopY;
            }
            else{
              Objects.board.boardArray[i][j][0] = -1;
              Objects.board.boardArray[i][j][1] = -1;
              this.speedY = -this.speedY;
              break loopX;
            }
          }
        }
      }
    }
  }
  whereIsBall() {
    for (let i = 0; i < 30; i++) {
      for (let j = 0; j < 14; j++) {
        if (
          this.positionX >= j * 80 &&
          this.positionX < j * 80 + 80 &&
          this.positionY >= i * 40 &&
          this.positionY < i * 40 + 40
        )
          return [i, j];
      }
    }
  }
  clamp(number, min, max) {
    return Math.max(min, Math.min(number, max));
  }
  oneBlockCollision(y, x){
    // Find the closest point to the circle within the rectangle
    let closestX = this.clamp(this.positionX, x*80, (x+1)*80);
    let closestY = this.clamp(this.positionY, y*40, (y+1)*40);

    // Calculate the distance between the circle's center and this closest point
    let distanceX = this.positionX - closestX;
    let distanceY = this.positionY - closestY;

    // If the distance is less than the circle's radius, an intersection occurs
    let distanceSquared = (distanceX * distanceX) + (distanceY * distanceY);
    if(distanceSquared < (this.radius * this.radius)){
      if(Math.abs(distanceX) < Math.abs(distanceY)) return [true, "y"];
      else return [true, "x"];
    } 
    else return [false, "0"];
  }
}
export default Ball;
