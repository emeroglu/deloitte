$js.compile("View", null, function($public, $private, $protected, $self) {

    $private.field.element = null;

    $public.field.views = {};

    $private.field.key = "";
    $private.field.tag = "";
    $private.field.selector = "";

    $private.field.state = "";
    $private.field.anim = "";
    $private.field.duration = 0;

    $public.delegate.func.begin = function() { $self.parent = null; return $self; };

    $private.field.parent = null;
    $public.delegate.setParent = function(_parent) { $self.parent = _parent; return $self; };

    $private.void.on_load = function() {};
    $public.delegate.onLoad = function($on_load) { $self.on_load = $on_load; return $self; };

    $private.void.on_click = function() {};
    $public.delegate.onClick = function($on_click) { $self.on_click = $on_click; return $self; };

    $protected.virtual.func.on_tag = function() { return "d-view"; };

    $protected.virtual.func.on_compile = function() { return document.createComment($self.tag); };
    $protected.virtual.void.on_construct = function(_views) { };
    $protected.virtual.void.on_style = function(_views) { };
    $protected.virtual.void.on_ready = function(_views, $ready) { $ready(); };


    $private.field.keys = [];

    $private.field.index = 0;
    $private.void.on_recurse_end = function() {};
    $private.void.recurse = function() {

        $self.index++;

        if ($self.index == 0) {
            $self.keys = Object.keys($self.views);
        }

        if ($self.index == $self.keys.length) {
            $self.on_recurse_end();
            return;
        }

        let key = $self.keys[$self.index];
        let view = $self.views[key];

        view
            .begin()
                .setParent($self)
                .onLoad($self.recurse)
            .load();

    };

    $public.void.load = function() {

        $self.tag = $self.on_tag();
        $self.selector = $self.tag + "[d-id='" + $self.id + "']";

        $self.on_construct($self.views);

        $self.element = $self.on_compile();

        if ($self.parent != null)
            $self.parent.element.appendChild($self.element);

        $self.element.setAttribute("d-id", $self.id);

        if ($self.name != "") {
            $self.element.setAttribute("d-name", $self.name);
            $view[$self.name] = $self;
        }

        $self.index = -1;
        $self.on_recurse_end = function() {

            $self.on_style($self.views);

            $self.on_ready($self.views, $self.on_load);

        };
        $self.recurse();

    };

});