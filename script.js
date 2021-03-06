var ctx = null;
var cvH, cvW;
//taille d'une tuille.
var tileW = 64, tileH = 64;
//nombres de tuilles dans la map.
var mapW = 12, mapH = 10;
//Variable pour calculer le framerate
var currentSecond = 0, frameCount = 0, framesLastSecond = 0;
var lastFrameTime = 0;

var audio;
var analyser, analyserSrc, audioCtx, bufferLength, dataArray, barWidth, barHeight;

var htpBtn,htpBtnHover,upgardeBtn,upgradeHoverBtn,hpHeart;


var actualScene;
var gameScene, pauseScene;

var actualWave = 0;

var bullets = [];
var ennemiesBullets = [];
var ennemies = [];

var isShooting = false;

//Création de l'objet joueur.
var player = new Character([40,40],[cvW / 2, cvH - 50],10,1);

//Création des sons
var explosionSound = new Audio('Sounds/explosion1.wav');
var explosionSound2 = new Audio('Sounds/explosion2.wav');
var explosionSound3 = new Audio('Sounds/explosion3.wav');
var select1 = new Audio('Sounds/select1.wav');



$(document).ready(function(){

  //On ajoute les spritesheets correspondant aux élément du jeu
  var playerImg = document.getElementById('playerImg');
  var spear1Img = document.getElementById('spear1Img');
  var boomer1Img = document.getElementById('boomer1Img')
  var bulletImg = document.getElementById('bulletImg');

  //On récupère les différentes images du jeu
  htpBtn = document.getElementById('htp');
  htpBtnHover = document.getElementById('htpBtnHover');
  upgradesBtn = document.getElementById('upgrades');
  upgradesBtnHover = document.getElementById('upgradesBtnHover');
  hpHeart = document.getElementById('hpHeart');

  //taille du canvas
  cvH = $('canvas').height();
  cvW = $('canvas').width();

  ctx = document.getElementById('game').getContext('2d');

  /*********************
CONFIGURATION ---  AUDIO
  *********************/
  audio = document.getElementById('audio');
  audioConf(audio);
  audioCtx = new AudioContext();

  //Création de l'analyser
  analyserSrc = audioCtx.createMediaElementSource(audio);
  analyser = audioCtx.createAnalyser();

  analyserSrc.connect(analyser);
  analyser.connect(audioCtx.destination);

  analyser.fftSize = 1024;
  bufferLength = analyser.frequencyBinCount;
  dataArray = new Uint8Array(bufferLength);

  barWidth = ((cvW * 3)/ bufferLength);


  /*********************
  CREATION DES SCENES
  *********************/
  gameScene = new Game();
  pauseScene = new Pause();
  htpScene = new HowToPlay();
  upgradesScene = new Upgrades();
  gameOverScene = new GameOver();

  actualScene = gameScene;

  //On dessine une première animation
  requestAnimationFrame(drawScene);
})

$(document).keydown(function(e){
  if(e.key === 'p' && actualScene === gameScene){
    actualScene = pauseScene;
  }else if(e.key === 'p' && actualScene !== gameScene && actualScene !== gameOverScene){
    actualScene = gameScene;
  }
});

/*********************
-------DRAWGAME-------
*********************/
function drawScene(){

  actualScene.draw();
  //On dessine une nouvelle fois l'animation
  requestAnimationFrame(drawScene);
}

/********************
---------------------
      FONCTIONS
---------------------
*********************/

//Fonction d'update appelée en boucle.

function audioConf(audio){
  audio.src = "Musics/The Glitch Mob - Head Full of Shadows.mp3";
  audio.load();
  audio.play();
  audio.volume = 1;
}
