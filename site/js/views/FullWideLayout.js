$js.compile("FullWideLayout", View, function($public, $private, $protected, $self) {

    $protected.override.func.on_key = function() { return "full-wide-layout"; };

    $protected.extension.void.on_style = function(_views) {

        $self.select_tag()
            .begin()
                .relativeLeft()
                .widthFromViewportWidth(100)
            .save();

    };

});