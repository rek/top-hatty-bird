var level2_menu = {

    preload: function() {

    },

    create: function() {

        game.input.onTap.add(this.start, this);

        var style = { font: "30px Arial", fill: "#ffffff" };

        // Adding a text centered on the screen
        var text = this.game.add.text(game.world.centerX, game.world.centerY - 50, "Top Hatty Bird", style);
        text.anchor.setTo(0.5, 0.5);
        var text1 = this.game.add.text(game.world.centerX, game.world.centerY - 20, "approaches a room...", style);
        text1.anchor.setTo(0.5, 0.5);

        var text2 = this.game.add.text(game.world.centerX, game.world.centerY + 50, "Badass..", style);
        text2.anchor.setTo(0.5, 0.5);

    },

    start: function() {
        this.game.state.start('level2');
    }
};