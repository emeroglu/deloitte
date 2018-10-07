$js.compile("$compiler", null, function($public, $private, $protected, $self) {

    $private.field.html = "";
    $private.field.script = "";

    $private.void.on_load = function() {};

    $public.func.index = function($on_load) {

        $self.on_load = $on_load;

        if ($self.html == "")
            $self.load();
        else
            $self.on_load($self.html);

    };

    $private.void.load = function() {

        $self.html += "<html>\n";
        $self.html += "   <head>\n";
        $self.html += "       <meta charset='UTF-8' />\n";
        $self.html += "       <meta name='viewport' content='width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, users-scalable=0'>\n";
        $self.html += "   </head>\n";
        $self.html += "   <body>\n";
        
        $self.html += "       <script type='text/javascript'>"

        $self.load_script();

    };

    $private.void.load_script = function() {

        $self.script = "\n            const $global = $window;\n";

        $private.field.queue.push("../site/js.js");

        $self.index = -1;
        $self.on_recurse_end = function() {

            $self.html += $self.script;
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
            
                _data.toString().split("\n").forEach(function(_line) { $self.script += "\n            " + _line; });
                
                $self.recurse();
    
            });

        }

    };

});