$js.compile("BannerView", View, function($public, $private, $protected, $self) {

    $protected.override.func.on_key = function() { return "banner-view"; };

    $protected.override.void.on_construct = function(_views) {

        _views.image = new ReflectiveImageView();

        _views.action = new AbsoluteLayout();

    };

    $protected.override.void.on_flourish = function(_views) {

        _views.action.views.text = new ReflectiveTextView();
        _views.action.views.button = new TextView();

    };

    $protected.override.void.on_feed = function(_views) {

        _views.image.set_src("/Banner");

        _views.action.views.text.set_text("Enjoy new lower prices and special buys on hardwood, vinyl, carpet and tile");
        _views.action.views.text.set_align("left");
        _views.action.views.text.set_height("auto");
        _views.action.views.text.set_line_height("short");
        _views.action.views.text.set_color("white");
        _views.action.views.text.set_size("small");

        _views.action.views.button.set_height("medium");
        _views.action.views.button.set_line_height("medium");
        _views.action.views.button.set_color("white");
        _views.action.views.button.set_size("small");

    };

    $protected.extension.void.on_style = function(_views) {

        $self.select()
            .begin()
                .relativeLeft()
                .widthCropFromFull(20)
                .marginHorizontal(10)
                .marginTop(10)
            .save();

        _views.action.select()
            .begin()
                .width(200)
                .left(0)
                .bottom(0)
            .save();

        _views.action.views.button.select()
            .begin()
                .widthFull()
                .height(30)
                .backgroundColor("#f2812f")
                .round(3)
            .save();

    };

});