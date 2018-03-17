function Pause(){

    let hover = false;

    this.draw = function(){

      if(audio.paused == false)
        audio.pause();

      ctx.font = "100px BNJinx";
      ctx.fillStyle = "#FFF"
      ctx.fillText("PAUSED",cvW / 2 - 165, cvH / 2 - 100);

      if(hover){
        ctx.drawImage(htpBtnHover, cvW / 2 - htpBtn.width / 2, cvH / 2);
      }else{
        ctx.drawImage(htpBtn, cvW / 2 - htpBtn.width / 2, cvH / 2);
      }

      $('canvas').mousemove(function(e){
        if(e.pageX >= $(document).width() / 2 - 400 / 2 &&
           e.pageX <= $(document).width() / 2 + 400 / 2 &&
           e.pageY >= cvH / 2 &&
           e.pageY <= cvH / 2 + htpBtn.height){
            hover = true;
          }else{
            hover = false;
          }
      })
  }

}
