function Game(){

    this.draw = function(){

      ctx.fillStyle = "#000";
      ctx.fillRect(0,0,cvW,cvH)

      //affichage de l'analyser

      offsetR = cvH / 2;
      offsetL = cvH / 2;

      analyser.getByteFrequencyData(dataArray);
      for (var i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i];

        var r = 100;
        var g = barHeight - 100 ;
        var b = barHeight * 2;
        ctx.fillStyle = "rgba("+ r +"," + g +","+ b +",.6)";
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
          explosionSound2.volume = 0.8;
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
            explosionSound.play();
            explosionSound.volume = 0.4;
            ennemies.splice(j, 1);
          }
        }
        if(bullets[i].position[1] <= 0 || bullets[i].toDestroy == true){
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
  }

}
