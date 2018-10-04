$js.compile("$server", null, function($public, $private, $protected, $self) {

    $private.field.server = null;

    $public.void.serve = function() {

        $self.server = $http.createServer(function(_request, _response) {

            _response.writeHead(200, { "Content-Type": "application/json" });
            _response.write("Hello World!");
            _response.end();

        });
        $self.server.listen(5000, function() { console.log("Listening port 5000..."); });

    };

});