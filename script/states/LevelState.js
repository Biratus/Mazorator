var speed=100;
function LevelState() {
    Phaser.State.call(this);
    LevelState.instance=this;
}

LevelState.instance;

LevelState.prototype.init=function() {
    game.stage.backgroundColor="#ffffff";
    this.graphics = this.add.graphics(0,0);
    game.physics.startSystem(Phaser.Physics.P2JS);
    game.physics.p2.setImpactEvents(true);
    game.physics.p2.defaultRestitution = 0.8;
    this.maze=new Maze(this.graphics);
    this.maze.init();
}

LevelState.prototype.startGame=function() {
    this.gameStarted=true;
    var c=this.maze.cells[0];
    this.player=this.add.sprite(c.renderer.x+InitCell.CELL_SIZE/2,c.renderer.y+InitCell.CELL_SIZE/2,"player");
    this.player.anchor.setTo(0.5);
    this.player.width=InitCell.CELL_SIZE*0.5;
    this.player.height=InitCell.CELL_SIZE*0.5;
    game.physics.p2.enable(this.player,true);
    game.physics.p2.gravity.y = 200;
    this.player.body.allowGravity=true;
    this.playerCollisionGroup=game.physics.p2.createCollisionGroup();
    game.physics.p2.updateBoundsCollisionGroup();
    //make line collide with player
    for(var i in this.maze.children) {
        this.maze.children[i].body.collides(this.playerCollisionGroup);
    }
    //make player collide with lines
    this.player.body.setCollisionGroup(this.playerCollisionGroup);
    this.player.body.collides(this.maze.collisionGroup);
    
    // this.setTarget();
    //    this.createPortal();
    this.gameStarted=true;
    this.player.fixedRotation=true;
    this.cursors = game.input.keyboard.createCursorKeys();
}

LevelState.prototype.update=function() {
    if(!this.gameStarted) return;

    this.player.body.setZeroRotation();
    this.player.body.rotation=0;
    
    if (this.cursors.left.isDown && !this.cursors.upIsDown) this.player.body.moveLeft(speed);
    else if (this.cursors.right.isDown && !this.cursors.upIsDown) this.player.body.moveRight(speed);
    if (this.cursors.up.isDown) {
        this.cursors.upIsDown=true;
        this.player.body.setZeroVelocity();
        this.player.body.moveUp(speed*1.5);
    } else if(this.cursors.up.isUp && this.cursors.upIsDown) {
        this.player.body.setZeroVelocity();
        this.cursors.upIsDown=false;
    }
}

LevelState.prototype.endGame=function() {
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

LevelState.prototype.updateGraphRotation=function(key) {
    var n=Math.PI/36;
    for(var i in this.maze.children) {
        this.maze.children[i].rotate(key==Controller.Arrows.LEFT?-n:n);
    }
    /*switch(key) {
        case Controller.Arrows.LEFT: this.maze.rotation+=n; break;
        case Controller.Arrows.RIGHT:this.maze.rotation-=n; break;
    }*/
}

LevelState.FrameRate=0;