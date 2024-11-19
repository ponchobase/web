function init_meme_generator() {
    try {
        // Vars
        var canvas = document.getElementById("meme_canvas");
        var selector_modal_memes = "[data-modal=memes]";
        var selector_meme_generator = selector_modal_memes + " .meme_generator";

        // Create meme
        create_meme();

        // On click - reset
        $(selector_meme_generator + " .reset").off("click");
        $(selector_meme_generator + " .reset").on("click", function () {
            try {
                // Create meme
                create_meme();

                // Show messages
                show_messages(poncho_json.messages.reset.success);
            } catch (e) {
                // console.error(e);
            }
        });

        // On click - save
        $(selector_meme_generator + " .edit").off("click");
        $(selector_meme_generator + " .edit").on("click", function () {
            try {
                // Clear
                $(selector_meme_generator + " .meme img").remove();

                // Set active object
                set_active_object(2);

                // Show messages
                show_messages(poncho_json.messages.edit.success);
            } catch (e) {
                // console.error(e);
            }
        });

        // On click - save
        $(selector_meme_generator + " .save").off("click");
        $(selector_meme_generator + " .save").on("click", function () {
            try {
                // Clear
                $(selector_meme_generator + " .meme img").remove();

                // Remove active
                poncho_json.meme_canvas.discardActiveObject();
                poncho_json.meme_canvas.renderAll();

                // Canvas to blob
                canvas.toBlob((blob) => {
                    // New image
                    var image = new Image();

                    // URL
                    var url = URL.createObjectURL(blob);

                    // Image source
                    image.src = url;

                    // Append
                    $(selector_meme_generator + " .meme").append(image);

                    // Show messages
                    show_messages(poncho_json.messages.save.success);
                });
            } catch (e) {
                // console.error(e);
            }
        });

        // On click - download
        $(selector_meme_generator + " .download").off("click");
        $(selector_meme_generator + " .download").on("click", function () {
            try {
                // Vars
                var active_id = "";

                try {
                    // Vars
                    active_id = poncho_json.meme_canvas.getActiveObject().id
                } catch (e) {
                    // console.error(e);
                }

                // Remove active
                poncho_json.meme_canvas.discardActiveObject();
                poncho_json.meme_canvas.renderAll();

                // Canvas to blob
                canvas.toBlob((blob) => {
                    // New image
                    var image = new Image();

                    // URL
                    var url = URL.createObjectURL(blob);

                    // Create link
                    var link = document.createElement("a");
                    link.href = url;
                    link.download = "poncho_meme.png";

                    // Click
                    link.click();
                    link.remove();

                    // Set active object
                    set_active_object(active_id);

                    // Show messages
                    show_messages(poncho_json.messages.download.success);
                });
            } catch (e) {
                // console.error(e);
            }
        });

        // On click - expand
        $(selector_meme_generator + " .expand").off("click");
        $(selector_meme_generator + " .expand").on("click", function () {
            try {
                // Hide
                $(this).hide();

                // Show
                $(selector_meme_generator + " .compress").show();

                // Remove class
                $(selector_meme_generator).removeClass("compress");

                // Add class
                $(selector_meme_generator).addClass("expand");
            } catch (e) {
                // console.error(e);
            }
        });

        // On click - compress
        $(selector_meme_generator + " .compress").off("click");
        $(selector_meme_generator + " .compress").on("click", function () {
            try {
                // Hide
                $(this).hide();

                // Show
                $(selector_meme_generator + " .expand").show();

                // Remove class
                $(selector_meme_generator).removeClass("expand");

                // Add class
                $(selector_meme_generator).addClass("compress");
            } catch (e) {
                // console.error(e);
            }
        });
    } catch (e) {
        // console.error(e);
    }
}

function create_meme() {
    try {
        // Vars
        var selector_modal_memes = "[data-modal=memes]";
        var selector_meme_generator = selector_modal_memes + " .meme_generator";

        // Clear
        $(selector_meme_generator + " .meme img").remove();

        try {
            // Destroy fabric
            poncho_json.meme_canvas.dispose();
            poncho_json.meme_canvas = "";
        } catch (e) {
            // console.error(e);
        }

        // New fabric canvas
        poncho_json.meme_canvas = new fabric.Canvas("meme_canvas");

        // Add image to canvas
        fabric.Image.fromURL("/dist/img/memes/templates/poncho_template.png?v=2").then((image) => {
            // Set fabric dimensions to match image
            poncho_json.meme_canvas.setHeight(image.width);
            poncho_json.meme_canvas.setWidth(image.height);

            // Set attributes
            image.set({
                hasControls: false,
                hoverCursor: "auto",
                id: 1,
                selectable: false
            });

            // Add image
            poncho_json.meme_canvas.add(image);

            // iText
            var text_object = new fabric.IText('Type Here', {
                fontFamily: "Delicious_500",
                fontSize: image.height / 10,
                id: 2,
                textAlign: "center",
                top: image.height / 4
            });

            // Add text
            poncho_json.meme_canvas.add(text_object);
            poncho_json.meme_canvas.centerObjectH(text_object)
            poncho_json.meme_canvas.setActiveObject(text_object);

            // Set

        });
    } catch (e) {
        // console.error(e);
    }
}

function set_active_object(active_id) {
    try {
        // Loop
        poncho_json.meme_canvas.getObjects().forEach(function (object) {
            // Check if
            if (object.id == active_id) {
                // Set active
                poncho_json.meme_canvas.setActiveObject(object);
                poncho_json.meme_canvas.renderAll();
            }
        })
    } catch (e) {
        // console.error(e);
    }
}