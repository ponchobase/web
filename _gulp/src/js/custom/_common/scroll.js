function init_scroll() {
    try {
        // Vars
        var scroll_selector_class = ".scroll-top";
        var scroll_selector_id = "#scroll-top";
        var scroll_timeout = "";

        // On scroll
        $(window).on("scroll", throttle(function (event) {
            try {
                // Vars
                var scroll_top = $(this).scrollTop();
                var window_height = window.innerHeight;
                window_height = window_height * 1;

                // Check if
                if (scroll_top > window_height) {
                    // Fade in
                    $(scroll_selector_class).fadeIn(100);

                    // Clear timeout
                    clearTimeout(scroll_timeout)

                    // Set timeout
                    scroll_timeout = setTimeout(function () {
                        // Fade out
                        $(scroll_selector_class).fadeOut(100);
                    }, 2000);
                } else {
                    // Fade out
                    $(scroll_selector_class).fadeOut(100);
                }
            } catch (e) {
                // console.error(e);
            }
        }, 100));

        // On click
        $(scroll_selector_id).off("click");
        $(scroll_selector_id).on("click", function () {
            try {
                // Animate
                $("html, body").animate({ scrollTop: 0 }, 500);

                // Return
                return false;
            } catch (e) {
                // console.error(e);
            }
        });
    } catch (e) {
        // console.error(e);
    }
}