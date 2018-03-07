function Ennemie(dimension,position){
  this.dimension = dimension;
  this.position = position;

  this.show = function(){
    ctx.fillStyle = "#00f";
    ctx.fillRect(this.position[0],this.position[1],this.dimension[0],this.dimension[1])
  }
}
