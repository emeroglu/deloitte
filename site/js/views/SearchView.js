$js.compile("SearchView", View, function($public, $private, $protected, $self) {

    $protected.override.func.on_key = function() { return "search-view"; };

    $protected.override.void.on_construct = function(_views) {

        _views.input = new RelativeLayout();
        _views.input.set_name("input");

        _views.input.views.text = new RelativeLayout();
        _views.input.views.text.set_name("text");

        _views.input.views.icon = new RelativeLayout();
        _views.input.views.icon.set_name("icon");

        _views.icon = new RelativeLayout();
        _views.icon.set_name("search_icon");

        _views.result = new AbsoluteLayout();

    };

    $protected.override.void.on_flourish = function(_views) {

        _views.input.views.text.views.box = new Textbox();
        _views.input.views.icon.views.icon = new IconView();
        _views.icon.views.icon = new IconView();
        _views.result.views.result = new SearchResultsView();

    };

    $protected.override.void.on_feed = function(_views) {

        _views.input.views.text.views.box.set_placeholder("Search over 130,000 products...");
        _views.input.views.text.views.box.set_size("small");

        _views.input.views.icon.views.icon.set_icon("times");
        _views.input.views.icon.views.icon.set_weight("");
        _views.input.views.icon.views.icon.set_size(20);
        _views.input.views.icon.views.icon.set_side(40);
        _views.input.views.icon.views.icon.set_color("#616161");

        _views.icon.views.icon.set_icon("search");
        _views.icon.views.icon.set_weight("");
        _views.icon.views.icon.set_size(20);
        _views.icon.views.icon.set_side(40);
        _views.icon.views.icon.set_color("#FFFFFF");

    };

    $protected.override.void.on_ready = function(_views, $ready) {

        let txt = _views.input.views.text.views.box;
        let icon = _views.input.views.icon.views.icon;
        let result = _views.result;

        icon.select()
            .begin()
                .none()
            .commit();

        result.select()
            .begin()    
                .none()
            .commit();

        txt.onKeyRelease(function() {

            let query = txt.text();
            let l = query.length;

            if (l == 0) {

                icon.select()
                    .begin()
                        .none()
                    .commit();

                result.select()
                    .begin()    
                        .none()
                    .commit();

            } else if (2 < l) {

                icon.select()
                    .begin()
                        .disp()
                    .commit();

                _views.input.views.icon.views.icon.set_icon("spinner fa-spin");
                _views.input.views.icon.views.icon.apply();

                $api.search(query, function(_text, _json, _response) {

                    _views.input.views.icon.views.icon.set_icon("times");
                    _views.input.views.icon.views.icon.apply();

                    result.select()
                        .begin()
                            .disp()
                        .commit();

                    let item, category;
                    let categories = [], results = [];

                    for (let index in _json) {
                        
                        item = _json[index];
                        
                        for (let i in item.categories) {
                            
                            category = item.categories[i];

                            if (!categories.includes(category))
                                categories.push(item.categories[i]);

                        }

                        results.push({ image: item.image, text: item.name });

                    }

                    _views.result.views.result.set_query(query);
                    _views.result.views.result.set_categories(categories);
                    _views.result.views.result.set_results(results);
                    _views.result.views.result.apply();

                });

            }

        });

        $ready();

    };

    $protected.extension.void.on_style = function(_views) {

        $self.select_tag()
            .begin()
                .absolute()
                .sideFull()
                .backgroundColor("#FFFFFF")
            .save();

        _views.input.select_path()
            .begin()
                .widthCropFromFull(42)
                .heightCentered(40)
                .border("1px #C3C3C3 solid")
            .save();

        _views.input.views.text.select_path()
            .begin()
                .widthCropFromFull(40)
                .heightCentered(40)
            .save();

        _views.input.views.icon.select_path()
            .begin()
                .width(40)
                .heightCentered(40)
            .save();
        
        _views.icon.select_path()
            .begin()
                .width(40)
                .height(42)
                .marginTop(10)
                .backgroundColor("#f2812f")
            .save();

        _views.result.select_path()
            .begin()
                .z(1)
                .width(800)
                .height(300)
                .top(50)
            .save();

    };

    $protected.extension.void.on_mobile_style = function(_views) {

        $self.select_viewport()
            .begin()
                .backgroundColor("#f2812f")
            .save();

        _views.input.views.text.select_path_viewport()
            .begin()
                .widthCropFromFull(21)
                .left(10)
                .border("none")
            .save();

    };

    $protected.override.void.on_medium_viewport = function(_views) {

        _views.input.views.text.views.box.set_size("small");
        _views.input.views.text.views.box.apply();

    };

    $protected.override.void.on_narrow_viewport = function(_views) {

        _views.input.views.text.views.box.set_size("smaller");
        _views.input.views.text.views.box.apply();

    };

});