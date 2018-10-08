$js.compile("HorizontalListView", ListView, function($public, $private, $protected, $self) {

    $private.field.float = "left";
    $public.delegate.setFloat = function(_float) { $self.float = _float; return $self; };

    $protected.override.func.on_key = function() { return "horizontal-list-view"; };

    $protected.extension.void.on_style = function(_views) {

        _views.container.select()
            .begin()
                .relative()
                .heightFull()
                .horizontalScroll()
            .save();

        $css.select("d-horizontal-list-view d-view d-list-item-view")
            .begin()
                .relativeLeft()
                .heightFull()
            .save();

    };

    $protected.extension.void.on_self_style = function(_views) {

        _views.container.select()
            .begin()
                .float($self.float)
                .width($self.on_width() * $self.model.length)
            .save();

    };

});