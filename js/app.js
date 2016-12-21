'use strict';
var shipPosTemplates = [
  [8, 16, 24, 42, 43, 44, 45, 19, 20, 21, 31, 39, 47, 55, 63],
  [9, 17, 25, 30, 38, 46, 19, 22, 27, 35, 59, 60, 61, 62, 63]
];
// var shipPosTemplate2 = [9, 17, 25, 30, 38, 46, 19, 22, 27, 35, 59, 60, 61, 62, 63];
var shipLocations = shipPosTemplates[0];
var allShips = [];
var allPlots = [];
var xPosArr = ['A', 'B', 'C', 'D' ,'E', 'F', 'G', 'H'];
var maxHeight = 8;
var maxWidth = 8;
var grid = document.getElementById('clickable_Grid');
var score = 100;
var health = 100;
var clickedGridPT = [];

function Ship(name, size) {
  this.name = name;
  this.size = size;
  // this.hitTally = 0;  //Not used yet
  // this.sunk = false;  //Not used yet
  // this.updateSunk = function() {};  //Not used yet
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

new Ship('USS Juan', 3);
new Ship('USS Darcy', 3);
new Ship('USS Chika', 4);
new Ship('USS Brian', 5);
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

// Randomize Retaliation
function randRetal() {
  for (var i = 0; i < 4; i++) {
    var retalPos = (Math.floor(Math.random() * allPlots.length));
    console.log(retalPos);
    allPlots[retalPos].retaliate = true;
    // console.log(allPlots[retalPos],'Retaliate!');
  }
}
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
  var i = 0;
  for (var r = 0; r < rows; r++) {
    var tr = grid.appendChild(document.createElement('tr'));
    for (var c = 0; c < cols; c++){
      var cell = tr.appendChild(document.createElement('td'));
      cell.id = xPosArr[r] + c;
      // cell.innerHTML = i;  // Used for easy id of the cell numbers
      i++;
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
// updatePlotDisplay used for showing the ship positions for demo and development purposes only.
function updatePlotDisplay() {
  var temp;
  for(var i in allPlots) {
    if (allPlots[i].occupied === true) {
      temp = allPlots[i].x;
      temp += allPlots[i].y;
      var cellID = document.getElementById(temp);
      cellID.style.background = 'navy';
    }
  }
}

function plotShips() {
  // var startPoint;
  for (var ship in shipLocations) {
    // console.log(shipLocations[ship],'ship in shipLocations')
    allPlots[shipLocations[ship]].occupied = true;
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
function checkGameStatus(){
  if (shipLocations.length === 0){
    alert('You WON!');
  }

  if (health === 0){
    var audio = new Audio('assets/gameover.mp3');
    audio.play();
    alert('You Lose!');
  }
}

function toggleDisplayHitMiss(target) {
  console.log(target,'toggle display target');
  if (target.occupied === true) {
    document.getElementById(target.id).className = 'hit';
  }
  else document.getElementById(target.id).className = 'miss';

}

function handleClick() {
  console.log('You clicked ', event.target.id);
  for( var plot in allPlots) {
    if ((allPlots[plot].id === event.target.id) && (clickedGridPT.indexOf(event.target.id) === -1 )) {
      var target = allPlots[plot];
      console.log(allPlots[plot],'handleclick allplots[plot]');
      console.log(target),'handleclick target';
      calcScore(allPlots[plot].occupied, allPlots[plot].retaliate);
      clickedGridPT.push(event.target.id);
      console.log(plot,'array position');

      if (isInArray(parseInt(plot), shipLocations)) {
        console.log(shipLocations.indexOf(plot),'indexOf shipLocations');
        shipLocations.splice(shipLocations.indexOf(parseInt(plot)), 1);
      }
      break;
    }
  }
  toggleDisplayHitMiss(target);
  checkGameStatus();
}
function isInArray (value, array){
  return array.indexOf(value) > -1;
}
// function calls
createPlots();
createClickableGrid(maxHeight, maxWidth);
plotShips();
randRetal();
// updatePlotDisplay();

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
    health -= 25;
  }
  if(!occupied && !retaliate ){
    score += miss;
  }
  if(!occupied && retaliate ){
    score += miss + retaliation;
    health -= 25;
  }
  console.log(score, 'current score');
  console.log(health, 'current health');
  // return score;
}

//**************************Hit or Miss*******************************
