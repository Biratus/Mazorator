function Line(x,y,width,height) {    
    Phaser.Sprite.call(this,game,x+width/2,y+height/2,'wall');
    this.width=width;
    this.height=height;
}

Line.prototype = Object.create(Phaser.Sprite.prototype);
Line.prototype.constructor=Line;

Line.prototype.init=function() {    
    this.body.static=true;
    this.body.setZeroDamping();
	this.body.fixedRotation = true;
    var l = new Phaser.Line(game.world.centerX,game.world.centerY,this.x,this.y);
    this.radius=l.length;this.theta=l.angle;
}

Line.prototype.update=function() {
    //this.rotate(Math.PI/256);
}

Line.prototype.rotate=function(rad) {
    /*var new_x=this.body.x-this.radius*Math.cos(this.theta+rad);
    var new_y=this.body.y-this.radius*Math.sin(this.theta+rad);
    if(new_x<0) this.body.moveRight(Math.abs(new_x));
    else this.body.moveLeft(new_x);
    if(new_y<0) this.body.moveDown(Math.abs(new_y));
    else this.body.moveUp(new_y);
    console.log(new_x+" "+new_y);*/
    this.theta+=rad;
    this.theta=this.theta%(2*Math.PI);
    this.body.x=this.radius*Math.cos(this.theta)+game.world.width/2;
    this.body.y=this.radius*Math.sin(this.theta)+game.world.height/2;
    
}