function Maze(graphics){
    Phaser.Group.call(this,game,game.world,'maze');
    Maze.instance=this;
    this.graphics=graphics;
}
Maze.instance;
Maze.CELL_NB=20;

Maze.prototype=Object.create(Phaser.Group.prototype);
Maze.prototype.constructor=Maze;

Maze.prototype.init=function() {
    this.cells=[];
    InitCell.CELL_SIZE=game.world.width/Maze.CELL_NB;
    for(var y = 0;y<Maze.CELL_NB;y++)
        for(var x=0;x<Maze.CELL_NB;x++)
            this.cells.push(new InitCell(x,y));
    for(var i in this.cells) this.cells[i].draw(this.graphics);
    
    this.currIndex=0;
    this.stackTrace=[];
    this.cells[this.currIndex].visited=true;
    this.cells[this.currIndex].current=true;
    this.generateMaze();
}

Maze.prototype.update=function() {
    //for(var i in this.cells) this.cells[i].draw(this.graphics);
}

Maze.prototype.generateMaze=function() {
    var nexts = this.getNeighborsNotVisited(this.cells[this.currIndex]);
    this.cells[this.currIndex].current=false;
	if(nexts.length==0) {
		if(this.stackTrace.length==0) {
			this.mazeGenerated();
            this.repaint();
			return;
		}
		this.currIndex=this.stackTrace.pop();
		this.cells[this.currIndex].current=true;
        this.repaint();
		game.state.getCurrentState().maze.generateMaze();
		return;
	}


	var rndInd = Math.floor(Math.random() * nexts.length);

	nexts[rndInd].visited=true;
	nexts[rndInd].current=true;

	this.removeLineBetween(this.cells[this.currIndex],nexts[rndInd]);

	this.currIndex=nexts[rndInd].xIndex+nexts[rndInd].yIndex*Maze.CELL_NB;
	this.stackTrace.push(this.currIndex);
    //this.repaint();
    game.state.getCurrentState().maze.generateMaze();
}

Maze.prototype.mazeGenerated=function() {
    var c=[];
    for(var i in this.cells) c.push(Cell.fromInitCell(this.cells[i]));
    this.cells=c;
    this.currIndex=0;
    lineRatio=0.03;
    LevelState.instance.startGame();
}

Maze.prototype.getNeighborsNotVisited=function (cell) {
	var neigh=[];
	if(cell.xIndex!=0) {//not on the left
		var c = this.cells[cell.xIndex-1+cell.yIndex*Maze.CELL_NB];
		if(!c.visited) neigh.push(c);
	}
	if(cell.xIndex+1<Maze.CELL_NB) {//not on the right
		var c = this.cells[cell.xIndex+1+cell.yIndex*Maze.CELL_NB];
		if(!c.visited) neigh.push(c);
	}
	if(cell.yIndex!=0) {//not on the top
		var c = this.cells[cell.xIndex+(cell.yIndex-1)*Maze.CELL_NB];
		if(!c.visited) neigh.push(c);
	}
	if(cell.yIndex+1<Maze.CELL_NB) {//not on bot
		var c = this.cells[cell.xIndex+(cell.yIndex+1)*Maze.CELL_NB];
		if(!c.visited) neigh.push(c);
	}
	return neigh;
}

Maze.prototype.removeLineBetween=function (cell1,cell2) {
	if(cell1.xIndex==cell2.xIndex) {//same column
		if(cell2.yIndex>cell1.yIndex) {//cell1 above cell2
			cell2.removeSide(InitCell.SIDE_UP);
			cell1.removeSide(InitCell.SIDE_DOWN);
		} else {
			cell1.removeSide(InitCell.SIDE_UP);
			cell2.removeSide(InitCell.SIDE_DOWN);
		}
	} else if(cell1.yIndex==cell2.yIndex) {//same line
		if(cell2.xIndex>cell1.xIndex) {//cell2 right of cell1
			cell2.removeSide(InitCell.SIDE_LEFT);
			cell1.removeSide(InitCell.SIDE_RIGHT);
		} else {
			cell1.removeSide(InitCell.SIDE_LEFT);
			cell2.removeSide(InitCell.SIDE_RIGHT);
		}
	}
}

Maze.prototype.openTo=function(cell,side) {
    if(!cell.isClosedTo(side)) {
       switch(side) {
        case InitCell.SIDE_DOWN: return this.cells[this.cells.indexOf(cell)+Maze.CELL_NB];
        case InitCell.SIDE_UP: return this.cells[this.cells.indexOf(cell)-Maze.CELL_NB];
        case InitCell.SIDE_RIGHT: return this.cells[this.cells.indexOf(cell)+1];
        case InitCell.SIDE_LEFT: return this.cells[this.cells.indexOf(cell)-1];
       }
    }
    return null;
}

Maze.prototype.repaint=function() {
    this.graphics.clear();
    for(var i in this.cells) this.cells[i].draw(this.graphics);
}

Maze.prototype.currentCell=function() {
    return this.cells[this.currIndex];
}

Maze.prototype.randomCell=function(min) {
    min = min||0;
    
    return this.cells[Math.round(Math.random()*(this.cells.length-1-min)+min)];
}

