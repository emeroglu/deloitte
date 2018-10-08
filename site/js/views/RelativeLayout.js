$js.compile("RelativeLayout", View, function($public, $private, $protected, $self) {

    $protected.override.func.on_key = function() { return "relative-layout"; };

    $protected.extension.void.on_style = function(_views) {

        $self.select()
            .begin()
                .relativeLeft()
            .save();

    };

});