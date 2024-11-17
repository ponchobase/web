function init_accordions() {
    try {
        // Vars
        var selector_accordions = ".accordions";

        // Check if
        if ($(selector_accordions).length > 0) {
            // Vars
            var selector_accordion = selector_accordions + " .accordion";
            var selector_accordion_all = selector_accordions + " [data-accordions-all]";
            var selector_accordion_trigger = selector_accordion + " .trigger";
            var selector_accordions_container = selector_accordions + " .accordions__container";

            // Update accordion selectors
            update_accordion_selectors();

            // Loop
            $(selector_accordions_container + ":not(.accordions--closed)").each(function (index, value) {
                try {
                    // Check if
                    if (!$(this).hasClass("accordions--init")) {
                        // Vars
                        var selector_accordion_first = ".accordion:first-child";

                        // Add class
                        $(this).addClass("accordions--init");

                        // Show first accordion
                        $(this).find(selector_accordion_first).addClass("accordion--open");
                        $(this).find(selector_accordion_first + " .trigger").attr("aria-expanded", true);
                        $(this).find(selector_accordion_first + " .accordion__panel").show();
                    };
                } catch (e) {
                    // console.error(e);
                }
            });

            // On click
            $(selector_accordion_trigger).off("click");
            $(selector_accordion_trigger).on("click", function () {
                try {
                    // Vars
                    var accordion_id = $(this).attr("aria-controls");

                    // Check if
                    if (!check_value_defined(accordion_id)) {
                        // Update accordion selectors
                        update_accordion_selectors();

                        // Vars
                        var accordion_id = $(this).attr("aria-controls");
                    }

                    // Vars
                    var accordion_open = $(this).attr("aria-expanded") === "true";
                    var selector_accordion_id = $(selector_accordion + " #" + accordion_id);

                    // Check if
                    if (accordion_open) {
                        // Close accordion
                        $(this).attr("aria-expanded", false);
                        $(this).closest(".accordion").removeClass("accordion--open");

                        // Slide up
                        $(selector_accordion_id).slideUp(250, function () {
                            // Animation complete.
                        });

                        // Hidden
                        $(selector_accordion_id).attr("hidden", "");
                    } else {
                        // Open accordion
                        $(this).attr("aria-expanded", true);
                        $(this).closest(".accordion").addClass("accordion--open");

                        // Slide down
                        $(selector_accordion_id).slideDown(250, function () {
                            // Animation complete.
                        });

                        // Remove hidden
                        $(selector_accordion_id).removeAttr("hidden");
                    }
                } catch (e) {
                    // console.error(e);
                }
            });

            // On click
            $(selector_accordion_all).off("click");
            $(selector_accordion_all).on("click", function () {
                try {
                    // Vars
                    var accordions_all = $(this).attr("data-accordions-all");
                    var accordions = $(this).closest(selector_accordions).find(".accordion");

                    // Loop
                    $(accordions).each(function (index, value) {
                        // Vars
                        var accordion_id = $(this).find(".trigger").attr("aria-controls");

                        // Check if
                        if (!check_value_defined(accordion_id)) {
                            // Update accordion selectors
                            update_accordion_selectors();

                            // Vars
                            var accordion_id = $(this).attr("aria-controls");
                        }

                        // Check if
                        if (accordions_all == "hide") {
                            // Close accordion by id
                            close_accordion_by_id(accordion_id);
                        } else {
                            // Open accordion by id
                            open_accordion_by_id(accordion_id);
                        }
                    });
                } catch (e) {
                    // console.error(e);
                }
            });
        }
    } catch (e) {
        // console.error(e);
    }
}

function close_accordion_by_id(accordion_id) {
    try {
        // Vars
        var selector_accordions = ".accordions";
        var selector_accordion = selector_accordions + " .accordion";
        var selector_accordion_id = $(selector_accordion + " #" + accordion_id);

        // Close accordion
        $(selector_accordion + " [aria-controls=" + accordion_id + "]").attr("aria-expanded", false);
        $(selector_accordion + " [aria-controls=" + accordion_id + "]").closest(".accordion").removeClass("accordion--open");

        // Hide
        $(selector_accordion_id).hide();

        // Remove hidden
        $(selector_accordion_id).attr("hidden", "");
    } catch (e) {
        // console.error(e);
    }
}

function open_accordion_by_id(accordion_id) {
    try {
        // Vars
        var selector_accordions = ".accordions";
        var selector_accordion = selector_accordions + " .accordion";
        var selector_accordion_id = $(selector_accordion + " #" + accordion_id);

        // Open accordion
        $(selector_accordion + " [aria-controls=" + accordion_id + "]").attr("aria-expanded", true);
        $(selector_accordion + " [aria-controls=" + accordion_id + "]").closest(".accordion").addClass("accordion--open");

        // Show
        $(selector_accordion_id).show();

        // Hidden
        $(selector_accordion_id).removeAttr("hidden");
    } catch (e) {
        // console.error(e);
    }
}

function update_accordion_selectors() {
    try {
        // Loop
        $(".accordions .accordions__container .accordion").each(function (index, value) {
            // Accordion trigger
            $(this).find(".trigger").attr("id", "accordion_id_" + index);
            $(this).find(".trigger").attr("aria-controls", "accordion_panel_" + index);

            // Accordion panel
            $(this).find(".accordion__panel").attr("id", "accordion_panel_" + index);
            $(this).find(".accordion__panel").attr("aria-labelledby", "accordion_id_" + index);
        });
    } catch (e) {
        // console.error(e);
    }
}