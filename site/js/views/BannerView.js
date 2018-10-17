$js.compile("BannerView", View, function($public, $private, $protected, $self) {

    $protected.override.func.on_key = function() { return "banner-view"; };

    $protected.override.void.on_flourish = function(_views) {

        _views.image = new ReflectiveImageView();

    };

    $protected.override.void.on_feed = function(_views) {

        _views.image.set_src("https://images.lowes.ca/images/articles/xx_l1_kitchen_main.jpg");

    };

    $protected.extension.void.on_style = function(_views) {

        $self.select()
            .begin()
                .relativeLeft()
                .widthCropFromFull(50)
                .marginLeft(25)
            .save();

    };

    $protected.extension.void.on_mobile_style = function(_views) {

        $self.select()
            .begin()
                .relativeLeft()
                .widthFull()
                .marginLeft(0)
            .save();

    };

});