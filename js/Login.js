'use strict';

//*************************USER INPUT****************************
var formData = document.getElementById('userinput');

formData.addEventListener('submit', inputNewUserData);

function inputNewUserData (event) {
  event.preventDefault();}
//******************************music loop*******************************
var audio = document.getElementById("myMusic");
audio.autoplay = true;
audio.load();
//****************************Difficulty***************************
