$js.compile("IndexPage", Page, function($public, $private, $protected, $self) {

    $public.override.func.is_initial = function() { return true; };

    $protected.override.func.on_key = function() { return "index"; };

    $protected.override.void.on_construct = function(_views) {

        _views.dummy = new DummyView();

        _views.dummy2 = new DummyView();

        _views.dummy3 = new DummyView();

    };

});