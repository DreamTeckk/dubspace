function HowToPlay(){

  this.pageIndex = 0;

  this.draw = function(){

    ctx.fillStyle = "#F00";
    ctx.fillRect(cvW*(1/6), cvH*(1/6), cvW*(4/6), cvH*(4/6));

  }
}
