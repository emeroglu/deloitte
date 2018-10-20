$js.compile("BannerView", View, function($public, $private, $protected, $self) {

    $protected.override.func.on_key = function() { return "banner-view"; };

    $protected.override.void.on_construct = function(_views) {

        _views.image = new ReflectiveImageView();

        _views.action = new AbsoluteLayout();
        _views.action_m = new RelativeLayout();

    };

    $protected.override.void.on_flourish = function(_views) {

        _views.action.views.text = new ReflectiveTextView();
        _views.action.views.button = new TextView();

        _views.action_m.views.text = new ReflectiveTextView();
        _views.action_m.views.link = new ReflectiveTextView();

    };

    $protected.override.void.on_feed = function(_views) {

        _views.image.set_src("/Banner");

        _views.action.views.text.set_text("Enjoy new lower prices and special buys on hardwood, vinyl, carpet and tile");
        _views.action.views.text.set_align("left");
        _views.action.views.text.set_height("auto");
        _views.action.views.text.set_line_height("short");
        _views.action.views.text.set_color("white");
        _views.action.views.text.set_size("small");

        _views.action.views.button.set_text("Shop Flooring Details");
        _views.action.views.button.set_height("tall");
        _views.action.views.button.set_line_height("tall");
        _views.action.views.button.set_color("white");
        _views.action.views.button.set_size("small");

        _views.action_m.views.text.set_text("Enjoy new lower prices and special buys on hardwood, vinyl, carpet and tile");
        _views.action_m.views.text.set_align("left");
        _views.action_m.views.text.set_height("auto");
        _views.action_m.views.text.set_line_height("short");
        _views.action_m.views.text.set_color("gray");
        _views.action_m.views.text.set_size("smaller");

        _views.action_m.views.link.set_text("Shop Flooring Details");
        _views.action_m.views.link.set_align("left");
        _views.action_m.views.link.set_height("tall");
        _views.action_m.views.link.set_line_height("tall");
        _views.action_m.views.link.set_color("black");
        _views.action_m.views.link.set_size("small");
        _views.action_m.views.link.set_weight("bold");

    };

    $protected.extension.void.on_page_style = function(_views) {

        $self.select()
            .begin()
                .relativeLeft()
                .widthCropFromFull(20)
                .marginHorizontal(10)
                .marginTop(10)
            .save();

        _views.action.select()
            .begin()
                .width(290)
                .height(120)
                .left(20)
                .bottom(20)
            .save();

        _views.action.views.button.select()
            .begin()
                .widthFull()
                .backgroundColor("#f2812f")
                .round(3)
                .topPlain("auto")
                .bottom(0)
            .save();

        _views.action_m.select()
            .begin()
                .none()
                .widthFull()
                .marginTop(10)
            .save();

    };

    $protected.extension.void.on_mobile_style = function(_views) {

        _views.action.select("path_viewport")
            .begin()
                .none()
            .save();

        _views.action_m.select("path_viewport")
            .begin()
                .disp()
            .save();

    };

});