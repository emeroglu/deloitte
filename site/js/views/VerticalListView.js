$js.compile("VerticalListView", ListView, function($public, $private, $protected, $self) {
    
    $protected.override.func.on_key = function() { return "vertical-list-view"; };

    $protected.extension.void.on_style = function(_views) {

        _views.container.select_path()
            .begin()
                .relativeLeftFull()
                .widthFull()
                .verticalScroll()
            .save();

        _views.container.views.item.select_path()
            .begin()
                .relativeLeftFull()
            .save();

    };

});