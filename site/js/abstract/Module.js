$js.compile("Module", null, function($public, $private, $protected, $self) {

    $private.field.element = null;
    $private.field.container = null;
    $private.field.style_elements = [];

    $public.field.views = {};
    $public.field.pages = {};

    $private.field.tag = "";
    $public.func.get_tag = function() { return $self.tag; };

    $private.field.loaded = false;
    $public.func.is_loaded = function() { return $self.loaded; };

    $public.delegate.begin = function() { $self.parent = null; return $self; };

    $private.void.on_load = function() {};
    $public.delegate.onLoad = function($delegate) { $self.on_load = $delegate; return $self; };

    $private.field.key = "";
    $protected.virtual.func.on_key = function() { return ""; };

    $protected.virtual.void.on_construct = function(_pages, _views) { };
    $protected.virtual.void.on_ready = function(_pages, _views, $ready) { $ready(); };


    // Styling

    $private.void.generate_style_element = function(_id) {

        let e = document.createElement("style");
        e.setAttribute("id", _id);
        e.setAttribute("type", "text/css");
        document.head.appendChild(e);

        $self.style_elements.push(e);

    };

    $private.void.listen_viewport = function() {

        $bcast.listen("viewport_new", function() {

            $self.generate_style_element($self.tag + "-" + $view.port);

            $view.sneaky_load();

        });

    };

    $private.void.module_styling = function() {

        $css.select($self.tag)
            .begin()
                .absolute()
                .sideFull()
                .mask()
            .save();

        $css.select($self.tag + " d-pages")
            .begin()
                .absolute()
                .sideFull()
                .mask()
            .save();

    };

    $private.void.view_styling = function($) {

        $view.sneaky_load();

    };

    // Recurse

    $private.field.merged = [];
    $private.void.merge = function() {

        for (let key in $self.views) {
            $self.merged.push({ id: $self.views[key].id, obj: $self.views[key], type: "view" });
        }

        for (let key in $self.pages) {
            $self.merged.push({ id: $self.pages[key].id, obj: $self.pages[key], type: "page" });
        }

        $self.merged.sort(function(a, b) { if (a.id < b.id) return -1; else return 1; });

    };

    $private.field.index = 0;
    $private.void.on_recurse_end = function() {};
    $private.void.recurse = function() {

        $self.index++;

        if ($self.index == 0) {
            $self.merge();
        }
        
        if ($self.index == $self.merged.length) {
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

            let page = item.obj;

            if (page.is_initial()) {

                $self.container = document.createElement("d-pages");
                $self.element.appendChild($self.container);

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

    // Load

    $public.void.load = function() {

        $view.module = $self;

        $self.listen_viewport();

        $self.key = $self.on_key();
        $self.tag = "d-" + $self.key + "-module";

        $self.element = document.createElement($self.tag);
        document.body.appendChild($self.element);

        $self.on_construct($self.pages, $self.views);

        $self.generate_style_element($self.tag);
        
        $css.target = $self.tag;
        $self.module_styling();
        $self.view_styling();

        $self.index = -1;
        $self.on_recurse_end = function() {

            $self.initial_page.show(function() {

                $self.loaded = true;

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

        for (let index in $self.style_elements) {
            $self.style_elements[index].remove();
        }

        $self.container.remove();
        $self.element.remove();

    };

});