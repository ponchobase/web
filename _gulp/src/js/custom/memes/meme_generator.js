function init_meme_generator() {
    try {
        // Vars
        var selector_modal_memes = "[data-modal=memes]";
        var selector_meme_generator = selector_modal_memes + " .meme_generator";

        // Add template
        add_template("with_sign");

        // Load asset
        load_asset("1_Fur");

        // Init left top tools
        init_left_top_tools();

        // Init right top tools
        init_right_top_tools();

        // On click - select template transparent
        $(selector_meme_generator + " [name=template_transparent]").off("change");
        $(selector_meme_generator + " [name=template_transparent]").on("change", function () {
            // Check if
            if (this.checked) {
                // Add template
                add_template("Transparent");
            } else {
                // Add template
                add_template("with_sign");
            }
        });

        // On click - select template
        $(selector_meme_generator + " .template-button").off("click");
        $(selector_meme_generator + " .template-button").on("click", function () {
            try {
                // Remove clss
                $(selector_meme_generator + " .template-button").removeClass("active");

                // Add class
                $(this).addClass("active");

                // Vars
                var template = $(this).attr("data-template");

                // Add template
                add_template(template);
            } catch (e) {
                // console.error(e);
            }
        });

        // On change - asset type
        $(selector_meme_generator + " .asset-type").off("change");
        $(selector_meme_generator + " .asset-type").on("change", function () {
            try {
                // Vars
                var asset_type = $(this).val();

                // Load asset
                load_asset(asset_type);
            } catch (e) {
                // console.error(e);
            }
        });

        // Vars
        var accordion_id = $(selector_meme_generator + " .manage-layers .trigger").attr("aria-controls");

        // Open accordion
        open_accordion_by_id(accordion_id);
    } catch (e) {
        // console.error(e);
    }
}

function add_image(image_src) {
    try {
        // Vars
        var selector_modal_memes = "[data-modal=memes]";
        var selector_meme_generator = selector_modal_memes + " .meme_generator";

        // Add image to canvas
        fabric.Image.fromURL(image_src).then((image) => {
            // Remove
            $(selector_meme_generator + " .meme img").remove();

            // Set attributes
            image.set({
                hasControls: true,
                hoverCursor: "auto",
                id: 1,
                selectable: true,
            });

            // Add image
            image.scaleToHeight(poncho_json.meme_canvas.height);
            image.scaleToWidth(poncho_json.meme_canvas.width);
            poncho_json.meme_canvas.add(image);

            // Set active
            poncho_json.meme_canvas.setActiveObject(image);
        });
    } catch (e) {
        // console.error(e);
    }
}

function add_template(template) {
    try {
        // Vars
        var selector_modal_memes = "[data-modal=memes]";
        var selector_meme_generator = selector_modal_memes + " .meme_generator";

        // Remove
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

        // Defaults
        fabric.InteractiveFabricObject.ownDefaults = {
            ...fabric.InteractiveFabricObject.ownDefaults,
            cornerSize: 30,
            touchCornerSize: 40,
            cornerStrokeColor: "#1d48ff",
            cornerColor: "lightblue",
            cornerStyle: "circle",
            padding: 30,
            transparentCorners: false,
            cornerDashArray: [2, 2],
            borderColor: "#ffa51f",
            borderDashArray: [3, 1, 3],
            borderScaleFactor: 3
        }

        // Check if
        if (!check_value_defined(template)) {
            // Vars
            template = "with_sign";
        }

        // Set
        poncho_json.template = template;

        // Add image to canvas
        fabric.Image.fromURL("/dist/img/memes/templates/" + template + ".png?v=3").then((image) => {
            // Set fabric dimensions to match image
            poncho_json.meme_canvas.setHeight(image.height);
            poncho_json.meme_canvas.setWidth(image.width);

            // Set attributes
            image.set({
                hasControls: false,
                hoverCursor: "auto",
                id: 1,
                selectable: false
            });

            // Add image
            poncho_json.meme_canvas.add(image);

            // Check if
            if (template == "with_sign") {
                // Textbox
                var text_object = new fabric.Textbox("Create Your\nPoncho Meme", {
                    fontFamily: "pricedown",
                    fontSize: image.height / 10,
                    id: 1,
                    left: image.width / 2,
                    originX: "center",
                    textAlign: "center",
                    top: image.height / 6,
                    width: image.width / 1.5
                });
            } else if (template == "change_my_mind") {
                // Textbox
                var text_object = new fabric.Textbox("Create Your\nPoncho Meme", {
                    fontFamily: "pricedown",
                    fontSize: image.height / 13,
                    id: 2,
                    left: image.width / 2,
                    originX: "center",
                    textAlign: "center",
                    top: image.height / 1.515,
                    width: image.width / 2
                });
            } else if (template == "smart") {
                // Textbox
                var text_object = new fabric.Textbox("Create Your\nPoncho Meme", {
                    fontFamily: "pricedown",
                    fontSize: image.height / 13,
                    id: 3,
                    left: image.width / 1.282,
                    originX: "center",
                    textAlign: "center",
                    top: image.height / 13.5,
                    width: image.width / 4
                });
            } else if (template == "drake_hotline_bling") {
                // Textbox
                var text_object = new fabric.Textbox("Poncho\nHate", {
                    fontFamily: "pricedown",
                    fontSize: image.height / 13,
                    id: 3,
                    left: image.width / 1.315,
                    originX: "center",
                    textAlign: "center",
                    top: image.height / 6.6,
                    width: image.width / 3
                });

                var text_object_two = new fabric.Textbox("Poncho\nLike", {
                    fontFamily: "pricedown",
                    fontSize: image.height / 13,
                    id: 3,
                    left: image.width / 1.315,
                    originX: "center",
                    textAlign: "center",
                    top: image.height / 1.53,
                    width: image.width / 3
                });
            } else if (template == "truck") {
                // Textbox
                var text_object = new fabric.Textbox("Create Your\nPoncho Meme", {
                    fontFamily: "pricedown",
                    fontSize: image.height / 7,
                    id: 3,
                    left: image.width / 2.65,
                    originX: "center",
                    textAlign: "center",
                    top: image.height / 3.4,
                    width: image.width / 2
                });
            } else {
                // Textbox
                var text_object = new fabric.Textbox("Create Your\nPoncho Meme", {
                    fontFamily: "pricedown",
                    fontSize: image.height / 10,
                    id: 1,
                    left: image.width / 2,
                    originX: "center",
                    originY: "center",
                    textAlign: "center",
                    top: image.height / 2,
                    width: image.width / 1.5
                });
            }

            // Add text
            poncho_json.meme_canvas.add(text_object);
            // poncho_json.meme_canvas.centerObjectH(text_object);
            poncho_json.meme_canvas.setActiveObject(text_object);

            // Check if
            if (text_object_two) {
                // Add text
                poncho_json.meme_canvas.add(text_object_two);
            }
        });
    } catch (e) {
        // console.error(e);
    }
}

function init_left_top_tools() {
    try {
        // Vars
        var canvas = document.getElementById("meme_canvas");
        var selector_modal_memes = "[data-modal=memes]";
        var selector_meme_generator = selector_modal_memes + " .meme_generator";

        // On click - reset
        $(selector_meme_generator + " .reset").off("click");
        $(selector_meme_generator + " .reset").on("click", function () {
            try {
                // Add template
                add_template(poncho_json.template);

                // Show messages
                show_messages(poncho_json.messages.meme_generator.reset.success);
            } catch (e) {
                // console.error(e);
            }
        });

        // On click - save
        $(selector_meme_generator + " .edit").off("click");
        $(selector_meme_generator + " .edit").on("click", function () {
            try {
                // Remove
                $(selector_meme_generator + " .meme img").remove();

                // Set active object
                set_active_object(2);

                // Show messages
                show_messages(poncho_json.messages.meme_generator.edit.success);
            } catch (e) {
                // console.error(e);
            }
        });

        // On click - save
        $(selector_meme_generator + " .save").off("click");
        $(selector_meme_generator + " .save").on("click", function () {
            try {
                // Remove
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
                    show_messages(poncho_json.messages.meme_generator.save.success);
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
                    show_messages(poncho_json.messages.meme_generator.download.success);
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

function init_right_top_tools() {
    try {
        // Vars
        var selector_modal_memes = "[data-modal=memes]";
        var selector_meme_generator = selector_modal_memes + " .meme_generator";

        // On click - text
        $(selector_meme_generator + " .text").off("click");
        $(selector_meme_generator + " .text").on("click", function () {
            try {
                // Remove
                $(selector_meme_generator + " .meme img").remove();

                // Textbox
                var text_object = new fabric.Textbox("Create Your\nPoncho Meme", {
                    fontFamily: "pricedown",
                    fontSize: poncho_json.meme_canvas.height / 10,
                    id: 1,
                    left: poncho_json.meme_canvas.width / 2,
                    originX: "center",
                    originY: "center",
                    textAlign: "center",
                    top: poncho_json.meme_canvas.height / 2,
                    width: poncho_json.meme_canvas.width / 1.5
                });

                // Add textbox
                poncho_json.meme_canvas.add(text_object);
                poncho_json.meme_canvas.setActiveObject(text_object);
            } catch (e) {
                // console.error(e);
            }
        });

        // On click - shape
        $(selector_meme_generator + " .shape").off("click");
        $(selector_meme_generator + " .shape").on("click", function () {
            try {
                // Remove
                $(selector_meme_generator + " .meme img").remove();

                // Rectangle 
                var rectangle = new fabric.Rect({
                    fill: "#fbffef",
                    height: poncho_json.meme_canvas.height / 2,
                    id: 1,
                    left: poncho_json.meme_canvas.width / 2,
                    originX: "center",
                    originY: "center",
                    stroke: "#000",
                    strokeWidth: 3,
                    textAlign: "center",
                    top: poncho_json.meme_canvas.height / 2,
                    width: poncho_json.meme_canvas.width / 2
                });

                // Add rectangle
                poncho_json.meme_canvas.add(rectangle);
                poncho_json.meme_canvas.setActiveObject(rectangle);
            } catch (e) {
                // console.error(e);
            }
        });
    } catch (e) {
        // console.error(e);
    }
}

function load_asset(asset_type) {
    try {
        // Check if
        if (!asset_type) {
            // Vars
            asset_type = "1_Fur";
        }
        // Vars
        var selector_modal_memes = "[data-modal=memes]";
        var selector_meme_generator = selector_modal_memes + " .meme_generator";
        var folder = "/dist/img/memes/assets/" + asset_type + "/";

        // Get folder
        $.ajax({
            url: folder,
            success: function (data) {
                // Check if
                if (data) {
                    // Empty
                    $(".assets .gallery .inner").empty();

                    // Loop
                    $(data).find("a").attr("href", function (i, val) {
                        // Check if
                        if (val.match(/\.(jpe?g|png|gif)$/)) {
                            // Vars
                            var filenameArray = val.split(".");
                            var filename = filenameArray[0];
                            filename = filename.replaceAll("_", " ");
                            filename = filename.replaceAll("&", " & ");

                            // Vars
                            var gallery_string = '<button class="asset-button" type="button" title="' + filename + '"><img src="' + folder + val + '" alt="' + filename + '" loading="lazy"></button>';

                            // Append
                            $(selector_meme_generator + " .assets .gallery .inner").append(gallery_string);
                        }
                    });
                }

                // On click - select asset
                $(selector_meme_generator + " .asset-button").off("click");
                $(selector_meme_generator + " .asset-button").on("click", function () {
                    try {
                        // Vars
                        var image = $(this).find("img").attr("src");

                        // Add image
                        add_image(image);
                    } catch (e) {
                        // console.error(e);
                    }
                });
            }
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

function upload_image(e) {
    try {
        // Vars
        var file = e.currentTarget.files[0];

        // File reader
        var reader = new FileReader();

        // Fired when a read has completed, successfully or not.
        reader.onloadend = function () {
            // Image
            fabric.Image.fromURL(reader.result).then((image) => {
                // Remove
                $(selector_meme_generator + " .meme img").remove();

                // Set attributes
                image.set({
                    hasControls: true,
                    hoverCursor: "auto",
                    id: 1,
                    left: poncho_json.meme_canvas.width / 2,
                    originX: "center",
                    originY: "center",
                    id: 1,
                    selectable: true,
                    textAlign: "center",
                    top: poncho_json.meme_canvas.height / 2
                });

                // Add image
                image.scaleToHeight(poncho_json.meme_canvas.height / 2);
                image.scaleToWidth(poncho_json.meme_canvas.width / 2);
                poncho_json.meme_canvas.add(image);
                poncho_json.meme_canvas.setActiveObject(image);
            });
        }

        // Fired when the read failed due to an error.
        reader.onerror = function () {
            // Show messages
            show_messages(poncho_json.messages.meme_generator.upload_iamge.error);
        }

        // Check if
        if (file && (/\.(jpe?g|png)$/i.test(file.name))) {
            // Read the contents of the specified Blob or File
            reader.readAsDataURL(file);
        } else {
            // Show messages
            show_messages(poncho_json.messages.meme_generator.upload_iamge.error);
        }

        // Clear
        $(e.currentTarget).val("");
    } catch (e) {
        // console.error(e);
    }
}

function upload_template(e) {
    try {
        // Vars
        var file = e.currentTarget.files[0];

        // File reader
        var reader = new FileReader();

        // Fired when a read has completed, successfully or not.
        reader.onloadend = function () {
            // Vars
            var selector_modal_memes = "[data-modal=memes]";
            var selector_meme_generator = selector_modal_memes + " .meme_generator";

            // Remove
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

            // Defaults
            fabric.InteractiveFabricObject.ownDefaults = {
                ...fabric.InteractiveFabricObject.ownDefaults,
                cornerSize: 30,
                touchCornerSize: 40,
                cornerStrokeColor: "#1d48ff",
                cornerColor: "lightblue",
                cornerStyle: "circle",
                padding: 30,
                transparentCorners: false,
                cornerDashArray: [2, 2],
                borderColor: "#ffa51f",
                borderDashArray: [3, 1, 3],
                borderScaleFactor: 3
            }

            // Add image to canvas
            fabric.Image.fromURL(reader.result).then((image) => {
                // Set fabric dimensions to match image
                poncho_json.meme_canvas.setHeight(image.height);
                poncho_json.meme_canvas.setWidth(image.width);

                // Set attributes
                image.set({
                    hasControls: false,
                    hoverCursor: "auto",
                    id: 1,
                    selectable: false
                });

                // Add image
                poncho_json.meme_canvas.add(image);

                // Textbox
                var text_object = new fabric.Textbox("Create Your\nPoncho Meme", {
                    fontFamily: "pricedown",
                    fontSize: image.height / 10,
                    id: 1,
                    left: image.width / 2,
                    originX: "center",
                    originY: "center",
                    textAlign: "center",
                    top: image.height / 2,
                    width: image.width / 1.5
                });

                // Add text
                poncho_json.meme_canvas.add(text_object);
                poncho_json.meme_canvas.setActiveObject(text_object);
            });
        }

        // Fired when the read failed due to an error.
        reader.onerror = function () {
            // Show messages
            show_messages(poncho_json.messages.meme_generator.upload_template.error);
        }

        // Check if
        if (file && (/\.(jpe?g|png)$/i.test(file.name))) {
            // Read the contents of the specified Blob or File
            reader.readAsDataURL(file);
        } else {
            // Show messages
            show_messages(poncho_json.messages.meme_generator.upload_template.error);
        }

        // Clear
        $(e.currentTarget).val("");
    } catch (e) {
        // console.error(e);
    }
}