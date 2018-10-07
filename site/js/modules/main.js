$js.compile("MainModule", Module, function($public, $private, $protected, $self) {

    $protected.override.func.on_key = function() { return "main"; };

    $protected.override.void.on_construct = function(_pages, _views) {

        _pages.index = new IndexPage();

    };

});