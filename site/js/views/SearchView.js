$js.compile("SearchView", View, function($public, $private, $protected, $self) {

    $protected.override.func.on_key = function() { return "search-view"; };

    $protected.override.void.on_construct = function(_views) {

        _views.input = new RelativeLayout();
        _views.input.set_name("input");

        _views.icon = new RelativeLayout();
        _views.icon.set_name("icon");

    };

    $protected.override.void.on_flourish = function(_views) {

        _views.input.views.text = new Textbox();
        _views.icon.views.icon = new IconView();

    };

    $protected.override.void.on_feed = function(_views) {

        _views.input.views.text.set_placeholder("Search over 130,000 products...");
        _views.input.views.text.set_size("small");

        _views.icon.views.icon.set_icon("search");
        _views.icon.views.icon.set_weight("");
        _views.icon.views.icon.set_size(20);
        _views.icon.views.icon.set_side(40);
        _views.icon.views.icon.set_color("#FFFFFF");

    };

    $protected.override.void.on_ready = function(_views, $ready) {

        let txt = _views.input.views.text;

        txt.onKeyRelease(function() {

            if (2 < txt.text().length) {

                $api.search(txt.text());

            }

        });

        $ready();

    };

    $protected.extension.void.on_style = function(_views) {

        $self.select_tag()
            .begin()
                .absolute()
                .sideFull()
                .backgroundColor("#FFFFFF")
            .save();

        _views.input.select_path()
            .begin()
                .widthCropFromFull(40)
                .heightFull()
            .save();

        _views.input.views.text.select_path()
            .begin()
                .heightCentered(40)
                .border("1px #C3C3C3 solid")
            .save();
        
        _views.icon.select_path()
            .begin()
                .width(40)
                .height(42)
                .marginTop(10)
                .backgroundColor("#f2812f")
            .save();

    };

    $protected.extension.void.on_mobile_style = function(_views) {

        $self.select_viewport()
            .begin()
                .backgroundColor("#f2812f")
            .save();

        _views.input.views.text.select_path_viewport()
            .begin()
                .widthCropFromFull(21)
                .left(10)
                .border("none")
            .save();

    };

    $protected.override.void.on_medium_viewport = function(_views) {

        _views.input.views.text.set_size("small");
        _views.input.views.text.apply();

    };

    $protected.override.void.on_narrow_viewport = function(_views) {

        _views.input.views.text.set_size("smaller");
        _views.input.views.text.apply();

    };

});