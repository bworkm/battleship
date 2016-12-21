'use strict';


//*************************USER INPUT****************************
var formData = document.getElementById('userinput');

formData.addEventListener('submit', inputNewUserData);

function inputNewUserData (event) {
  event.preventDefault();
  var userName = event.target.name.value;
  localStorage.setItem('user_name',JSON.stringify(userName));
  console.log(localStorage.user_name);
  goToPage ();
}

function goToPage () {
  location.href='game.html';
}
//******************************music loop*******************************
var audio = document.getElementById('myMusic');
audio.autoplay = true;
audio.load();
//****************************Difficulty***************************
