$(document).ready(function () {
    // let duration = parseInt($($(".duration")[0]).text().trim().slice(0, $($(".duration")[0])
    //     .text().trim().indexOf(" ")));
    let calendarDateClick = false;
    let windowResize = false;
    let calendarHidden = true;
    let hallsHidden = true;
    let timesHidden = true;

    let scheduleAnimateFirst = false;
    let scheduleAnimateSecond = false;
    let calendarAnimate = false;
    let hallsAnimate = false;
    let timesAnimate = false;
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October",
        "November", "December"];
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let currentDate = new Date();
    let stringDate = "" + (currentDate.getDate() / 10 >= 1 ? currentDate.getDate() : "0" + currentDate.getDate());
    stringDate += "." + ((currentDate.getMonth() + 1) / 10 >= 1 ? currentDate.getMonth() + 1 : "0" + (currentDate.getMonth() + 1));
    stringDate += "." + (currentDate.getFullYear());
    let currentScrollPosition, rating, full, lines, width, mapOfSeances;
    let durationInMinutes, spaceBetweenLines, durationRemainder, beginInMinutes, beginRemainder, seanceWidth,
        seanceAdditionalWidth, leftPosition;


    {
        mapOfSeances = new Map();
        mapOfSeances.set("3D", ["15:00", "23:50"]);
        mapOfSeances.set("4D", ["09:00", "00:50", "16:30"]);
        let last = new Date();
        last.setDate(30);

        // if (window.location.pathname == "/movie") {
        //     $(".schedule-container").each(function () {
        //         $(this).html(generateOneMovieSeance("movieId1", "posterImg", "G",
        //             "18.10.2009", "The USA", "ukrainian", 153, "Poll Anderson",
        //             last, mapOfSeances));
        //
        //         lines = "";
        //         for (let i = 0; i < 25; i++) {
        //             lines += '<div class="line hour-line"></div>';
        //             if (i < 24) {
        //                 lines += '<div class="line half-hour-line"></div>';
        //             }
        //         }
        //         $(this).find(".timeline .lines").first().html(lines);
        //         calculateSeancesPosition($(this));
        //
        //         $(this).find(".movie-schedule").css("display", "block");
        //         $(this).find(".button.date .value, #date-from .value, #date-to .value").text(stringDate);
        //     })
        // } else {
        //todo uncomment
        $(".schedule-container").each(function () {
            $(this).html(generateManyMovieSeances("movieId1", "imageData", "Avengers", "The First Part",
                "4.33", "PG-13", "8.9", 153, last, mapOfSeances));

            rating = parseFloat($($(this).find(".rate-number")[0]).text());
            full = true;
            lines = "";
            for (let i = 0; i < 5; i++) {
                if (full) {
                    if (rating >= i + 1) {
                        $($(this).find(".rate .star")[i]).addClass("full");
                    } else {
                        full = false;
                        if (rating % i + 1 === 0) {
                            continue;
                        }
                        $($(this).find(".rate .star")[i]).addClass("other");
                        rating = rating % 1;
                    }
                } else {
                    $($(this).find(".rate .star")[i]).addClass("empty");
                }
            }

            for (let i = 0; i < 25; i++) {
                lines += '<div class="line hour-line"></div>';
                if (i < 24) {
                    lines += '<div class="line half-hour-line"></div>';
                }
            }
            $(this).find(".timeline .lines").first().html(lines);
            calculateSeancesPosition($(this));

            width = 13 * rating;
            document.styleSheets[0].addRule(".other::before", "width: " + width + "px");
            $(this).find(".movie-schedule").css("display", "block");
            $(this).find(".button.date .value, #date-from .value, #date-to .value").text(stringDate);
        })
        // }

        //todo create js function for generate html fragment with attr duration
    }

    $(".movie-schedule .scroll").each(function (index) {
        // if ($(this).hasClass("comments-scroll")) {
        //     commentsScroll = new SimpleBar($(".movie-schedule .scroll")[index], {
        //         autoHide: false
        //     });
        //     // todo | if site links with comment id make autolink to comments section +
        //     // todo | commentsScroll.getScrollElement().scrollTop = $("#idFromGETQuery").position().top;
        // } else {
        new SimpleBar($(".movie-schedule .scroll")[index], {
            autoHide: false
        });
        // }
    })

    $(window).on("resize", function () {
        $(".seance").css("display", "none");

        clearTimeout(windowResize);
        windowResize = setTimeout(function () {

            windowResize = false;
            $(window).trigger('resizeend');

        }, 100);
    }).on("resizeend", function () {
        $(".schedule-container").each(function () {
            calculateSeancesPosition($(this));
            $(this).find(".seance").css("display", "block");
        });
    })

    $(document).on("click", ".hall, .time", function () {
        if ($(this).text() == $(".hall").first().text()) {
            $($(this).parents(".button")[0]).find(".change-schedule").text("create").attr("action", "create");
        } else {
            $($(this).parents(".button")[0]).find(".change-schedule").text("change").attr("action", "change");
        }
        if ($(this).hasClass("hall")) {
            generateTimeButton(mapOfSeances, $(this).text(), $(this).parents(".buttons").first());
        }
        $($(this).parents(".button")[0]).find(".value").text($(this).text().trim()).css("color", "#A3A3A3");
        $($(this).parents(".button")[0]).find(".title").click();
    })

    $(document).on("click", ".week-day", function () {
        if (!$(this).hasClass("selected")) {
            // let underlinePosition = ($(".week-day").index($(this)) * 100) + 10;
            let underlinePosition = ($(".week-day").index($(this)) * parseInt($(this).css("width").slice(0, -2))) + 10;
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

    $(document).on("click", ".button.date .calendar td", function () {
        if (!calendarHidden) {
            calendarDateClick = true;
            let newDate = new Date();
            newDate.setFullYear(parseInt($(".button.date .calendar .header-label").text().trim().slice(-4)));
            newDate.setMonth(parseInt(months.indexOf($(".button.date .calendar .header-label").text().trim().slice(0, -5))));
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

    $(document).on("click", ".button.date .title", function () {
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
                    $($(parent).find(".calendar td.selected")[0]).removeClass("selected");
                    $(parent).find(".calendar td").each(function () {
                        if (parseInt($(this).text().trim()) === selectedDate.getDate()) {
                            $(this).addClass("selected");
                        }
                    })
                }

                // $(parent).find(".triangle").css("transform", "rotate(0deg)");
                $(parent).find(".triangle").addClass("triangle-0");
                $(parent).animate({
                    "width": "284px"
                }, 300, "easeInOutQuint", function () {
                    $(parent).animate({
                        "height": "215px"
                    }, 300, "easeInOutQuint", function () {
                        calendarHidden = false;
                        calendarAnimate = false;
                    });
                });
            } else {
                let delay = calendarDateClick ? 200 : 0;
                // $(parent).delay(delay).find(".triangle").css("transform", "rotate(180deg)");
                $(parent).delay(delay).find(".triangle").removeClass("triangle-0");
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

    $(document).on("mouseleave", ".button.date", function () {
        if (!calendarHidden) {
            $(this).find(".title").click();
        }
    })

    $(document).on("click", ".button.hall-button .title", function () {
        if (!hallsAnimate) {
            hallsAnimate = true;
            if (hallsHidden) {
                // $($(this).parent()[0]).find(".triangle").css("transform", "rotate(0deg)");
                currentScrollPosition = window.scrollY;
                window.addEventListener("scroll", noScroll);
                $($(this).parent()[0]).find(".triangle").addClass("triangle-0");
                $($(this).parent()[0]).animate({
                    "height": "138px"
                }, 300, "easeInOutQuint", function () {
                    hallsHidden = false;
                    hallsAnimate = false;
                });
            } else {
                // $($(this).parent()[0]).find(".triangle").css("transform", "rotate(180deg)");
                window.removeEventListener("scroll", noScroll);
                $($(this).parent()[0]).find(".triangle").removeClass("triangle-0");
                $($(this).parent()[0]).animate({
                    "height": "34px"
                }, 300, "easeInOutQuint", function () {
                    hallsHidden = true;
                    hallsAnimate = false;
                });
            }
        }
    })

    $(document).on("mouseleave", ".button.hall-button", function () {
        if (!hallsHidden) {
            $(this).find(".title").click();
        }
    })

    $(document).on("click", ".button.time-button .title", function () {
        if (!timesAnimate) {
            timesAnimate = true;
            if (timesHidden) {
                // $($(this).parent()[0]).find(".triangle").css("transform", "rotate(0deg)");
                currentScrollPosition = window.scrollY;
                window.addEventListener("scroll", noScroll);
                $($(this).parent()[0]).find(".triangle").addClass("triangle-0");
                $($(this).parent()[0]).find(".content").animate({
                    "height": $(this).parent().find(".simplebar-content").css("height")
                    // "height": "104px"
                }, 300, "easeInOutQuint", function () {
                    timesHidden = false;
                    timesAnimate = false;
                });
            } else {
                // $($(this).parent()[0]).find(".triangle").css("transform", "rotate(180deg)");
                window.removeEventListener("scroll", noScroll);
                $($(this).parent()[0]).find(".triangle").removeClass("triangle-0");
                $($(this).parent()[0]).find(".content").animate({
                    // "height": "34px"
                    "height": "0"
                }, 300, "easeInOutQuint", function () {
                    timesHidden = true;
                    timesAnimate = false;
                });
            }
        }
    })

    $(document).on("mouseenter", ".button.time-button", function () {
        $(this).find(".change-schedule").animate({
            "right": "-76px"
        }, 300, "easeInOutQuint");
    })

    $(document).on("mouseleave", ".button.time-button", function () {
        $(this).find(".change-schedule").animate({
            "right": "0"
        }, 300, "easeInOutQuint");
        if (!timesHidden) {
            $(this).find(".title").click();
        }
    })

    $(document).on("mouseenter", ".seance", function () {
        $(this).find(".change").animate({
            "right": "-74px"
        }, 300, "easeInOutQuint");
        //todo fix change rolling
    })

    $(document).on("mouseleave", ".seance", function () {
        $(this).find(".change").animate({
            "right": "0"
        }, 300, "easeInOutQuint");
    })

    function calculateSeancesPosition(parent) {
        durationInMinutes = $(parent).find(".duration").first().text().trim().slice(0, $(this).find(".duration")
            .first().text().trim().indexOf(" "));
        //todo set hour and minute values to span because can be troubled with h/m - год/хв...
        spaceBetweenLines = parseFloat($($(parent).find(".movie-schedule .line")[1]).css("margin-left").slice(0, -2));
        durationRemainder = (spaceBetweenLines * (durationInMinutes % 30)) / 30;
        $(parent).find(".seance").each(function () {

            // let beginInMinutes = (parseInt($(this).text().trim().slice(0, $(this).text().trim().indexOf("h"))) * 60) +
            //     parseInt($(this).text().trim().slice($(this).text().lastIndexOf(" ") + 1, $(this).text()
            //         .trim().indexOf("m")));
            beginInMinutes = (parseInt($(this).find(".value").text().trim().slice(0, $(this).find(".value").text().trim().indexOf("h"))) * 60) +
                parseInt($(this).find(".value").text().trim().slice($(this).find(".value").text().indexOf("h") + 2, $(this).find(".value").text()
                    .trim().indexOf("m")));
            beginRemainder = (spaceBetweenLines * (beginInMinutes % 30)) / 30;

            seanceWidth = Math.floor(Math.ceil(durationInMinutes / 30) / 2) +
                (Math.floor(durationInMinutes / 30) * spaceBetweenLines) + durationRemainder;
            leftPosition = (Math.ceil(beginInMinutes / 60) * 2) + Math.floor(Math.ceil(beginInMinutes / 30) / 2) +
                (Math.floor(beginInMinutes / 30) * spaceBetweenLines) + beginRemainder;

            seanceAdditionalWidth = Math.floor(((parseFloat(beginInMinutes) % 60) + parseFloat(durationInMinutes)) / 60);
            if (((beginInMinutes % 60) + durationInMinutes) % 60 === 0) {
                seanceWidth += (seanceAdditionalWidth - 1) * 2;
            } else {
                seanceWidth += seanceAdditionalWidth * 2;
            }

            //todo check this function
            if (scheduleAnimateFirst) {
                $(this).attr("positionLeft", leftPosition + "px");
            } else {
                $(this).css("left", leftPosition + "px");
            }
            $(this).css("width", seanceWidth + "px");
        })
    }

    function animateSchedule(parent) {
        if (!scheduleAnimateFirst && !scheduleAnimateSecond) {
            scheduleAnimateFirst = true;
            let wait = 0;
            if ($(".hall-container").length !== 0) {
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
                    $(elem).find(".value").removeClass("hovered");

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
                $(parent).find(".seance .value").removeClass("select");
                $(parent).find(".halls").css("overflow", "hidden");
                if ($(".hall-container").length !== 0) {
                    wait = $(parent).find(".hall").length * 100 + 200;

                    $(parent).find(".hall-container").get().forEach(function (elem, index) {
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

                    generateHallButton(mapOfSeances, parent);

                    scheduleAnimateFirst = false;
                    scheduleAnimateSecond = true;
                    let firstSelectedDate = new Date();
                    firstSelectedDate.setMonth(months.indexOf($($(parent).find(".week-day.selected")[0])
                        .find(".month").text().trim()));
                    firstSelectedDate.setDate(parseInt($($(parent).find(".week-day.selected")[0])
                        .find(".date").text().trim()));

                    wait = $(parent).find(".hall-container").length * 100 + 200;

                    $(parent).find(".hall-container").get().reverse().forEach(function (elem, index) {
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
                                .indexOf("h") + 2, -1)));
                            if (firstSelectedDate > currentDate) {
                                $(elem).find(".value").addClass("hovered").addClass("select");
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

    function noScroll() {
        window.scrollTo(0, currentScrollPosition);
    }

    function generateWeekDays(lastSeanceDate) {
        lastSeanceDate.setDate(lastSeanceDate.getDate() + 1);
        let weekDays = "";
        let current = new Date();
        let counter = 0;
        for (current; current < lastSeanceDate; current.setDate(current.getDate() + 1)) {
            if (counter == 7) {
                break;
            }
            weekDays += '<div class="week-day ' + ((counter == 0) ? "selected" : "") + '"><div class="day">' +
                days[current.getDay()] + '</div><div class="date">' + current.getDate() + '</div>' +
                '<div class="month">' + months[current.getMonth()] + '</div></div>';
            counter++;
        }
        return weekDays;
    }

    function generateSeances(hallsMap, otherDate, parent) {
        //hallsMap = Map("3D": ["15:00", "09:00"], "4D": [])
        let halls = '<div class="halls">';
        let current = new Date();
        let counter = 0;
        hallsMap.forEach(function (value, key) {
            halls += '<div class="hall-container"><div class="name">' + key + '</div><div class="seances">';
            value.forEach(function (elem) {
                if (otherDate == null) {
                    let seanceDate = new Date();
                    seanceDate.setHours(elem.slice(0, 2));
                    seanceDate.setMinutes(elem.slice(3));
                    halls += ' <div class="seance"><div class="value ' + ((seanceDate > current) ? 'hovered select' : '') +
                        '">' + parseInt(elem.slice(0, 2)) + 'h ' + parseInt(elem.slice(3)) + 'm' +
                        '</div><div class="change">change</div></div>';
                } else {
                    otherDate.setHours(elem.slice(0, 2));
                    otherDate.setMinutes(elem.slice(3));
                    halls += ' <div class="seance"><div class="value ' + ((otherDate > current) ? 'hovered select' : '') +
                        '">' + parseInt(elem.slice(0, 2)) + 'h ' + parseInt(elem.slice(3)) + 'm' +
                        '</div><div class="change">change</div></div>';
                }
            });
            halls += '</div></div>';
            if (counter++ < hallsMap.size - 1) {
                halls += '<div class="line-between"></div>';
            }
        });
        halls += '</div>';
        if (otherDate == null) {
            return halls;
        } else {
            $(parent).find(".halls").first().replaceWith(halls);
        }
    }

    function generateHallButton(hallsMap, parent) {
        let button = '<div class="button hall-button"><div class="title"><div class="value">Hall</div><div class="triangle">' +
            '</div></div><div class="content scroll">';
        let counter = 0;
        hallsMap.forEach(function (value, key) {
            button += '<div class="hall">' + key + '</div>';
            if (counter++ < hallsMap.size - 1) {
                button += '<div class="line-between"></div>';
            }
        })
        button += '</div></div>';
        if (parent == null) {
            return button;
        } else {
            $(parent).find(".hall-button").replaceWith(button);
        }
    }

    function generateTimeButton(hallsMap, selectedHall, parent) {
        let button = '<div class="button time-button"><div class="title"><div class="value">Time</div><div class="triangle">' +
            '</div></div><div class="content scroll">';
        if (selectedHall != null) {
            hallsMap.get(selectedHall).forEach(function (elem) {
                button += '<div class="time">' + elem + '</div>';
                if (hallsMap.get(selectedHall).indexOf(elem) < hallsMap.get(selectedHall).length - 1) {
                    button += '<div class="line-between"></div>';
                }
            })
        }
        button += '</div>';
        if (window.location.pathname == "/movie") {
            button += '<div action="create" className="change-schedule">create</div>';
        }
        button += '</div>';
        if (parent == null) {
            return button;
        } else {
            $(parent).find(".time-button").replaceWith(button);
            new SimpleBar($(parent).find(".time-button .scroll").first().get(0), {
                autoHide: false
            });
        }
    }

    function generateManyMovieSeances(movieId, posterImage, firstName, lastName, userRating, pgRating, imdbRating, duration,
                                      lastSeanceDate, hallsMap) {
        let seance = '<div class="movie-schedule" id="id' + movieId + '"><div class="top"><div id="poster">' +
            '<img src="data:image/jpeg;base64,/' + posterImage + '" alt=""></div><div><div class="name"><a href="/movie?id=id' + movieId + '">' +
            '<div class="firstname">' + firstName + '</div><div class="lastname">' + lastName + '</div></a></div>' +
            '<div class="rate"><div class="star"></div><div class="star"></div><div class="star"></div><div class="star">' +
            '</div><div class="star"></div><div class="rate-number">' + userRating + '</div></div><div class="info">' +
            '<div class="pg">' + pgRating + '</div><div class="vertical-line"></div><div class="imdb">' + imdbRating +
            '</div><div class="vertical-line"></div><div class="duration">' + duration + ' m</div></div>';

        // if (window.location.pathname == "/home") {
        //     seance += '<div class="week"><div class="visible">' + generateWeekDays(lastSeanceDate) + '</div><div class="underline"></div>' +
        //         '<div class="button date"><div class="title"><div class="value"></div><div class="triangle"></div></div>' +
        //         '<div class="content"></div></div></div>';
        // }

        seance += '</div></div><div class="schedule"><div class="timeline"><div class="lines"></div><div class="hours">' +
            '<div class="hour">00.00</div><div class="hour">03.00</div><div class="hour">06.00</div><div class="hour">09.00</div>' +
            '<div class="hour">12.00</div><div class="hour">15.00</div><div class="hour">18.00</div><div class="hour">21.00</div>' +
            '<div class="hour">24.00</div></div></div>' + generateSeances(hallsMap) + '<div class="buttons">' +
            generateHallButton(hallsMap) + generateTimeButton(hallsMap) + '</div></div><div class="buy-button"><div class="button">' +
            'Buy</div></div></div>';
        return seance;
    }

    function generateOneMovieSeance(movieId, posterImage, pgRating, announceDate, country, lang, duration, director,
                                    lastSeanceDate, hallsMap) {
        return '<div class="movie-schedule" id="id' + movieId + '"><div class="top"><div id="poster"><img alt=""' +
            'src="data:image/jpeg;base64,/' + posterImage + '"></div><div><div class="details"><div class="title">Details</div>' +
            '<div class="content"><div><div><div class="title">Age rating</div><div class="pg-rating">' + pgRating + '</div>' +
            '</div><div><div class="title">Announce date</div><div class="announcement">' + announceDate + '</div>' +
            '</div><div><div class="title">Country</div><div class="country">' + country + '</div></div></div><div>' +
            '<div><div class="title">Language</div><div class="language">' + lang + '</div></div><div><div class="title">' +
            'Duration</div><div class="duration">' + duration + ' m</div></div><div><div class="title">Director</div>' +
            '<div class="director">' + director + '</div></div></div></div></div><div class="week"><div class="visible">' +
            generateWeekDays(lastSeanceDate) + '</div><div class="underline"></div><div class="button date"><div class="title">' +
            '<div class="value"></div><div class="triangle"></div></div><div class="content"></div></div></div></div>' +
            '<div id="add-schedule">create</div></div><div class="schedule"><div class="timeline"><div class="lines"></div>' +
            '<div class="hours"><div class="hour">00.00</div><div class="hour">03.00</div><div class="hour">06.00</div>' +
            '<div class="hour">09.00</div><div class="hour">12.00</div><div class="hour">15.00</div><div class="hour">18.00</div>' +
            '<div class="hour">21.00</div><div class="hour">24.00</div></div></div>\n' + generateSeances(hallsMap) +
            '<div class="buttons">' + generateHallButton(hallsMap) + generateTimeButton(hallsMap) + '</div></div>' +
            '<div class="buy-button"><div class="button">Buy</div></div></div>';
    }
})