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
        $(".comments .scroll").css("height", $(".gallery .slider").css("height"));
        // $("#timepicker").timepicker({
        //     template: false,
        //     minuteStep: 5,
        //     showSeconds: false,
        //     showMeridian: false
        // });
    }

    $(".scroll").each(function (index) {
        new SimpleBar($(".scroll")[index], {
            autoHide: false
        });
    })

    $(window).resize(function () {
        $(".actors .scroll").css("height", $(".description .text").css("height"));
        $(".comments .scroll").css("height", $(".gallery .slider").css("height"));
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