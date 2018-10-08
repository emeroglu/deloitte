$js.compile("IndexPage", Page, function($public, $private, $protected, $self) {

    $public.override.func.is_initial = function() { return true; };

    $protected.override.func.on_key = function() { return "index"; };

    $protected.override.void.on_construct = function(_views) {

        _views.top = new RelativeLayout();

        _views.store_selection = new RelativeLayout();
        _views.search = new RelativeLayout();
        _views.account = new RelativeLayout();

        _views.nav = new RelativeLayout();

        _views.headline = new RelativeLayout();

        _views.banner = new RelativeLayout();

        _views.image = new RelativeLayout();
        _views.text = new RelativeLayout();

    };

    $protected.override.void.on_flourish = function(_views) {

        _views.top.views.list = new HorizontalList();

        _views.store_selection.views.store_selector = new StoreSelectorView();
        _views.search.views.search_view = new SearchView();
        _views.account.views.list = new HorizontalList();

        _views.nav.views.list = new HorizontalList();

        _views.headline.views.text = new TextView();

        _views.banner.views.banner = new BannerView();

        _views.image.views.image = new ImageView();
        _views.text.views.header = new TextView();
        _views.text.views.detail = new TextView();
        _views.text.views.link = new TextView();

    };

    $protected.override.void.on_feed = function(_views) {



    };

    $protected.extension.void.on_style = function(_views) {

        _views.top.select()
            .begin()
                .widthFull()
                .height(60)
            .save();

        _views.store_selection.select()
            .begin()
                .widthPercent(30)
                .height(80)
            .save();

        _views.search.select()
            .begin()
                .widthPercent(40)
                .height(80)
            .save();

        _views.account.select()
            .begin()
                .widthPercent(30)
                .height(80)
            .save();

        _views.nav.select()
            .begin()
                .widthFull()
                .height(60)
            .save();

        _views.headline.select()
            .begin()
                .widthFull()
                .height(40)
            .save();

        _views.banner.select()
            .begin()
                .widthFull()
            .save();

        _views.image.select()
            .begin()
                .widthHalf()
                .height(200)
            .save();

        _views.text.select()
            .begin()
                .widthHalf()
                .height(200)
            .save();

    };

});