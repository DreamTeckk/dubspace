function Boomer(position,speed,reward,health,reloadSpeed){

  this.position = position;
  this.speed = speed;
  this.reward = reward;
  this.health = health;
  this.reloadSpeed = reloadSpeed;

  this.dimension = [41,41];

  this.animationDuration = 4;
  this.frameIndex = 0;
  this.frameLine = 0;
  this.animationStatus = 0;

  let shot = false;

  setInterval(function(){shot = true;}, 1000 * reloadSpeed);

  this.show = function(){

    if(shot){

      //Si l'ennemie effectue un tir, la ligne de spritesheet change pour annimé un tire.
      this.frameLine = 1;

      if(this.animationStatus > this.animationDuration){
        this.animationStatus = 0;
        this.frameIndex++
        if(this.frameIndex > 4){
          shot = false;
          this.frameIndex = 0;
        }
      }

      console.log(shot);

      ctx.drawImage(
        boomer1Img,
        this.frameIndex * this.dimension[0],
        this.dimension[1] * this.frameLine,
        this.dimension[0],
        this.dimension[1],
        this.position[0],
        this.position[1],
        this.dimension[0],
        this.dimension[1]);
      this.animationStatus++;

    }else{

      this.frameLine = 0;

      if(this.animationStatus > this.animationDuration){
        this.animationStatus = 0;
        this.frameIndex++
        if(this.frameIndex > 4){
          this.frameIndex = 0;
        }
      }

      ctx.drawImage(
        boomer1Img,
        this.frameIndex * this.dimension[0],
        this.dimension[1] * this.frameLine,
        this.dimension[0],
        this.dimension[1],
        this.position[0],
        this.position[1],
        this.dimension[0],
        this.dimension[1]);
        this.animationStatus++;
    }

  }

  this.move = function(){
    return;
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
