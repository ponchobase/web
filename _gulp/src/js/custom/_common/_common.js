function check_array_defined(array) {
    try {
        // Check if
        if (typeof array == "undefined" || array == null || !$.isArray(array)) {
            // Vars
            array = [];
        }
    } catch (e) {
        // console.error(e);
        array = [];
    }

    // Return
    return array;
}

function check_value_defined(value) {
    try {
        // Check if
        if (typeof value == "undefined" || value == null) {
            // Vars
            value = "";
        }
    } catch (e) {
        // console.error(e);
        // Vars
        value = "";
    }

    // Return
    return value;
}

function copy_to_clipboard(e, selector) {
    try {
        // Vars
        var selector_parent = $(e.currentTarget).closest(selector);

        // Copy to clipboard
        navigator.clipboard.writeText(e.currentTarget.value);

        // Add class
        $(selector_parent).addClass("copied");

        // Set timeout - 2 seconds
        setTimeout(function () {
            // Remove class
            $(selector_parent).removeClass("copied");
        }, 2000);
    } catch (e) {
        // console.error(e);
    }
}

function delete_search_parameter(name, action) {
    try {
        if ("URLSearchParams" in window) {
            // Vars
            var parameters = new URLSearchParams(window.location.search);

            // Delete search parametereter
            parameters.delete(name);

            // Check if
            if (check_value_defined(parameters.toString())) {
                // Vars
                var new_url = window.location.pathname + "?" + parameters.toString();
            } else {
                // Vars
                var new_url = window.location.pathname;
            }

            // Check if
            if (!get_search_parameter(name) || action == "replace") {
                // Replace history
                history.replaceState("", "", new_url);
            } else if (action == "update") {
                // Update history
                history.pushState("", "", new_url);
            }
        }
    } catch (e) {
        // console.error(e);
    }
}

function format_number_decimals(value) {
    try {
        // Check if
        if ($.isNumeric(value)) {
            // Check if
            if (value >= 1 || value <= -1) {
                // 2 decimals
                value = parseFloat(value).toFixed(2);
            } else {
                // Number zeros after decimal
                var number_zeros = -Math.floor(Math.log10(Math.abs(value)) + 1);

                // Number of decimals = number zeros + 4
                var number_decimals = number_zeros + 4;

                // Check if
                if (number_zeros > 10) {
                    // Vars
                    value = 0;
                } else {
                    // Check if
                    if (number_decimals >= 10) {
                        // Vars
                        number_decimals = 10;
                    }

                    // Format value to number of decimals and trim extra zeros
                    value = parseFloat(parseFloat(value).toFixed(number_decimals));
                }
            }
        } else {
            // Vars
            value = 0;
        }
    } catch (e) {
        // console.error(e);
    }

    // Return
    return value;
}

function format_value_percent(value, percent) {
    // Define vars
    var return_string = "";

    try {
        // Check if
        if ($.isNumeric(value)) {
            // Vars
            value = format_number_decimals(value);
            percent = parseFloat(percent).toFixed(2);

            // Vars
            var change_color = get_change_color(percent);
            var change_direction = get_change_direction(percent);

            // Vars
            return_string = `<span class="font--bold font--${change_color}">${change_direction} $${value} (${percent}%)</span>`;
        }
    } catch (e) {
        // console.error(e);
    }

    // Return
    return return_string;
}

function get_change_color(value) {
    // Define vars
    var change_color = "";

    try {
        // Check if
        if (value > 0) {
            // Vars
            change_color = "green";
        } else if (value < 0) {
            // Vars
            change_color = "red";
        } else {
            // Vars
            change_color = "white";
        }
    } catch (e) {
        // console.error(e);
    }

    // Return
    return change_color;
}

function get_change_direction(value) {
    // Define vars
    var change_direction = "";

    try {
        // Check if
        if (value < 0) {
            // Vars
            change_direction = '<i class="fas fa-long-arrow-alt-down"></i>';
        } else if (value > 0) {
            // Vars
            change_direction = '<i class="fas fa-long-arrow-alt-up"></i>';
        } else {
            // Vars
            change_direction = '';
        }
    } catch (e) {
        // console.error(e);
    }

    // Return
    return change_direction;
}

function get_search_parameter(name) {
    // Define vars
    var parameter = false;

    try {
        // Vars
        var href = window.location.pathname + window.location.search;
        var search_parameters = href.split("?");
        search_parameters = search_parameters[1];

        // Check if
        if ("URLSearchParams" in window) {
            // Search parameters
            var parameters = new URLSearchParams(search_parameters);
            parameter = check_value_defined(parameters.get(name));
        }
    } catch (e) {
        // console.log(e);
    }

    // Return
    return parameter;
}

function init_anchor_tags() {
    try {
        // On click
        $('a[href^="#"]').on("click", function (e) {
            // Vars
            var href = $(this).attr("href");

            // Check if
            if ($(".site__header .header-position-fixed").length > 0) {
                // Vars
                var headerHeight = $("header").innerHeight();
            } else {
                // Vars
                var headerHeight = 0;
            }

            // Animate
            $("html,body").animate({ scrollTop: $(href).offset().top - headerHeight - 100 }, 500);
        });
    } catch (e) {
        // console.log(e);
    }
}

function init_lazy_load() {
    try {
        // Callback
        let callback = (entries, observer) => {
            // Loop
            entries.forEach((entry) => {
                // Check if
                if (entry.intersectionRatio >= 0.1 && entry.target.style.opacity != 1) {
                    // Opacity
                    entry.target.style.opacity = 1;
                }
            });
        };

        // Options
        let options = {
            root: null,
            threshold: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]
        }

        // Observer
        let observer = new IntersectionObserver(callback, options);

        // Select .lazy-load
        for (const target of document.querySelectorAll(".lazy-load")) {
            // Observer
            observer.observe(target);
        }
    } catch (e) {
        // console.error(e);
    }
}

function init_popstate() {
    try {
        // On browser popstate
        $(window).on("popstate", function (event) {
            // Load modal from url
            load_modal_from_url();
        });
    } catch (e) {
        // console.error(e);
    }
}

function throttle(callback, limit) {
    try {
        // Vars
        var wait = false;

        // Return
        return function (...args) {
            // Check if
            if (!wait) {
                // Callback
                callback(...args);

                // True
                wait = true;

                // Set timeout
                setTimeout(function () {
                    // False
                    wait = false;
                }, limit);
            }
        }
    } catch (e) {
        // console.error(e);
    }
}

function update_search_parameters(parameters_array, action) {
    try {
        // Check if
        if ("URLSearchParams" in window) {
            // Search parameters
            var parameters = new URLSearchParams(window.location.search);

            // Check if
            if (check_array_defined(parameters_array)) {
                // Loop
                $.each(parameters_array, function (index, value) {
                    // Check if
                    if (value.name && value.value) {
                        // Set parameters
                        parameters.set(value.name, value.value);
                    }
                });

                // New url
                if (check_value_defined(parameters.toString())) {
                    // Vars
                    var new_url = window.location.pathname + "?" + parameters.toString();
                } else {
                    // Vars
                    var new_url = window.location.pathname;
                }

                // Check if
                if (action) {
                    // Update history
                    history.pushState("", "", new_url);
                } else {
                    // Replace history
                    history.replaceState("", "", new_url);
                }
            }
        }
    } catch (e) {
        // console.error(e);
    }
}