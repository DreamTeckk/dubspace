function Game(){


    this.draw = function(){

      if(audio.paused == true)
        audio.play();

      ctx.fillStyle = "#000";
      ctx.fillRect(0,0,cvW,cvH)

    /***************************
      AFFICHAGE DU SCORE
    ***************************/
      ctx.font = "20px Arial";
      ctx.fillStyle = "#FFF"
      ctx.fillText("SCORE : " + player.score,cvW / 2 - 50, 20);


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

      //Affichage du joueur
      player.show();

      //Affichage des ennemies
      for(let i = 0; i < ennemies.length; i++){
        ennemies[i].show();
        ennemies[i].move();

        //On test si un ennemie touche le joueur
        if(ennemies[i].hits(player)){
          explosionSound2.play();
          explosionSound2.volume = 0.6;
          player.dimension[0] = 0;
        }
      }

      //Affichage des projectile
      for(let i = 0; i < bullets.length; i++){
        bullets[i].show();
        bullets[i].move();

        //On test si un projectile touche un ennemie
        for(let j = 0; j <  ennemies.length; j++){
          if(bullets[i].hits(ennemies[j])){
            ennemies[j].health -= 1;

            //Si la vie de l'ennemie tombe à 0
            if(ennemies[j].health <= 0){
              explosionSound.play();
              explosionSound.volume = 0.4;
              player.score += ennemies[j].reward;
              ennemies.splice(j, 1);
            }
          }
        }
        if(bullets[i].position[1] <= 0 || bullets[i].toDestroy == true){
          bullets.splice(i, 1);
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
          shoot(player);
        }
      }
  }

}