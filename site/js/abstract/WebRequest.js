$js.compile("WebRequest", null, function($public, $private, $protected, $self) {

    $private.field.xhr = null;

    $private.field.method = "";
    $public.void.set_method = function(_method) { $self.method = _method; };

    $private.field.url = "";
    $public.void.set_url = function(_url) { $self.url = _url; };

    $private.field.data = "";
    $public.void.set_data = function(_data) { $self.data = _data; };

    $private.void.on_success = function(_response) { };
    $public.delegate.onSuccess = function($delegate) { $self.on_success = $delegate; return $self; };

    $private.void.on_error = function(_response) { };
    $public.delegate.onError = function($delegate) { $self.on_error = $delegate; return $self; };

    $public.void.send = function() {

        $self.xhr = new XMLHttpRequest();
        $self.xhr.onreadystatechange = function() {

            if ($self.xhr.readyState == XMLHttpRequest.DONE) {

                if ($self.xhr.status == 200) {

                    let response = {};
                    response.code = 200;
                    response.text = $self.xhr.responseText;
                    response.json = JSON.parse($self.xhr.responseText);
                    
                    $self.on_success(response);

                } else {

                    let response = {};

                    response.code = $self.xhr.status;

                    $self.on_error(response);

                }

            }

        };
        $self.xhr.open($self.method, $self.url, true);
        $self.xhr.setRequestHeader("Content-Type", "text/plain");
        $self.xhr.send(JSON.stringify($self.data));

    };

    $public.void.abort = function() {

        $self.xhr.abort();

    };

});