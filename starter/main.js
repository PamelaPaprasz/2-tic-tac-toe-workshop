'use strict';
const board = document.querySelector(".board");

let matrix = [
  ['', '', ''],
  ['', '', ''],
  ['', '', '']
];

let player = 'x'
let id = 1
let cellsPlayerX = [];
let cellsPlayerO = [];

//Practice: Add, one cell to the board and set an X in it.
//Hint: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/table
//Hint: https://developer.mozilla.org/en-US/docs/Web/API/Node/appendChild
//Hint: https://developer.mozilla.org/en-US/docs/Web/API/Element/className
//Hint: https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML


function addRowToBoard(board, rowClassName) {
  const row = document.createElement("tr")
  board.appendChild(row)
  row.className = 'row' + rowClassName
}


function addCellToRow(row, cellClassName, cellValue) {
  const cell = document.createElement("td")
  row.appendChild(cell)
  cell.className = cellClassName
  cell.id = id++
}


//-- Main code: Loop through the matrix and draw it’s values

function cellClassNameCreator(rowIndex, columnIndex){
  return 'cell-' + rowIndex + '-' + columnIndex
}

function renderBoard(board, matrix) {
  matrix.forEach((row, rowIndex) => {
    addRowToBoard(board, rowIndex)
    const rowElement = document.querySelector('.row' + rowIndex)
    row.forEach((item, itemIndex) => {
      let className = cellClassNameCreator(rowIndex, itemIndex)
      addCellToRow(rowElement, className, item)
    })
  })
  addEventListener()
}
renderBoard(board, matrix)


//-- Main code: Setter

function setPlayer(){
  player === "x"? player = "o": player = "x";
}

function setMatrix(positions){
  matrix[positions[0]][positions[1]] = player;
}

function renderPlayer(clickedPositions, className){
  var cell = document.getElementsByClassName(className);
  if(cell[0].innerHTML.length === 0){
    cell[0].innerHTML = player;
    setMatrix(clickedPositions)
    setPlayer()
  }
}

//-- Main code: Event-listener

//Hint: https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener

function getPositionFromClass(nodeClass){
  var actPosArr = [];
  var arr = nodeClass.split("-");
  var rowPosition = parseInt(arr[1]);
  var columnPosition = parseInt(arr[2]);
  actPosArr.push(rowPosition);
  actPosArr.push(columnPosition);
  renderPlayer(actPosArr, nodeClass);
}

function addEventListener(){
  board.addEventListener('click',function(event){
    getPositionFromClass(event.target.className)
    getOccupiedCells(event.target.id)
  })
}

//-- Main code: checker
// possible sepration: isEmptyPlace isAnyEmptyPlace isLineWin isAnyRowWin transposeTable isAnyColumnWin getDiagonals isAnyDiagonalWin
// check high https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every

function getOccupiedCells(clickedId){
  player === "x"? cellsPlayerO.push(clickedId) : cellsPlayerX.push(clickedId);
  oPlayerWon()
  xPlayerWon()
}

function oPlayerWon(){
  if(cellsPlayerO.includes("1") && cellsPlayerO.includes("2") && cellsPlayerO.includes("3")){
    console.log("O won with first row")
  }else if(cellsPlayerO.includes("4") && cellsPlayerO.includes("5") && cellsPlayerO.includes("6")){
    console.log("O won with second row")
  }else if(cellsPlayerO.includes("7") && cellsPlayerO.includes("8") && cellsPlayerO.includes("9")){
    console.log("O won with third row")
  }else if(cellsPlayerO.includes("1") && cellsPlayerO.includes("4") && cellsPlayerO.includes("7")){
    console.log("O won with first column")
  }else if(cellsPlayerO.includes("2") && cellsPlayerO.includes("5") && cellsPlayerO.includes("8")){
    console.log("O won with second column")
  }else if(cellsPlayerO.includes("3") && cellsPlayerO.includes("6") && cellsPlayerO.includes("9")){
    console.log("O won with third column")
  }else if(cellsPlayerO.includes("1") && cellsPlayerO.includes("5") && cellsPlayerO.includes("9")){
    console.log("O won with first diagonal")
  }else if(cellsPlayerO.includes("3") && cellsPlayerO.includes("5") && cellsPlayerO.includes("7")){
    console.log("O won with second diagonal")
  }
}

function xPlayerWon(){
  if(cellsPlayerX.includes("1") && cellsPlayerX.includes("2") && cellsPlayerX.includes("3")){
    console.log("X won with first row")
  }else if(cellsPlayerX.includes("4") && cellsPlayerX.includes("5") && cellsPlayerX.includes("6")){
    console.log("X won with second row")
  }else if(cellsPlayerX.includes("7") && cellsPlayerX.includes("8") && cellsPlayerX.includes("9")){
    console.log("X won with third row")
  }else if(cellsPlayerX.includes("1") && cellsPlayerX.includes("4") && cellsPlayerX.includes("7")){
    console.log("X won with first column")
  }else if(cellsPlayerX.includes("2") && cellsPlayerX.includes("5") && cellsPlayerX.includes("8")){
    console.log("X won with second column")
  }else if(cellsPlayerX.includes("3") && cellsPlayerX.includes("6") && cellsPlayerX.includes("9")){
    console.log("X won with third column")
  }else if(cellsPlayerX.includes("1") && cellsPlayerX.includes("5") && cellsPlayerX.includes("9")){
    console.log("X won with first diagonal")
  }else if(cellsPlayerX.includes("3") && cellsPlayerX.includes("5") && cellsPlayerX.includes("7")){
    console.log("X won with second diagonal")
  }
}

function isGameOver(){
  console.log("Noone won this game!")
}

