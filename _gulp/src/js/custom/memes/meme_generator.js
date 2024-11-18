function init_meme_generator() {
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
            // Vars
            var image_width = $(".meme_generator .left .meme img").width();
            var image_height = $(".meme_generator .left .meme img").innerHeight();

            // Set width and height
            context.canvas.width = image_width;
            context.canvas.height = image_height;

            // Draw image
            context.drawImage(image, 0, 0, canvas.width, canvas.height);

            // New shapes are drawn behind the existing canvas content
            context.globalCompositeOperation = "source-over";

            // Add text to canvas
            // Vars
            var text = "Testing new!";

            // Attributes
            context.fillStyle = "#000";
            context.font = "200px Arial";

            // Add text
            context.fillText(text, 20, 50);
        }




            // Clear canvas
            // context.clearRect(0, 0, canvas.width, canvas.height);


        // setTimeout(function () {
        //     // Convert canvas to image and download
        //     // after image loads
        //     let fileName = `ImageName.png`
        //     const link = document.createElement("a")
        //     link.href = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream")
        //     link.download = fileName
        //     link.click();
        // }, 2000);

        // // Wait for 2 seconds and clear the canvas
        // setTimeout(function () {
        //     ctx.clearRect(0, 0,
        //         canvas.width, canvas.height);
        // }, 2000);

    } catch (e) {
        // console.error(e);
    }
}