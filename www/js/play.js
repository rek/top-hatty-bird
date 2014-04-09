var play_state = {

    // now done in loader state
    preload: function() {

    },

    // Fuction called after 'preload' to setup the game
    create: function() {
        this.settings = {
            pipeDelay: 2.8,
        };

        app.score = 0;

        game.physics.startSystem(Phaser.Physics.ARCADE);
        // add generic gravity
        game.physics.arcade.gravity.y = 300;

        // Display the bird on the screen
        this.bird = new Bird();

        // Add gravity to the bird to make it fall
        // this.bird.gravity = new Phaser.Point(0, 1200);

        // Call the 'jump' function when the spacekey is hit
        // var space_key = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        // space_key.onDown.add(this.jump, this);

        this.bird.setJumper( function() {
            if (this.alive === false)
                return;

            // Add a vertical velocity to the bird
            this.sprite.body.velocity.y = -200;

            // create an animation on the bird
            var animation = game.add.tween(this.sprite);

            // Set the animation to change the angle of the sprite to -20° in 100 milliseconds
            animation.to({
                angle: -20
            }, 100);

            // And start the animation
            animation.start();
        });

        // Create a group of 20 pipes
        this.pipes = game.add.group();
        // get a body, so we can change the gravity
        this.pipes.enableBody = true;
        // make 20
        this.pipes.createMultiple(20, 'pipe');

        this.pipes.scale.x = 0.6;
        // this.pipes.scale.y = 0.8;

        //call right up
        this.add_row_of_pipes();

        // Timer that calls 'add_row_of_pipes' ever 2.8 seconds
        this.settings.pipeTimer = game.time.events.loop(Phaser.Timer.SECOND * this.settings.pipeDelay, this.add_row_of_pipes, this);

        // Add a score label on the top left of the screen
        var style = {
            font: '30px Arial',
            fill: '#ffffff'
        };
        this.label_score = game.add.text(20, 20, '0', style);
    },

    // This function is called 60 times per second
    update: function() {
        // If the bird is out of the world (too high or too low), call the 'restart_game' function
        if (this.bird.sprite.inWorld === false)
            this.restart_game();

        // always look down more and more
        if (this.bird.sprite.angle < 80)
            this.bird.sprite.angle += 1;

        // If the bird overlap any pipes, call 'restart_game'
        game.physics.arcade.collide(this.bird.sprite, this.pipes, this.hit_pipe, null, this);

    },


    hit_pipe: function() {
        if (this.bird.alive == false)
            return;

        this.bird.alive = false;
        game.time.events.remove(this.timer);

        this.pipes.forEachAlive(function(p) {
            p.body.velocity.x = 0;
        }, this);
    },

    // Restart the game
    restart_game: function() {
        // Remove all timers
        game.time.events.remove(this.settings.pipeTimer);
        game.time.events.remove(this.settings.scoreTimer);

        // Start the 'main' state, which restarts the game
        game.state.start('menu');
    },

    // Add a pipe on the screen
    add_one_pipe: function(x, y) {
        // console.log('adding one pipe')
        // Get the first dead pipe of our group
        var pipe = this.pipes.getFirstDead();

        // Set the new position of the pipe
        pipe.reset(x, y);
        pipe.body.allowGravity = false;

        // Add velocity to the pipe to make it move left
        pipe.body.velocity.x -= 150;

        //make him bounce
        // pipe.body.collideWorldBounds = true;
        // pipe.body.bounce.y = 0.8;

        pipe.checkWorldBounds = true;

        // Kill the pipe when it's no longer visible
        pipe.outOfBoundsKill = true;
    },

    // Add a row of 6 pipes with a hole somewhere in the middle
    add_row_of_pipes: function() {
        if (app.score >= 5)
            return this.next_level();

        var number_of_pipes = 8;
        app.hole = Math.floor(Math.random() * (number_of_pipes - 2)); //+1; <- bottom holes are hard
        // thus range is 0 - 6
        var hole_range = app.hole + 3;

        // console.log('adding pipes group, hole: ' + hole);

        for (var i = 0; i < number_of_pipes; i++) {

            if (i < app.hole || i > hole_range)
                this.add_one_pipe(600, i * 60);
        }


        // make the count increment just as we pass through. eg: after 2.8 seconds
        this.settings.scoreTimer = game.time.events.add(Phaser.Timer.SECOND * this.settings.pipeDelay, function() {
            if(this.settings.alive)
                this.label_score.setText('' + ++app.score);
        }, this);
    },

    next_level: function() {
        console.log('level passed');

        // Remove the timer
        game.time.events.remove(this.timer);

        game.time.events.add(Phaser.Timer.SECOND * this.settings.pipeDelay, function() {
            game.state.start('level2_menu');
        }, this);
    },

    render: function() {
        // game.debug.text('Score: ' + this.score, 32, 32);
        // game.debug.text('Hole: ' + app.hole, 32, 62);
    }
};