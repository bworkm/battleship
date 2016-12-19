'use strict';

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
  this.occupied = false;
  this.updateOccupied = function() {};
  allPlots.push(this);
}

new Ship('USS Test', 2);
//*********************************
// Functions for Placing Ships

// Randomize for X
function randomizeForX() {
  var xPos = (Math.floor(Math.random() * maxWidth) + 1);
  console.log(xPos,'X value');
}

// Randomize for Y
function randomizeForY() {
  var yPos = (Math.floor(Math.random() * maxHeight) + 1);
  console.log(yPos,'Y value');
}

// Randomize for Direction (1 thru 4)
function randomDirection() {
  var direction = (Math.floor(Math.random() * 4) + 1);  //Randomizes 1 thru 4
  console.log(direction,'Direction value');
  return direction;
}
randomDirection();
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

// function calls
createPlots();
