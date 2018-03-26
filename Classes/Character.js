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

  //Variable relative au niveau des tires
  this.simpleBulletNbr = 1;
  this.simpleBulletLvl = 1;

  this.turnBulletNbr = 0;
  this.turnBulleLvl = 1;

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

  this.shot = function(){

    this.reloadStatus = 0;

    if(this.simpleBulletNbr == 1){
      bullet = new SimpleBullet([8,8],[player.position[0] + player.dimension[0] / 2 - 4,player.position[1]], 5 + this.simpleBulletLvl * 2);
      bullets.push(bullet);
    }else if(this.simpleBulletNbr === 2){
      bullet = new SimpleBullet([8,8],[player.position[0] ,player.position[1]], 5 + this.simpleBulletLvl * 2);
      bullets.push(bullet);
      bullet = new SimpleBullet([8,8],[player.position[0] + player.dimension[0] - 8 ,player.position[1]], 5 + this.simpleBulletLvl * 2);
      bullets.push(bullet);
    }else if(this.simpleBulletNbr >= 3){
      bullet = new SimpleBullet([8,8],[player.position[0] ,player.position[1]], 5 + this.simpleBulletLvl * 2);
      bullets.push(bullet);
      bullet = new SimpleBullet([8,8],[player.position[0] + player.dimension[0] / 2 - 4,player.position[1]], 5 + this.simpleBulletLvl * 2);
      bullets.push(bullet);
      bullet = new SimpleBullet([8,8],[player.position[0] + player.dimension[0] - 8 ,player.position[1]], 5 + this.simpleBulletLvl * 2);
      bullets.push(bullet);
    }
    let shotSound = new Audio('Sounds/shot1.wav');
    shotSound.play();
    shotSound.volume = 0.5;
  }
}
