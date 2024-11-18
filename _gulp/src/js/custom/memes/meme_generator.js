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
                // Vars
                var image_name = "poncho_meme.png";

                // Create link
                var link = document.createElement("a");
                link.href = canvas.toDataURL("image/png");

                // Download
                link.download = image_name;
                link.click();
            } catch (e) {
                // console.error(e);
            }
        });



        // Clear canvas
        // context.clearRect(0, 0, canvas.width, canvas.height);

        // // Wait for 2 seconds and clear the canvas
        // setTimeout(function () {
        //     ctx.clearRect(0, 0,
        //         canvas.width, canvas.height);
        // }, 2000);

    } catch (e) {
        // console.error(e);
    }
}

function create_meme() {
    try {
        // Vars
        var canvas = document.getElementById("meme_canvas");
        var selector_modal_memes = "[data-modal=memes]";
        var selector_meme_generator = selector_modal_memes + " .meme_generator";

        // Clear
        $(selector_meme_generator + " .meme img").remove();

        // New fabric canvas
        const canvas_fabric = new fabric.Canvas('meme_canvas');

        // Add image to canvas
        fabric.Image.fromURL("/dist/img/memes/templates/poncho_template.png?v=2").then((image) => {
            // Set fabric dimensions to match image
            canvas_fabric.setHeight(image.width);
            canvas_fabric.setWidth(image.height);

            // Set attributes
            image.set({
                hasControls: false,
                hoverCursor: "auto",
                selectable: false
            });

            // Add image
            canvas_fabric.add(image);

            // Add text
            canvas_fabric.add(new fabric.IText('Type Here', { 
                fontFamily: 'Delicious_500', 
                left: 100, 
                top: 100 
              }));
        });
    } catch (e) {
        // console.error(e);
    }
}