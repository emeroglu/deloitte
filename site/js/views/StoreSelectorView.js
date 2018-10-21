$js.compile("StoreSelectorView", View, function($public, $private, $protected, $self) {

    $protected.override.func.on_key = function() { return "store-selector-view"; };

    $protected.override.void.on_construct = function(_views) {

        _views.container = new AbsoluteLayout();

    };

    $protected.override.void.on_flourish = function(_views) {

        _views.container.views.icon = new IconView();
        _views.container.views.text = new TextView();

    };

    $protected.override.void.on_feed = function(_views) {

        _views.container.views.icon.set_icon("map");
        _views.container.views.icon.set_weight("regular");
        _views.container.views.icon.set_size(26);
        _views.container.views.icon.set_side(60);
        _views.container.views.icon.set_color("#f78019");

        _views.container.views.text.set_text("Select a Store");
        _views.container.views.text.set_align("left");
        _views.container.views.text.set_height("taller");
        _views.container.views.text.set_line_height("taller");
        _views.container.views.text.set_size("small");
        _views.container.views.text.set_color("gray");

    };

    $protected.extension.void.on_style = function(_views) {

        $self.select_tag()
            .begin()
                .absolute()
                .sideFull()
            .save();

        _views.container.select_path()
            .begin()
                .absolute()
                .widthCentered(200)
                .heightFull()
            .save();

        _views.container.views.icon.select_path()
            .begin()
                .side(60)
            .save();

        _views.container.views.text.select_path()
            .begin()
                .width(140)
                .height(60)
                .left(60)
            .save();

    };

    $protected.override.void.on_medium_viewport = function(_views) {

        _views.container.views.text.set_size("small");
        _views.container.views.text.apply();

    };

    $protected.override.void.on_narrow_viewport = function(_views) {

        _views.container.views.text.set_size("smaller");
        _views.container.views.text.apply();

    };

});