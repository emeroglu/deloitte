$js.compile("WebRequest", null, function($public, $private, $protected, $self) {

    $private.field.method = "";
    $public.void.set_method = function(_method) { $self.method = _method; };

    $private.field.url = "";
    $public.void.set_url = function(_url) { $self.url = _url; };

    $private.field.data = "";
    $public.void.set_data = function(_data) { $self.data = _data; };

    $private.void.on_success = function() { };
    $public.delegate.onSuccess = function($delegate) { $self.on_success = $delegate; return $self; };

    $private.void.on_error = function() { };
    $public.delegate.onError = function($delegate) { $self.on_error = $delegate; return $self; };

    $public.void.send = function() {

        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {

            if (xhr.readyState == XMLHttpRequest.DONE) {

                if (xhr.status == 200) {

                    let response = {};
                    response.code = 200;
                    response.text = xhr.responseText;
                    response.json = JSON.parse(xhr.responseText);
                    
                    $self.on_success(response);

                } else {

                    let response = {};

                    response.code = xhr.status;

                    $self.on_error(response);

                }

            }

        };
        xhr.open($self.method, $self.url, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify($self.data));

    };

});