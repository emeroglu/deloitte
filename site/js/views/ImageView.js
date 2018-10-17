$js.compile("ImageView", View, function($public, $private, $protected, $self) {

    $private.field.img = null;

    $private.field.src = "";
    $public.void.set_src = function(_src) { $self.src = _src; };

    $protected.override.func.on_key = function() { return "image-view"; };

    $protected.override.func.on_compile = function() {

        let e = document.createElement($self.tag);
        
        $self.img = document.createElement("img");
        e.appendChild($self.img);

        return e;

    };

    $protected.override.void.on_ready = function(_views, $ready) {

        $self.img.onload = function() {
            $ready();
        };
        $self.img.src = $self.src;

    };

    $protected.extension.void.on_style = function(_views) {

        if ($self.tag == "d-image-view") {

            $self.select()
                .begin()
                    .absolute()
                    .sideFull()
                    .mask()
                .save();

            $css.select($self.tag + " img")
                .begin()
                    .absolute()
                    .sideFull()
                .save();

        } else if ($self.tag == "d-reflective-image-view") {

            $self.select()
                .begin()
                    .relativeLeft()
                    .widthFull()
                .save();

            $css.select($self.tag + " img")
                .begin()
                    .relativeLeft()
                    .widthFull()
                .save();

        }

    };

});