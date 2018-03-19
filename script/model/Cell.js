function Cell(x,y,sides) {
    this.x=x;
    this.y=y;
    this.sides=sides;
    this.color=0xffffff;
    this.renderer=new Phaser.Rectangle(this.x,this.y,InitCell.CELL_SIZE+1,InitCell.CELL_SIZE+1);
    
    this.eventManager=new EventManager(this);
    /*this.eventManager.addEvent(new Event(Event.Type.EnterEvent,function(){
        this.color=0xffff00;
    },Event.Priority.HIGH));
    this.eventManager.addEvent(new Event(Event.Type.LeaveEvent,function(){
        this.color=0xff00ff;
    },Event.Priority.LOW));*/
    this.properties=[];
    
}

Cell.prototype.isClosedTo=function(side) {
    return this.sides & side;
}

Cell.fromInitCell=function(cell) {
    return new Cell(cell.xIndex*InitCell.CELL_SIZE,cell.yIndex*InitCell.CELL_SIZE,cell.sides);
    
}

Cell.prototype.add=function(key,value) {
    this.properties[key]=value;
}

Cell.prototype.get=function(key) {
    if(this.properties[key]) return this.properties[key];
    else return null;
}

Cell.prototype.is=function(key) {
    return this.properties[key]===true;
}
 
Cell.prototype.draw=function(graphic) {
    graphic.beginFill(this.color);
    graphic.drawShape(this.renderer);
    graphic.lineStyle(InitCell.CELL_SIZE*lineRatio, 0x000000, 1);
    
    if(this.sides & InitCell.SIDE_LEFT){
       graphic.moveTo(this.x,this.y);
        graphic.lineTo(this.x,this.y+InitCell.CELL_SIZE);
    } 
    if(this.sides & InitCell.SIDE_RIGHT) {
        graphic.moveTo(this.x+InitCell.CELL_SIZE,this.y);
        graphic.lineTo(this.x+InitCell.CELL_SIZE,this.y+InitCell.CELL_SIZE);
    }
    if(this.sides & InitCell.SIDE_UP) {
        graphic.moveTo(this.x,this.y);
        graphic.lineTo(this.x+InitCell.CELL_SIZE,this.y);
    }
    if(this.sides & InitCell.SIDE_DOWN) {
         graphic.moveTo(this.x,this.y+InitCell.CELL_SIZE);
        graphic.lineTo(this.x+InitCell.CELL_SIZE,this.y+InitCell.CELL_SIZE);
    }
    graphic.lineStyle(0,0x000000,1);
}