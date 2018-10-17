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

        _views.bottom.views.image = new RelativeLayout();
        _views.bottom.views.text = new RelativeLayout();

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

        _views.bottom.views.image.views.image = new ReflectiveImageView();
        _views.bottom.views.text.views.header = new TextView();
        _views.bottom.views.text.views.detail = new TextView();
        _views.bottom.views.text.views.link = new TextView();

    };

    $protected.override.void.on_feed = function(_views) {

        _views.top.views.list
            .begin()
                .setSide("right")
                .setItemPadding(10)
                .onModel(function() {
                    return ["Tools & Vehicles", "Credit Services", "Pro Services", "Order Status", "Customer Support", "Français"];
                })
                .onGenerate(function(_view, _model) {

                    _view.views.text = new ReflectiveTextView();
                    _view.views.text.set_text(_model);
                    _view.views.text.set_height(60);
                    _view.views.text.set_size(12);

                });

        _views.compound.views.account.views.list
            .begin()
                .setSide("right")
                .setItemPadding(10)
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
                .setItemPadding(10)
                .onModel(function() {
                    return [
                        { icon: "user", text: "Shop by Department" },
                        { icon: "shopping-cart", text: "Shop by Room" },
                        { icon: "shopping-cart", text: "Ideas & How-to" },
                        { icon: "shopping-cart", text: "Installation Services" },
                        { icon: "shopping-cart", text: "Value Centre" },
                        { icon: "shopping-cart", text: "Weekly Flyer" }
                    ];
                })
                .onGenerate(function(_view, _model) {

                    _view.views.item = new NavItemView();
                    _view.views.item.set_icon(_model.icon);
                    _view.views.item.set_text(_model.text);

                });

        _views.headline.views.text.set_text("BUY ONLINE PICK UP IN-STORE Available for in-store products");
        _views.headline.views.text.set_height(25);
        _views.headline.views.text.set_size(11);
        _views.headline.views.text.set_color("#FFFFFF");

        _views.bottom.views.image.views.image.set_src("/Image");

        _views.bottom.views.text.views.header.set_text("SAVE ON LIGHTING EVENT");
        _views.bottom.views.text.views.header.set_align("left");
        _views.bottom.views.text.views.header.set_height(40);
        _views.bottom.views.text.views.header.set_size(30);
        _views.bottom.views.text.views.header.set_weight(800);
        _views.bottom.views.text.views.header.set_color("#000000");

        _views.bottom.views.text.views.detail.set_text("Brighten up your home with great savings on lighting");
        _views.bottom.views.text.views.detail.set_align("left");
        _views.bottom.views.text.views.detail.set_height(40);
        _views.bottom.views.text.views.detail.set_size(14);
        _views.bottom.views.text.views.detail.set_weight(600);

        _views.bottom.views.text.views.link.set_text("Shop All");
        _views.bottom.views.text.views.link.set_align("left");
        _views.bottom.views.text.views.link.set_height(40);
        _views.bottom.views.text.views.link.set_size(16);
        _views.bottom.views.text.views.link.set_weight(800);
        _views.bottom.views.text.views.link.set_color("#000000");

    };

    $protected.extension.void.on_style = function(_views) {

        _views.top.select()
            .begin()
                .height(60)
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

        _views.bottom.views.image.select()
            .begin()
                .widthHalf()
                .height(200)
            .save();

        _views.bottom.views.text.select()
            .begin()
                .widthCropFromHalf(20)
                .height(200)
                .marginLeft(20)
            .save();

        _views.bottom.views.text.views.header.select()
            .begin()
                .top(20)
            .save();
            
        _views.bottom.views.text.views.detail.select()
            .begin()
                .top(60)
            .save();

        _views.bottom.views.text.views.link.select()
            .begin()
                .top(100)
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