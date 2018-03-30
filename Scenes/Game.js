function Game(){

    this.waveClear = false;

    let wavePause = 0;

    this.draw = function(){

      //On relance l'audio si on retrourne au jeu
      if(audio.paused == true)
        audio.play();

      ctx.fillStyle = "#000";
      ctx.fillRect(0,0,cvW,cvH)


    /***************************
      AFFICHAGE DE L'ANALYSER
    ***************************/
      offsetR = cvH / 2;
      offsetL = cvH / 2;

      analyser.getByteFrequencyData(dataArray);
      for (var i = 0; i < bufferLength; i++) {

        barHeight = dataArray[i];

        var r = barHeight - 100;
        var g = barHeight;
        var b = 255;

        ctx.fillStyle = "rgba("+ r +"," + g +","+ b +",.7)";
        ctx.fillRect(cvW - barHeight, offsetR, barHeight, barWidth);
        ctx.fillRect(cvW - barHeight, offsetL, barHeight, barWidth);
        ctx.fillRect(0, offsetR, barHeight, barWidth);
        ctx.fillRect(0, offsetL, barHeight, barWidth);

        offsetR += barWidth + 1;
        offsetL -= barWidth + 1;
      }

      /***********************
        AFFICHAGE DU JOUEUR
      ************************/
      player.show();
      player.recoil();

      /**************************
        AFFICHAGE DES ENNEMIES
      ***************************/

      for(let i = 0; i < ennemies.length; i++){
        ennemies[i].show();
        if(actualScene === gameScene){
          ennemies[i].move();
        }

        //On test si un ennemie touche le joueur
        if(ennemies[i].hits(player)){
          if(!player.hit){
            player.health--;
            explosionSound3.volume = 0.6;
            explosionSound3.play();
            if(player.health <= 0){
              explosionSound2.play();
              explosionSound2.volume = 0.6;
              actualScene = gameOverScene;
            }
            player.hit = true;
          }
        }
      }

      /********************************
      AFFICHAGE DES PROJECTILES ALLIERS
      *********************************/
      for(let i = 0; i < bullets.length; i++){
        bullets[i].show();
        if(actualScene === gameScene){
          bullets[i].move();
        }

        //On test si un projectile touche un ennemie
        for(let j = 0; j <  ennemies.length; j++){
          if(bullets[i].hits(ennemies[j])){
            ennemies[j].health -= 1;

            //Si la vie de l'ennemie tombe à 0
            if(ennemies[j].health <= 0){
              explosionSound.volume = 0.4;
              explosionSound.play();
              player.score += ennemies[j].reward;
              ennemies.splice(j, 1);
            }
          }
        }
        if(bullets[i].position[1] <= 0 || bullets[i].toDestroy == true){
          bullets.splice(i, 1);
        }
      }

      /************************************
        AFFICHAGE DES PROJECTILES ENNEMIES
      *************************************/
      for(let i = 0; i < ennemiesBullets.length; i++){
        ennemiesBullets[i].show();
        if(actualScene === gameScene){
          ennemiesBullets[i].move();
        }

        //On test si un projectile touche le joueur
        if(ennemiesBullets[i].hits(player)){
          if(!player.hit){
            explosionSound3.volume = 0.6;
            explosionSound3.play();
            player.health--;
            if(player.health <= 0){
              explosionSound2.volume = 0.6;
              explosionSound2.play();
              actualScene = gameOverScene;
            }
            player.hit = true;
          }
        }

        //Si un projectile ennemie sort du canvas.
        if(ennemiesBullets[i].position[1] >= cvH || ennemiesBullets[i].toDestroy == true){
          ennemiesBullets.splice(i, 1);
        }
      }

      //On test si un ennemi sort de l'écran et doit être détruit
      for(let i = 0; i < ennemies.length; i++){
        if(ennemies[i].position[1] >= cvH){
          ennemies.splice(i, 1);
        }
      }

      //On fait recharger le tir joueur
      player.reload();

      //On regarde si le joueur tire
      if(isShooting){
        if(player.reloaded){
          player.shot();
        }
      }

      /***********************
          NOUVELLE VAGUE ?
      ************************/

      //On test si tout les ennemies sont détruits avant de lancer une nouvelle vague.
      if(ennemies.length === 0){
        if(!this.waveClear){
          this.waveClear = true;
          actualWave ++;
        }
        wavePause ++;
        if(wavePause >= 180){
          wavePause = 0;
          this.waveClear = false;
          this.launchWave(actualWave);
        }
      }

    /************************************
      AFFICHAGE DU SCORE ET DE LA VAGUE
    ************************************/
      ctx.font = "30px BNJinx";
      ctx.fillStyle = "#FFF"
      ctx.fillText("SCORE : " + player.score,cvW / 2 - 240, 20);
      ctx.fillText("WAVE : " + actualWave, cvW / 2 + 100, 20);

      /*************************************
      AFFICHAGE DES POINTS DE VIE DU JOUEUR
      *************************************/
      let shift = 0;

      for(let i = 0; i < player.health; i++){
        ctx.drawImage(hpHeart, cvW - 200 + shift, cvH - 100);
        shift += 40;
      }
  }



  /*********************************************
    FONCTION --- LANCEMENT D'UNE NOUVELLE VAGUE
  **********************************************/

  this.launchWave = function(wave){
    let shift = 0;
    let cpt = 0;
    for(let i = 0; i < wave; i++){
      var ennemie = new Spear([0 + shift,-41],10,2,1);
      ennemies.push(ennemie);
      shift += 50;
    }
    shift = 0;

    let createOnce = setInterval(function(){
      var ennemie = new Mosquito([500,-100],6,3,1)
      ennemies.push(ennemie);
      var ennemie = new Mosquito([510,-50],6,3,1)
      ennemies.push(ennemie);
      cpt++;
      if(cpt >= wave){
        clearInterval(createOnce);
        cpt = 0;
      }
    },50);

    var ennemie = new Boomer([0,0],10,10,1,2);
    ennemies.push(ennemie);
    var ennemie = new Boomer([400,0],10,10,1,2);
    ennemies.push(ennemie);
    var ennemie = new Boomer([800,0],10,10,1,2);
    ennemies.push(ennemie);
    var ennemie = new Boomer([1100,0],10,10,1,2);
    ennemies.push(ennemie);
  }

  /**********************************
    EVENT ---  MOUVEMENTS DU JOUEUR
  ***********************************/
  $('canvas').mousemove(function(e){

    if(actualScene === gameScene){

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
    }
  })

  /*********************
EVENT ---  TIR DU JOUEUR
  *********************/
  $('canvas').mousedown(function(){
    if(actualScene === gameScene){
      isShooting = true;
    }
  })

  $('canvas').mouseup(function(){
    if(actualScene === gameScene){
      isShooting = false;
    }
  })

}
