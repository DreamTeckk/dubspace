function SimpleBullet(dimension,position,speed) {
  this.dimension = dimension;
  this.position = position;
  this.speed = speed;

  this.show = function(){
    ctx.drawImage(
      bulletImg,
      this.position[0],
      this.position[1],
      this.dimension[0],
      this.dimension[1]);
  }

  this.move = function(){
    this.position = [this.position[0],this.position[1]-this.speed];
  }

  this.hits = function(entity){
    if(((this.position[0] <= entity.position[0] + entity.dimension[0]) && (this.position[0] >= entity.position[0])) && ((this.position[1] <= entity.position[1] + entity.dimension[1]) && (this.position[1] >= entity.position[1]))){
      this.toDestroy = true;
      return true;
    }
  }
}
