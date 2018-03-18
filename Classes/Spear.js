function Spear(position,speed,reward,health){

  this.position = position;
  this.speed = speed;
  this.reward = reward;
  this.health = health;

  this.dimension = [41,41];

  this.animationDuration = 2;
  this.frameIndex = 0;
  this.animationStatus = 0;
  this.reloaded = true;
  this.direction = "R";


  this.show = function(){

    if(this.animationStatus > this.animationDuration){
      this.animationStatus = 0;
      this.frameIndex++
      if(this.frameIndex > 8){
        this.frameIndex = 0;
      }
    }

    ctx.drawImage(
      spear1Img,
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

  this.move = function(){

    if(this.position[0] + this.dimension[0] >= cvW){
      this.direction = "L";
    }else if(this.position[0] <= 0){
      this.direction = "R"
    }

    if(this.direction === "R"){
      this.position[0] += 1 * this.speed;
      this.position[1] += (0.25 * this.speed) / 2 ;
    }else{
      this.position[0] -= 1 * this.speed;
      this.position[1] += (0.25 * this.speed) / 2 ;
    }

  }

  this.hits = function(entity){

    if(((this.position[0] >= entity.position[0] && this.position[0] <= entity.position[0] + entity.dimension[0]) &&
        (this.position[1] +this.dimension[1] >= entity.position[1] && this.position[1] <= entity.position[1] + entity.dimension[1])) ||
        ((this.position[0] + this.dimension[0] >= entity.position[0] && this.position[0] + this.dimension[0] <= entity.position[0] + entity.dimension[0]) &&
            (this.position[1] + this.dimension[1] >= entity.position[1] && this.position[1] <= entity.position[1] + entity.dimension[1]))){
      return true;
    }

  }
}
