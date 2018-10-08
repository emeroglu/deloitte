$js.compile("ListItemView", View, function($public, $private, $protected, $self) {

    $private.field.width = 0;
    $public.delegate.set_width = function(_width) { $self.width = _width; };

    $protected.override.func.on_key = function() { return "list-item-view"; };

    $protected.extension.void.on_self_style = function(_views) {

        $self.select()
            .begin()
                .width($self.width)
            .commit();

    };

});