function init_messages() {
    try {
        // Vars
        var selector_messages = ".messages";

        // Close messages 
        $(selector_messages + " .close").off("click");
        $(selector_messages + " .close").on("click", function () {
            // Hide
            $(selector_messages).hide();
        });
    } catch (e) {
        // console.error(e);
    }
}

function show_messages(message) {
    try {
        // Vars
        var selector_messages = ".messages";
        var selector_message = selector_messages + " [data-name=message]";

        // Restart timer
        clearTimeout(poncho_json.messages_timeout);

        // Check if
        if (!$(selector_message).is(":visible")) {
            // Empty
            $(selector_message).empty();

            // Append
            $(selector_message).append(message);
        } else {
            // Append existing
            $(selector_message).append(message);
        }

        // Fade in
        $(selector_messages).fadeIn();

        // Set 5 second timeout
        poncho_json.messages_timeout = setTimeout(function () {
            // Fadeout
            $(selector_messages).fadeOut();
        }, 5000);
    } catch (e) {
        // console.error(e);
    }
}