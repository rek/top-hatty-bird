var level2_state = {

    preload: function() {

    },

    create: function() {

        game.physics.startSystem(Phaser.Physics.NINJA);

        // add generic gravity
        this.game.physics.arcade.gravity.y = 300;



    },

    // start: function() {
    //     this.game.state.start('level2');
    // }
};