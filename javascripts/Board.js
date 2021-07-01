"use strict";

import Objects from "./Objects.js";

class Board {
  canvas = null;
  ctx = null;
  spriteSheetImage = null;
  boardArray = new Array(30);
  gameStatus = false;

  constructor() {
    this.canvas = document.getElementById("board");
    this.canvas.width = 1120;
    this.canvas.height = 1200;

    this.ctx = this.canvas.getContext("2d");
    this.ctx.imageSmoothingEnabled = false;
    this.spriteSheetImage = new Image();
    this.spriteSheetImage.src = "./images/spriteSheet.png";

    this.vausImage = new Image();
    this.vausImage.src = "./images/vaus.png";

    this.ballImage = new Image();
    this.ballImage.src = "./images/ball.png";

    this.spriteSheetImage.onload = () => {
      window.requestAnimationFrame(() => this.createCanvas());
    };
    for (let i = 0; i < 30; i++) {
      this.boardArray[i] = new Array(14);
      for (let j = 0; j < 14; j++) {
        this.boardArray[i][j] = [-1, -1];
      }
    }
    this.addListeners();
  }
  addListeners(){
    let startButton = document.getElementById("startGameButton");
    startButton.addEventListener("click", () => {
      this.startGame();
    });

    let firstDefaultBoard = document.getElementById("loadDefaultBoard1");
    firstDefaultBoard.addEventListener("click", () => {
      this.loadMap("monster");
    });

    let secondDefaultBoard = document.getElementById("loadDefaultBoard2");
    secondDefaultBoard.addEventListener("click", () => {
      this.loadMap("ball");
    });
  }
  async loadMap(name){
    const response = await fetch(`./defaultMaps/${name}.txt`)
    const map = await response.json();
    this.boardArray = map;
  }
  createCanvas() {
    Objects.ball.move();
    Objects.vaus.move();
    this.ctx.drawImage(
      this.spriteSheetImage,
      0,
      384,
      128,
      128,
      0,
      0,
      1120,
      1200
    );
    this.ctx.globalAlpha = 0.5;
    for (let i = 0; i < 30; i++) {
      for (let j = 0; j < 14; j++) {
        if (this.boardArray[i][j][0] != -1) {
          this.ctx.fillRect(80 * j + 40, 40 * i + 20, 80, 40);
        }
      }
    }
    
    this.ctx.globalAlpha = 1;
    
    for (let i = 0; i < 30; i++) {
      for (let j = 0; j < 14; j++) {
        if (this.boardArray[i][j][0] != -1) {
          this.ctx.drawImage(
            this.spriteSheetImage,
            5 + 10 * this.boardArray[i][j][0],
            216 + 5 * this.boardArray[i][j][1],
            8,
            4,
            80 * j,
            40 * i,
            80,
            40
          );
        }
      }
    }
    this.ctx.drawImage(
      this.vausImage,
      0,
      0,
      27,
      6,
      Objects.vaus.positionX - Objects.vaus.width/2,
      Objects.vaus.positionY - Objects.vaus.height/2,
      270,
      60
    );
    this.ctx.drawImage(
      this.ballImage,
      0,
      0,
      4,
      4,
      Objects.ball.positionX - Objects.ball.radius,
      Objects.ball.positionY - Objects.ball.radius,
      40,
      40
    );
    window.requestAnimationFrame(() => this.createCanvas());
  }

  startGame() {
    document.getElementById("loadBoardButton").style.visibility = "hidden";
    document.getElementById("startGameButton").style.visibility = "hidden";
    document.getElementById("loadDefaultBoard1").style.visibility = "hidden";
    document.getElementById("loadDefaultBoard2").style.visibility = "hidden";
    Objects.vaus.positionX = 560;
    Objects.ball.positionX = Objects.vaus.positionX;
    Objects.ball.positionY = Objects.vaus.positionY - Objects.vaus.height/2 - Objects.ball.radius;
    this.gameStatus = true;
    Objects.ball.speedY *= -1;
  }
}

export default Board;
