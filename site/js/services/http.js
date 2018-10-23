$js.compile("$http", null, function($public, $private, $protected, $self) {

    $private.field.request = null;

    $public.delegate.begin = function() { $self.request = new WebRequest(); return $self; };

    $private.field.method = "";
    $public.delegate.setMethod = function(_method) { $self.method = _method; return $self; };

    $private.field.url = "";
    $public.delegate.setUrl = function(_url) { $self.url = _url; return $self; };

    $private.field.data = {};
    $public.delegate.setData = function(_data) { $self.data = _data; return $self; };

    $private.void.on_success = function(_text, _json, _response) {};
    $public.delegate.onSuccess = function($delegate) { $self.on_success = $delegate; return $self; };

    $public.void.send = function() {

        $self.request.set_method($self.method);
        $self.request.set_url($self.url);
        $self.request.set_data($self.data);
        $self.request.onSuccess(function(_response) {

            $self.on_success(_response.text, _response.json, _response);

        });
        $self.request.send();

    };

    $public.void.abort = function() {

        if ($self.request != null)
            $self.request.abort();

    };

});