$js.compile("Page", null, function($public, $private, $protected, $self) {

    $public.field.element = null;
    $public.field.css = null;

    $public.field.views = {};

    $public.field.key = "";
    $public.field.tag = "";
    $public.field.selector = "";

    $public.field.loaded = false;

    $public.delegate.begin = function() { $self.parent = null; return $self; };

    $private.field.module = {};
    $public.delegate.setModule = function(_module) { $self.module = _module; return $self; };

    $private.void.on_load = function() {};
    $public.delegate.onLoad = function($on_load) { $self.on_load = $on_load; return $self; };

    $public.virtual.func.is_initial = function() { return false; };

    $protected.virtual.func.on_key = function() { return ""; };

    $protected.virtual.void.on_construct = function(_views) { };
    $protected.virtual.void.on_style = function(_views) { };
    $protected.virtual.void.on_ready = function(_views, $ready) { $ready(); };

    $private.void.dynamic_css = function() {

        $self.css = document.createElement("style");
        $self.css.setAttribute("id", $self.tag);
        $self.css.setAttribute("type", "text/css");
        document.head.appendChild($self.css);

    };

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

        $self.key = $self.on_key();
        $self.tag = "d-" + $self.key + "-page";

        $self.selector = $self.tag;

        $self.on_construct($self.views);

        $self.dynamic_css();
        $css.target = $self.tag;

        $self.element = document.createElement($self.tag);
        $self.module.container.appendChild($self.element);

        $self.index = -1;
        $self.on_recurse_end = function() {

            $css.select($self.selector)
                .begin()
                    .absolute()
                    .sideFull()
                    .mask()
                .save()
                .state("initial")
                    .opacity(1)
                .save()
                .state("show")
                    .opacity(1)
                .save()
                .state("hide")
                    .opacity(0)
                .save();

            $self.on_style($self.views);

            $self.element.className = "d-none d-initial";

            $self.on_ready($self.views, $self.on_load);

            $self.loaded = true;

        };
        $self.recurse();

    };

    $public.void.show = function($on_show) {

        $self.element.className = "d-disp d-show";

        $on_show();

    };

});