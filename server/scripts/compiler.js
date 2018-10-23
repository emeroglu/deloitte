$js.compile("$compiler", null, function($public, $private, $protected, $self) {

    $private.field.html = "";

    $private.void.on_load = function() {};

    $public.func.index = function($on_load) {

        $self.on_load = $on_load;

        if ($self.html == "")
            $self.load();
        else
            $self.on_load($self.html);

    };

    $public.void.flush = function() {

        $self.html = "";

    };

    $private.void.load = function() {

        $self.html += "<html>\n";
        $self.html += "   <head>\n";
        $self.html += "       <meta charset='UTF-8' />\n";
        $self.html += "       <meta name='viewport' content='width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, users-scalable=0'>\n";
        $self.html += "       <link href='https://fonts.googleapis.com/css?family=Open+Sans:400,600,800' rel='stylesheet' />";
        $self.html += "       <link href='https://use.fontawesome.com/releases/v5.3.1/css/all.css' rel='stylesheet' />";


        $fs.readFile("../site/css/main.css", function(_error, _data) {

            $self.html += "         <style type='text/css'>";

            _data.toString().split("\n").forEach(function(_line) { $self.html += "\n            " + _line; });
            
            $self.html += "\n         </style>\n";

            $self.html += "   </head>\n";
            $self.html += "   <body>\n";
            
            $self.html += "       <script type='text/javascript'>"
    
            $self.load_script();

        });

    };

    $private.void.load_script = function() {

        $self.html += "\n\n";

        $self.html += "            String.prototype.replaceAll = function(s, r) { let t = this; return t.replace(new RegExp(s, 'g'), r); };";
        $self.html += "\n\n";

        $self.html += "            let $window = window;\n";
        $self.html += "            let $global = $window;\n";

        $self.queue.push("../js.js");
        
        $self.queue.push("../site/js/services/api.js");
        $self.queue.push("../site/js/services/bcast.js");
        $self.queue.push("../site/js/services/css.js");
        $self.queue.push("../site/js/services/http.js");
        $self.queue.push("../site/js/services/view.js");
        
        $self.queue.push("../site/js/abstract/Module.js");
        $self.queue.push("../site/js/abstract/Page.js");
        $self.queue.push("../site/js/abstract/View.js");
        $self.queue.push("../site/js/abstract/WebRequest.js");
        
        $self.queue.push("../site/js/modules/Main.js");
        
        $self.queue.push("../site/js/pages/Index.js");

        $self.queue.push("../site/js/views/ListView.js");
        $self.queue.push("../site/js/views/ListItemView.js");
        $self.queue.push("../site/js/views/TextView.js");

        $self.queue.push("../site/js/views/AbsoluteLayout.js");
        $self.queue.push("../site/js/views/AccountItemView.js");
        $self.queue.push("../site/js/views/BannerView.js");
        $self.queue.push("../site/js/views/ContentLayout.js");
        $self.queue.push("../site/js/views/FullWideLayout.js");
        $self.queue.push("../site/js/views/HorizontalListView.js");
        $self.queue.push("../site/js/views/IconView.js");
        $self.queue.push("../site/js/views/ImageView.js");
        $self.queue.push("../site/js/views/NavItemView.js");
        $self.queue.push("../site/js/views/ProductView.js");
        $self.queue.push("../site/js/views/RelativeLayout.js");
        $self.queue.push("../site/js/views/ReflectiveImageView.js");
        $self.queue.push("../site/js/views/ReflectiveTextView.js");
        $self.queue.push("../site/js/views/SearchResultsView.js");
        $self.queue.push("../site/js/views/SearchView.js");
        $self.queue.push("../site/js/views/StoreSelectorView.js");
        $self.queue.push("../site/js/views/Textbox.js");
        $self.queue.push("../site/js/views/VerticalListView.js");
        
        $self.queue.push("../site/js/init.js");

        $self.index = -1;
        $self.on_recurse_end = function() {

            $self.html += "\n       </script>\n"
    
            $self.html += "   </body>\n";
            $self.html += "</html>";

            $self.on_load($self.html);

        };
        $self.recurse();

    };

    $private.field.queue = [];

    $private.field.index = 0;
    $private.void.on_recurse_end = function() {};
    $private.void.recurse = function() {

        $self.index++;

        if ($self.index == $self.queue.length) {

            $self.on_recurse_end();

        } else {

            let path = $self.queue[$self.index];

            $fs.readFile(path, function(_error, _data) {
            
                _data.toString().split("\n").forEach(function(_line) { $self.html += "\n            " + _line; });
                $self.html += "\n";
                
                $self.recurse();
    
            });

        }

    };

});