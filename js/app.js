'use strict';
var shipPosTemplates = [
  [8, 16, 24,
    42, 43, 44, 45,
    19, 20, 21,
    31, 39, 47, 55, 63],
  [9, 17, 25,
    19, 27, 35,
    22, 30, 38, 46,
    59, 60, 61, 62, 63],
  [1, 2, 3, 4,
    27, 28, 29,
    48, 49, 50, 51,
    14, 22, 30, 38, 46]
];
var shipLocations;
var allShips = [];
var allPlots = [];
var xPosArr = ['A', 'B', 'C', 'D' ,'E', 'F', 'G', 'H'];
var maxHeight = 8;
var maxWidth = 8;
var grid = document.getElementById('clickable_Grid');
var elHealthBar = document.getElementById('health');
var elScore = document.getElementById('score');
var score = 100;
elScore.textContent = score;
var health = 100;
elHealthBar.textContent = health;
var clickedGridPT = [];
var userNameArr = [];
var userScoreArr = [];
var userName = localStorage.getItem('user_name');
userNameArr.push(JSON.parse(userName));
console.log(userNameArr);

function Ship(name, size) {
  this.name = name;
  this.size = size;
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

function randShipPlacement() {
  shipLocations = shipPosTemplates[(Math.floor(Math.random() * shipPosTemplates.length))];
}

// Randomize Retaliation
function randRetal() {
  var retalPointsArr = [];

  for (var i = 0; i < 4; i++) {
    var retalPos = (Math.floor(Math.random() * allPlots.length));

    while (retalPointsArr.indexOf(retalPos) >= 0) {
      retalPos = (Math.floor(Math.random() * allPlots.length));
    }
    console.log(retalPos);
    retalPointsArr.push(retalPos);
    allPlots[retalPos].retaliate = true;
  }
}

function createClickableGrid(rows, cols) {
  var i = 0;
  for (var r = 0; r < rows; r++) {
    var tr = grid.appendChild(document.createElement('tr'));
    for (var c = 0; c < cols; c++){
      var cell = tr.appendChild(document.createElement('td'));
      cell.id = xPosArr[r] + c;
      // cell.innerHTML = i;  // Used for easy id of the cell numbers
      i++;
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
  for (var ship in shipLocations) {
    allPlots[shipLocations[ship]].occupied = true;
  }
}

function checkGameStatus(){
  if (health === 0){
    userScoreArr.push(score);
    var audio = new Audio('assets/gameover.mp3');
    audio.play();
    setTimeout(function () {
      alert(userNameArr[0] + ' you lost!' + '\n' + 'Your score was: ' + userScoreArr[0]);
    },200);
    removeListener();
    return;
  }

  if (shipLocations.length === 0){
    userScoreArr.push(score);
    setTimeout(function () {
      alert(userNameArr[0] + ' you WON!' + '\n' + 'Your score was: ' + userScoreArr[0]);
    },200);
    removeListener();
  }
}
function toggleDisplayHitMiss(target) {
  var audioBoom = new Audio('assets/boom.mp3');
  var audioSplash = new Audio('assets/splash.mp3');
  console.log(target,'toggle display target');
  if (target.occupied === true) {
    document.getElementById(target.id).className = 'hit';
    audioBoom.play();
  }
  else {
    document.getElementById(target.id).className = 'miss';
    audioSplash.play();
  }
}

function removeListener(){
  grid.removeEventListener('click',handleClick);
}

function handleClick() {
  console.log('You clicked ', event.target.id);
  for( var plot in allPlots) {
    if ((allPlots[plot].id === event.target.id) && (clickedGridPT.indexOf(event.target.id) === -1 )) {
      var target = allPlots[plot];
      calcScore(allPlots[plot].occupied, allPlots[plot].retaliate);
      toggleDisplayHitMiss(target);
      clickedGridPT.push(event.target.id);

      if (isInArray(parseInt(plot), shipLocations)) {
        shipLocations.splice(shipLocations.indexOf(parseInt(plot)), 1);
      }
      break;
    }
  }
  checkGameStatus();
}
function isInArray (value, array){
  return array.indexOf(value) > -1;
}
function updateHealthBar() {
  if (health < 100 && health > 25)
    elHealthBar.className = 'yellowbar';
  if (health <= 25)
    elHealthBar.className = 'redbar';
}
//*************************Scoring Structure**************************
function calcScore (occupied, retaliate) {
  var hit = 50;
  var miss = -10;
  var retaliation = -25;
  var audioRetaliate = new Audio('assets/pew_pew.mp3');

  if(occupied){
    score += hit;
  } else { score += miss;}

  if(retaliate){
    health += retaliation;
    audioRetaliate.play();
  }
  console.log(score, 'current score');
  console.log(health, 'current health');
  updateHealthBar();
  elHealthBar.value = health;
  elScore.textContent = score;
}
// function calls
createPlots();
createClickableGrid(maxHeight, maxWidth);
randShipPlacement();
plotShips();
randRetal();
// updatePlotDisplay();

grid.addEventListener('click', handleClick);
