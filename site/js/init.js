$global.$css = new $css();
$global.$view = new $view();

let main = new MainModule();

main
    .begin()
        .onLoad(function() {
            
            document.getElementsByTagName("script")[0].remove();

        })
    .load();