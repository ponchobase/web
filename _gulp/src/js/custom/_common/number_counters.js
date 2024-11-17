function init_number_counters() {
    try {
        // Init number counter
        init_number_counter();

        // On scroll
        $(window).on("scroll", function () {
            // Init number counters
            init_number_counter();
        });
    } catch (e) {
        // console.log(e);
    }
}

function animate_count_value(this_text, count_value) {
    try {
        // Animate count
        $({ countNum: this_text.text() }).animate({
            countNum: count_value
        },
            {
                duration: 2500,
                easing: "swing",
                step: function () {
                    this_text.text(Math.floor(this.countNum));
                },
                complete: function () {
                    // Check if
                    if ($(this_text).closest("[data-number]").attr("data-comma") != "Yes") {
                        // Commas
                        this_text.text(numberWithCommas(this.countNum));
                    } else {
                        // No commas
                        this_text.text(this.countNum);
                    }

                    // Update swiper
                    poncho_json.home_swiper.update();
                },
            });
    } catch (e) {
        // console.log(e);
    }
}

function format_counter_value(count_value) {
    // Vars
    var count_value_format = "";

    try {
        // Check if ratio :
        if (count_value.indexOf(":") > -1) {
            // Vars
            var count_values = count_value.split(":");
            var count_value_1 = count_values[0];
            var count_value_2 = count_values[1];

            // New count value
            count_value_format = `<span data-number-format=${count_value_1}></span>:<span data-number-format=${count_value_2}></span>`;
        } else {
            // Format large number and decimals
            count_value_format = format_large_number(count_value);
        }
    } catch (e) {
        // console.log(e);
    }

    // Return
    return count_value_format;
}

function format_large_number(count_value) {
    // Define vars
    var count_value_format = "";
    var letter = "";

    try {
        // Vars
        count_value = Number(count_value);

        // Check value
        if ($.isNumeric(count_value)) {
            // Format number
            if (count_value > 1000000000000 || count_value < -1000000000000) {
                // Trillion
                count_value = (count_value / 1000000000000).toFixed(1);
                letter = "T";
            } else if (count_value > 1000000000 || count_value < -1000000000) {
                // Billion
                count_value = (count_value / 1000000000).toFixed(1);
                letter = "B";
            } else if (count_value > 1000000 || count_value < -1000000) {
                // Million
                count_value = (count_value / 1000000).toFixed(1);
                letter = "M";
            } else if (count_value > 10000 || count_value < -10000) {
                // Thousand
                count_value = (count_value / 1000).toFixed(1);
                letter = "K";
            } else {
                // Round
                count_value = count_value.toFixed(1);
            }
        }

        // Check if decimal .
        if (count_value.indexOf(".") > -1) {
            // Vars
            var count_values = count_value.split(".");
            var count_value_1 = count_values[0];
            var count_value_2 = count_values[1];

            // Check if
            if (count_value_2 == 0 || count_value_2 == "" || typeof count_value_2 == "undefined" || count_value_2 == null) {
                // New count value
                count_value_format = `<span data-number-format=${count_value_1}></span>${letter}`;
            } else {
                // New count value
                count_value_format = `<span data-number-format=${count_value_1}></span>.<span data-number-format=${count_value_2}></span>${letter}`;
            }
        } else {
            // New count value
            count_value_format = `<span data-number-format=${count_value}></span>${letter}`;
        }
    } catch (e) {
        // console.log(e);
    }

    // Return
    return count_value_format;
}

function init_number_counter() {
    try {
        // Loop
        $(".number-counter.count").each(function () {
            // Vars
            var offset_top = $(this).offset().top - window.innerHeight + 100;

            // Check if counter in view
            if ($(window).scrollTop() > offset_top) {
                // Remove count class 
                $(this).removeClass("count");

                // Loop each counter value to format
                $($(this).find(".value [data-number]")).each(function () {
                    // Vars
                    var count_value = $(this).attr("data-number");

                    // Format counter value
                    count_value_format = format_counter_value(count_value);

                    // Append formatted counter value
                    $(this).empty().append(count_value_format);
                });

                // Loop each counter value to animate
                $($(this).find(".value [data-number-format]")).each(function () {
                    // Var
                    var this_text = $(this);
                    var count_value = $(this).attr("data-number-format");

                    // Animate count
                    animate_count_value(this_text, count_value);
                });
            }
        });
    } catch (e) {
        // console.log(e);
    }
}

function numberWithCommas(x) {
    try {
        // Commas
        return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    } catch (e) {
        // console.log(e);
    }
}