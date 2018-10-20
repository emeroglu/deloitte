$js.compile("View", null, function($public, $private, $protected, $self) {

    $public.field.element = null;

    $public.field.views = {};

    $private.field.state = "";
    $private.field.anim = "";
    $private.field.duration = 0;

    $private.field.name = "";
    $public.func.set_name = function(_name) { $self.name = _name; };

    $private.field.tag = "";
    $public.func.get_tag = function() { return $self.tag; };

    $private.field.loaded = false;
    $public.func.is_loaded = function() { return $self.loaded; };

    $public.delegate.begin = function() { $self.parent = null; return $self; };

    $private.field.parent = null;
    $public.delegate.setParent = function(_parent) { $self.parent = _parent; return $self; };

    $private.void.on_load = function() {};
    $public.delegate.onLoad = function($delegate) { $self.on_load = $delegate; return $self; };

    $private.void.on_click = function() {};
    $public.delegate.onClick = function($delegate) { $self.on_click = $delegate; return $self; };

    $private.field.key = "";
    $protected.virtual.func.on_key = function() { return "view"; };
    $public.void.set_key = function(_key) { $self.key = _key; };

    $protected.virtual.func.on_compile = function() { return document.createElement($self.tag); };
    $protected.virtual.void.on_construct = function(_views) { };
    $protected.virtual.void.on_flourish = function(_views) { };
    $protected.virtual.void.on_feed = function(_views) { };
    $protected.virtual.void.on_ready = function(_views, $ready) { $ready(); };

    $public.virtual.void.apply = function() { };


    // Styling Once For Module (sneaky)

    $protected.virtual.void.on_style = function(_views) { $css.target = $view.module.get_tag();  };
    
    // Styling Once When Page is in view
    
    $protected.virtual.void.on_page_style = function(_views) { $css.target = $view.page.get_tag(); };

    // Styling Once For Each View

    $protected.virtual.void.on_self_style = function(_views) { $css.target = $view.page.get_tag(); };

    // Styling Once When Viewport Changes

    $protected.virtual.void.on_wide_style = function(_views) { $css.target = $view.module.get_tag() + "-" + $view.port;  };
    $protected.virtual.void.on_medium_style = function(_views) { $css.target = $view.module.get_tag() + "-" + $view.port; };
    $protected.virtual.void.on_narrow_style = function(_views) { $css.target = $view.module.get_tag() + "-" + $view.port; };
    $protected.virtual.void.on_mobile_style = function(_views) { $css.target = $view.module.get_tag() + "-" + $view.port; };

    // Styling as Viewport Updates

    $protected.virtual.void.on_wide_screen = function(_views) { $css.target = $view.page.get_tag() + "-" + $view.port; };
    $protected.virtual.void.on_medium_screen = function(_views) { $css.target = $view.page.get_tag() + "-" + $view.port; };
    $protected.virtual.void.on_narrow_screen = function(_views) { $css.target = $view.page.get_tag() + "-" + $view.port; };
    $protected.virtual.void.on_mobile_screen = function(_views) { $css.target = $view.page.get_tag() + "-" + $view.port; };

    // Viewport Changes

    $protected.virtual.void.on_viewport_changed = function(_port, _views) { };

    $protected.virtual.void.on_wide_viewport = function(_views) { };
    $protected.virtual.void.on_medium_viewport = function(_views) { };
    $protected.virtual.void.on_narrow_viewport = function(_views) { };
    $protected.virtual.void.on_mobile_viewport = function(_views) { };

    $public.func.select = function(_selection) { return $css.select($self.selector("self")); };
    $public.func.select_tag = function(_selection) { return $css.select($self.selector("tag")); };
    $public.func.select_tag_viewport = function(_selection) { return $css.select($self.selector("tag_viewport")); };
    $public.func.select_viewport = function(_selection) { return $css.select($self.selector("self_viewport")); };
    $public.func.select_path = function(_selection) { return $css.select($self.selector("path")); };
    $public.func.select_path_viewport = function(_selection) { return $css.select($self.selector("path_viewport")); };

    $public.func.selector = function(_selection) { 

        if (_selection == "tag")
            return $self.tag;
        else if (_selection == "tag_viewport")
            return $self.tag + "[d-viewport='" + $view.port + "']"; 
        else if (_selection == "self")
            return $self.tag + "[d-id='" + $self.__id__ + "']"; 
        else if (_selection == "self_viewport")
            return $self.tag + "[d-id='" + $self.__id__ + "'][d-viewport='" + $view.port + "']"; 
        else if (_selection == "path")
            return $self.cascading_path(); 
        else if (_selection == "path_viewport")
            return $self.cascading_path() + "[d-viewport='" + $view.port + "']"; 

    };

    $private.func.cascading_path = function() {

        if ($self.parent == undefined || $self.parent.cascading_path == undefined)
            return $self.tag;
        else {
            if ($self.name == "")
                return $self.parent.cascading_path() + " " + $self.tag;
            else
                return $self.parent.cascading_path() + " " + $self.tag + "[d-name='" + $self.name +  "']";
        }

    };

    $private.void.listen_viewport = function() {

        $bcast.listen("viewport_wide", function() { $self.on_wide_screen($self.views); });
        $bcast.listen("viewport_medium", function() { $self.on_medium_screen($self.views); });
        $bcast.listen("viewport_narrow", function() { $self.on_narrow_screen($self.views); });
        $bcast.listen("viewport_mobile", function() { $self.on_mobile_screen($self.views); });

        $bcast.listen("viewport_changed", function() { 

            $self.element.setAttribute("d-viewport", $view.port);
            
            $self.on_viewport_changed($view.port, $self.views);

            eval("$self.on_" + $view.port + "_viewport($self.views);");

        });

        $bcast.listen("viewport_new", function() { 

            eval("$self.on_" + $view.port + "_style($self.views);");

        });

    };

    $private.void.listen_page = function() {

        $bcast.listen("page_is_in_view", function() { $self.on_page_style($self.views); })

    };


    // Recurse

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

    // Load

    $public.void.load = function() {

        $self.listen_viewport();
        $self.listen_page();

        $self.key = ($self.key == "") ? $self.on_key() : $self.key;
        $self.tag = "d-" + $self.key;

        $self.element = $self.on_compile();

        $self.on_construct($self.views);
        $self.on_flourish($self.views);
        $self.on_feed($self.views);

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

    // Sneaky Load

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
        $self.on_flourish($self.views);
        $self.on_feed($self.views);

        $self.index = -1;
        $self.on_recurse_end = function() {

            if (!$view.is_loaded($self.__schema__)) {
                $view.loaded($self.__schema__);
                $self.on_style($self.views);
            }

            $self.on_load();

        };
        $self.sneaky_recurse();

    };

});