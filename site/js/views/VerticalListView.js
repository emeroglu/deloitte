$js.compile("VerticalListView", ListView, function($public, $private, $protected, $self) {
    
    $protected.override.func.on_key = function() { return "vertical-list-view"; };

    $protected.override.void.on_construct = function(_views) {

        $self.model = $self.on_model();

        _views.container = new View();

        for (let index in $self.model) {

            let name = "item_" + index;
            let view = new ListItemView();
            view.set_name(name);

            $self.on_item_construct(view, $self.model[index], index);
            $self.on_item_flourish(view, $self.model[index], index);
            $self.on_item_feed(view, $self.model[index], index);

            _views.container.views[name] = view;

        }

    };

    $protected.extension.void.on_style = function(_views) {

        _views.container.select_path()
            .begin()
                .relativeLeftFull()
                .widthFull()
                .verticalScroll()
            .save();

        $css.select(_views.container.selector("path") + " d-list-item-view")
            .begin()
                .relativeLeftFull()
            .save();

    };

});