function Mosquito(position,speed,reward,health){

  this.position = position;
  this.speed = speed;
  this.reward = reward;
  this.health = health;

  this.dimension = [21,21];

  this.animationDuration = 2;
  this.frameIndex = 0;
  this.animationStatus = 0;
  this.reloaded = true;
  this.direction = "R";

  this.directionUp = false;
  this.cpt = 0;

  this.show = function(){

    if(this.cpt >= 10){
      this.cpt = 0;
      if(this.directionUp)
        this.directionUp = false;
      else
        this.directionUp = true;
    }

    this.cpt++;

    if(this.animationStatus > this.animationDuration){
      this.animationStatus = 0;
      this.frameIndex++
      if(this.frameIndex > 8){
        this.frameIndex = 0;
      }
    }

    /*
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
    */

    //on dessine un carré en attendant que le vaisseau soit designé 
    ctx.fillStyle = "#0F0";
    ctx.fillRect(this.position[0], this.position[1], this.dimension[0], this.dimension[1]);
  }

  this.move = function(){

    if(this.position[0] + this.dimension[0] >= cvW){
      this.direction = "L";
    }else if(this.position[0] <= 0){
      this.direction = "R"
    }

    if(this.direction === "R"){
      if(this.directionUp){
        this.position[0] += 1 * this.speed;
        this.position[1] -= 2 * this.speed / 2;
      }else{
        this.position[0] += 1 * this.speed;
        this.position[1] += 3 * this.speed / 2;
      }
    }else{
      if(this.directionUp){
        this.position[0] -= 1 * this.speed;
        this.position[1] -= 2 * this.speed / 2;
      }else{
        this.position[0] -= 1 * this.speed;
        this.position[1] += 3 * this.speed / 2;
      }
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
