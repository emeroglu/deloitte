$js.compile("Module", null, function($public, $private, $protected, $self) {

    $private.field.element = null;
    $private.field.container = null;
    $private.field.css = null;

    $protected.field.views = {};
    $protected.field.pages = {};

    $private.field.key = "";
    $private.field.selector = "";

    $private.field.tag = "";
    $public.func.get_tag = function() { return $self.tag; };

    $private.field.loaded = false;
    $public.func.is_loaded = function() { return $self.loaded; };

    $private.field.container_generated = false;

    $public.delegate.begin = function() { $self.parent = null; return $self; };

    $private.void.on_load = function() {};
    $public.delegate.onLoad = function($on_load) { $self.on_load = $on_load; return $self; };

    $protected.virtual.func.on_key = function() { return ""; };

    $protected.virtual.void.on_construct = function(_pages, _views) { };
    $protected.virtual.void.on_style = function(_pages, _views) { };
    $protected.virtual.void.on_ready = function(_pages, _views, $ready) { $ready(); };

    $private.void.dynamic_css = function(_id) {

        $self.css = document.createElement("style");
        $self.css.setAttribute("id", _id);
        $self.css.setAttribute("type", "text/css");
        document.head.appendChild($self.css);

    };

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

            if (!$self.container_generated) {
                $self.container = document.createElement("d-pages");
                $self.element.appendChild($self.container);
                $self.container_generated = true;
            }

            let page = item.obj;

            if (page.is_initial()) {

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

    $private.void.listen_viewport = function() {

        $bcast.listen("viewport_new", function() {

            $self.dynamic_css($self.tag + "-" + $view.port);

            new DummyView()
                .begin()
                    .setParent($self)
                .sneaky_load();

        });

    };

    $public.void.load = function() {

        $view.module = $self;

        $self.listen_viewport();

        $self.key = $self.on_key();
        $self.tag = "d-" + $self.key + "-module";

        $self.selector = $self.tag;

        $self.element = document.createElement($self.tag);
        document.body.appendChild($self.element);

        $self.on_construct($self.pages, $self.views);

        $self.dynamic_css($self.tag);
        $css.target = $self.tag;
        $css.select($self.selector)
                .begin()
                    .absolute()
                    .sideFull()
                    .mask()
                .save();

        new DummyView()
            .begin()
                .setParent($self)
                .onLoad(function() {

                    $self.index = -1;
                    $self.on_recurse_end = function() {
            
                        $self.on_style($self.pages, $self.views);
            
                        $self.initial_page.show(function() {
            
                            $self.loaded = true;

                            $self.on_ready($self.pages, $self.views, $self.on_load);
            
                        });
            
                    };
                    $self.recurse();

                })
            .sneaky_load();

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