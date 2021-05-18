$(document).ready(function () {
    {
        $("#pictures").slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            // autoplay: true,
            autoplaySpeed: 0,
            speed: 300,
            pauseOnHover: false,
            cssEase: 'ease-in-out',
            arrows: false,
            draggable: false,
            touchMove: false,
            swipe: false,
            accessibility: false
        })

        $(".actors .scroll").css("height", $(".description .text").css("height"));
        $(".comments .scroll").first().css("height", $(".gallery .slider").css("height"));
        $("#schedule-creation").load("schedule-creation.html #schedule-creation > div", function () {
            $.getScript("../js/schedule-creation.js");
            $.getScript("../js/calendar.js");
        });
        $("#footer-container").load("footer.html #footer", function () {
            $.getScript("../js/footer.js");
        });
        $("#header-container").load("header.html #header", function () {
            $.getScript("../js/header.js");
        });
    }

    $("#movie .scroll").each(function (index) {
        new SimpleBar($("#movie .scroll")[index], {
            autoHide: false
        });
    })

    $("textarea").on("input", function () {
        $(this).css("height", "auto").delay(10).css("height",
            $(this).get(0).scrollHeight + "px");
    })

    $(window).resize(function () {
        setTimeout(function () {
            $(".actors .scroll").css("height", $(".description .text").css("height"));
            $(".comments .scroll").first().css("height", $(".gallery .slider").css("height"));
        }, 100);
    })

    $(".like").click(function () {
        if ($(this).hasClass("selected")) {
            $(this).removeClass("selected");
        } else {
            $(this).addClass("selected");
        }
    })

    $("#info .star").click(function () {
        $("#info .user-rating").addClass("selected");
    })

    $("#info .star").mouseover(function () {
        if (!$("#info .user-rating").hasClass("selected")) {
            $("#info .star").removeClass("full");
            for (let i = 0; i <= $("#info .star").index($(this)); i++) {
                $($("#info .star")[i]).addClass("full");
            }
        }
    })

    $("#info .user-rating").mouseleave(function () {
        if (!$("#info .user-rating").hasClass("selected")) {
            $("#info .star").removeClass("full");
        }
    })

    $(".gallery .left-arrow").click(function () {
        $("#pictures").slick("slickPrev");
    })

    $(".gallery .right-arrow").click(function () {
        $("#pictures").slick("slickNext");
    })

    $(".add-comment").click(function () {
        if ($(".comment-form").css("bottom") == "-164px") {
            $(".comment-form").css("bottom", "0");
        } else {
            $(".comment-form").css("bottom", "-164px");
        }
    })
})