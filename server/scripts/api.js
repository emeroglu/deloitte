$js.compile("$api", null, function($public, $private, $protected, $self) {

    $private.field.api_key = "cmjx4sdwxmt3uvkpcnsntjc5";
    $private.field.url = "http://api.walmartlabs.com/v1";

    $public.void.search = function(_query, $success, $fail) {

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

                console.log(_response.statusCode);

                if (_response.statusCode == 200) {

                    let items = JSON.parse(data).items;
                    let products = [];

                    for (let index in items) {

                        let item = items[index];
            
                        let product = {};
                        product.id = item.itemId;
                        product.name = item.name;
                        product.image = item.mediumImage;
                        product.categories = item.categoryPath.split("/");

                        products.push(product);

                    }

                    $success(JSON.stringify(products), products);

                } else {
                    $fail();
                }
                
            });

        });

    };

});