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

                // New image
                var image = new Image();

                // Image source
                image.src = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");

                // Append
                $(selector_meme_generator + " .meme").append(image);
            } catch (e) {
                // console.error(e);
            }
        }); 

        // On click - download
        $(selector_meme_generator + " .download").off("click");
        $(selector_meme_generator + " .download").on("click", function () {
            try {
                // New image
                var image = new Image();

                // Cross origin
                image.setAttribute("crossOrigin", "anonymous");

                // Image source
                image.src = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");

                // Create link
                var link = document.createElement("a");
                link.href = image.src;
                link.download = "poncho_meme.png";

                // Click
                link.click();
                link.remove();
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
                selectable: false
            });

            // Add image
            // poncho_json.meme_canvas.add(image);

            // Add text
            poncho_json.meme_canvas.add(new fabric.IText("Type Here", {
                fontFamily: "Delicious_500",
                left: 100,
                textAlign: "left",
                top: 100
            }));

            // Set

        });
    } catch (e) {
        // console.error(e);
    }
}