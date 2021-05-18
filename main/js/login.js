$(document).ready(function () {
    let panelAnimate = false;
    let loginHidden = false;
    let registerHidden = true;
    let signInState = true;
    let registrationState = true;

    {
        $("#header-container").load("header.html #header", function () {
            $.getScript("../js/header.js");
        });
    }

    $("#email-or-username, #password-login, #password-register, #password-confirm, #username, #email").focusin(function () {
        $(this).parents(".field").first().prev().find("span:first-child").css("color", "#D7D7D7");
        $(this).parents(".field").first().prev().find("span:not(:first-child)").css("display", "none");
    })

    $(".sign-in-btn").click(function () {
        signInState = true;
        if ($("#email-or-username").val() == "") {
            signInState = false;
            $("#sign-in").find(".email-username .title span:first-child").css("color", "#AF2341");
            $("#sign-in").find(".email-username .title .empty").css("display", "inline");
        }
        if ($("#password-login").val() == "") {
            signInState = false;
            $("#sign-in").find(".password .title span:first-child").css("color", "#AF2341");
            $("#sign-in").find(".password .title .empty").css("display", "inline");
        }
        if (signInState) {
            //todo operation start
        }
    })

    $(".registration-btn").click(function () {
        let emailRegex = new RegExp($("#email").attr("regex"));
        let passwordRegex = new RegExp($("#password-register").attr("regex"));
        registrationState = true;
        if ($("#username").val() == "") {
            registrationState = false;
            $("#registration").find(".username .title span:first-child").css("color", "#AF2341");
            $("#registration").find(".username .title .required").css("display", "inline");
        }
        if ($("#email").val() == "") {
            registrationState = false;
            $("#registration").find(".email .title span:first-child").css("color", "#AF2341");
            $("#registration").find(".email .title .required").css("display", "inline");
        } else if (!emailRegex.test($("#email").val())) {
            registrationState = false;
            $("#registration").find(".email .title span:first-child").css("color", "#AF2341");
            $("#registration").find(".email .title .not-email").css("display", "inline");
        }
        if ($("#password-register").val() == "") {
            registrationState = false;
            $("#registration").find(".password .title span:first-child").css("color", "#AF2341");
            $("#registration").find(".password .title .required").css("display", "inline");
        } else if (!passwordRegex.test($("#password-register").val())) {
            registrationState = false;
            $("#registration").find(".password .title span:first-child").css("color", "#AF2341");
            $("#registration").find(".password .title .weak").css("display", "inline");
        }
        if ($("#password-confirm").val() == "") {
            registrationState = false;
            $("#registration").find(".password-confirm .title span:first-child").css("color", "#AF2341");
            $("#registration").find(".password-confirm .title .required").css("display", "inline");
        } else if ($("#password-register").val() != $("#password-confirm").val()) {
            registrationState = false;
            $("#registration").find(".password-confirm .title span:first-child").css("color", "#AF2341");
            $("#registration").find(".password-confirm .title .not-confirmed").css("display", "inline");
        }
        if (registrationState) {
            //todo operation start
        }
    })

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