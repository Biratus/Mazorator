function InitCell(x,y) {
    this.xIndex=x;
    this.yIndex=y;
    this.visited=false;
    this.current=false;
    this.init();
}

InitCell.CELL_SIZE;

InitCell.SIDE_LEFT=1<<0;
InitCell.SIDE_RIGHT=1<<1;
InitCell.SIDE_UP=1<<2;
InitCell.SIDE_DOWN=1<<3;

InitCell.prototype.init=function() {
    this.renderer=new Phaser.Rectangle(this.xIndex*InitCell.CELL_SIZE,this.yIndex*InitCell.CELL_SIZE,InitCell.CELL_SIZE+1,InitCell.CELL_SIZE+1);
    this.color=0xffffff;
    this.sides=0b1111;
}

InitCell.prototype.draw=function(graphic) {
    if(this.current) this.color=0x00ff00;
    else if(this.visited) this.color=0x990099;
    graphic.beginFill(this.color);
    graphic.drawShape(this.renderer);
    graphic.lineStyle(InitCell.CELL_SIZE*lineRatio, 0x000000, 1);
    
    if(this.sides & InitCell.SIDE_LEFT){
       this.drawLineLeft(graphic);
    } 
    if(this.sides & InitCell.SIDE_RIGHT) {
        this.drawLineRight(graphic);
    }
    if(this.sides & InitCell.SIDE_UP) {
        this.drawLineTop(graphic);
    }
    if(this.sides & InitCell.SIDE_DOWN) {
        this.drawLineDown(graphic);
    }
    graphic.lineStyle(0,0x000000,1);
}

InitCell.prototype.removeSide=function(side) {
    this.sides-=side;
}
InitCell.prototype.drawLineLeft=function(graphic) {
    
        graphic.moveTo(this.xIndex*InitCell.CELL_SIZE,this.yIndex*InitCell.CELL_SIZE);
        graphic.lineTo(this.xIndex*InitCell.CELL_SIZE,this.yIndex*InitCell.CELL_SIZE+InitCell.CELL_SIZE);
}

InitCell.prototype.drawLineTop=function(graphic) {
    
        graphic.moveTo(this.xIndex*InitCell.CELL_SIZE,this.yIndex*InitCell.CELL_SIZE);
        graphic.lineTo(this.xIndex*InitCell.CELL_SIZE+InitCell.CELL_SIZE,this.yIndex*InitCell.CELL_SIZE);
}

InitCell.prototype.drawLineDown=function(graphic) {
    
        graphic.moveTo(this.xIndex*InitCell.CELL_SIZE,this.yIndex*InitCell.CELL_SIZE+InitCell.CELL_SIZE);
        graphic.lineTo(this.xIndex*InitCell.CELL_SIZE+InitCell.CELL_SIZE,this.yIndex*InitCell.CELL_SIZE+InitCell.CELL_SIZE);
}

InitCell.prototype.drawLineRight=function(graphic) {
    
        graphic.moveTo(this.xIndex*InitCell.CELL_SIZE+InitCell.CELL_SIZE,this.yIndex*InitCell.CELL_SIZE);
        graphic.lineTo(this.xIndex*InitCell.CELL_SIZE+InitCell.CELL_SIZE,this.yIndex*InitCell.CELL_SIZE+InitCell.CELL_SIZE);
}
var lineRatio=0.02;