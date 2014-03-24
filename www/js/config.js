requirejs.config({
    paths: {
        // jquery                 : '../bower_components/jquery/dist/jquery.min',
    },
    shim: {
        jquery : {
          exports : 'jQuery'
        },
    },
    deps: ['main'] // <-- run our app
});