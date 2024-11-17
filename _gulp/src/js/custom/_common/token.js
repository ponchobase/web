function read_token(initialize) {
    try {
        // Define vars
        var pair_found = false;

        // Read token
        $.ajax({
            type: "GET",
            cache: false,
            url: "https://api.dexscreener.com/latest/dex/pairs/base/0x6FD34677ecDFae4caE732A5B22F1A3082917eb15",
            success: function (response, status, xhr) {
                // Vars
                response = check_value_defined(response);
                var pair = check_value_defined(response.pair);

                // Update token ui
                pair_found = update_token_ui(initialize, pair);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                // console.error(errorThrown);
            }
        }).always(() => {
            // nprogress_end();
            // Check if
            if (!pair_found) {
                // Read token backup
                read_token_backup(initialize);
            }
        });
    } catch (e) {
        // console.error(e);
    }
}

function read_token_backup(initialize) {
    try {
        // Read token
        $.ajax({
            type: "GET",
            cache: false,
            url: "https://api.dexscreener.com/latest/dex/tokens/0xc2fe011c3885277c7f0e7ffd45ff90cadc8ecd12",
            success: function (response, status, xhr) {
                // Vars
                response = check_value_defined(response);
                var pairs = check_array_defined(response.pairs);

                // Check if
                if (pairs) {
                    // Loop
                    $.each(pairs, function (index, value) {
                        // Vars
                        var address = check_value_defined(value.baseToken.address);
                        var symbol = check_value_defined(value.baseToken.symbol);
                        var chain_id = check_value_defined(value.chainId);

                        // Check if
                        if (
                            address == "0xC2fE011C3885277c7F0e7ffd45Ff90cADc8ECD12" &&
                            symbol == "PONCHO" &&
                            chain_id == "base"
                        ) {
                            // Update token ui
                            update_token_ui(initialize, value);

                            // Return
                            return false;
                        }
                    });
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                // console.error(errorThrown);
            }
        }).always(() => {
            // nprogress_end();
        });
    } catch (e) {
        // console.error(e);
    }
}

function set_read_token_interval() {
    try {
        // Set interval - 1 min
        setInterval(function () {
            // Read token
            read_token(false);
        }, 60 * 1000);
    } catch (e) {
        // console.error(e);
    }
}

function update_token_ui(initialize, pair) {
    // Define vars
    var pair_found = false;

    try {
        // Check if
        if (pair) {
            // Vars
            var price = check_value_defined(pair.priceUsd);

            // Check if
            if (price) {
                // Vars
                var price_change = check_value_defined(pair.priceChange.h24);
                var price_string = format_value_percent(price, price_change);
                var market_cap = check_value_defined(pair.marketCap);
                var volume = check_value_defined(pair.volume.h24);
                var buys = check_value_defined(pair.txns.h24.buys);
                var sells = check_value_defined(pair.txns.h24.sells);
                var transactions = buys + sells;
                var liquidity = check_value_defined(pair.liquidity.usd);

                // Check if
                if (price_string) {
                    // Append
                    $("[data-token=price]").html(price_string);

                    // Market cap
                    $("[data-token=market_cap]").attr("data-number", market_cap);
                    $("[data-token=market_cap]").closest(".number-counter").addClass("count");

                    // Volume
                    $("[data-token=volume]").attr("data-number", volume);
                    $("[data-token=volume]").closest(".number-counter").addClass("count");

                    // Transactions
                    $("[data-token=transactions]").attr("data-number", transactions);
                    $("[data-token=transactions]").closest(".number-counter").addClass("count");

                    // Liquidity
                    $("[data-token=liquidity]").attr("data-number", liquidity);
                    $("[data-token=liquidity]").closest(".number-counter").addClass("count");

                    // Init number counters
                    init_number_counters();

                    // Update swiper
                    poncho_json.home_swiper.update();

                    // Vars
                    pair_found = true;

                    // Check if
                    if (initialize) {
                        // Set timeout
                        setTimeout(function () {
                            // Title
                            document.title = "$PONCHO: " + price + " (" + price_change + "%) | Poncho on BASE";
                        }, 5000);
                    } else {
                        // Title
                        document.title = "$PONCHO: " + price + " (" + price_change + "%) | Poncho on BASE";
                    }
                }
            }
        }


    } catch (e) {
        // console.error(e);
    }

    // Return
    return pair_found;
}