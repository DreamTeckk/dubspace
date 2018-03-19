function Character(dimension,position,reloadSpeed,animationDuration){

  //taille du joueur en pixels.
  this.dimension = dimension;
  //position du joueur en pixels.
  this.position = position;
  //temps entre deux tire (plus la valeur est élevée plus la temps d'attente entre deux tire est long)
  this.reloadSpeed = reloadSpeed;
  //temps écoulé après un tire
  this.reloadStatus = this.reloadSpeed;

  this.frameIndex = 0;
  this.animationDuration = animationDuration;
  this.animationStatus = 0;
  this.reloaded = true;
  this.score = 0;
  this.health = 1;

  this.show = function(){

    if(this.animationStatus > this.animationDuration){
      this.animationStatus = 0;
      this.frameIndex++
      if(this.frameIndex > 2){
        this.frameIndex = 0;
      }
    }
    ctx.drawImage(
      playerImg,
      this.frameIndex * this.dimension[0],
      0,
      this.dimension[0],
      this.dimension[1],
      this.position[0],
      this.position[1],
      this.dimension[0],
      this.dimension[1]);
    this.animationStatus++;
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
