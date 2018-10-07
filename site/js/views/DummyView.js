$js.compile("DummyView", View, function($public, $private, $protected, $self) {

    $protected.override.func.on_key = function() { return "dummy-view"; };

    $protected.override.void.on_construct = function(_views) {

        _views.asd = new View();
        _views.qwe = new View();

    };

    $protected.extension.void.on_style = function(_views) {

        _views.qwe.select()
            .begin()
                .opacity(0)
            .save();

    };

    $protected.extension.void.on_medium_style = function(_views) {

        _views.qwe.select()
            .begin()
                .opacity(1)
            .save();

    };
    
    $protected.extension.void.on_self_style = function(_views) {

        $self.select()
            .begin()
                .relativeLeft()
            .save();

    };

});