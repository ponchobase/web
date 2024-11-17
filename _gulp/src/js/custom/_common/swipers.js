function init_swipers() {
    try {
        // Init about swiper
        init_about_swiper();

        // Init home swiper
        init_home_swiper();

        // Init roadmap swiper
        init_roadmap_swiper();
    } catch (e) {
        // console.error(e);
    }
}

function init_about_swiper() {
    try {
        // Define vars
        var selector_swiper = ".about-swiper";
        var data_swiper = "[data-swiper=about-swiper]";

        // Init new swiper
        new Swiper(data_swiper, {
            // Optional parameters
            direction: "horizontal",
            keyboard: {
                enabled: true,
                onlyInViewport: false,
            },
            mousewheel: {
                forceToAxis: true
            },
            navigation: {
                nextEl: selector_swiper + " .swiper-next",
                prevEl: selector_swiper + " .swiper-prev"
            },
            slidesPerView: "auto",
            slidesPerGroup: 1,
            speed: 600,
            updateOnWindowResize: true
        });
    } catch (e) {
        // console.error(e);
    }
}

function init_home_swiper() {
    try {
        // Define vars
        var selector_swiper = ".home-swiper";
        var data_swiper = "[data-swiper=home-swiper]";

        // Init new swiper
        poncho_json.home_swiper = new Swiper(data_swiper, {
            // Optional parameters
            direction: "horizontal",
            keyboard: {
                enabled: true,
                onlyInViewport: false,
            },
            mousewheel: {
                forceToAxis: true
            },
            navigation: {
                nextEl: selector_swiper + " .swiper-next",
                prevEl: selector_swiper + " .swiper-prev"
            },
            slidesPerView: "auto",
            slidesPerGroup: 1,
            updateOnWindowResize: true
        });
    } catch (e) {
        // console.error(e);
    }
}

function init_roadmap_swiper() {
    try {
        // Define vars
        var selector_swiper = ".roadmap-swiper";
        var data_swiper = "[data-swiper=roadmap-swiper]";

        // Init new swiper
        new Swiper(data_swiper, {
            // Optional parameters
            centeredSlides: true,
            centeredSlidesBounds: true,
            direction: "horizontal",
            keyboard: {
                enabled: true,
                onlyInViewport: false,
            },
            mousewheel: {
                forceToAxis: true
            },
            navigation: {
                nextEl: selector_swiper + " .swiper-next",
                prevEl: selector_swiper + " .swiper-prev"
            },
            slidesPerView: "auto",
            slidesPerGroup: 1,
            updateOnWindowResize: true
        });
    } catch (e) {
        // console.error(e);
    }
}