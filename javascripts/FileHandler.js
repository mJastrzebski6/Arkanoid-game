"use strict";

import Objects from "./Objects.js";

class FileHandler {

  constructor(){
    let fileButton = document.getElementById("loadBoardButton");
    fileButton.addEventListener("click", () => {
      this.loadFromFile();
    });
  }

  loadFromFile() {
    const input = document.createElement("input");
    input.type = "file";
    input.click();
    input.onchange = () => {
      if (!input?.files[0]) return;
      const file = input.files[0];
      const fileReader = new FileReader();
      
      fileReader.onloadend = (e) => {
        try{
          let gotBoard = JSON.parse(e.target.result);

          if(this.checkFile(gotBoard)) Objects.board.boardArray = gotBoard;
          else throw "";
        }
        catch{
          console.log("damaged file")
        }
      };
      fileReader.readAsText(file);
    };
  }
  checkFile(board){
    for(let i=0; i<30; i++){
      for(let j=0; j<14; j++){
        if(!Number.isInteger(board[i][j][0]) || !Number.isInteger(board[i][j][1])) return false;
        if(board[i][j][0]<-1 || board[i][j][0]>4) return false;
        if(board[i][j][1]<-1 || board[i][j][1]>2) return false;
      }
    }
    return true;
  }
}
export default FileHandler;
