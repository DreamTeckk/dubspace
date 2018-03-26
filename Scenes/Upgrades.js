function Upgrades(){

  this.draw = function(){

    ctx.fillStyle = "#ff0000";
    ctx.fillRect(cvW*(1/6), cvH*(1/6), cvW*(4/6), cvH*(4/6));

    ctx.fillStyle = "#00ff00";
    ctx.fillRect(cvW*(1/6) + 25 ,cvH*(4/6), 100, 100);
  }

  $('canvas').click(function(e){

    if(actualScene === upgradesScene){

      //

      //On test si l'on clique sur le bouton "Back"
      if(e.pageX >= $(document).width() / 2 - cvW / 2 + cvW*(1/6) + 25 &&
      e.pageX <= $(document).width() / 2 - cvW / 2 + cvW*(1/6) + 125 &&
      e.pageY >= cvH*(4/6) &&
      e.pageY <= cvH*(4/6) + 100){
        select1.volume = 0.4;
        select1.play();
        gameScene.draw();
        actualScene = pauseScene;
        player.simpleBulletNbr++;
        player.simpleBulletLvl++;
        console.log(player.simpleBulletLvl)
      }
    }
  })
}
