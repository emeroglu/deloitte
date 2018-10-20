$js.compile("ListView", View, function($public, $private, $protected, $self) {

    $private.field.container = null;

    $private.field.model = [];

    $protected.override.func.on_key = function() { return "list-view"; };

    $private.func.on_model = function() { return []; };
    $public.delegate.onModel = function($delegate) { $self.on_model = $delegate; return $self; };

    $private.func.on_generate = function(_view, _model) { };
    $public.delegate.onGenerate = function($delegate) { $self.on_generate = $delegate; return $self; };

    $protected.extension.void.on_style = function(_views) {

        $self.select_tag()
            .begin()
                .absolute()
                .sideFull()
            .save();

    };

});