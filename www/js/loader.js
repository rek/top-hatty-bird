var mobile_found = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

var libsToLoad = [
    'jquery',
    'menu',
    'play',
    'phaser'
];

var game = {},
    app  = {};

if (mobile_found) {
    console.log('MOBILE');
    // add cordova when using a mobile device
    libsToLoad.push('../cordova');
} else {
    console.log('NOT MOBILE');
    libsToLoad.push('//localhost:35729/livereload.js');
}

require(libsToLoad, function(
    $
    // ,Phaser
){
    // Initialize Phaser, and creates a 400x490px game
    game = new Phaser.Game(400, 490, Phaser.AUTO, 'game_div');

    app.score = 0;

    var load_state = {
        preload: function() {
            game.stage.backgroundColor = '#71c5cf';
            game.load.image('bird', 'img/bird.svg');
            game.load.image('pipe', 'img/rack_tile.svg');
            // game.load.audio('jump', 'assets/jump.wav');
        },
        create: function() {
            // When all assets are loaded, go to the 'menu' state
            game.state.start('menu');
        }
    };

    game.state.add('load', load_state);
    game.state.add('menu', menu_state);
    game.state.add('play', play_state);

    if (mobile_found) {
        document.addEventListener('deviceready', function() {
            game.state.start('load');
        }, false);
    } else {
        $(function() {
            game.state.start('load');
        });
    }

});