$js.compile("IndexPage", Page, function($public, $private, $protected, $self) {

    $public.override.func.is_initial = function() { return true; };

    $protected.override.func.on_key = function() { return "index"; };

    $protected.override.void.on_construct = function(_views) {

        _views.top = new ContentLayout();

        _views.compound = new ContentLayout();

        _views.compound.views.store_selection = new RelativeLayout();
        _views.compound.views.search = new RelativeLayout();
        _views.compound.views.account = new RelativeLayout();

        _views.nav = new ContentLayout();

        _views.headline = new FullWideLayout();

        _views.banner = new ContentLayout();

        _views.bottom = new ContentLayout();

        _views.footer = new FullWideLayout();

    };

    $protected.override.void.on_flourish = function(_views) {

        _views.top.views.list = new HorizontalListView();

        _views.compound.views.store_selection.views.store_selector = new StoreSelectorView();
        _views.compound.views.search.views.search_view = new SearchView();
        _views.compound.views.account.views.list = new HorizontalListView();

        _views.nav.views.list = new HorizontalListView();

        _views.headline.views.text = new TextView();

        _views.banner.views.banner = new BannerView();

        _views.bottom.views.product = new ProductView();
    
    };

    $protected.override.void.on_feed = function(_views) {

        _views.top.views.list
            .begin()
                .setSide("right")
                .setItemPadding(5)
                .onModel(function() {
                    return ["Tools & Vehicles", "Credit Services", "Pro Services", "Order Status", "Customer Support", "Français"];
                })
                .onGenerate(function(_view, _model) {

                    _view.views.text = new ReflectiveTextView();
                    _view.views.text.set_text(_model);
                    _view.views.text.set_height("tall");
                    _view.views.text.set_size("smallest");

                });

        _views.compound.views.account.views.list
            .begin()
                .setSide("right")
                .setItemPadding(5)
                .onModel(function() {
                    return [
                        { icon: "user", text: "My Account" },
                        { icon: "shopping-cart", text: "Cart" }
                    ];
                })
                .onGenerate(function(_view, _model) {

                    _view.views.item = new AccountItemView();
                    _view.views.item.set_icon(_model.icon);
                    _view.views.item.set_text(_model.text);

                });

        _views.nav.views.list
            .begin()
                .setSide("left")
                .setItemPadding(5)
                .onModel(function() {
                    return [
                        { icon: "bars", text: "Shop by Department" },
                        { icon: "couch", text: "Shop by Room" },
                        { icon: "lightbulb", text: "Ideas & How-to" },
                        { icon: "wrench", text: "Installation Services" },
                        { icon: "tag", text: "Value Centre" },
                        { icon: "file", text: "Weekly Flyer" }
                    ];
                })
                .onGenerate(function(_view, _model) {

                    _view.views.item = new NavItemView();
                    _view.views.item.set_icon(_model.icon);
                    _view.views.item.set_text(_model.text);

                });

        _views.headline.views.text.set_text("BUY ONLINE PICK UP IN-STORE Available for in-store products");
        _views.headline.views.text.set_height("short");
        _views.headline.views.text.set_size("smallest");
        _views.headline.views.text.set_color("white");

        _views.bottom.views.product.set_image("/Image");
        _views.bottom.views.product.set_title("SAVE ON LIGHTING EVENT");
        _views.bottom.views.product.set_text("Brighten up your home with great savings on lighting");
        _views.bottom.views.product.set_link("Shop All");

    };

    $protected.extension.void.on_style = function(_views) {

        _views.top.select()
            .begin()
                .height(40)
                .marginTop(20)
            .save();

        _views.compound.select()
            .begin()
                .height(60)
            .save();

        _views.compound.views.store_selection.select()
            .begin()
                .widthPercent(30)
                .heightFull()
            .save();

        _views.compound.views.search.select()
            .begin()
                .widthPercent(40)
                .heightFull()
            .save();

        _views.compound.views.account.select()
            .begin()
                .widthPercent(30)
                .heightFull()
            .save();

        _views.nav.select()
            .begin()
                .height(60)
            .save();

        _views.headline.select()
            .begin()
                .height(25)
                .backgroundColor("#b84b14")
            .save();

        _views.bottom.select()
            .begin()
                .marginTop(20)
            .save();

        _views.footer.select()
            .begin()
                .height(150)
            .save();

        //

        _views.top.views.list.views.container.select()
            .begin()
                .marginRight(20)
            .save();

        _views.compound.views.account.views.list.views.container.select()
            .begin()
                .marginRight(20)
            .save();

        _views.headline.views.text.select()
            .begin()
                .widthFromViewportWidth(100)
                .left(0)
            .save();

    };

});