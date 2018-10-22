$global.$api = new $api();
$global.$bcast = new $bcast();
$global.$css = new $css();
$global.$http = new $http();
$global.$view = new $view();

$window.onresize = function() {

    let w = $window.innerWidth;
    let port = $view.port;

    if (1200 <= w)
        $view.port = "wide";
    else if (992 <= w)
        $view.port = "medium";
    else if (768 <= w)
        $view.port = "narrow";
    else if (500 <= w)
        $view.port = "mobile"

    if ($view.ports.includes($view.port)) {

    } else {
        $view.ports.push($view.port);
        $bcast.shout("viewport_new");
    }

    if (port != $view.port)
        $bcast.shout("viewport_changed");

    $bcast.shout("viewport_" + $view.port);

};

let main = new MainModule();

main
    .begin()
        .onLoad(function() {

            document.getElementsByTagName("script")[0].remove();

            $window.onresize();

        })
    .load();