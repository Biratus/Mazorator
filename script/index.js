var game;
window.onload=function(){
    game = new Phaser.Game("100","100",Phaser.CANVAS);

    game.state.add('BootState',new BootState());
    game.state.add('LoadState',new LoadState());
    game.state.add('LevelState',new LevelState());
    game.state.start('BootState');
};