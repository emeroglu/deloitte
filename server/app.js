function init() {

    globalize();

    load_init_js();

    init_libs();

    load_agents();
    init_agents();

    serve();

};

function globalize() {

    global.$global = global;

    $global.$load = require;

}

function load_init_js() {
    
    $load("../js.js");

}

function init_libs() {

    $global.$fs = $load("fs");
    $global.$http = $load("http");

}

function load_agents() {

    $load("./scripts/api.js");
    $load("./scripts/compiler.js");
    $load("./scripts/server.js");

}

function init_agents() {

    $global.$api = new $api();
    $global.$compiler = new $compiler();
    $global.$server = new $server();

}

function serve() {

    $server.serve();

}

init();