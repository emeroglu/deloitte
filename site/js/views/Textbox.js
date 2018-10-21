$js.compile("Textbox", View, function($public, $private, $protected, $self) {

    $private.field.input = null;

    $private.field.placeholder = "";
    $public.void.set_placeholder = function(_placeholder) { $self.placeholder = _placeholder; };

    $private.field.size = "medium";
    $public.void.set_size = function(_size) { $self.size = _size; };

    $private.void.on_change = function() {};
    $public.delegate.onChange = function($delegate) { $self.on_change = $delegate; return $self; };

    $public.override.void.apply = function() {

        $self.input.setAttribute("d-size", $self.size);

    };

    $protected.override.func.on_key = function() { return "textbox"; };

    $protected.override.func.on_compile = function() {

        let e = document.createElement($self.tag);

        $self.input = document.createElement("input");
        $self.input.setAttribute("type", "text");            
        $self.input.setAttribute("d-size", $self.size);
        e.appendChild($self.input);

        return e;

    };

    $protected.override.void.on_ready = function(_views, $ready) {

        $self.input.onfocus = function () {

            if ($self.raw() == $self.placeholder)        
                $self.text("");  

        };

        $self.input.onblur = function() {

            if ($self.raw() == "") {

                $self.text($self.placeholder);
                $self.input.setAttribute("type", "text");       

            }

        };

        $self.input.oninput = function() {

            if ($self.raw() == $self.placeholder)        
                $self.text("");

            $self.on_change($self.text());

        };

        $self.text($self.placeholder);

        $ready();

    };

    $public.func.raw = function() {
        return $self.input.value;
    };

    $public.void.text = function(_text) {

        if (_text == null)
            return $self.input.value.trim()
        else
            $self.input.value = _text;

    };

    $protected.extension.void.on_style = function(_views) {

        $self.select_tag()
            .begin()
                .absolute()
                .sideFull()
                .backgroundColor("#FFFFFF")
            .save();

        $css.select("d-textbox input")
            .begin()
                .absolute()
                .widthCropFromFull(10)
                .heightFull()
                .left(10)
                .textColor("#666666")
                .textSize(24)
                .removeBorder()
                .removeBackground()
                .removeOutline()
            .save();

        $css.select("d-textbox input[d-size='smallest']")
            .begin()
                .textSize(12)
            .save();
        
        $css.select("d-textbox input[d-size='smaller']")
            .begin()
                .textSize(14)
            .save();
        
        $css.select("d-textbox input[d-size='small']")
            .begin()
                .textSize(16)
            .save();

        $css.select("d-textbox input[d-size='medium']")
            .begin()
                .textSize(20)
            .save();

        $css.select("d-textbox input[d-size='large']")
            .begin()
                .textSize(24)
            .save();

        $css.select("d-textbox input[d-size='larger']")
            .begin()
                .textSize(30)
            .save();

    };

});