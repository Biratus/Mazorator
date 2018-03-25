function Line(x,y,width,height) {    
    Phaser.Sprite.call(this,game,x+width/2,y+height/2,'wall');
    this.width=width;
    this.height=height;
}

Line.prototype = Object.create(Phaser.Sprite.prototype);
Line.prototype.constructor=Line;

Line.prototype.init=function() {    
    this.body.static=true;
    this.body.kinematic=true;
    this.body.setZeroDamping();
    this.body.fixedRotation = true;
    var l = new Phaser.Line(LevelState.instance.maze.prop.centerX,LevelState.instance.maze.prop.centerY,this.x,this.y);
    this.radius=l.length;this.theta=l.angle;
}

Line.prototype.update=function() {
    //this.body.setZeroVelocity();
}

Line.prototype.rotate=function(rad) {
    this.theta+=rad;
    this.rotation+=rad;
    this.body.rotation+=rad;
    this.theta=this.theta%(2*Math.PI);
    var new_X=this.radius*Math.cos(this.theta)+LevelState.instance.maze.prop.width/2;
    var new_Y=this.radius*Math.sin(this.theta)+LevelState.instance.maze.prop.height/2;
    /*if(this.body.x<new_X) this.body.moveRight(new_X-this.body.x);
    else this.body.moveLeft(this.body.x-new_X);
    if(this.body.y<new_Y) this.body.moveDown(new_Y-this.body.y);
    else this.body.moveUp(this.body.y-new_Y);*/
    this.body.x=new_X;
    this.body.y=new_Y;
}