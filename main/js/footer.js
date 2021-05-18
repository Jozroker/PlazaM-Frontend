$(document).ready(function () {

    let footerLocationAnimate = false;
    let footerLocationHidden = true;

    $("#footer .scroll").each(function (index) {
        new SimpleBar($("#footer .scroll")[index], {
            autoHide: false
        });
        $(this).css("overflow-x", "hidden");
    });

    $(".country").click(function () {
        if (!footerLocationAnimate) {
            footerLocationAnimate = true;
            let country = $(this).parent("li").attr("class");
            let wait = $("#footer-location li").length * 100 + 100;
            let element;
            let iter = 0;

            if (footerLocationHidden) {

                $("#footer-location li").get().reverse().forEach(function (elem) {
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
                        footerLocationHidden = false;
                        footerLocationAnimate = false;
                        iter = 0;
                    })
                }, wait);
            } else {
                $("#footer-location li").each(function () {
                    if ($(this).is(":visible")) {
                        element = $(this);
                    }
                });

                $(element).find(".triangle").css("transform", "rotate(180deg)");

                $(element).animate({
                    "height": "20px"
                }, 500, "linear", function () {
                    $("#footer-location li").each(function () {
                        if (!$(this).hasClass(country)) {
                            let waiting = 100 * iter++;
                            $(this).delay(waiting).show(200);
                        }
                    });

                    setTimeout(function () {
                        footerLocationHidden = true;
                        footerLocationAnimate = false;
                        iter = 0;
                    }, wait);
                })
            }
        }
    })

})