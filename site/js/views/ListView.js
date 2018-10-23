$js.compile("ListView", View, function($public, $private, $protected, $self) {

    $private.field.container = null;

    $private.field.model = [];

    $protected.override.func.on_key = function() { return "list-view"; };

    $protected.func.on_model = function() { return []; };
    $public.delegate.onModel = function($delegate) { $self.on_model = $delegate; return $self; };

    $protected.void.on_item_construct = function(_view, _model) { };
    $public.delegate.onConstruct = function($delegate) { $self.on_item_construct = $delegate; return $self; };

    $protected.void.on_item_flourish = function(_view, _model) { };
    $public.delegate.onFlourish = function($delegate) { $self.on_item_flourish = $delegate; return $self; };

    $protected.void.on_item_feed = function(_view, _model) { };
    $public.delegate.onFeed = function($delegate) { $self.on_item_feed = $delegate; return $self; };

    $protected.void.on_item_update = function(_view, _model) { };
    $public.delegate.onUpdate = function($delegate) { $self.on_item_update = $delegate; return $self; };

    $protected.extension.void.on_style = function(_views) {

        $self.select_tag()
            .begin()
                .absolute()
                .sideFull()
            .save();

    };

});