$js.compile("TextView", View, function($public, $private, $protected, $self) {

    $private.field.text = "";
    $public.void.set_text = function(_text) { $self.text = _text; };

    $private.field.align = "center";
    $public.void.set_align = function(_align) { $self.align = _align; };

    $private.field.height = 0;
    $public.void.set_height = function(_height) { $self.height = _height; };

    $private.field.size = 16;
    $public.void.set_size = function(_size) { $self.size = _size; };

    $private.field.color = "#666666";
    $public.void.set_color = function(_color) { $self.color = _color; };

    $protected.override.func.on_key = function() { return "text-view"; };

    $protected.override.void.on_compile = function() {

        let e = document.createElement($self.tag);
        e.innerHTML = $self.text;
        return e;

    };

    $protected.extension.void.on_style = function(_views) {

        $self.select()
            .begin()
                .absolute()
                .sideFull()
            .save();

    };

    $protected.extension.void.on_self_style = function(_views) {

        $self.select()
            .begin()
                .textSize($self.size)
                .textAlign($self.align)
                .textHeight($self.height)
                .textColor($self.color)
            .save();

    };

});