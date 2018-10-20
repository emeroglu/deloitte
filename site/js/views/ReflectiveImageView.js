$js.compile("ReflectiveImageView", ImageView, function($public, $private, $protected, $self) {

    $protected.override.func.on_key = function() { return "reflective-image-view"; };

    $protected.override.void.on_style = function(_views) {

        $self.select_tag()
            .begin()
                .relativeLeft()
                .widthFull()
            .save();

        $css.select($self.tag + " img")
            .begin()
                .relativeLeft()
                .widthFull()
            .save();

    };

});