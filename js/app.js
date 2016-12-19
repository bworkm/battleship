'use strict';

var allShips = [];
var allPlots = [];

function Ship(name, size) {
  this.name = name;
  this.size = size;
  this.hitTally = 0;
  this.sunk = false;
  this.updateSunk = function() {

  };
  this.push(allShips);
}

function Plot(x, y) {
  this.x = x;
  this.y = y;
  this.occupied = false;
  this.updateOccupied = function() {

  };
  this.push(allPlots);
}

//*********************************
// Functions for Placing Ships

Randomize for X
Randomize for Y
Randomize for Direction (1 thru 4)
Check for nearby open spaces X
Check for nearby open spaces Y
seatsTaken() for updating occupied spots
