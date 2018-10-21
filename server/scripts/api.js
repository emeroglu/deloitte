$js.compile("$api", null, function($public, $private, $protected, $self) {

    $private.field.url = "http://api.walmartlabs.com/v1/search?format=json&apiKey=cmjx4sdwxmt3uvkpcnsntjc5";

    $public.func.search = function(_query) {

        $http.get($self.url + "&query=" + _query, function(_response) {

            let data = "";

            _response.on('data', (chunk) => {
                data += chunk;
            });
            
            _response.on('end', () => {
                console.log(JSON.parse(data));
            });

        });

    };

});