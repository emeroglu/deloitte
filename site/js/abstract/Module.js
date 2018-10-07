$js.compile("Module", null, function($public, $private, $protected, $self) {

    $public.field.element = null;
    $public.field.container = null;
    $public.field.css = null;

    $public.field.views = {};
    $public.field.pages = {};

    $public.field.tag = "";
    $public.field.selector = "";

    $private.field.container_generated = false;

    $public.delegate.func.begin = function() { $self.parent = null; return $self; };

    $private.void.on_load = function() {};
    $public.delegate.func.onLoad = function($on_load) { $self.on_load = $on_load; return $self; };

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

    $private.field.merged = [];
    $private.void.merge = function() {

        for (let key in $self.views) {
            $self.merged({ id: $self.views[key].id, obj: $self.views[key], type: "view" });
        }

        for (let key in $self.pages) {
            $self.merged({ id: $self.pages[key].id, obj: $self.pages[key], type: "page" });
        }

        $self.merged.sort(function(a, b) { if (a.id < b.id) return -1; else return 1; });

    };

    $private.field.index = 0;
    $private.void.on_recurse_end = function() {};
    $private.void.recurse = function() {

        $self.index++;

        if ($self.index == 0) {
            
            $self.merge();

        } else if ($self.index == $self.merged.length) {
            
            $self.on_recurse_end();

            return;

        }

        let item = $self.merged[$self.index];

        if (item.type == "view") {

            let view = item.obj;

            view
                .begin()
                    .setParent($self)
                    .onLoad($self.recurse)
                .load();

        } else if (item.type == "page") {

            if (!$self.container_generated) {
                $self.container = document.createElement("d-pages");
                $self.element.appendChild($self.container);
                $self.container_generated = true;
            }

            let page = item.obj;

            if (page.is_initial) {

                $self.initial_page = page;

                page
                    .begin()
                        .setModule($self)
                        .onLoad($self.recurse)
                    .load();

            } else {

                $self.recurse();

            }

        }

    };

    $public.void.load = function() {

        $self.tag = "d-" + $self.key + "-module";

        $self.selector = $self.tag;

        $self.element = document.createElement($self.tag);
        document.body.appendChild($self.element);

        $self.on_construct($self.pages, $self.views);

        $self.dynamic_css();
        $css.target = $self.tag;

        $self.index = -1;
        $self.on_recurse_end = function() {

            $css.select($self.selector)
                .begin()
                    .absolute()
                    .sideFull()
                    .mask()
                .save();

            $css.target = $self.tag;

            $self.on_style($self.pages, $self.views);

            $self.initial_page.show(function() {

                $self.on_ready($self.pages, $self.views, $self.on_load);

            });

        };
        $self.recurse();

    };

    $public.void.destroy = function() {

        for (let key in $self.views) {
            $self.views[key].destroy();
        }

        for (let key in $self.pages) {
            $self.pages[key].destroy();
        }

        $self.css.remove();

        $self.container.remove();
        $self.element.remove();

    };

});