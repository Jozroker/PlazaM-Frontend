$(document).ready(function () {
    // let hallSelectHidden = true;
    // let cinemaSelectHidden = true;
    // let dateFromHidden = true;
    // let dateToHidden = true;
    // let scheduleCreationHidden = true;
    //
    // let hallSelectAnimate = false;
    // let cinemaSelectAnimate = false;
    // let scheduleCreationAnimate = false;
    // let dateFromAnimate = false;
    // let dateToAnimate = false;

    let nextClickedElement = $();
    let calendarDateClick = false;
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October",
        "November", "December"];
    let stringDate = "";
    let currentScrollPosition;

    // let priceLoop = false;
    // let loop;
    // let speed = 200;

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

        $("#schedule-creation").load("schedule-creation.html #schedule-creation > div", function () {
            $.getScript("../js/calendar.js");
            $.getScript("../js/schedule-creation.js");
        });
        $("#footer-container").load("footer.html #footer", function () {
            $.getScript("../js/footer.js");
        });
        $("#header-container").load("header.html #header", function () {
            $.getScript("../js/header.js");
        });
        // $("#schedule").load("movie_schedule.html .movie-schedule", function () {
        $.getScript("../js/movie_schedule.js");
        // })
    }

    $("#movie .scroll").each(function (index) {
        new SimpleBar($("#movie .scroll")[index], {
            autoHide: false
        });
    })

    $(window).resize(function () {
        setTimeout(function () {
            $(".actors .scroll").css("height", $(".description .text").css("height"));
            $(".comments .scroll").css("height", $(".gallery .slider").css("height"));
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

    $(".button.time-button .change-schedule").click(function () {
        if ($(this).attr("action") == "create") {
            $("#schedule-creation .title").first().text("Schedule creation");
        } else {
            if ($(".button.time-button .title .value").text() == $(".button.time-button .time").first().text()) {
                $(".button.time-button .title .value").css("color", "#AF2341");
            } else {
                if ($(".button.hall-button .title .value").text() == $(".button.hall-button .hall").first().text()) {
                    $(".button.hall-button .title .value").css("color", "#AF2341");
                } else {
                    $("#schedule-creation .title").first().text("Schedule modification");
                    let time = "" + $(".button.time-button .title .value").text().slice(0, 2) + ":" +
                        $(".button.time-button .title .value").text().slice(-2);
                    $("#timepicker").val(time);
                    let hall = $(".button.hall-button .title .value").text();
                    $(".hall-select .list").find(".selected > div").first().text(hall);
                }
            }
        }
        if (scheduleCreationHidden) {
            $("#add-schedule").click();
        }
    })

    $(".seance .change").click(function () {
        $("#schedule-creation .title").first().text("Schedule modification");
        let seanceTime = $(this).parents(".seance").first().find(".value").text();
        let time = seanceTime.slice(0, seanceTime.indexOf("h")) + ":" + seanceTime.slice(seanceTime.indexOf("h") + 2,
            -1);
        if (time[1] == ":") {
            time = "0" + time;
        }
        if (time[time.indexOf(":") + 1] == "0") {
            time += "0";
        }
        $("#timepicker").val(time);
        let hall = $(this).parents(".hall").first().find(".name").text();
        $(".hall-select .list").find(".selected > div").first().text(hall);
        if (scheduleCreationHidden) {
            $("#add-schedule").click();
        }
    })


})