$js.compile("$bcast", null, function($public, $private, $protected, $self) {

    $private.field.delegates = {};

    $public.void.listen = function(_key, $delegate) {

        if ($self.delegates[_key] == undefined)
            $self.delegates[_key] = [];

        $self.delegates[_key].push($delegate);

    };

    $public.void.shout = function(_key) {

        if ($self.delegates[_key] == undefined)
            return;

        for (let index in $self.delegates[_key]) {
            $self.delegates[_key][index]();
        }

    };

});