$js.compile("ProductView", View, function($public, $private, $protected, $self) {

    $private.field.image = "";
    $public.void.set_image = function(_image) { $self.image = _image; };

    $private.field.title = "";
    $public.void.set_title = function(_title) { $self.title = _title; };

    $private.field.text = "";
    $public.void.set_text = function(_text) { $self.text = _text; };

    $private.field.link = "";
    $public.void.set_link = function(_link) { $self.link = _link; };

    $protected.override.func.on_key = function() { return "product-view"; };

    $protected.override.void.on_construct = function(_views) {

        _views.left = new RelativeLayout();
        _views.left.set_name("left");
        
        _views.right = new RelativeLayout();
        _views.right.set_name("right");

    };

    $protected.override.void.on_flourish = function(_views) {

        _views.left.views.image = new ReflectiveImageView();
        
        _views.right.views.title = new ReflectiveTextView();
        _views.right.views.text = new ReflectiveTextView();
        _views.right.views.link = new ReflectiveTextView();

    };

    $protected.override.void.on_feed = function(_views) {

        _views.left.views.image.set_src($self.image);

        _views.right.views.title.set_text($self.title);
        _views.right.views.title.set_align("left");
        _views.right.views.title.set_height("tall");
        _views.right.views.title.set_line_height("tall");
        _views.right.views.title.set_size("larger");
        _views.right.views.title.set_weight("bold");
        _views.right.views.title.set_color("black");

        _views.right.views.text.set_text($self.text);
        _views.right.views.text.set_align("left");
        _views.right.views.text.set_height("tall");
        _views.right.views.text.set_line_height("tall");
        _views.right.views.text.set_size("smaller");
        _views.right.views.text.set_weight("normal");

        _views.right.views.link.set_text($self.link);
        _views.right.views.link.set_align("left");
        _views.right.views.link.set_height("tall");
        _views.right.views.link.set_line_height("tall");
        _views.right.views.link.set_size("small");
        _views.right.views.link.set_weight("bold");
        _views.right.views.link.set_color("black");

    };

    $protected.extension.void.on_style = function(_views) {

        $self.select_tag()
            .begin()
                .relativeLeft()
                .widthCropFromFull(20)
                .marginHorizontal(10)
            .save();

        _views.left.select_path()
            .begin()
                .widthHalf()
            .save();

        _views.right.select_path()
            .begin()
                .widthCropFromHalf(20)
                .marginLeft(20)
                .marginTop(0)
            .save();

    };

    $protected.extension.void.on_mobile_style = function(_views) {

        _views.left.select_path_viewport()
            .begin()
                .widthFull()
            .save();

        _views.right.select_path_viewport()
            .begin()
                .widthFull()
                .marginLeft(0)
                .marginTop(20)
            .save();

    };

    $protected.override.void.on_wide_viewport = function(_views) {

        _views.right.views.title.set_height("tall");
        _views.right.views.title.set_line_height("tall");
        _views.right.views.title.set_size("larger");
        _views.right.views.title.apply();

        _views.right.views.text.set_height("tall");
        _views.right.views.text.set_line_height("tall");
        _views.right.views.text.set_size("smaller");
        _views.right.views.text.apply();

        _views.right.views.link.set_height("tall");
        _views.right.views.link.set_line_height("tall");
        _views.right.views.link.set_size("small");
        _views.right.views.link.apply();

    };

    $protected.override.void.on_medium_viewport = function(_views) {

        _views.right.views.title.set_height("tall");
        _views.right.views.title.set_line_height("tall");
        _views.right.views.title.set_size("large");
        _views.right.views.title.apply();

        _views.right.views.text.set_height("medium");
        _views.right.views.text.set_line_height("medium");
        _views.right.views.text.set_size("smaller");
        _views.right.views.text.apply();

        _views.right.views.link.set_height("medium");
        _views.right.views.link.set_line_height("medium");
        _views.right.views.link.set_size("small");
        _views.right.views.link.apply();

    };

    $protected.override.void.on_narrow_viewport = function(_views) {

        _views.right.views.title.set_height("medium");
        _views.right.views.title.set_line_height("medium");
        _views.right.views.title.set_size("medium");
        _views.right.views.title.apply();

        _views.right.views.text.set_height("short");
        _views.right.views.text.set_line_height("short");
        _views.right.views.text.set_size("smallest");
        _views.right.views.text.apply();

        _views.right.views.link.set_height("short");
        _views.right.views.link.set_line_height("short");
        _views.right.views.link.set_size("smaller");
        _views.right.views.link.apply();

    };

});