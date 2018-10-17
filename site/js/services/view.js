$js.compile("$view", null, function($public, $private, $protected, $self) {

    $public.field.ports = [];
    $public.field.port = "";

    $public.field.module = {};
    $public.field.page = {};

    $private.field.purpose = "";
    $public.func.get_purpose = function() { return $self.purpose; };

    $private.field.index = 0;
    $private.field.types = [AbsoluteLayout, AccountItemView, BannerView, ContentLayout, FullWideLayout, HorizontalListView, IconView, ImageView, NavItemView, ListItemView, ListView, RelativeLayout, ReflectiveImageView, ReflectiveTextView, SearchView, StoreSelectorView, TextView];
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

    $public.void.sneaky_load = function(_purpose) {

        $self.purpose = _purpose;

        $self.index = -1;
        $self.recurse();

    };

});