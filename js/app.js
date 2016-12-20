'use strict';
// var shipLocations = ['B1', 'C1', 'D1','E2','E3','A4','B4','C4','D4'];
var shipLocations = [6, 11, 16, 22, 23, 4, 9, 14, 19];
var allShips = [];
var allPlots = [];
var xPosArr = ['A', 'B', 'C', 'D' ,'E'];
var maxHeight = 5;
var maxWidth = 5;

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
  allPlots.push(this);
}

new Ship('USS Juan', 2);
new Ship('USS Darcy', 3);
new Ship('USS Chika', 4);
//*********************************
// Functions for Placing Ships
function checkYDirection(startPoint, whichway) {
  // Start at origin and look either up or down based on 'direction' from randomDirection.
  // Check for as many positions as required by ship.size.
  var tempDirectionArr = [];

  if (whichway === 'up') {
    // check the spaces above origin until necessity is met.
    // Stop if space is not available and go the opposite direction.
    // Keep track of already approved open positions.
    // Y + 1

  }
  if (whichway === 'down') {
    // check the spaces below origin until necessity is met.
    // Stop if space is not available and go the opposite direction.
    // Y - 1
  }
}

function checkXDirection(startPoint, whichway) {
  if (whichway === 'left') {
    // check the spaces to the left of origin until necessity is met.
    // Stop if space is not available and go the opposite direction.
    // X - 1
  }
  if (whichway === 'right') {
    // check the spaces to the right of origin until necessity is met.
    // Stop if space is not available and go the opposite direction.
    // X + 1
  }
}

// Randomize for X
function randomizeForX() {
  var xPos = (Math.floor(Math.random() * maxWidth));
  // console.log(xPosArr[xPos],'X value');
  return xPos;
}

// Randomize for Y
function randomizeForY() {
  var yPos = (Math.floor(Math.random() * maxHeight));
  // console.log(yPos,'Y value');
  return yPos;
}

// Randomize for Direction (1 thru 4)
function randomDirection(startPoint) {
  var direction;
  var temp = (Math.floor(Math.random() * 4) + 1);  //Randomizes 1 thru 4
  if (temp === 1)
    direction = 'up';
  if (temp === 2)
    direction = 'left';
  if (temp === 3)
    direction = 'right';
  if (temp === 4)
    direction = 'down';

  if (direction === 'up' | direction === 'down')
    checkYDirection(startPoint, direction);

  if (direction === 'left' | direction === 'right')
    checkXDirection(startPoint, direction);

  return direction;
}
// Check for nearby open spaces X
// Check for nearby open spaces Y
// seatsTaken() for updating occupied spots

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
      var tableID = document.getElementById(temp);
      // console.log(tableID);
      tableID.style.background = 'navy';
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

function validStartingPoint(xCoord, yCoord) {
  for (var plot in allPlots) {
    if ((allPlots[plot].x === xCoord) && (allPlots[plot].y === yCoord) && (allPlots[plot].occupied === true)) {
      startPoint = allPlots[plot].name;
      return false;
    }
  }
  return true;
}
// function calls
createPlots();
plotShips();
updatePlotDisplay();
