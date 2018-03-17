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

var actualScene;
var game;

var isShooting = false;

var bullets = [];
var ennemies = []

//Création de l'objet joueur.
var player = new Character([40,40],[cvW / 2, cvH - 50],10,3);
console.log(player.score);
//Création des sons
var explosionSound = new Audio('Sounds/explosion1.wav');
var explosionSound2 = new Audio('Sounds/explosion2.wav');

var ennemie = new Spear([0,-41],10,2,1);
ennemies.push(ennemie);
var ennemie = new Spear([64,-41],10,2,1);
ennemies.push(ennemie);
var ennemie = new Spear([128,-41],10,2,1);
ennemies.push(ennemie);
var ennemie = new Spear([192,-41],10,2,1);
ennemies.push(ennemie);
var ennemie = new Spear([256,-41],10,2,1);
ennemies.push(ennemie);
var ennemie = new Spear([320,-41],10,2,1);
ennemies.push(ennemie);
var ennemie = new Spear([0,-80],10,2,1);
ennemies.push(ennemie);
var ennemie = new Spear([64,-80],10,2,1);
ennemies.push(ennemie);
var ennemie = new Spear([128,-80],10,2,1);
ennemies.push(ennemie);
var ennemie = new Spear([192,-80],10,2,1);
ennemies.push(ennemie);
var ennemie = new Spear([256,-80],10,2,1);
ennemies.push(ennemie);
var ennemie = new Spear([320,-80],10,2,1);
ennemies.push(ennemie);





$(document).ready(function(){

  //On ajoute les spritesheets correspondant aux élément du jeu
  var playerImg = document.getElementById('playerImg');
  var ennemie1Img = document.getElementById('spear1Img');
  var bulletImg = document.getElementById('bulletImg');

  //taille du canvas
  cvH = $('canvas').height(), cvW = $('canvas').width();

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
  actualScene = gameScene;


  /*********************
EVENT ---  MOUVEMENTS DU JOUEUR
  *********************/
  $('canvas').mousemove(function(e){
    let lastXPos = player.position[0];

    let cursorCorrectionX = (($(document).width() - $('canvas').width()) / 2) + (player.dimension[0] / 2);
    let cursorCorrectionY = player.dimension[1] / 2;

    player.position = [e.pageX - cursorCorrectionX,e.pageY - cursorCorrectionY];

    let newXPos = player.position[0];

    if(newXPos < lastXPos - 2){
      player.animation = "#00ff00";
    }else if(newXPos > lastXPos + 2){
      player.animation = "#0000ff";
    }else{
      player.animation = "#ff0000";
    }

    lastXPos = newXPos;
  })

  /*********************
EVENT ---  TIR DU JOUEUR
  *********************/
  $('canvas').mousedown(function(){
    isShooting = true;
  })

  $('canvas').mouseup(function(){
    isShooting = false;
  })

  $(document).keydown(function(e){
    console.log("pressed");
    if(e.key === 'p' && actualScene != pauseScene){
      actualScene = pauseScene;
    }else if(e.key === 'p' && actualScene === pauseScene){
      actualScene = gameScene;
    }
  });


  //On dessine une première animation
  requestAnimationFrame(drawScene);
})

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

function shoot(entity){
  entity.reloadStatus = 0;
  bullet = new SimpleBullet([8,8],[player.position[0] ,player.position[1]],15);
  bullets.push(bullet);
  bullet = new SimpleBullet([8,8],[player.position[0] + player.dimension[0] - 8 ,player.position[1]],15);
  bullets.push(bullet);
  let shotSound = new Audio('Sounds/shot1.wav');
  shotSound.play();
  shotSound.volume = 0.5;
}
