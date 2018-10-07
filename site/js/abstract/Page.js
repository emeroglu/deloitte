$js.compile("Page", null, function($public, $private, $protected, $self) {

    $public.field.element = null;
    $public.field.css = null;

    $public.field.views = {};

    $public.field.tag = "";
    $public.field.selector = "";

    $public.field.loaded = false;

    $public.delegate.func.begin = function() { $self.parent = null; return $self; };

    $private.field.module = {};
    $public.delegate.func.setModule = function(_module) { $self.module = _module; return $self; };

    $private.void.on_load = function() {};
    $public.delegate.func.onLoad = function($on_load) { $self.on_load = $on_load; return $self; };

    $private.field.is_initial = null;
    $protected.virtual.func.on_if_initial = function() { $self.is_initial = false; }; 

    $protected.virtual.func.on_key = function() { return ""; };

    $protected.virtual.void.on_construct = function(_pages, _views) { };
    $protected.virtual.void.on_style = function(_pages, _views) { };
    $protected.virtual.void.on_ready = function(_pages, _views, $ready) { $ready(); };

    $private.void.dynamic_css = function() {

        $self.css = document.createElement("style");
        e.setAttribute("id", $self.tag);
        e.setAttribute("type", "text/css");
        document.head.appendChild($self.css);

    };

    $private.field.index = 0;
    $private.void.on_recurse_end = function() {};
    $private.void.recurse = function() {

    };

    $public.void.load = function() {

        $self.on_if_initial();

        $self.tag = "d-" + $self.on_key() + "-page";

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

    $public.void.show = function() {

        $self.element.className = "d-disp d-show";

    };

});