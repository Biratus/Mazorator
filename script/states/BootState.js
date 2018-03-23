function BootState() {
    Phaser.State.call(this);
}

BootState.prototype.preload=function() {
    game.time.advancedTiming = true;
    this.load.json("asset_data","assets.json");
}

BootState.prototype.create=function() {
    var data=this.cache.getJSON("asset_data");
    game.state.start("LoadState",true,false,data);
}