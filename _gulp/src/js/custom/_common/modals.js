function init_modals() {
    try {
        // Vars
        var modal = ".modal";
        
        // Load modal from url
        load_modal_from_url();

        // On click
        $("[data-modal-button]").off("click");
        $("[data-modal-button]").on("click", function () {
            // Vars
            var data_modal = $(this).attr("data-modal-button");

            // Show modal
            show_modal(data_modal, true);
        });

        // On click
        $(modal + ".modal__background, " + modal + " .close, " + modal + " .close-button").off("click");
        $(modal + " .modal__background, " + modal + " .close, " + modal + " .close-button").on("click", function () {
            // Hide modal
            hide_modal("", "update");
        });
    } catch (e) {
        // console.log(e);
    }
}

function load_modal_from_url() {
    try {
        // Get search parameter
        var data_modal = get_search_parameter("modal");

        // If modal 
        if (data_modal) {
            // Show modal
            show_modal(data_modal, false);
        } else {
            // Hide modal
            hide_modal("", "replace");
        }
    } catch (e) {
        // console.error(e);
    }
}

function show_modal(data_modal, update_history) {
    try {
        // Define vars
        var modal_selector = ".modal";

        // Check if
        if ($(".modal:visible").length > 0) {
            // Hide modal
            $(modal_selector).hide();

            // Show modal
            $("[data-modal=" + data_modal + "]").show();
        }else{
            // Show modal
            $("[data-modal=" + data_modal + "]").fadeIn(250);
        }

        // Show
        $("[data-modal=" + data_modal + "]").css("display", "flex");

        // Add modal content transform
        $(".modal__content").addClass("modal__content-transform");

        // Add disable scroll
        $("body").addClass("disable-scroll");

        // Vars
        var parameters_array = [
            {
                name: "modal",
                value: data_modal,
            }
        ];

        // Check if
        if (update_history) {
            // Update search parameters
            update_search_parameters(parameters_array, true);
        }
    } catch (e) {
        // console.error(e);
    }
}

function hide_modal(data_modal, action) {
    try {
        // If modal selector
        if (!data_modal) {
            // Vars
            data_modal = $(".modal:visible").attr("data-modal");
        }

        // Check if
        if ($(".modal:visible").length > 0) {
            // Hide modal
            $(".modal").fadeOut(50);
        }

        // Remove modal content transform
        $(".modal__content").removeClass("modal__content-transform");

        // Remove disable scroll
        $("body").removeClass("disable-scroll");

        // Check if
        if (data_modal) {
            // Delete search parameter
            delete_search_parameter("modal", action);
        }
    } catch (e) {
        // console.error(e);
    }
}