function BootState() {
    Phaser.State.call(this);
}

BootState.prototype.preload=function() {
    game.time.advancedTiming = true;
}

BootState.prototype.create=function() {
    game.state.start("LoadState",true,false);
}