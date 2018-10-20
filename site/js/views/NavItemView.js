$js.compile("NavItemView", View, function($public, $private, $protected, $self) {

    $private.field.icon = "";
    $public.void.set_icon = function(_icon) { $self.icon = _icon; };

    $private.field.text = "";
    $public.void.set_text = function(_text) { $self.text = _text; };

    $protected.override.func.on_key = function() { return "nav-item-view"; };

    $protected.override.void.on_construct = function(_views) {

        _views.left = new RelativeLayout();
        _views.left.set_name("left");
        
        _views.right = new RelativeLayout();
        _views.right.set_name("right");

    };

    $protected.override.void.on_flourish = function(_views) {

        _views.left.views.icon = new IconView();
        _views.right.views.text = new ReflectiveTextView();

    };

    $protected.override.void.on_feed = function(_views) {

        _views.left.views.icon.set_icon($self.icon);
        _views.left.views.icon.set_size(18);
        _views.left.views.icon.set_side(40);

        _views.right.views.text.set_text($self.text);
        _views.right.views.text.set_align("left");
        _views.right.views.text.set_height("taller");
        _views.right.views.text.set_line_height("taller");
        _views.right.views.text.set_size("smaller");
        _views.right.views.text.set_weight("normal");

    };

    $protected.override.void.on_medium_viewport = function(_views) {

        _views.right.views.text.set_line_height("taller");
        _views.right.views.text.apply();

    };

    $protected.override.void.on_narrow_viewport = function(_views) {

        _views.right.views.text.set_height("tall");
        _views.right.views.text.set_line_height("shorter");
        _views.right.views.text.apply();

    };

    $protected.extension.void.on_page_style = function(_views) {

        _views.left.select_path()
            .begin()
                .width(40)
                .height(60)
            .save();

        _views.right.select_path()
            .begin()
                .height(60)
            .save();

    };

    $protected.extension.void.on_narrow_style = function(_views) {

        _views.right.select_path_viewport()
            .begin()
                .width(70)
                .height(40)
                .marginTop(10)
            .save();

    };

});