function Line(x,y,width,height) {    
    Phaser.Sprite.call(this,game,x,y,'wall');

    this.width=width;
    this.height=height;
}

Line.prototype = Object.create(Phaser.Sprite.prototype);
Line.prototype.constructor=Line;

Line.prototype.init=function() {    
    if(this.width>this.height) this.anchor.setTo(0,0.5);
    else this.anchor.setTo(0.5,0);
    this.body.static=true;
}