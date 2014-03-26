var level2_state = {

    preload: function() {

    },

    create: function() {

        var style = { font: "30px Arial", fill: "#ffffff" };
        var x = game.world.width/2, y = game.world.height/2;

        // Adding a text centered on the screen
        var text = this.game.add.text(x, y-50, "But it's $2", style);
        text.anchor.setTo(0.5, 0.5);

        var text2 = this.game.add.text(x, y+50, "Such Moneys!!", style);
        text2.anchor.setTo(0.5, 0.5);

    },

    // start: function() {
    //     this.game.state.start('level2');
    // }
};