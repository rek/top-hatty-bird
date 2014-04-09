'use strict';
var Bird = function (p) {
    this.sprite = game.add.sprite(70, 150, 'bird');
    this.sprite.scale.x = 0.5;
    this.sprite.scale.y = 0.5;

    this.alive = true;

    // set rotation.
    this.sprite.anchor.setTo(-0.2, 0.5);

    this.setPhysics(p);

    game.input.onDown.add(function(e){
        // console.log('tapped');
        this.jumpCallback();
    }, this);

    // return this.bird;
};

Bird.prototype.setPhysics = function(p) {
    game.physics.enable(this.sprite, p || Phaser.Physics.ARCADE);
}

Bird.prototype.setJumper = function(newCallback) {
    this.jumpCallback = newCallback;
};

Bird.prototype.jumpCallback = function() {
    console.log('No jump callback set yet. Noob.');
};