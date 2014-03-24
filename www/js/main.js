var mobile_found = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

if (mobile_found) {
    console.log('MOBILE');
} else {
    console.log('NOT MOBILE');
}

var libsToLoad = [
    "jquery",
    'phaser'
];

// add cordova when using a mobile device
if(mobile_found) libsToLoad.push("../cordova");

require(libsToLoad, function(
    $
    // ,Phaser
){
    // Initialize Phaser, and creates a 400x490px game
    var game = new Phaser.Game(400, 490, Phaser.AUTO, 'game_div');
    var game_state = {};

    // Creates a new 'main' state that will contain the game
    game_state.main = function() { };
    game_state.main.prototype = {

        // Function called first to load all the assets
        preload: function() {
            // Change the background color of the game
            this.game.stage.backgroundColor = '#71c5cf';

            // Load the bird sprite
            this.game.load.image('bird', 'img/bird.svg');

            // Load the pipe sprite
            this.game.load.image('pipe', 'img/pipe.png');
        },

        // Fuction called after 'preload' to setup the game
        create: function() {
            this.game.physics.startSystem(Phaser.Physics.ARCADE);

            // Display the bird on the screen
            // this.bird = this.game.add.sprite(100, 245, 'bird');
            this.bird = this.game.add.sprite(50, 150, 'bird');

            // set rotation.
            this.bird.anchor.setTo(-0.2, 0.5);

            // add generic gravity
            this.game.physics.arcade.gravity.y = 400;
            this.game.physics.enable(this.bird, Phaser.Physics.ARCADE);

            // Add gravity to the bird to make it fall
            // this.bird.gravity = new Phaser.Point(0, 1200);

            // Call the 'jump' function when the spacekey is hit
            // var space_key = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
            // space_key.onDown.add(this.jump, this);

            var self = this;
            this.game.input.onTap.add(function(e){
                // console.log('tapped');
                self.jump();
            }, this);

            // Create a group of 20 pipes
            this.pipes = game.add.group();
            // get a body, so we can change the gravity
            this.pipes.enableBody = true;
            // make 20
            this.pipes.createMultiple(20, 'pipe');

            // Timer that calls 'add_row_of_pipes' ever 1.5 seconds
            this.timer = this.game.time.events.loop(Phaser.Timer.SECOND * 1.5, this.add_row_of_pipes, this);

            // Add a score label on the top left of the screen
            this.score = 0;
            var style = { font: "30px Arial", fill: "#ffffff" };
            this.label_score = this.game.add.text(20, 20, "0", style);
        },

        // This function is called 60 times per second
        update: function() {
            // If the bird is out of the world (too high or too low), call the 'restart_game' function
            if (this.bird.inWorld == false)
                this.restart_game();

            if (this.bird.angle < 80)
                this.bird.angle += 1;

            // If the bird overlap any pipes, call 'restart_game'
            // this.game.physics.overlap(this.bird, this.pipes, this.restart_game, null, this);
            this.game.physics.arcade.collide(this.bird, this.pipes, this.restart_game, null, this);

        },

        // Make the bird jump
        jump: function() {
            // Add a vertical velocity to the bird
            this.bird.body.velocity.y = -200;

            // create an animation on the bird
            var animation = this.game.add.tween(this.bird);

            // Set the animation to change the angle of the sprite to -20° in 100 milliseconds
            animation.to({angle: -20}, 100);

            // And start the animation
            animation.start();
        },

        // Restart the game
        restart_game: function() {
            // Remove the timer
            this.game.time.events.remove(this.timer);

            // Start the 'main' state, which restarts the game
            this.game.state.start('main');
        },

        // Add a pipe on the screen
        add_one_pipe: function(x, y) {
            console.log('adding one pipe')
            // Get the first dead pipe of our group
            var pipe = this.pipes.getFirstDead();

            // Set the new position of the pipe
            pipe.reset(x, y);
            pipe.body.allowGravity = false;

            // Add velocity to the pipe to make it move left
            pipe.body.velocity.x -= 200;

// pipe.body.collideWorldBounds = true;
// pipe.body.bounce.y = 0.8;

            // Kill the pipe when it's no longer visible
            pipe.outOfBoundsKill = true;
        },

        // Add a row of 6 pipes with a hole somewhere in the middle
        add_row_of_pipes: function() {
            var hole = Math.floor(Math.random()*5)+1;
            var hole_range = hole + 1;
            console.log('adding pipes group, hole: ' + hole);

            for (var i = 0; i < 8; i++) {

                if (i != hole && i != hole_range)
                    this.add_one_pipe(400, i*60+10);
            }

            this.score += 1;
            this.label_score.content = this.score;
            console.log('incrementing score: ' + this.score);
        },

        render: function() {
            game.debug.text("Score: " + this.score, 32, 32);
        }
    };

    $(function() {
        game.state.add('main', game_state.main);
        game.state.start('main');
    });
});