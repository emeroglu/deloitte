$js.compile("AccountItemView", View, function($public, $private, $protected, $self) {

    $private.field.icon = "";
    $public.void.set_icon = function(_icon) { $self.icon = _icon; };

    $private.field.text = "";
    $public.void.set_text = function(_text) { $self.text = _text; };

    $protected.override.func.on_key = function() { return "account-item-view"; };

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
        _views.right.views.text.set_height("taller");
        _views.right.views.text.set_line_height("taller");
        _views.right.views.text.set_size("smaller");
        _views.right.views.text.set_weight("normal");

    };

    $protected.extension.void.on_page_style = function(_views) {

        _views.left.select()
            .begin()
                .width(40)
                .height(60)
            .save();

        _views.right.select()
            .begin()
                .height(60)
            .save();

    };

});