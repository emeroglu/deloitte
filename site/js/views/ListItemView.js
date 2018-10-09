$js.compile("ListItemView", View, function($public, $private, $protected, $self) {

    $private.field.padding = 0;
    $public.void.set_padding = function(_padding) { $self.padding = _padding; };

    $protected.override.func.on_key = function() { return "list-item-view"; };

    $protected.extension.void.on_self_style = function(_views) {

        $self.select()
            .begin()
                .paddingHorizontal($self.padding)
            .save();

    };

});