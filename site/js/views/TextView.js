$js.compile("TextView", View, function($public, $private, $protected, $self) {

    $private.field.text = "";
    $public.void.set_text = function(_text) { $self.text = _text; };

    $private.field.align = "center";
    $public.void.set_align = function(_align) { $self.align = _align; };

    $private.field.weight = "normal";
    $public.void.set_weight = function(_weight) { $self.weight = _weight; };

    $private.field.height = "medium";
    $public.void.set_height = function(_height) { $self.height = _height; };

    $private.field.size = "medium";
    $public.void.set_size = function(_size) { $self.size = _size; };

    $private.field.color = "gray";
    $public.void.set_color = function(_color) { $self.color = _color; };

    $public.override.void.apply = function() {

        $self.element.innerHTML = $self.text;
        $self.element.setAttribute("d-align", $self.align);
        $self.element.setAttribute("d-weight", $self.weight);
        $self.element.setAttribute("d-size", $self.size);
        $self.element.setAttribute("d-color", $self.color);
        $self.element.setAttribute("d-height", $self.height);

    };

    $protected.override.func.on_key = function() { return "text-view"; };

    $protected.override.void.on_compile = function() {

        let e = document.createElement($self.tag);
        e.innerHTML = $self.text;
        e.setAttribute("d-align", $self.align);
        e.setAttribute("d-weight", $self.weight);
        e.setAttribute("d-size", $self.size);
        e.setAttribute("d-color", $self.color);
        e.setAttribute("d-height", $self.height);
        return e;

    };

    $protected.extension.void.on_style = function(_views) {

        $self.select()
            .begin()
                .absolute()
                .sideFull()
            .save();

        $css.select($self.tag + "[d-align='left']")
            .begin()
                .textLeft()
            .save();

        $css.select($self.tag + "[d-align='center']")
            .begin()
                .textCenter()
            .save();

        $css.select($self.tag + "[d-align='right']")
            .begin()
                .textRight()
            .save();

        $css.select($self.tag + "[d-weight='light']")
            .begin()
                .textWeight(400)
            .save();

        $css.select($self.tag + "[d-weight='normal']")
            .begin()
                .textWeight(600)
            .save();

        $css.select($self.tag + "[d-weight='bold']")
            .begin()
                .textWeight(800)
            .save();

        $css.select($self.tag + "[d-size='smallest']")
            .begin()
                .textSize(12)
            .save();
        
        $css.select($self.tag + "[d-size='smaller']")
            .begin()
                .textSize(14)
            .save();
        
        $css.select($self.tag + "[d-size='small']")
            .begin()
                .textSize(16)
            .save();

        $css.select($self.tag + "[d-size='medium']")
            .begin()
                .textSize(20)
            .save();

        $css.select($self.tag + "[d-size='large']")
            .begin()
                .textSize(24)
            .save();

        $css.select($self.tag + "[d-size='larger']")
            .begin()
                .textSize(30)
            .save();

        $css.select($self.tag + "[d-color='white']")
            .begin()
                .textColor("#FFFFFF")
            .save();

        $css.select($self.tag + "[d-color='gray']")
            .begin()
                .textColor("#666666")
            .save();

        $css.select($self.tag + "[d-color='black']")
            .begin()
                .textColor("#000000")
            .save();

        $css.select($self.tag + "[d-height='shorter']")
            .begin()
                .textHeight(20)
            .save();

        $css.select($self.tag + "[d-height='short']")
            .begin()
                .textHeight(25)
            .save();

        $css.select($self.tag + "[d-height='medium']")
            .begin()
                .textHeight(30)
            .save();

        $css.select($self.tag + "[d-height='tall']")
            .begin()
                .textHeight(40)
            .save();

        $css.select($self.tag + "[d-height='taller']")
            .begin()
                .textHeight(60)
            .save();

        $css.select($self.tag + "[d-height='tallest']")
            .begin()
                .textHeight(80)
            .save();

    };

});