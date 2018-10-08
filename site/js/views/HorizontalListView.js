$js.compile("HorizontalListView", ListView, function($public, $private, $protected, $self) {

    $private.field.side = "left";
    $public.delegate.setSide = function(_side) { $self.side = _side; return $self; };

    $protected.override.func.on_key = function() { return "horizontal-list-view"; };

    $private.func.width = 0;
    $public.delegate.setWidth = function(_width) { $self.width = _width; return $self; };
    
    $protected.override.void.on_construct = function(_views) {

        $self.model = $self.on_model();

        _views.container = new View();

        for (let index in $self.model) {

            let name = "item_" + index;
            let view = new ListItemView();
            view.set_name(name);
            view.set_width($self.width);

            $self.on_generate(view, $self.model[index]);

            _views.container.views[name] = view;

        }

    };

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
                .float($self.side)
                .width($self.width * $self.model.length)
            .save();

    };

});