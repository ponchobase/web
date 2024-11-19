// On document ready
$(function () {
    try {
        // Initialize app
        initialize_app();
    } catch (e) {
        // console.log(e);
    }
});

function initialize_app() {
    try {
        // Primary
        // Init accordions
        init_accordions();

        // Init anchor tags
        init_anchor_tags();

        // Init charts
        init_charts();

        // Init lazy load
        init_lazy_load();

        // Init messages
        init_messages();

        // Init modals
        init_modals();

        // Init particles
        init_particles();

        // Init popstate
        init_popstate();

        // Init scroll
        init_scroll();

        // Init swipers
        init_swipers();

        // Read token
        read_token(true);

        // Set read token interval
        set_read_token_interval();

        // Secondary
        // Init meme generator
        init_meme_generator();
    } catch (e) {
        // console.error(e);
    }
}