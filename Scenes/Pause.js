function Pause(){

  let htpHover = false;
  let upgradesHover = false;

    this.draw = function(){

      if(audio.paused == false)
        audio.pause();

      ctx.font = "100px BNJinx";
      ctx.fillStyle = "#FFF";
      ctx.fillText("PAUSED",cvW / 2 - 165, cvH / 4 - 100);

      ctx.font = "30px Bolster";
      ctx.fillText("PRESS P TO RESUME",cvW / 2 - 170, cvH - 50);

      ctx.drawImage(htpBtn, cvW / 2 - htpBtn.width / 2, cvH / 2);
      ctx.drawImage(upgradesBtn, cvW / 2 - htpBtn.width / 2, cvH / 2 + 150);

      if(htpHover){
        ctx.drawImage(htpBtnHover, cvW / 2 - htpBtn.width / 2, cvH / 2);
      }else{
        ctx.drawImage(htpBtn, cvW / 2 - htpBtn.width / 2, cvH / 2);
      }

      if(upgradesHover){
        ctx.drawImage(upgradesBtnHover, cvW / 2 - upgradesBtn.width / 2, cvH / 2 + 150);
      }else{
        ctx.drawImage(upgradesBtn, cvW / 2 - upgradesBtn.width / 2, cvH / 2 + 150);
      }

    }



    $('canvas').mousemove(function(e){

      if(actualScene === pauseScene){

        //On test si l'on survol le bouton "How To Play"
        if(e.pageX >= $(document).width() / 2 - 400 / 2 &&
        e.pageX <= $(document).width() / 2 + 400 / 2 &&
        e.pageY >= cvH / 2 &&
        e.pageY <= cvH / 2 + htpBtn.height){
          htpHover = true;
        }else{
          htpHover = false;
        }

        //On test si l'on survol le bouton "Upgrades"
        if(e.pageX >= $(document).width() / 2 - 400 / 2 &&
        e.pageX <= $(document).width() / 2 + 400 / 2 &&
        e.pageY >= cvH / 2 + 150 &&
        e.pageY <= cvH / 2 + 150 + upgradesBtn.height){
          upgradesHover = true;
        }else{
          upgradesHover = false;
        }
      }
    })

    $('canvas').click(function(e){

      if(actualScene === pauseScene){

        //On test si l'on clique sur le bouton "How To Play"
        if(e.pageX >= $(document).width() / 2 - 400 / 2 &&
        e.pageX <= $(document).width() / 2 + 400 / 2 &&
        e.pageY >= cvH / 2 &&
        e.pageY <= cvH / 2 + htpBtn.height){
          select1.volume = 0.4;
          select1.play();
          actualScene = htpScene;
          console.log(actualScene);
        }

        //On test si l'on clique sur le bouston "Upgrades"
        if(e.pageX >= $(document).width() / 2 - 400 / 2 &&
        e.pageX <= $(document).width() / 2 + 400 / 2 &&
        e.pageY >= cvH / 2 + 150 &&
        e.pageY <= cvH / 2 + 150 + upgradesBtn.height){
          select1.volume = 0.4;
          select1.play();
          actualScene = upgradesScene;
          console.log(actualScene);
        }
      }
    })
}
