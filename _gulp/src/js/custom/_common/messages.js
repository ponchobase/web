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

function messages_popup(message) {
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
            $(selector_message).append("<br/>" + message);
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







// Logic for which message to display
function messages_response(response) {
    try {
        // Suspended
        if (response == "suspended_local_message") {
            // On init pass message
            localStorage.message = app.messages.suspended;
        } else if (response.suspended) {
            messages_popup(app.messages.suspended);
            // Common
            // Permission denied
        } else if (response.permission_denied) {
            messages_popup(app.messages.premission_denied);
            // Correlation
        } else if (response.form_name == "pearson_correlation_form") {
            if (!response.correlation_pearson_string) {
                messages_popup(app.messages.common.correlation.error);
            }
            // Account
            // Account
        } else if (response.form_name == "delete_account_form") {
            if (response.delete_account_subscription) {
                messages_popup(app.messages.account.account.delete_account.subscription);
            } else if (response.delete_account) {
                // On init pass message
                localStorage.message = app.messages.account.account.delete_account.success;

                // Sign out
                submit_sign_out();
            } else {
                messages_popup(app.messages.account.account.delete_account.error);
            }
            // Balance
        } else if (response.form_name == "create_balance_form") {
            if (response.create_balance_already) {
                messages_popup(app.messages.account.balance.create_balance.already);
            } else if (response.create_balance) {
                messages_popup(app.messages.account.balance.create_balance.success);
            } else {
                messages_popup(app.messages.account.balance.create_balance.error);
            }
        } else if (response.form_name == "read_balance_form") {
            if (response.read_balance_settings_error) {
                messages_popup(app.messages.account.balance.read_balance_settings.error);
            }
        } else if (response.form_name == "update_balance_form") {
            if (response.update_balance) {
                messages_popup(app.messages.account.balance.update_balance.success);
            } else {
                messages_popup(app.messages.account.balance.update_balance.error);
            }
        } else if (response.form_name == "update_balance_settings_form") {
            if (response.update_balance_settings) {
                messages_popup(app.messages.account.balance.update_balance_settings.success);
            } else {
                messages_popup(app.messages.account.balance.update_balance_settings.error);
            }
        } else if (response.form_name == "delete_balance_form") {
            if (response.delete_balance) {
                messages_popup(app.messages.account.balance.delete_balance.success);
            } else {
                messages_popup(app.messages.account.balance.delete_balance.error);
            }
        } else if (response.form_name == "delete_balances_form") {
            if (response.delete_balances) {
                messages_popup(app.messages.account.balance.delete_balances.success);
            } else {
                messages_popup(app.messages.account.balance.delete_balances.error);
            }
            // Log in
        } else if (response.form_name == "log_in_form") {
            if (response.login_attempts_reached) {
                messages_popup(app.messages.account.log_in.login_attempts_reached.error);
            } else if (response.logged_in == false) {
                messages_popup(app.messages.account.log_in.error);
            }
            // Profile
        } else if (response.form_name == "forgot_password_form") {
            if (response.forgot_password) {
                messages_popup(app.messages.account.profile.forgot_password.success);
            } else {
                messages_popup(app.messages.account.profile.forgot_password.error);
            }
        } else if (response.form_name == "read_profile_form") {
            if (response.read_profile_error) {
                messages_popup(app.messages.account.profile.read_profile.error);
            }
        } else if (response.form_name == "reset_password_form") {
            if (response.reset_password) {
                messages_popup(app.messages.account.profile.reset_password.success);
            } else {
                messages_popup(app.messages.account.profile.reset_password.error);
            }
        } else if (response.form_name == "update_profile_bio_form") {
            if (response.update_profile_bio) {
                messages_popup(app.messages.account.profile.update_profile_bio.success);
            } else {
                messages_popup(app.messages.account.profile.update_profile_bio.error);
            }
        } else if (response.form_name == "update_profile_cover_image_form") {
            if (response.update_profile_cover_image) {
                messages_popup(app.messages.account.profile.update_profile_cover_image.success);
            } else {
                messages_popup(app.messages.account.profile.update_profile_cover_image.error);
            }
        } else if (response.form_name == "update_profile_email_address_form") {
            if (response.update_profile_email_address == "taken") {
                messages_form(response.form_name, "#profile_email_address", app.messages.account.profile.update_profile_email_address.taken);
            } else if (response.update_profile_email_address) {
                messages_popup(app.messages.account.profile.update_profile_email_address.success);
            } else {
                messages_popup(app.messages.account.profile.update_profile_email_address.error);
            }
        } else if (response.form_name == "resend_verification_email_form") {
            if (response.resend_verification_email == "already") {
                messages_popup(app.messages.verified_email.already);
            } else if (response.mail_sent) {
                messages_popup(app.messages.account.profile.resend_verification_email.success);
            } else {
                messages_popup(app.messages.account.profile.resend_verification_email.error);
            }
        } else if (response.form_name == "update_profile_image_form") {
            if (response.update_profile_image) {
                messages_popup(app.messages.account.profile.update_profile_image.success);
            } else {
                messages_popup(app.messages.account.profile.update_profile_image.error);
            }
        } else if (response.form_name == "update_profile_name_form") {
            if (response.update_profile_name) {
                messages_popup(app.messages.account.profile.update_profile_name.success);
            } else {
                messages_popup(app.messages.account.profile.update_profile_name.error);
            }
        } else if (response.form_name == "update_profile_password_form") {
            if (response.update_profile_password) {
                messages_popup(app.messages.account.profile.update_profile_password.success);
            } else {
                messages_popup(app.messages.account.profile.update_profile_password.error);
            }
        } else if (response.form_name == "update_profile_username_form") {
            if (response.update_profile_username == "taken") {
                messages_form(response.form_name, "#profile_username", app.messages.account.profile.update_profile_username.taken);
            } else if (response.update_profile_username) {
                messages_popup(app.messages.account.profile.update_profile_username.success);
            } else {
                messages_popup(app.messages.account.profile.update_profile_username.error);
            }
        } else if (response.form_name == "update_profile_website_form") {
            if (response.update_profile_website) {
                messages_popup(app.messages.account.profile.update_profile_website.success);
            } else {
                messages_popup(app.messages.account.profile.update_profile_website.error);
            }
            // Settings
        } else if (response.form_name == "read_settings_form") {
            // Read settings
            if (response.read_settings_error) {
                messages_popup(app.messages.account.settings.read_settings.error);
            }
        } else if (response.form_name == "update_settings_general_form") {
            // Update settings general
            if (response.update_settings) {
                messages_popup(app.messages.account.settings.update_settings.success);
            } else {
                messages_popup(app.messages.account.settings.update_settings.error);
            }
        } else if (response.form_name == "update_settings_notifications_form") {
            // Update settings notifications
            if (response.update_settings_notifications) {
                messages_popup(app.messages.account.settings.update_settings_notifications.success);
            } else {
                messages_popup(app.messages.account.settings.update_settings_notifications.error);
            }
        } else if (response.form_name == "update_settings_emails_form") {
            // Update settings emails
            if (response.update_settings_emails) {
                messages_popup(app.messages.account.settings.update_settings_emails.success);
            } else {
                messages_popup(app.messages.account.settings.update_settings_emails.error);
            }
            // Sign up
        } else if (response.form_name == "sign_up_form") {
            if (response.sign_up) {
                messages_popup(app.messages.account.sign_up.success);
            } else {
                messages_popup(app.messages.account.sign_up.error);
            }

            if (response.update_profile_username == "taken") {
                messages_form(response.form_name, "#sign_up_username", app.messages.account.profile.update_profile_username.taken);
            }

            if (response.update_profile_email_address == "taken") {
                messages_form(response.form_name, "#sign_up_email_address", app.messages.account.profile.update_profile_email_address.taken);
            }
            // Verify apple token
        } else if (response.form_name == "verify_token_apple_form") {
            messages_popup(app.messages.account.verify_token_apple.error);
            // Verify google token
        } else if (response.form_name == "verify_token_google_form") {
            messages_popup(app.messages.account.verify_token_google.error);
            // Dashboard
            // _Common
        } else if (response.form_name == "update_table_filters_form") {
            if (response.update_table_filters) {
                messages_popup(app.messages.dashboard._common.table_filters.update_table_filters_success);
            } else if (response.reset_table_filters) {
                messages_popup(app.messages.dashboard._common.table_filters.reset_table_filters_success);
            } else {
                messages_popup(app.messages.dashboard._common.table_filters.error);
            }
        } else if (response.form_name == "update_heatmap_filters_form") {
            if (response.update_heatmap_filters) {
                messages_popup(app.messages.dashboard._common.heatmap_filters.update_heatmap_filters_success);
            } else if (response.reset_heatmap_filters) {
                messages_popup(app.messages.dashboard._common.heatmap_filters.reset_heatmap_filters_success);
            } else {
                messages_popup(app.messages.dashboard._common.heatmap_filters.error);
            }
        } else if (response.form_name == "update_table_settings_form") {
            if (response.update_table_settings) {
                messages_popup(app.messages.dashboard._common.table_settings.update_table_settings_success);
            } else if (response.reset_table_settings) {
                messages_popup(app.messages.dashboard._common.table_settings.reset_table_settings_success);
            } else {
                messages_popup(app.messages.dashboard._common.table_settings.error);
            }
        } else if (response.form_name == "update_heatmap_settings_form") {
            if (response.update_heatmap_settings) {
                messages_popup(app.messages.dashboard._common.heatmap_settings.update_heatmap_settings_success);
            } else if (response.reset_heatmap_settings) {
                messages_popup(app.messages.dashboard._common.heatmap_settings.reset_heatmap_settings_success);
            } else {
                messages_popup(app.messages.dashboard._common.heatmap_settings.error);
            }
            // Home
        } else if (response.form_name == "read_home_form") {
            if (!response.home_found) {
                messages_popup(app.messages.dashboard.home.not_found);
            }
            // News
        } else if (response.form_name == "update_news_filters_form") {
            if (response.update_news_filters) {
                messages_popup(app.messages.dashboard.news.news_filters.update_news_filters_success);
            } else if (response.reset_news_filters) {
                messages_popup(app.messages.dashboard.news.news_filters.reset_news_filters_success);
            } else {
                messages_popup(app.messages.dashboard.news.news_filters.error);
            }
        } else if (response.form_name == "update_news_settings_form") {
            if (response.update_news_settings) {
                messages_popup(app.messages.dashboard.news.news_settings.update_news_settings_success);
            } else if (response.reset_news_settings) {
                messages_popup(app.messages.dashboard.news.news_settings.reset_news_settings_success);
            } else {
                messages_popup(app.messages.dashboard.news.news_settings.error);
            }
            // Plays
        } else if (response.form_name == "close_play_form") {
            if (response.close_play) {
                messages_popup(app.messages.dashboard.plays.close_play.success);
            } else if (response.close_play_market_closed) {
                messages_popup(app.messages.dashboard.plays.close_play.market_closed);
            } else {
                messages_popup(app.messages.dashboard.plays.close_play.error);
            }
        } else if (response.form_name == "create_play_form") {
            if (response.create_play) {
                messages_popup(app.messages.dashboard.plays.create_play.success);
            } else if (response.create_play_open_already) {
                messages_popup(app.messages.dashboard.plays.create_play.already);
            } else if (response.create_play_closed_past) {
                messages_popup(app.messages.dashboard.plays.create_play.closed_past);
            } else if (response.create_play_limit) {
                messages_popup(app.messages.dashboard.plays.create_play.limit);
            } else if (response.create_play_limit_basic) {
                messages_popup(app.messages.dashboard.plays.create_play.limit_basic);
            } else if (response.create_play_price) {
                messages_popup(app.messages.dashboard.plays.create_play.price);
            } else if (response.create_play_market_closed) {
                messages_popup(app.messages.dashboard.plays.create_play.market_closed);
            } else {
                messages_popup(app.messages.dashboard.plays.create_play.error);
            }
        } else if (response.form_name == "delete_plays_form") {
            if (response.delete_plays) {
                messages_popup(app.messages.dashboard.plays.delete_plays.success);
            } else {
                messages_popup(app.messages.dashboard.plays.delete_plays.error);
            }
        } else if (response.form_name == "delete_plays_watchlist_symbol_form") {
            if (response.delete_plays_watchlist_symbol) {
                messages_popup(app.messages.dashboard.plays.delete_plays_watchlist_symbol.success);
            } else {
                messages_popup(app.messages.dashboard.plays.delete_plays_watchlist_symbol.error);
            }
        } else if (response.form_name == "create_plays_watchlist_symbol_form") {
            if (response.create_plays_watchlist_symbol) {
                messages_popup(app.messages.dashboard.plays.create_plays_watchlist_symbol.success);
            } else if (response.create_plays_watchlist_limit_basic) {
                messages_popup(app.messages.dashboard.plays.create_plays_watchlist_symbol.limit_basic);
            } else if (response.create_plays_watchlist_limit) {
                messages_popup(app.messages.dashboard.plays.create_plays_watchlist_symbol.limit);
            } else {
                messages_popup(app.messages.dashboard.plays.create_plays_watchlist_symbol.error);
            }
            // Alerts
        } else if (response.form_name == "delete_alerts_watchlist_symbol_form") {
            if (response.delete_alerts_watchlist_symbol) {
                messages_popup(app.messages.dashboard.alerts.delete_alerts_watchlist_symbol.success);
            } else {
                messages_popup(app.messages.dashboard.alerts.delete_alerts_watchlist_symbol.error);
            }
        } else if (response.form_name == "create_alerts_watchlist_symbol_form") {
            if (response.create_alerts_watchlist_symbol) {
                messages_popup(app.messages.dashboard.alerts.create_alerts_watchlist_symbol.success);
            } else if (response.create_alerts_watchlist_limit) {
                messages_popup(app.messages.dashboard.alerts.create_alerts_watchlist_symbol.limit);
            } else {
                messages_popup(app.messages.dashboard.alerts.create_alerts_watchlist_symbol.error);
            }
        } else if (response.form_name == "read_alerts_statistics_form") {
            if (response.alerts_statistics_not_found) {
                messages_popup(app.messages.dashboard.alerts.statistics.not_found);
            } else if (!response.alerts_statistics_chart) {
                messages_popup(app.messages.dashboard.alerts.statistics.error);
            }
            // Symbols
            // Watchlist
        } else if (response.form_name == "create_symbols_watchlist_symbol_form") {
            if (response.create_symbols_watchlist_symbol) {
                messages_popup(app.messages.dashboard.watchlist.create_symbols_watchlist_symbol.success);
            } else if (response.create_symbols_watchlist_symbol_limit_basic) {
                messages_popup(app.messages.dashboard.watchlist.create_symbols_watchlist_symbol.limit_basic);
            } else if (response.create_symbols_watchlist_symbol_limit) {
                messages_popup(app.messages.dashboard.watchlist.create_symbols_watchlist_symbol.limit);
            } else {
                messages_popup(app.messages.dashboard.watchlist.create_symbols_watchlist_symbol.error);
            }
        } else if (response.form_name == "delete_watchlist_symbol_form") {
            if (response.delete_symbols_watchlist_symbol) {
                messages_popup(app.messages.dashboard.watchlist.delete_symbols_watchlist_symbol.success);
            } else {
                messages_popup(app.messages.dashboard.watchlist.delete_symbols_watchlist_symbol.error);
            }
            // Notify
        } else if (response.form_name == "create_symbols_watchlist_notify_symbol_form") {
            if (response.create_symbols_watchlist_notify_symbol == "watchlist") {
                messages_popup(app.messages.dashboard.watchlist.create_symbols_watchlist_notify_symbol.watchlist);
            } else if (response.create_symbols_watchlist_notify_symbol) {
                messages_popup(app.messages.dashboard.watchlist.create_symbols_watchlist_notify_symbol.success);
            } else {
                messages_popup(app.messages.dashboard.watchlist.create_symbols_watchlist_notify_symbol.error);
            }
        } else if (response.form_name == "delete_symbols_watchlist_notify_symbol_form") {
            if (response.delete_symbols_watchlist_notify_symbol) {
                messages_popup(app.messages.dashboard.watchlist.delete_symbols_watchlist_notify_symbol.success);
            } else {
                messages_popup(app.messages.dashboard.watchlist.delete_symbols_watchlist_notify_symbol.error);
            }
            // News
        } else if (response.form_name == "read_news_form") {
            if (!response.news_found) {
                // On init pass message
                localStorage.message = app.messages.news.not_found;
            }
            // Help
            // Contact
        } else if (response.form_name == "contact_form") {
            if (response.mail_sent) {
                messages_popup(app.messages.help.contact.success);

                // Reset contact form
                $("form[name=contact_form] [name=subject]").val("select").change();
                $("form[name=contact_form] [name=message]").val('');
            } else {
                messages_popup(app.messages.help.contact.error);
            }
            // Notifications
        } else if (response.form_name == "delete_notifications_form") {
            if (response.delete_notifications) {
                messages_popup(app.messages.notifications.delete_notifications.success);
            } else {
                messages_popup(app.messages.notifications.delete_notifications.error);
            }
        } else if (response.form_name == "delete_notification_form") {
            if (response.delete_notification) {
                messages_popup(app.messages.notifications.delete_notification.success);
            } else {
                messages_popup(app.messages.notifications.delete_notification.error);
            }
            // Symbol
        } else if (response.form_name == "update_symbol_chart_settings_form") {
            if (response.update_symbol_chart_settings) {
                messages_popup(app.messages.symbol.symbol_chart_settings.update_symbol_chart_settings_success);
            } else if (response.reset_symbol_chart_settings) {
                messages_popup(app.messages.symbol.symbol_chart_settings.reset_symbol_chart_settings_success);
            } else {
                messages_popup(app.messages.symbol.symbol_chart_settings.error);
            }
            // Updates
        } else if (response.form_name == "read_updates_form") {
            if (!response.updates_found) {
                messages_popup(app.messages.updates.read_updates.not_found);
            }
            // User
            // Blocked
        } else if (response.form_name == "create_user_blocked_form") {
            if (response.create_user_blocked) {
                messages_popup(app.messages.user.create_user_blocked.success.replace("@username", app.user_username_message));
            } else {
                messages_popup(app.messages.user.create_user_blocked.error.replace("@username", app.user_username_message));
            }
            // Follow
        } else if (response.form_name == "create_user_follow_form") {
            if (response.user_blocked) {
                messages_popup(app.messages.user.blocked.replace("@username", app.user_username_message));
            } else if (response.user_private_mode) {
                messages_popup(app.messages.user.private_mode.replace("@username", app.user_username_message));
            } else if (response.create_user_follow == "muted") {
                messages_popup(app.messages.user.create_user_follow.muted.replace("@username", app.user_username_message));
            } else if (response.create_user_follow) {
                messages_popup(app.messages.user.create_user_follow.success.replace("@username", app.user_username_message));
            } else {
                messages_popup(app.messages.user.create_user_follow.error.replace("@username", app.user_username_message));
            }
            // Muted
        } else if (response.form_name == "create_user_muted_form") {
            if (response.create_user_muted) {
                messages_popup(app.messages.user.create_user_muted.success.replace("@username", app.user_username_message));
            } else {
                messages_popup(app.messages.user.create_user_muted.error.replace("@username", app.user_username_message));
            }
            // Notify
        } else if (response.form_name == "create_user_notify_form") {
            if (response.create_user_notify == "follow") {
                messages_popup(app.messages.user.create_user_notify.follow.replace("@username", app.user_username_message));
            } else if (response.create_user_notify == "muted") {
                messages_popup(app.messages.user.create_user_notify.muted.replace("@username", app.user_username_message));
            } else if (response.create_user_notify) {
                messages_popup(app.messages.user.create_user_notify.success.replace("@username", app.user_username_message));
            } else {
                messages_popup(app.messages.user.create_user_notify.error.replace("@username", app.user_username_message));
            }
            // Reported
        } else if (response.form_name == "create_user_reported_form") {
            if (response.create_user_reported_already) {
                messages_popup(app.messages.user.create_user_reported.already.replace("@username", app.user_username_message));
            } else if (response.create_user_reported) {
                messages_popup(app.messages.user.create_user_reported.success.replace("@username", app.user_username_message));
            } else {
                messages_popup(app.messages.user.create_user_reported.error.replace("@username", app.user_username_message));
            }
            // Blocked
        } else if (response.form_name == "delete_user_blocked_form") {
            if (response.delete_user_blocked) {
                messages_popup(app.messages.user.delete_user_blocked.success.replace("@username", app.user_username_message));
            } else {
                messages_popup(app.messages.user.delete_user_blocked.error.replace("@username", app.user_username_message));
            }
            // Follow
        } else if (response.form_name == "delete_user_follow_form") {
            if (response.delete_user_follow) {
                messages_popup(app.messages.user.delete_user_follow.success.replace("@username", app.user_username_message));
            } else {
                messages_popup(app.messages.user.delete_user_follow.error.replace("@username", app.user_username_message));
            }
            // Follower
        } else if (response.form_name == "delete_user_follower_form") {
            if (response.delete_user_follower) {
                messages_popup(app.messages.user.delete_user_follower.success.replace("@username", app.user_username_message));
            } else {
                messages_popup(app.messages.user.delete_user_follower.error.replace("@username", app.user_username_message));
            }
            // Muted
        } else if (response.form_name == "delete_user_muted_form") {
            if (response.delete_user_muted) {
                messages_popup(app.messages.user.delete_user_muted.success.replace("@username", app.user_username_message));
            } else {
                messages_popup(app.messages.user.delete_user_muted.error.replace("@username", app.user_username_message));
            }
            // Notify
        } else if (response.form_name == "delete_user_notify_form") {
            if (response.delete_user_notify) {
                messages_popup(app.messages.user.delete_user_notify.success.replace("@username", app.user_username_message));
            } else {
                messages_popup(app.messages.user.delete_user_notify.error.replace("@username", app.user_username_message));
            }
        } else if (response.form_name == "read_user_form") {
            if (response.user_private_mode) {
                messages_popup(app.messages.user.private_mode.replace("@username", app.user_username));
            } else if (!response.user_found) {
                // On init pass message
                localStorage.message = app.messages.user.not_found.replace("@username", app.user_username);
            }
        } else if (response.form_name == "read_user_plays_statistics_form") {
            if (response.user_plays_statistics_not_found) {
                messages_popup(app.messages.user.statistics.not_found);
            } else if (!response.user_plays_statistics_chart) {
                messages_popup(app.messages.user.statistics.error);
            }
        }
    } catch (e) {
        // console.error(e);
    }
}