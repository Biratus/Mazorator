function LevelState() {
    Phaser.State.call(this);
    LevelState.instance=this;
}

LevelState.instance;

LevelState.prototype.init=function() {
    this.graphics = this.add.graphics(0,0);
    this.maze=new Maze(this.graphics);
    this.maze.init();
    this.add.group(this.maze)
    game.stage.backgroundColor="#ffffff";
}

LevelState.prototype.startGame=function() {
    console.log("game start");
    this.gameStarted=true;
    this.player = {
        currentCell:this.maze.randomCell(),
        draw:function(graphic){
            graphic.beginFill(0xff0000);
            graphic.drawRect(this.currentCell.x,this.currentCell.y,InitCell.CELL_SIZE,InitCell.CELL_SIZE);
            graphic.endFill();
        },
        speed:250
    };
    
    this.controller=new Controller();
    this.setTarget();
    this.createPortal();
    this.gameStarted=true;
    this.updatePlayerMovement();
}

LevelState.prototype.update=function() {
    if(!this.gameStarted) return;
    this.maze.repaint();
    this.player.draw(this.graphics);
}

LevelState.prototype.endGame=function() {
    clearTimeout(this.movementTimeout);
    this.gameStarted=false;
    console.log("end");
}

LevelState.prototype.updatePlayerMovement=function(keyHolding) {
    clearTimeout(this.movementTimeout);
    var s;
    keyHolding = keyHolding || this.controller.getKeyHolding();
    switch(keyHolding) {
        case Controller.Arrows.DOWN: s=InitCell.SIDE_DOWN; break;
        case Controller.Arrows.UP: s=InitCell.SIDE_UP; break;
        case Controller.Arrows.LEFT: s=InitCell.SIDE_LEFT; break;
        case Controller.Arrows.RIGHT:s=InitCell.SIDE_RIGHT; break;
    }
    var c;
    if(s && (c=this.maze.openTo(this.player.currentCell,s))) {
        this.player.currentCell.eventManager.dispatchEvent(Event.Type.LeaveEvent);
        this.player.currentCell=c;
        this.player.currentCell.eventManager.dispatchEvent(Event.Type.EnterEvent);
    }
    
    this.movementTimeout=setTimeout(this.updatePlayerMovement.bind(this),this.player.speed);
}

LevelState.prototype.setTarget=function() {
    var c;
    do {
        c = this.maze.randomCell();
    } while(c===this.player.currentCell);
    
    c.color=0xff00ff;
    c.eventManager.addEvent(new Event(Event.Type.EnterEvent,function(){
        LevelState.instance.endGame();
    }));
}

LevelState.prototype.createPortal=function() {
    var c1,c2;
    do {
        c1 = this.maze.randomCell(Maze.CELL_NB*Maze.CELL_NB/3);
        c2 = this.maze.randomCell(Maze.CELL_NB*Maze.CELL_NB/3);
    } while(c1.is("target") || c2.is("target") || c1===c2 || c1===this.player.currentCell || c2===this.player.currentCell);
    
    c1.color=0x0000ff;
    c2.color=0x0000ff;
    
    c1.eventManager.addEvent(new Event(Event.Type.EnterEvent,function(){
        LevelState.instance.player.currentCell=c2;
        this.eventManager.dispatchEvent(Event.Type.LeaveEvent);
    }));
    c2.eventManager.addEvent(new Event(Event.Type.EnterEvent,function(){
        LevelState.instance.player.currentCell=c1;
        this.eventManager.dispatchEvent(Event.Type.LeaveEvent);
    }));
}

LevelState.FrameRate=0;