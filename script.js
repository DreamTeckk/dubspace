var ctx = null;
var cvH, cvW;
//taille d'une tuille.
var tileW = 64, tileH = 64;
//nombres de tuilles dans la map.
var mapW = 12, mapH = 10;
//Variable pour calculer le framerate
var currentSecond = 0, frameCount = 0, framesLastSecond = 0;
var lastFrameTime = 0;

var isShooting = false;

var bullets = [];
var ennemies = []

//Création de l'objet joueur.
var player = new Character([40,40],[0,0],"#ff0000",0.5);

var ennemie = new Ennemie([64,64],[0,0]);
ennemies.push(ennemie);
var ennemie = new Ennemie([64,64],[65,0]);
ennemies.push(ennemie);
var ennemie = new Ennemie([64,64],[130,0]);
ennemies.push(ennemie);
var ennemie = new Ennemie([64,64],[195,0]);
ennemies.push(ennemie);
var ennemie = new Ennemie([64,64],[260,0]);
ennemies.push(ennemie);


$(document).ready(function(){
  //On ajoute les spritesheets correspondant aux élément du jeu
  var playerImg = document.getElementById('playerImg');
  //taille du canvas
  cvH = $('canvas').height(), cvW = $('canvas').width();

  ctx = document.getElementById('game').getContext('2d');

  /*********************
CONFIGURATION ---  AUDIO
  *********************/
  var audio = document.getElementById('audio');
  audioConf(audio);
  var audioCtx = new AudioContext();

  //Création de l'analyser
  var equalizerSrc = audioCtx.createMediaElementSource(audio);
  var equalizer = audioCtx.createAnalyser();

  equalizerSrc.connect(equalizer);
  equalizer.connect(audioCtx.destination);

  equalizer.fftSize = 512;
  var bufferLength = equalizer.frequencyBinCount;
  var dataArray = new Uint8Array(bufferLength);

  var barWidth = ((cvW * 2)/ bufferLength);
  var barHeight;

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

  //On dessine une première animation
  requestAnimationFrame(drawGame);

  function drawGame(){

    ctx.fillStyle = "#000";
    ctx.fillRect(0,0,cvW,cvH)

    //affichage de l'égalisateur
    offsetR = cvH / 2;
    offsetL = cvH / 2;

    equalizer.getByteFrequencyData(dataArray);
    for (var i = 0; i < bufferLength; i++) {
      barHeight = dataArray[i] - 100;

      var r = barHeight * 2;
      var g = barHeight - 100 ;
      var b = 100;
      ctx.fillStyle = "rgba("+ r +"," + g +","+ b +",.7)";
      ctx.fillRect(cvW - barHeight, offsetR, barHeight, barWidth);
      ctx.fillRect(cvW - barHeight, offsetL, barHeight, barWidth);
      ctx.fillRect(0, offsetR, barHeight, barWidth);
      ctx.fillRect(0, offsetL, barHeight, barWidth);

      offsetR += barWidth + 1;
      offsetL -= barWidth + 1;
    }

    //Affichage du joueur
    player.show();

    for(let i = 0; i < ennemies.length; i++){
      ennemies[i].show();
    }

    //Affichage des projectile
    for(let i = 0; i < bullets.length; i++){
      bullets[i].show();
      bullets[i].move();
      for(let j = 0; j <  ennemies.length; j++){
        if(bullets[i].hits(ennemies[j])){
          ennemies.splice(j, 1);
        }
      }
      if(bullets[i].position[1] <= 0 || bullets[i].toDestroy == true){
        console.log(bullets[i].toDestroy);
        bullets.splice(i, 1);
      }
    }

    //On fait recharger le tir joueur
    player.reload();

    //On regarde si le joueur tire
    if(isShooting){
      if(player.reloaded){
        shoot(player);
      }
    }
    //On dessine une nouvelle fois l'animation
    requestAnimationFrame(drawGame);
  }
})

/********************
---------------------
      FONCTIONS
---------------------
*********************/

//Fonction d'update appelée en boucle.

function audioConf(audio){
  audio.src = "Musics/song2.mp3";
  audio.load();
  audio.play();
}

function shoot(entity){
  entity.reloadStatus = 0;
  bullet = new SimpleBullet([8,8],[player.position[0] ,player.position[1]],25);
  bullets.push(bullet);
  bullet = new SimpleBullet([8,8],[player.position[0] + player.dimension[0] - 8 ,player.position[1]],25);
  bullets.push(bullet);
}
