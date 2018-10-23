$js.compile("$api", null, function($public, $private, $protected, $self) {

    $public.void.search = function(_query, $success) {

        $http
            .begin()
                .setMethod("POST")
                .setUrl("/Search")
                .setData(_query)
                .onSuccess($success)
            .send();

    };

    

});