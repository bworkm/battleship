'use strict';
// var shipLocations = ['B1', 'C1', 'D1','E2','E3','A4','B4','C4','D4'];
var shipLocations = [
  [8,16, 24, 42,43, 44, 45, 19, 20, 21, 31, 39, 47, 55, 63]
];
var allShips = [];
var allPlots = [];
var xPosArr = ['A', 'B', 'C', 'D' ,'E', 'F', 'G', 'H', 'I', 'J'];
var maxHeight = 8;
var maxWidth = 8;
var grid = document.getElementById('clickable_Grid');
var score = 100;
var clickedGridPT = [];

function Ship(name, size) {
  this.name = name;
  this.size = size;
  this.hitTally = 0;
  this.sunk = false;
  this.updateSunk = function() {

  };
  allShips.push(this);
}

function Plot(x, y) {
  this.x = x;
  this.y = y;
  this.id = x + y;
  this.occupied = false;
  this.updateOccupied = function() {};
  this.retaliate = false;
  allPlots.push(this);
}

new Ship('USS Juan', 2);
new Ship('USS Darcy', 3);
new Ship('USS Chika', 4);
//*********************************
// Functions for Placing Ships
// function checkYDirection(startPoint, whichway) {
//   // Start at origin and look either up or down based on 'direction' from randomDirection.
//   // Check for as many positions as required by ship.size.
//   var tempDirectionArr = [];
//
//   if (whichway === 'up') {
//     // check the spaces above origin until necessity is met.
//     // Stop if space is not available and go the opposite direction.
//     // Keep track of already approved open positions.
//     // Y + 1
//
//   }
//   if (whichway === 'down') {
//     // check the spaces below origin until necessity is met.
//     // Stop if space is not available and go the opposite direction.
//     // Y - 1
//   }
// }

// function checkXDirection(startPoint, whichway) {
//   if (whichway === 'left') {
//     // check the spaces to the left of origin until necessity is met.
//     // Stop if space is not available and go the opposite direction.
//     // X - 1
//   }
//   if (whichway === 'right') {
//     // check the spaces to the right of origin until necessity is met.
//     // Stop if space is not available and go the opposite direction.
//     // X + 1
//   }
// }

// Randomize for X
// function randomizeForX() {
//   var xPos = (Math.floor(Math.random() * maxWidth));
//   // console.log(xPosArr[xPos],'X value');
//   return xPos;
// }
//
// // Randomize for Y
// function randomizeForY() {
//   var yPos = (Math.floor(Math.random() * maxHeight));
//   // console.log(yPos,'Y value');
//   return yPos;
// }

// Randomize for Direction (1 thru 4)
// function randomDirection(startPoint) {
//   var direction;
//   var temp = (Math.floor(Math.random() * 4) + 1);  //Randomizes 1 thru 4
//   if (temp === 1)
//     direction = 'up';
//   if (temp === 2)
//     direction = 'left';
//   if (temp === 3)
//     direction = 'right';
//   if (temp === 4)
//     direction = 'down';
//
//   if (direction === 'up' | direction === 'down')
//     checkYDirection(startPoint, direction);
//
//   if (direction === 'left' | direction === 'right')
//     checkXDirection(startPoint, direction);
//
//   return direction;
// }
// Check for nearby open spaces X
// Check for nearby open spaces Y
// seatsTaken() for updating occupied spots
function createClickableGrid(rows, cols) {

  for (var r = 0; r < rows; r++) {
    var tr = grid.appendChild(document.createElement('tr'));
    for (var c = 0; c < cols; c++){
      var cell = tr.appendChild(document.createElement('td'));
      cell.id = xPosArr[r] + c;
      // console.log(cell.id);
    }
  }
}

function createPlots() {
  for (var i = 0; i < xPosArr.length; i++) {
    for (var j = 0; j < maxWidth; j++) {
      new Plot(xPosArr[i], j);
    }
  }
}

function updatePlotDisplay() {
  var temp;
  for(var i in allPlots) {
    if (allPlots[i].occupied === true) {
      temp = allPlots[i].x;
      temp += allPlots[i].y;
      // console.log(temp);
      var cellID = document.getElementById(temp);
      // console.log(cellID);
      cellID.style.background = 'navy';
    }
  }
}

function plotShips() {
  // var startPoint;
  for (var ship in shipLocations[0]) {
    // console.log(shipLocations[ship],'ship in shipLocations')
    allPlots[shipLocations[0][ship]].occupied = true;
  //   var xCoord = randomizeForX();
  //   var yCoord = randomizeForY();
  //   while (!validStartingPoint(xCoord, yCoord)) {
  //     xCoord = randomizeForX();
  //     yCoord = randomizeForY();
  //   }
  //   randomDirection(startPoint);
  }
}

// function validStartingPoint(xCoord, yCoord) {
//   for (var plot in allPlots) {
//     if ((allPlots[plot].x === xCoord) && (allPlots[plot].y === yCoord) && (allPlots[plot].occupied === true)) {
//       startPoint = allPlots[plot].name;
//       return false;
//     }
//   }
//   return true;
// }
function handleClick() {
  console.log('You clicked ', event.target.id);
  for( var plot in allPlots){
    if(allPlots[plot].id === event.target.id) {
      if (clickedGridPT.indexOf(event.target.id) === -1 ) {
      calcScore(allPlots[plot].occupied, allPlots[plot].retaliate);
      clickedGridPT.push(event.target.id);
      console.log(shipLocations.indexOf(event.target.id));
      if(isInArray(event.target.id, shipLocations)){
        shipLocations.splice(shipLocations.indexOf(event.target.id), 1);
      }
      break;
    }

  }

}
function isInArray (value, array){
  return array.indexOf(value) > -1;
}
// function calls
createPlots();
createClickableGrid(maxHeight, maxWidth);
plotShips();
updatePlotDisplay();

grid.addEventListener('click', handleClick);
//*************************Scoring Structure**************************

function calcScore (occupied, retaliate) {
  var hit = 50;
  var miss = -10;
  var retaliation = -20;

  if(occupied && !retaliate ){
    score += hit;
  }
  if(occupied && retaliate ){
    score += hit + retaliation;
  }
  if(!occupied && !retaliate ){
    score += miss;
  }
  if(!occupied && retaliate ){
    score += miss + retaliation;
  }
  console.log(score);
  return score;
}

//**************************Hit or Miss*******************************
