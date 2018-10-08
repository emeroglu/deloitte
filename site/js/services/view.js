$js.compile("$view", null, function($public, $private, $protected, $self) {

    $public.field.ports = [];
    $public.field.port = "";

    $public.field.module = {};
    $public.field.page = {};

    $private.field.index = 0;
    $private.field.types = [AbsoluteLayout, BannerView, HorizontalList, ImageView, RelativeLayout, SearchView, StoreSelectorView, TextView];
    $private.void.recurse = function() {

        $self.index++;

        if ($self.index == $self.types.length) {
            
        } else {

            let type = $self.types[$self.index];
            let view;
            eval("view = new " + type.name + "();");

            view
                .begin()
                    .setParent($self.module)
                    .onLoad($self.recurse)
                .sneaky_load();

        }

    };

    $public.void.sneaky_load = function() {

        $self.index = -1;
        $self.recurse();

    };

});