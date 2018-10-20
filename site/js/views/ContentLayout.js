$js.compile("ContentLayout", View, function($public, $private, $protected, $self) {

    $protected.override.func.on_key = function() { return "content-layout"; };

    $protected.override.void.on_ready = function(_views, $ready) {

        $bcast.listen("viewport_changed", function() { 

            $self.element.setAttribute("d-viewport", $view.port);

        });

        $ready();

    };

    $protected.extension.void.on_style = function(_views) {

        $self.select_tag()
            .begin()
                .relativeLeft()
            .save();

    };

    $protected.extension.void.on_wide_style = function(_views) {

        $self.select_tag_viewport()
            .begin()
                .widthCentered(1200)
            .save();

    };

    $protected.extension.void.on_medium_style = function(_views) {

        $self.select_tag_viewport()
            .begin()
                .widthCentered(992)
            .save();

    };

    $protected.extension.void.on_narrow_style = function(_views) {

        $self.select_tag_viewport()
            .begin()
                .widthCentered(768)
            .save();

    };

    $protected.extension.void.on_mobile_style = function(_views) {

        $self.select_tag_viewport()
            .begin()
                .widthFull()
            .save();

    };

});