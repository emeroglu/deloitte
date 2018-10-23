$js.compile("$api", null, function($public, $private, $protected, $self) {

    $public.void.search = function(_query) {

        $http
            .begin()
                .setMethod("POST")
                .setUrl("/Search")
                .setData(_query)
                .onSuccess(function(_text, _json, _response) {

                    console.log(_text);

                })
            .send();

    };

    

});