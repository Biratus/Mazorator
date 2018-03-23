function Controller() {
    game.input.keyboard.addCallbacks(this,this.down,this.up,this.press);
    this.keysDown=[];
    this.lastKey={"which":0,"when":new Date().getTime()};
    Controller.instance=this;
}

Controller.prototype.down=function(event) {
    /*if(!this.isGoodKey()) return;
    if(this.keysDown.indexOf(event.which)>=0) {
        this.keysDown.splice(this.keysDown.indexOf(event.which),1);
    }
    this.keysDown.push(event.which);
    this.lastKey={"which":event.which,"when":new Date().getTime()};*/
}

Controller.prototype.up=function(event) {
   /* if(!this.isGoodKey()) return;
    this.keysDown.splice(this.keysDown.indexOf(event.which),1);
    if(this.lastKey.which==event.which && new Date().getTime()-this.lastKey.when<150) {
        LevelState.instance.updatePlayerMovement(this.lastKey.which);
    }*/
    LevelState.instance.updateGraphRotation(event.which);
}

Controller.prototype.press=function(event) {
  
}

Controller.prototype.getKeyHolding=function() {
    return this.keysDown.length>0?this.keysDown[this.keysDown.length-1]:null;
}

Controller.prototype.isGoodKey=function(key) {
    var isGoodKey=false;
    for (var i in Controller.Arrows) if(Controller.Arrows[i]==event.which) isGoodKey=true;
    return isGoodKey;
}

Controller.Arrows=Object.freeze({DOWN:40,UP:38,LEFT:37,RIGHT:39});

Controller.instance;