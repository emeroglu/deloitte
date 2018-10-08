$js.compile("ListView", View, function($public, $private, $protected, $self) {

    $private.field.container = null;

    $private.field.model = [];

    $protected.override.func.on_key = function() { return "list-view"; };

    $private.func.on_width = function() { return 0; };
    $public.delegate.onWidth = function($delegate) { $self.on_width = $delegate; return $self; };

    $private.func.on_model = function() { return []; };
    $public.delegate.onModel = function($delegate) { $self.on_model = $delegate; return $self; };

    $private.func.on_generate = function(_view, _model) { };
    $public.delegate.onGenerate = function($delegate) { $self.on_generate = $delegate; return $self; };

    $protected.override.void.on_construct = function(_views) {

        $self.model = $self.on_model();

        _views.container = new View();

        for (let index in $self.model) {

            let name = "item_" + index;
            let view = new ListItemView();
            view.set_name(name);
            view.set_width($self.on_width());

            $self.on_generate(view, $self.model[index]);

            _views.container.views[name] = view;

        }

    };

    $protected.extension.void.on_style = function(_views) {

        $self.select()
            .begin()
                .absolute()
                .sideFull()
            .save();

    };

});