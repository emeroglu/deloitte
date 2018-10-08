$js.compile("AbsoluteLayout", View, function($public, $private, $protected, $self) {

    $protected.override.func.on_key = function() { return "absolute-layout"; };

    $protected.extension.void.on_style = function(_views) {

        $self.select()
            .begin()
                .absolute()
            .save();

    };

});