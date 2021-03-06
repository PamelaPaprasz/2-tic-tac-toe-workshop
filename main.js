'use strict';

const board = document.querySelector(".board");

let gameInfo = document.querySelector(".winner");

let reloadButton = document.querySelector(".reload");

let title = document.querySelector(".title");

let matrix = [
  ['', '', ''],
  ['', '', ''],
  ['', '', '']
];

let cell;

let player = 'x'
let id = 1
let cellsPlayerX = [];
let cellsPlayerO = [];
let countFilledCells = [];

//Practice: Add, one cell to the board and set an X in it.
//Hint: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/table
//Hint: https://developer.mozilla.org/en-US/docs/Web/API/Node/appendChild
//Hint: https://developer.mozilla.org/en-US/docs/Web/API/Element/className
//Hint: https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML

reloadButton.addEventListener('click',function(event){
  window.location.reload(true);
})


function addRowToBoard(board, rowClassName) {
  const row = document.createElement("tr")
  board.appendChild(row)
  row.className = 'row' + rowClassName
}


function addCellToRow(row, cellClassName, cellValue) {
  cell = document.createElement("td")
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
    checkLoosers(event.target.id)
  })
}

//-- Main code: checker
// possible sepration: isEmptyPlace isAnyEmptyPlace isLineWin isAnyRowWin transposeTable isAnyColumnWin getDiagonals isAnyDiagonalWin
// check high https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every

function getOccupiedCells(clickedId){
  player === "x"? cellsPlayerO.push(clickedId) : cellsPlayerX.push(clickedId);
  // oPlayerWon()
  // xPlayerWon()
  checkWinner()
}

function checkWinner(){
  if(gameInfo.innerHTML.length === 0){
    if(cellsPlayerO.includes("1") && cellsPlayerO.includes("2") && cellsPlayerO.includes("3")){
      gameInfo.innerHTML = "O won with first row";
      highlightWinner("1", "2", "3")
    }else if(cellsPlayerO.includes("4") && cellsPlayerO.includes("5") && cellsPlayerO.includes("6")){
      gameInfo.innerHTML = "O won with second row";
      highlightWinner("4", "5", "6")
    }else if(cellsPlayerO.includes("7") && cellsPlayerO.includes("8") && cellsPlayerO.includes("9")){
      gameInfo.innerHTML = "O won with third row";
      highlightWinner("7", "8", "9")
    }else if(cellsPlayerO.includes("1") && cellsPlayerO.includes("4") && cellsPlayerO.includes("7")){
      gameInfo.innerHTML = "O won with first column";
      highlightWinner("1", "4", "7")
    }else if(cellsPlayerO.includes("2") && cellsPlayerO.includes("5") && cellsPlayerO.includes("8")){
      gameInfo.innerHTML = "O won with second column";
      highlightWinner("2", "5", "8")
    }else if(cellsPlayerO.includes("3") && cellsPlayerO.includes("6") && cellsPlayerO.includes("9")){
      gameInfo.innerHTML = "O won with third column"; 
      highlightWinner("3", "6", "9")
    }else if(cellsPlayerO.includes("1") && cellsPlayerO.includes("5") && cellsPlayerO.includes("9")){
      gameInfo.innerHTML = "O won with first diagonal";
      highlightWinner("1", "5", "9")
    }else if(cellsPlayerO.includes("3") && cellsPlayerO.includes("5") && cellsPlayerO.includes("7")){
      gameInfo.innerHTML = "O won with second diagonal";
      highlightWinner("3", "5", "7")
    }else if(cellsPlayerX.includes("1") && cellsPlayerX.includes("2") && cellsPlayerX.includes("3")){
      gameInfo.innerHTML = "X won with first row";
      highlightWinner("1", "2", "3")
    }else if(cellsPlayerX.includes("4") && cellsPlayerX.includes("5") && cellsPlayerX.includes("6")){
      gameInfo.innerHTML = "X won with second row";
      highlightWinner("4", "5", "6")
    }else if(cellsPlayerX.includes("7") && cellsPlayerX.includes("8") && cellsPlayerX.includes("9")){
      gameInfo.innerHTML = "X won with third row";
      highlightWinner("7", "8", "9")
    }else if(cellsPlayerX.includes("1") && cellsPlayerX.includes("4") && cellsPlayerX.includes("7")){
      gameInfo.innerHTML = "X won with first column";
      highlightWinner("1", "4", "7")
    }else if(cellsPlayerX.includes("2") && cellsPlayerX.includes("5") && cellsPlayerX.includes("8")){
      gameInfo.innerHTML = "X won with second column";
      highlightWinner("2", "5", "8")
    }else if(cellsPlayerX.includes("3") && cellsPlayerX.includes("6") && cellsPlayerX.includes("9")){
      gameInfo.innerHTML = "X won with third column";
      highlightWinner("3", "6", "9")
    }else if(cellsPlayerX.includes("1") && cellsPlayerX.includes("5") && cellsPlayerX.includes("9")){
      gameInfo.innerHTML = "X won with first diagonal";
      highlightWinner("1", "5", "9")
    }else if(cellsPlayerX.includes("3") && cellsPlayerX.includes("5") && cellsPlayerX.includes("7")){
      gameInfo.innerHTML = "X won with second diagonal";
      highlightWinner("3", "5", "7")
    }
  }
}


function highlightWinner(idFirst, idSecond, idThird){
  var firstCellToHighlight = document.getElementById(idFirst);
  var secondCellToHighlight = document.getElementById(idSecond);
  var thirdCellToHighlight = document.getElementById(idThird);
  firstCellToHighlight.setAttribute('class', 'highlighted');
  secondCellToHighlight.setAttribute('class', 'highlighted');
  thirdCellToHighlight.setAttribute('class', 'highlighted');
}


function checkLoosers(clickedId){
  countFilledCells.push(clickedId)
  if(countFilledCells.includes("1") && countFilledCells.includes("2") && countFilledCells.includes("3") && countFilledCells.includes("4") && countFilledCells.includes("5") && countFilledCells.includes("6") && countFilledCells.includes("7") && countFilledCells.includes("8") && countFilledCells.includes("9")){
    if(gameInfo.innerHTML.length === 0){
      gameInfo.innerHTML = "You two both are misserable loosers!";
      let allCells = document.querySelectorAll("td")
      for(var i = 0; i < allCells.length; i++){
        console.log(allCells[i]);
        allCells[i].setAttribute('class', 'pitchBlack')
      }
      title.setAttribute('class', 'pitchBlack')
    }
  }
}

