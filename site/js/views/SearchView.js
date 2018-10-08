$js.compile("SearchView", View, function($public, $private, $protected, $self) {

    $protected.override.func.on_key = function() { return "search-view"; };

    $protected.extension.void.on_style = function(_views) {

    };

});