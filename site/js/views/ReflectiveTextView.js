$js.compile("ReflectiveTextView", TextView, function($public, $private, $protected, $self) {

    $protected.override.func.on_key = function() { return "reflective-text-view"; };

    $protected.extension.void.on_style = function(_views) {

        $self.select()
            .begin()
                .relativeLeft()
            .save();

    };

});