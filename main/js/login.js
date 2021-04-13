$(document).ready(function () {
    let panelAnimate = false;
    let loginHidden = false;
    let registerHidden = true;

    $(".registration").click(function () {
        if (!panelAnimate) {
            if (registerHidden) {
                panelAnimate = true;

                $("#sign-in-panel").css("overflow-y", "hidden").animate({
                    "left": "-100vw"
                }, 1000, "easeInOutQuint", function () {
                    loginHidden = true;
                    registerHidden = false;
                    panelAnimate = false;
                    $(this).css("overflow-y", "auto");
                });

                $("#registration-panel").css("overflow-y", "hidden").animate({
                    "left": "0"
                }, 1000, "easeInOutQuint", function () {
                    $(this).css("overflow-y", "auto");
                });
            }
        }
    })

    $(".sign-in").click(function () {
        if (!panelAnimate) {
            if (loginHidden) {
                panelAnimate = true;

                $("#sign-in-panel").css("overflow-y", "hidden").animate({
                    "left": "0"
                }, 1000, "easeInOutQuint", function () {
                    loginHidden = false;
                    registerHidden = true;
                    panelAnimate = false;
                    $(this).css("overflow-y", "auto");
                });

                $("#registration-panel").css("overflow-y", "hidden").animate({
                    "left": "100vw"
                }, 1000, "easeInOutQuint", function () {
                    $(this).css("overflow-y", "auto");
                });
            }
        }
    })
})