function Character(dimension,position,animationSheet,reloadSpeed){

  //taille du joueur en pixels.
  this.dimension = dimension;
  //position du joueur en pixels.
  this.position = position;
  //animation frames
  this.animation = animationSheet;
  //temps entre deux tire (plus la valeur est élevée plus la temps d'attente entre deux tire est long)
  this.reloadSpeed = reloadSpeed;
  //temps écoulé après un tire
  this.reloadStatus = this.reloadSpeed;

  this.reloaded = true;

  this.show = function(){
    ctx.fillStyle = player.animation;
    ctx.drawImage(playerImg,this.position[0],this.position[1],this.dimension[0],this.dimension[1]);
  }

  this.reload = function(){
    if(this.reloadStatus >= this.reloadSpeed){
      this.reloaded = true;
    }else{
      this.reloadStatus++;
      this.reloaded = false;
    }
  }
}
