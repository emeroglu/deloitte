$js.compile("View", null, function($public, $private, $protected, $self) {

    $private.field.element = null;

    $protected.field.views = {};

    $private.field.key = "";
    $private.field.name = "";

    $private.field.state = "";
    $private.field.anim = "";
    $private.field.duration = 0;

    $private.field.tag = "";
    $public.func.get_tag = function() { return $self.tag; };

    $private.field.loaded = false;
    $public.func.is_loaded = function() { return $self.loaded; };

    $public.delegate.begin = function() { $self.parent = null; return $self; };

    $private.field.parent = null;
    $public.delegate.setParent = function(_parent) { $self.parent = _parent; return $self; };

    $private.void.on_load = function() {};
    $public.delegate.onLoad = function($on_load) { $self.on_load = $on_load; return $self; };

    $private.void.on_click = function() {};
    $public.delegate.onClick = function($on_click) { $self.on_click = $on_click; return $self; };

    $protected.virtual.func.on_key = function() { return "view"; };

    $protected.virtual.func.on_compile = function() { return document.createElement($self.tag); };
    $protected.virtual.void.on_construct = function(_views) { };
    $protected.virtual.void.on_self_style = function(_views) { $self.selection = "self"; $css.target = $view.page.get_tag(); };
    $protected.virtual.void.on_ready = function(_views, $ready) { $ready(); };

    $protected.virtual.void.on_style = function(_views) { $self.selection = "path"; $css.target = $view.module.get_tag();  };

    $protected.virtual.void.on_wide_style = function(_views) { $self.selection = "path_viewport"; $css.target = $view.module.get_tag() + "-" + $view.port;  };
    $protected.virtual.void.on_medium_style = function(_views) { $self.selection = "path_viewport"; $css.target = $view.module.get_tag() + "-" + $view.port; };
    $protected.virtual.void.on_narrow_style = function(_views) { $self.selection = "path_viewport"; $css.target = $view.module.get_tag() + "-" + $view.port; };
    $protected.virtual.void.on_mobile_style = function(_views) { $self.selection = "path_viewport"; $css.target = $view.module.get_tag() + "-" + $view.port; };

    $protected.virtual.void.on_wide_screen = function(_views) { $self.selection = "self_viewport"; $css.target = $view.page.get_tag() + "-" + $view.port; };
    $protected.virtual.void.on_medium_screen = function(_views) { $self.selection = "self_viewport"; $css.target = $view.page.get_tag() + "-" + $view.port; };
    $protected.virtual.void.on_narrow_screen = function(_views) { $self.selection = "self_viewport"; $css.target = $view.page.get_tag() + "-" + $view.port; };
    $protected.virtual.void.on_mobile_screen = function(_views) { $self.selection = "self_viewport"; $css.target = $view.page.get_tag() + "-" + $view.port; };

    $protected.virtual.void.on_viewport_changed = function(_port, _views) { };


    $public.func.select = function() { 
        
        if ($self.selection == "self")
            return $css.select($self.tag + "[d-id='" + $self.__id__ + "']"); 
        else if ($self.selection == "self_viewport")
            return $css.select($self.tag + "[d-id='" + $self.__id__ + "'][d-viewport='" + $view.port + "']"); 
        else if ($self.selection == "path")
            return $css.select($self.cascading_path()); 
        else if ($self.selection == "path_viewport")
            return $css.select($self.cascading_path() + "[d-viewport='" + $view.port + "']"); 

    };

    $private.field.selection = "";
    $private.func.cascading_path = function() {

        if ($self.parent.cascading_path == undefined)
            return $self.tag;
        else
            return $self.parent.cascading_path() + " " + $self.tag;

    };

    $private.void.listen_viewport = function() {

        $bcast.listen("viewport_wide", function() { $self.on_wide_screen($self.views); });
        $bcast.listen("viewport_medium", function() { $self.on_medium_screen($self.views); });
        $bcast.listen("viewport_narrow", function() { $self.on_narrow_screen($self.views); });
        $bcast.listen("viewport_mobile", function() { $self.on_mobile_screen($self.views); });

        $bcast.listen("viewport_changed", function() { 

            $self.element.setAttribute("d-viewport", $view.port);
            
            $self.on_viewport_changed($view.port, $self.views);

        });

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

        $self.listen_viewport();

        $self.key = $self.on_key();
        $self.tag = "d-" + $self.key;

        $self.on_construct($self.views);

        $self.element = $self.on_compile();

        if ($self.parent != null)
            $self.parent.element.appendChild($self.element);

        $self.element.setAttribute("d-id", $self.__id__);

        if ($self.name != "") {
            $self.element.setAttribute("d-name", $self.name);
            $view[$self.name] = $self;
        }

        $self.index = -1;
        $self.on_recurse_end = function() {

            $self.on_self_style($self.views);

            $self.on_ready($self.views, $self.on_load);

            $self.loaded = true;

        };
        $self.recurse();

    };

    $private.void.sneaky_recurse = function() {

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
                .onLoad($self.sneaky_recurse)
            .sneaky_load();

    };

    $public.void.sneaky_load = function() {

        $self.key = $self.on_key();
        $self.tag = "d-" + $self.key;

        $self.on_construct($self.views);

        $self.index = -1;
        $self.on_recurse_end = function() {

            if ($view.module.is_loaded())
                eval("$self.on_" + $view.port + "_style($self.views);");
            else
                $self.on_style($self.views);

            $self.on_load();

        };
        $self.sneaky_recurse();

    };

});