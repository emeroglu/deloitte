$js.compile("$api", null, function($public, $private, $protected, $self) {

    $private.field.api_key = "cmjx4sdwxmt3uvkpcnsntjc5";
    $private.field.url = "http://api.walmartlabs.com/v1";

    $public.void.search = function(_query, $success) {

        let url = $self.url;
        url += "/search";
        url += "?apiKey=" + $self.api_key;
        url += "&format=json";
        url += "&numItems=3";
        url += "&query=" + _query;

        $http.get(url, function(_response) {

            let data = "";

            _response.on('data', (chunk) => {
                data += chunk;
            });
            
            _response.on('end', () => {

                $self.items = JSON.parse(data).items;
                
                $self.index = -1;
                $self.on_recurse_end = function() {

                    $success(JSON.stringify($self.products), $self.products);

                };
                $self.recurse();
                
            });

        });

    };

    $private.void.recommendations = function(_item_id, $success, $no_found) {

        let url = $self.url;
        url += "/nbp";
        url += "?apiKey=" + $self.api_key;
        url += "&itemId=" + _item_id;
        url += "&numItems=3";

        $http.get(url, function(_response) {

            let data = "";

            _response.on('data', (chunk) => {
                data += chunk;
            });
            
            _response.on('end', () => {

                let json = JSON.parse(data);

                if (json.errors == undefined)
                    $success(data, json);
                else
                    $no_found();

            });

        });

    };

    $private.field.items = [];
    $private.field.products = [];

    $private.field.index = 0;
    $private.void.on_recurse_end = function() {};
    $private.void.recurse = function() {

        $self.index++;

        if ($self.index == 0) {
            $self.json = [];
            $self.products = [];
        }

        if ($self.index == $self.items.length) {
            $self.on_recurse_end();
            return;
        }

        let item = $self.items[$self.index];
        
        let product = {};
        product.id = item.itemId;
        product.name = item.name;
        product.image = item.mediumImage;
        product.categories = item.categoryPath.split("/");
        product.suggesteds = [];

        $self.recommendations(product.id, function(_text, _json) {

            for (let index in _json) {
                product.suggesteds.push(_json[index].name);
            }

            $self.products.push(product);

            $self.recurse();

        }, function() {

            $self.products.push(product);

            $self.recurse();

        });
    };

});