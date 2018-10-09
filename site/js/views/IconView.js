$js.compile("IconView", View, function($public, $private, $protected, $self) {

    $private.field.icon = "";
    $public.void.set_icon = function(_icon) { $self.icon = _icon; };

    $private.field.weight = "";
    $public.void.set_weight = function(_weight) { $self.weight = _weight; };

    $private.field.size = 0;
    $public.void.set_size = function(_size) { $self.size = _size; };

    $private.field.side = 0;
    $public.void.set_side = function(_side) { $self.side = _side; };
    
    $private.field.color = "";
    $public.void.set_color = function(_color) { $self.color = _color; };

    $protected.override.func.on_key = function() { return "icon-view"; };

    $protected.override.func.on_compile = function() {

        let e = document.createElement($self.tag);
            
        let fa = "";

        if ($self.weight == "light")
            fa = "fal";
        else if ($self.weight == "regular")
            fa = "far";
        else
            fa = "fa";

        let i = document.createElement("i");
        i.className = fa + " fa-" + $self.icon;

        e.appendChild(i);

        return e;

    };

    $protected.extension.void.on_style = function(_views) {

        $self.select()
            .begin()
                .absolute()
                .sideFull()
            .save();

        $css.select($sef.tag + " i")
            .begin()
                .absolute()
                .textCenter()
            .save();

    };

    $protected.extension.void.on_self_style = function(_views) {

        $css.select($self.tag + " i")
            .begin()
                .textSize(($self.size == 0) ? 22 : $self.size)
                .textColor(($self.color == "") ? "#000000" : $self.color)
                .sideCentered(($self.side == 0) ? 40 : $self.side)
                .impTextLineHeight(($self.side == 0) ? 40 : $self.side)
            .save();

    };

});