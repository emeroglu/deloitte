$js.compile("SearchResultsView", View, function($public, $private, $protected, $self) {

    $private.field.query = "";
    $public.void.set_query = function(_query) { $self.query = _query; };

    $private.field.suggesteds = [];
    $public.void.set_suggesteds = function(_suggesteds) { $self.suggesteds = _suggesteds; };

    $private.field.categories = [];
    $public.void.set_categories = function(_categories) { $self.categories = _categories; };

    $private.field.results = [];
    $public.void.set_results = function(_results) { $self.results = _results; };

    $public.override.void.apply = function() {

        $self.views.left.views.query.views.text.set_text($self.query);
        $self.views.left.views.query.views.text.apply();

        $self.views.left.views.categories.views.list.update();

    };

    $protected.override.func.on_key = function() { return "search-results-view"; };

    $protected.override.void.on_construct = function(_views) {

        _views.left = new RelativeLayout();
        _views.left.set_name("left");

        _views.left.views.query = new RelativeLayout();
        _views.left.views.query.set_name("query");
        _views.left.views.categories = new RelativeLayout();
        _views.left.views.categories.set_name("categories");

        _views.right = new RelativeLayout();
        _views.right.set_name("right");

        _views.right.views.label = new RelativeLayout();
        _views.right.views.results = new RelativeLayout();

    };

    $protected.override.void.on_flourish = function(_views) {

        _views.left.views.query.views.text = new TextView();

        _views.left.views.categories.views.list = new VerticalListView();

    };

    $protected.override.void.on_feed = function(_views) {

        _views.left.views.query.views.text.set_text($self.query);
        _views.left.views.query.views.text.set_align("left");
        _views.left.views.query.views.text.set_height("taller");
        _views.left.views.query.views.text.set_line_height("taller");
        _views.left.views.query.views.text.set_weight("bold");

        _views.left.views.categories.views.list
            .begin()
                .onModel(function() {
                    return $self.categories.slice(0, 9);
                })
                .onConstruct(function(_item, _model, _index) {

                    _item.views.text = new ReflectiveTextView();
                    _item.views.text.set_align("left");
                    _item.views.text.set_height("short");
                    _item.views.text.set_line_height("short");
                    _item.views.text.set_size("smallest");
                    _item.views.text.set_weight("light");

                })
                .onFeed(function(_item, _model, _index) {

                    _item.views.text.set_text((_model.length < 20) ? _model : _model.substring(0, 17) + "...");

                })
                .onUpdate(function(_item, _model, _index) {

                    _item.views.text.apply();

                });

    };

    $protected.extension.void.on_style = function(_views) {

        $self.select_tag()
            .begin()
                .absolute()
                .sideFull()
                .backgroundColor("#F6F6F6")
                .shadow("3px 3px 5px 0px rgba(0,0,0,0.5)")
            .save();
        
        _views.left.select_path()
            .begin()
                .width(200)
                .heightFull()
            .save();

        _views.left.views.query.select_path()
            .begin()
                .widthCropFromFull(15)
                .height(60)
                .marginLeft(15)
            .save();

        _views.left.views.categories.select_path()
            .begin()
                .widthCropFromFull(2)
                .heightCropFromFull(62)
                .borderTop("1px #C3C3C3 solid")
                .borderRight("1px #C3C3C3 solid")
                .backgroundColor("#FFFFFF")
            .save();

        _views.left.views.categories.views.list.select_path()
            .begin()
                .widthCropFromFull(30)
                .heightCentered(225)
                .left(30)
            .save();

        _views.right.select_path()
            .begin()
                .widthCropFromFull(200)
                .heightFull()
            .save();

    };

});