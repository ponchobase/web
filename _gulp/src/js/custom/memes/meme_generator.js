function init_meme_generator() {
    try {
        // Vars
        var canvas = document.getElementById("meme_canvas");
        var selector_modal_memes = "[data-modal=memes]";
        var selector_meme_generator = selector_modal_memes + " .meme_generator";
        var selector_download = ".download";

        // Create meme
        create_meme();

        // On click
        $(selector_meme_generator + " " + selector_download).off("click");
        $(selector_meme_generator + " " + selector_download).on("click", function () {
            try {
                // Convert canvas to image and download
                // Vars
                var image_name = "poncho_meme.png";

                // Create link
                var link = document.createElement("a");
                link.href = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");

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
        var context = canvas.getContext("2d");

        // Add image to canvas
        // New image
        var image = new Image();

        // Image source
        image.src = "/dist/img/memes/templates/poncho_template.png?v=2";

        // Onload
        image.onload = function () {
            // Set width and height
            context.canvas.width = image.width;
            context.canvas.height = image.height;

            // Draw image
            context.drawImage(image, 0, 0, canvas.width, canvas.height);

            // New shapes are drawn behind the existing canvas content
            context.globalCompositeOperation = "source-over";

            // Add text to canvas
            // Vars
            var text = "Type here";

            // Attributes
            context.fillStyle = "#000";
            context.font = "200px Arial";

            // Add text
            context.fillText(text, 20, 50);
        }
    } catch (e) {
        // console.error(e);
    }
}