$(document).ready(function () {

    let locationAnimate = false;
    let locationHidden = true;

    $(".scroll").each(function (index) {
        new SimpleBar($(".scroll")[index], {
            autoHide: false
        });
        $(this).css("overflow-x", "hidden");
    });

    $(".country").click(function () {
        if (!locationAnimate) {
            locationAnimate = true;
            let country = $(this).parent("li").attr("class");
            let wait = $("#location li").length * 100 + 100;
            let element;
            let iter = 0;

            if (locationHidden) {

                $("#location li").get().reverse().forEach(function (elem) {
                    if (!$(elem).hasClass(country)) {
                        let waiting = 100 * iter++;
                        $(elem).delay(waiting).hide(200);
                    } else {
                        element = $(elem);
                    }
                });

                $(element).find(".triangle").css("transform", "rotate(0deg)");

                setTimeout(function () {

                    $(element).animate({
                        "height": "64px"
                    }, 500, "linear", function () {
                        locationHidden = false;
                        locationAnimate = false;
                        iter = 0;
                    })
                }, wait);
            } else {
                $("#location li").each(function () {
                    if ($(this).is(":visible")) {
                        element = $(this);
                    }
                });

                $(element).find(".triangle").css("transform", "rotate(180deg)");

                $(element).animate({
                    "height": "20px"
                }, 500, "linear", function () {
                    $("#location li").each(function () {
                        if (!$(this).hasClass(country)) {
                            let waiting = 100 * iter++;
                            $(this).delay(waiting).show(200);
                        }
                    });

                    setTimeout(function () {
                        locationHidden = true;
                        locationAnimate = false;
                        iter = 0;
                    }, wait);
                })
            }
        }
    })

})