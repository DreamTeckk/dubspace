function Pause(){


    this.draw = function(){

      if(audio.paused == false)
        audio.pause();

      ctx.font = "40px Arial";
      ctx.fillStyle = "#FFF"
      ctx.fillText("PAUSED",cvW / 2 - 100, cvH / 2 - 100);
  }
}
