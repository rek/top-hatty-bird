var level2_menu = {

    preload: function() {

    },

    create: function() {

        game.input.onTap.add(this.start, this);

        var style = { font: "30px Arial", fill: "#ffffff" };
        var x = game.world.width/2, y = game.world.height/2;

        // Adding a text centered on the screen
        var text = this.game.add.text(x, y-50, "Dude. Level 2", style);
        text.anchor.setTo(0.5, 0.5);

        var text2 = this.game.add.text(x, y+50, "Badass..", style);
        text2.anchor.setTo(0.5, 0.5);

    },

    start: function() {
        this.game.state.start('level2');
    }
};