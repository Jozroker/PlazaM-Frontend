$(document).ready(function () {
    let panelAnimate = false;
    let loginHidden = false;
    let registerHidden = true;

    $(".registration").click(function () {
        if (!panelAnimate) {
            if (registerHidden) {
                panelAnimate = true;

                $("#sign-in-panel").animate({
                    "left": "-100vw"
                }, 1000, "easeInOutQuint", function () {
                    loginHidden = true;
                    registerHidden = false;
                    panelAnimate = false;
                });

                $("#registration-panel").animate({
                    "left": "0"
                }, 1000, "easeInOutQuint");
            }
        }
    })

    $(".sign-in").click(function () {
        if (!panelAnimate) {
            if (loginHidden) {
                panelAnimate = true;

                $("#sign-in-panel").animate({
                    "left": "0"
                }, 1000, "easeInOutQuint", function () {
                    loginHidden = false;
                    registerHidden = true;
                    panelAnimate = false;
                });

                $("#registration-panel").animate({
                    "left": "100vw"
                }, 1000, "easeInOutQuint");
            }
        }
    })
})