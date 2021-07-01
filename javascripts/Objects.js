"use strict";

import Board from "./Board.js";
import FileHandler from "./FileHandler.js";
import Vaus from "./Vaus.js";
import Ball from "./Ball.js";

class Objects {
  static board = new Board();
  static fileHandler = new FileHandler();
  static vaus = new Vaus();
  static ball = new Ball();
}

export default Objects;

//page
// 14 x 30   board dimensions
// 5 x 4     patterns dimensions
// 8 X 4     block size in pixels
//+10 +5     offset when cutting from spritesheet
