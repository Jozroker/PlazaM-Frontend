$(document).ready(function () {
    let duration = parseInt($($(".duration")[0]).text().trim().slice(0, $($(".duration")[0])
        .text().trim().indexOf(" ")));
    let calendarDateClick = false;
    let windowResize = false;
    let scheduleAnimateFirst = false;
    let scheduleAnimateSecond = false;
    let calendarHidden = true;
    let hallsHidden = true;
    let timesHidden = true;
    let calendarAnimate = false;
    let hallsAnimate = false;
    let timesAnimate = false;
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October",
        "November", "December"];
    let currentDate = new Date();
    let stringDate = "" + (currentDate.getDate() / 10 >= 1 ? currentDate.getDate() : "0" + currentDate.getDate());
    stringDate += "." + ((currentDate.getMonth() + 1) / 10 >= 1 ? currentDate.getMonth() + 1 : "0" + (currentDate.getMonth() + 1));
    stringDate += "." + (currentDate.getFullYear());


    {
        let rating = parseFloat($($(".rate-number")[0]).text());
        let full = true;
        for (let i = 0; i < 5; i++) {
            if (full) {
                if (rating >= i + 1) {
                    $($(".star")[i]).addClass("full");
                } else {
                    full = false;
                    if (rating % i + 1 === 0) {
                        continue;
                    }
                    $($(".star")[i]).addClass("other");
                    rating = rating % 1;
                }
            } else {
                $($(".star")[i]).addClass("empty");
            }
        }
        let width = 13 * rating;
        document.styleSheets[0].addRule(".other::before", "width: " + width + "px");
        $(".movie-schedule").css("display", "block");
        $(".button.date .value").text(stringDate);
        calculateSeancesPosition(duration);
    }

    $(document).mousemove(function () {
        if (!$(".button.date").is(":hover") && !calendarHidden) {
            $(".button.date .title").click();
        }

        if (!$(".button.hall-button").is(":hover") && !hallsHidden) {
            $(".button.hall-button .title").click();
        }

        if (!$(".button.time-button").is(":hover") && !timesHidden) {
            $(".button.time-button .title").click();
        }
    })

    $(".scroll").each(function (index) {
        new SimpleBar($(".scroll")[index], {
            autoHide: false
        });
    })

    $(window).resize(function () {
        window.resizeTo(1000, 1080);
    })

    $(window).on("resize", function () {
        $(".seance").css("display", "none");

        clearTimeout(windowResize);
        windowResize = setTimeout(function () {

            windowResize = false;
            $(window).trigger('resizeend');

        }, 100);
    }).on("resizeend", function () {
        calculateSeancesPosition(duration);
        $(".seance").css("display", "block");
    })

    $(".hall, .time").click(function () {
        $($(this).parents(".button")[0]).find(".value").text($(this).text().trim());
        $($(this).parents(".button")[0]).find(".title").click();
    })

    $(".week-day").click(function () {
        if (!$(this).hasClass("selected")) {
            let underlinePosition = ($(".week-day").index($(this)) * 100) + 10;
            $($(".week-day.selected")[0]).removeClass("selected");
            $(this).addClass("selected");
            let underline = $($(this).parents(".week")[0]).find(".underline");

            if (parseInt($(underline).css("width").slice(0, -2)) === 0) {
                $(underline).css("width", "80px");
            }
            $(underline).css("left", underlinePosition + "px");

            let date = parseInt($(this).find(".date").text().trim());
            let month = months.indexOf($(this).find(".month").text().trim());
            stringDate = "" + (date / 10 >= 1 ? date : "0" + date);
            stringDate += "." + ((month + 1) / 10 >= 1 ? month + 1 : "0" + (month + 1));
            stringDate += "." + (currentDate.getFullYear());
            $(this).parents(".week").find(".button.date .value").text(stringDate);
            let parent = $($(this).parents(".movie-schedule")[0]);
            animateSchedule(parent);
        }
    });

    $(document).on("click", ".calendar td", function () {
        if (!calendarHidden) {
            calendarDateClick = true;
            let newDate = new Date();
            newDate.setFullYear(parseInt($(".calendar .header-label").text().trim().slice(-4)));
            newDate.setMonth(parseInt(months.indexOf($(".calendar .header-label").text().trim().slice(0, -5))));
            newDate.setDate(parseInt($(this).text().trim()));

            stringDate = "" + (newDate.getDate() / 10 >= 1 ? newDate.getDate() : "0" + newDate.getDate());
            stringDate += "." + ((newDate.getMonth() + 1) / 10 >= 1 ? newDate.getMonth() + 1 : "0" + (newDate.getMonth() + 1));
            stringDate += "." + (newDate.getFullYear());

            $($(this).parents(".week")[0]).find(".underline").css("width", "0px");
            $($(this).parents(".week")[0]).find(".week-day").removeClass("selected").each(function () {
                //todo year check when week-day element will has year information
                if (months.indexOf($(this).find(".month").text().trim()) === newDate.getMonth() &&
                    parseInt($(this).find(".date").text().trim()) === newDate.getDate()) {
                    $(this).addClass("selected");
                    let index = $($(this).parents(".week")[0]).find(".week-day").index($(this));
                    $($(this).parents(".week")[0]).find(".underline").css({
                        "width": "80px",
                        "left": (10 + 100 * index) + "px"
                    });
                }
            })

            $(".button.date .value").text(stringDate);
            $(".button.date .title").click();
        }
    })

    $(".button.date .title").click(function () {
        if (!calendarAnimate) {
            calendarAnimate = true;
            let parent = $($(this).parent()[0]);
            if (calendarHidden) {
                let selectedDate = new Date();
                selectedDate.setFullYear(parseInt($(parent).find(".value").text().trim().slice(-4)));
                selectedDate.setMonth(parseInt($(parent).find(".value").text().trim().slice(3, 6)) - 1);
                selectedDate.setDate(parseInt($(parent).find(".value").text().trim().slice(0, 2)));

                if ($(parent).find(".content").html() === "") {
                    $(parent).find(".content").each(function () {
                        $(this).calendar(selectedDate);
                    });
                } else {
                    $($(".calendar td.selected")[0]).removeClass("selected");
                    $(".calendar td").each(function () {
                        if (parseInt($(this).text().trim()) === selectedDate.getDate()) {
                            $(this).addClass("selected");
                        }
                    })
                }

                $(parent).find(".triangle").css("transform", "rotate(0deg)");
                $(parent).animate({
                    "width": "284px"
                }, 300, "easeInOutQuint", function () {
                    $(parent).animate({
                        "height": "198px"
                    }, 300, "easeInOutQuint", function () {
                        calendarHidden = false;
                        calendarAnimate = false;
                    });
                });
            } else {
                let delay = calendarDateClick ? 200 : 0;
                $(parent).delay(delay).find(".triangle").css("transform", "rotate(180deg)");
                $(parent).delay(delay).animate({
                    "height": "34px"
                }, 300, "easeInOutQuint", function () {
                    $(parent).animate({
                        "width": "172px"
                    }, 300, "easeInOutQuint", function () {
                        calendarHidden = true;
                        calendarAnimate = false;
                        calendarDateClick = false;
                    });
                });
            }
        }
    })

    $(".button.hall-button .title").click(function () {
        if (!hallsAnimate) {
            hallsAnimate = true;
            if (hallsHidden) {
                $($(this).parent()[0]).find(".triangle").css("transform", "rotate(0deg)");
                $($(this).parent()[0]).animate({
                    "height": "138px"
                }, 300, "easeInOutQuint", function () {
                    hallsHidden = false;
                    hallsAnimate = false;
                });
            } else {
                $($(this).parent()[0]).find(".triangle").css("transform", "rotate(180deg)");
                $($(this).parent()[0]).animate({
                    "height": "34px"
                }, 300, "easeInOutQuint", function () {
                    hallsHidden = true;
                    hallsAnimate = false;
                });
            }
        }
    })

    $(".button.time-button .title").click(function () {
        if (!timesAnimate) {
            timesAnimate = true;
            if (timesHidden) {
                $($(this).parent()[0]).find(".triangle").css("transform", "rotate(0deg)");
                $($(this).parent()[0]).animate({
                    "height": "138px"
                }, 300, "easeInOutQuint", function () {
                    timesHidden = false;
                    timesAnimate = false;
                });
            } else {
                $($(this).parent()[0]).find(".triangle").css("transform", "rotate(180deg)");
                $($(this).parent()[0]).animate({
                    "height": "34px"
                }, 300, "easeInOutQuint", function () {
                    timesHidden = true;
                    timesAnimate = false;
                });
            }
        }
    })

    function calculateSeancesPosition(durationInMinutes) {
        $(".seance").each(function () {
            let spaceBetweenLines = parseFloat($($(".line")[1]).css("margin-left").slice(0, -2));
            let beginInMinutes = (parseInt($(this).text().trim().slice(0, $(this).text().trim().indexOf("h"))) * 60) +
                parseInt($(this).text().trim().slice($(this).text().lastIndexOf(" ") + 1, $(this).text()
                    .trim().indexOf("m")));
            let beginRemainder = (spaceBetweenLines * (beginInMinutes % 30)) / 30;
            let durationRemainder = (spaceBetweenLines * (durationInMinutes % 30)) / 30;

            let width = Math.floor(Math.ceil(durationInMinutes / 30) / 2) +
                (Math.floor(durationInMinutes / 30) * spaceBetweenLines) + durationRemainder;
            let leftPosition = (Math.ceil(beginInMinutes / 60) * 2) + Math.floor(Math.ceil(beginInMinutes / 30) / 2) +
                (Math.floor(beginInMinutes / 30) * spaceBetweenLines) + beginRemainder;

            let value = Math.floor(((beginInMinutes % 60) + durationInMinutes) / 60);
            if (((beginInMinutes % 60) + durationInMinutes) % 60 === 0) {
                width += (value - 1) * 2;
            } else {
                width += value * 2;
            }

            //todo check this function
            if (scheduleAnimateFirst) {
                $(this).attr("positionLeft", leftPosition + "px");
            } else {
                $(this).css("left", leftPosition + "px");
            }
            $(this).css("width", width + "px");
        })
    }

    function animateSchedule(parent) {
        if (!scheduleAnimateFirst && !scheduleAnimateSecond) {
            scheduleAnimateFirst = true;
            let wait = 0;
            if ($(".hall").length !== 0) {
                wait = $(parent).find(".seance").length * 100 + 200;

                $(parent).find(".schedule .halls .line-between").delay(200).get().reverse().forEach(function (elem, index) {
                    let waiting = index * 400;
                    setTimeout(function () {
                        $(elem).css("opacity", "0");
                    }, waiting);
                });

                $(parent).find(".seance").get().reverse().forEach(function (elem, index) {
                    let waiting = index * 100;
                    $(elem).attr("positionLeft", $(elem).css("left"));
                    $(elem).removeClass("hovered");

                    setTimeout(function () {
                        let positionToHide = window.screen.availWidth - $(elem).offset().left +
                            parseFloat($(elem).css("left").slice(0, -2));

                        $(elem).animate({
                            "left": positionToHide + "px"
                        }, 300, "easeInOutQuint");
                    }, waiting);
                });
            }

            setTimeout(function () {
                $(parent).find(".seance").removeClass("select");
                $(parent).find(".halls").css("overflow", "hidden");
                if ($(".hall").length !== 0) {
                    wait = $(parent).find(".hall").length * 100 + 200;

                    $(parent).find(".hall").get().forEach(function (elem, index) {
                        let waiting = index * 100;
                        let topPosition = $(elem).css("height").slice(0, -2) * (-1) * (index + 1) + index;

                        setTimeout(function () {
                            $(elem).animate({
                                "top": topPosition + "px"
                            }, 300, "easeInOutQuint");
                        }, waiting);
                    });
                }

                setTimeout(function () {

                    //todo innerHtml newSchedule to oldSchedule
                    scheduleAnimateFirst = false;
                    scheduleAnimateSecond = true;
                    let firstSelectedDate = new Date();
                    firstSelectedDate.setMonth(months.indexOf($($(parent).find(".week-day.selected")[0])
                        .find(".month").text().trim()));
                    firstSelectedDate.setDate(parseInt($($(parent).find(".week-day.selected")[0])
                        .find(".date").text().trim()));

                    wait = $(parent).find(".hall").length * 100 + 200;

                    $(parent).find(".hall").get().reverse().forEach(function (elem, index) {
                        let waiting = index * 100;

                        setTimeout(function () {
                            $(elem).animate({
                                "top": "0"
                            }, 300, "easeInOutQuint");
                        }, waiting);
                    });

                    setTimeout(function () {
                        wait = $(parent).find(".seance").length * 100 + 200;
                        $(parent).find(".halls").css("overflow", "");

                        $(parent).find(".schedule .halls .line-between").delay(200).get().forEach(function (elem, index) {
                            let waiting = index * 400;
                            setTimeout(function () {
                                $(elem).css("opacity", "1");
                            }, waiting);
                        });

                        $(parent).find(".seance").get().forEach(function (elem, index) {
                            let waiting = index * 100;
                            let positionLeft = $(elem).attr("positionLeft").slice(0, -2);
                            $(elem).removeAttr("positionLeft");
                            firstSelectedDate.setHours(parseInt($(elem).text().slice(0, $(elem).text().indexOf("h"))));
                            firstSelectedDate.setMinutes(parseInt($(elem).text().slice($(elem).text()
                                .lastIndexOf(" ") + 1, -1)));
                            if (firstSelectedDate > currentDate) {
                                $(elem).addClass("hovered").addClass("select");
                            }

                            setTimeout(function () {

                                $(elem).animate({
                                    "left": positionLeft + "px"
                                }, 300, "easeInOutQuint");
                            }, waiting);
                        });

                        setTimeout(function () {
                            scheduleAnimateSecond = false;
                            let secondSelectedDate = parseInt($($(parent).find(".week-day.selected")[0])
                                .find(".date").text().trim());

                            if (firstSelectedDate.getDate() !== secondSelectedDate) {
                                animateSchedule(parent);
                            }
                        }, wait);
                    }, wait);
                }, wait);
            }, wait);
        }
    }
})