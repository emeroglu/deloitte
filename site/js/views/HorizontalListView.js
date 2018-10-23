$js.compile("HorizontalListView", ListView, function($public, $private, $protected, $self) {

    $private.field.side = "left";
    $public.delegate.setSide = function(_side) { $self.side = _side; return $self; };

    $private.func.padding = 0;
    $public.delegate.setItemPadding = function(_padding) { $self.padding = _padding; return $self; };
    
    $protected.override.func.on_key = function() { return "horizontal-list-view"; };

    $protected.override.void.on_construct = function(_views) {

        $self.model = $self.on_model();

        _views.container = new View();

        for (let index in $self.model) {

            let name = "item_" + index;
            let view = new ListItemView();
            view.set_name(name);
            view.set_padding($self.padding);

            $self.on_item_construct(view, $self.model[index], index);
            $self.on_item_flourish(view, $self.model[index], index);
            $self.on_item_feed(view, $self.model[index], index);

            _views.container.views[name] = view;

        }

    };

    $protected.extension.void.on_style = function(_views) {

        _views.container.select_path()
            .begin()
                .relative()
                .heightFull()
                .horizontalScroll()
            .save();

        $css.select(_views.container.selector("path") + " d-list-item-view")
            .begin()
                .relativeLeft()
                .heightFull()
            .save();

    };

    $protected.extension.void.on_self_style = function(_views) {

        _views.container.select()
            .begin()
                .float($self.side)
            .save();

    };

});