function GameOver(){

  this.draw = function(){
    ctx.font = "100px BNJinx";
    ctx.fillStyle = "#FFF";
    ctx.fillText("GAME OVER",cvW / 2 - 250, cvH / 2 + 50);

    ctx.font = "50px Bolster";
    ctx.fillText("SCORE : " + player.score,cvW / 2 - 130, cvH / 2 + 150);
  }
}
