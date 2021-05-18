$(document).ready(function () {
    let columnIndex, rowIndex, columnEmpty = 0;
    let timeListHidden = true;
    let timeListAnimate = false;
    let hallListHidden = true;
    let hallListAnimate = false;
    let dateListHidden = true;
    let dateListAnimate = false;
    let paymentMethodAnimate = false;
    let nextClickedElement = $();
    let monthsFull = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let monthsShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let currentScrollPosition;
    let selectedDate, selectedMonth, selectedYear, seanceDate, seanceTime, seanceHall, price, row, column, id,
        attribute;

    {
        $(".tickets-price .scroll").css("height", calculateTicketsScrollHeight(false) + "px");
        $(".total-price .price").text(calculateTotalPrice());
        hallLoad();
        $("#card-number-field").inputmask({
            mask: "9999 9999 9999 9999",
            placeholder: "**** **** **** ****",
            showMaskOnFocus: false,
            showMaskOnHover: false
        });
        $("#card-month-field").inputmask({
            regex: "0[1-9]|1[0-2]",
            placeholder: "mm",
            showMaskOnFocus: false,
            showMaskOnHover: false
        });
        $("#card-year-field").inputmask({
            mask: "99",
            placeholder: "YY",
            showMaskOnFocus: false,
            showMaskOnHover: false
        });
        $("#card-cv-field").inputmask({
            mask: "999",
            placeholder: "***",
            showMaskOnFocus: false,
            showMaskOnHover: false
        });

        $("#footer-container").load("footer.html #footer", function () {
            $.getScript("../js/footer.js");
        });
        $("#header-container").load("header.html #header", function () {
            $.getScript("../js/header.js");
        });
        $.getScript("../js/calendar.js");
    }

    $(".scroll").each(function (index) {
        new SimpleBar($(".scroll")[index], {
            autoHide: false
        });
    })

    $(".tickets-price .scroll").mouseenter(function () {
        currentScrollPosition = window.scrollY;
        window.addEventListener("scroll", noScroll);
    })

    $(".tickets-price .scroll").mouseleave(function () {
        window.removeEventListener("scroll", noScroll);
    })

    $(document).on("click", ".tickets-price .ticket .icon-cross.active", function () {
        $(this).removeClass("active");
        row = parseInt($($(this).parents(".ticket")[0]).find(".row").text());
        column = parseInt($($(this).parents(".ticket")[0]).find(".column").text());
        seatClickFunction($($($(".table .row")[row - 1]).find(".seat")[column - 1]), true);
        ticketCrossClickFunction($(this));
    })

    $(document).on("click", ".tickets-confirm .ticket .cross.active", function () {
        $(this).removeClass("active");
        row = $(this).parents(".ticket").first().find(".row-info .value").text();
        column = $(this).parents(".ticket").first().find(".seat-info .value").text();
        seatClickFunction($($($(".places-grid .scroll .simplebar-content .row")[row - 1]).find(".seat")[column - 1]), false);
        $(this).parents(".ticket").first().animate({
            "height": "0"
        }, 300, "easeInOutQuint", function () {
            $(this).remove();
        })
    })

    $(document).on("click", "#calendar .date", function () {
        selectedDate = $(this).text();
        let selectedMonthYear = $("#calendar .header-label").text();
        $(".choose-places .list .selected-date").attr("year", selectedMonthYear.slice(-4));
        $(".choose-places .list .selected-date .date").text(selectedDate);
        $(".choose-places .list .selected-date .month").text(monthsShort[monthsFull.indexOf(selectedMonthYear.slice(0, -5))]);
        $(".choose-places .selected-date").click();
    })

    $("#date-select").mouseleave(function () {
        if (!dateListAnimate && !dateListHidden) {
            $(".choose-places .selected-date").click();
        }
    })

    $(".choose-places .selected-date").click(function () {
        if (!dateListAnimate) {
            dateListAnimate = true;

            if (dateListHidden) {
                $(this).addClass("select");
                selectedDate = new Date();
                selectedDate.setFullYear($(this).attr("year"), parseInt(monthsShort.indexOf($(this).find(".month").text())),
                    parseInt($(this).find(".date").text()));
                $("#calendar").calendar(selectedDate);
                $(this).parent().find(".selection").animate({
                    "height": "186px"
                }, 500, "easeInOutQuint", function () {
                    dateListHidden = false;
                    dateListAnimate = false;
                    nextClickedElement.click();
                    nextClickedElement = $();
                })
                $(".choose-places .lists").animate({
                    "margin-bottom": "186px"
                }, 500, "easeInOutQuint");
            } else {
                $(this).removeClass("select");
                $(this).parent().find(".selection").animate({
                    "height": "0"
                }, 500, "easeInOutQuint", function () {
                    dateListHidden = true;
                    dateListAnimate = false;
                    nextClickedElement.click();
                    nextClickedElement = $();
                })
                $(".choose-places .lists").animate({
                    "margin-bottom": "0"
                }, 500, "easeInOutQuint");
            }
        } else {
            nextClickedElement = $(this);
        }
    })

    $(".choose-places .list .hall").click(function () {
        let selectedHall = $(this).text().trim();
        $(".choose-places .list .selected-hall").text(selectedHall);
        $(".choose-places .selected-hall").click();
    })

    $("#hall-select").mouseleave(function () {
        if (!hallListAnimate && !hallListHidden) {
            $(".choose-places .selected-hall").click();
        }
    })

    $(".choose-places .selected-hall").click(function () {
        if (!hallListAnimate) {
            hallListAnimate = true;

            if (hallListHidden) {
                currentScrollPosition = window.scrollY;
                window.addEventListener("scroll", noScroll);
                $(this).addClass("select");
                let selectedHall = $(this).text().trim();
                $(this).parent().find(".hall").each(function () {
                    if ($(this).text().trim() == selectedHall) {
                        $(this).addClass("selected");
                    }
                })
                $(this).parent().find(".selection").animate({
                    "height": "102px"
                }, 500, "easeInOutQuint", function () {
                    hallListHidden = false;
                    hallListAnimate = false;
                    nextClickedElement.click();
                    nextClickedElement = $();
                })
                $(".choose-places .lists").animate({
                    "margin-bottom": "102px"
                }, 500, "easeInOutQuint");
            } else {
                window.removeEventListener("scroll", noScroll);
                $(this).removeClass("select");
                $(this).parent().find(".selection").animate({
                    "height": "0"
                }, 500, "easeInOutQuint", function () {
                    $(".choose-places .list .hall").removeClass("selected");
                    hallListHidden = true;
                    hallListAnimate = false;
                    nextClickedElement.click();
                    nextClickedElement = $();
                })
                $(".choose-places .lists").animate({
                    "margin-bottom": "0"
                }, 500, "easeInOutQuint");
            }
        } else {
            nextClickedElement = $(this);
        }
    })

    $(".choose-places .list .time").click(function () {
        let selectedTime = $(this).text().trim();
        $(".choose-places .list .hour").text(selectedTime.slice(0, 2));
        $(".choose-places .list .min").text(selectedTime.slice(3));
        $(".choose-places .selected-time").click();
    })

    $("#time-select").mouseleave(function () {
        if (!timeListAnimate && !timeListHidden) {
            $(".choose-places .selected-time").click();
        }
    })

    $(".choose-places .selected-time").click(function () {
        if (!timeListAnimate) {
            timeListAnimate = true;

            if (timeListHidden) {
                currentScrollPosition = window.scrollY;
                window.addEventListener("scroll", noScroll);
                $(this).addClass("select");
                let selectedTime = $(this).text().trim();
                $(this).parent().find(".time").each(function () {
                    if ($(this).text().trim() == selectedTime) {
                        $(this).addClass("selected");
                    }
                })
                $(this).parent().find(".selection").animate({
                    "height": "102px"
                }, 500, "easeInOutQuint", function () {
                    timeListHidden = false;
                    timeListAnimate = false;
                    nextClickedElement.click();
                    nextClickedElement = $();
                })
                $(".choose-places .lists").animate({
                    "margin-bottom": "102px"
                }, 500, "easeInOutQuint");
            } else {
                window.removeEventListener("scroll", noScroll);
                $(this).removeClass("select");
                $(this).parent().find(".selection").animate({
                    "height": "0"
                }, 500, "easeInOutQuint", function () {
                    $(".choose-places .list .time").removeClass("selected");
                    timeListHidden = true;
                    timeListAnimate = false;
                    nextClickedElement.click();
                    nextClickedElement = $();
                })
                $(".choose-places .lists").animate({
                    "margin-bottom": "0"
                }, 500, "easeInOutQuint");
            }
        } else {
            nextClickedElement = $(this);
        }
    })

    $(".choose-payment .method .top").click(function () {
        if (!$(this).hasClass("selected")) {
            if (!paymentMethodAnimate) {
                paymentMethodAnimate = true;

                $(".choose-payment .method .top.selected").removeClass("selected");
                $(this).addClass("selected");
                if ($(this).parent().hasClass("card-method")) {
                    if ($(this).parent().find(".annotation:visible").length != 0) {
                        $(".ticket-form .nav-item:nth-child(3)").removeClass("disabled");
                        $("#next-tile").removeClass("disabled");
                    } else {
                        $(".ticket-form .nav-item:nth-child(3)").addClass("disabled");
                        $("#next-tile").addClass("disabled");
                    }
                    $(this).parent().animate({
                        // "height": "248px"
                        "height": "438px"
                    }, 500, "easeInOutQuint");
                } else {
                    $(".ticket-form .nav-item:nth-child(3)").removeClass("disabled");
                    $("#next-tile").removeClass("disabled");
                    $(".choose-payment .card-method").animate({
                        "height": "34px"
                    }, 500, "easeInOutQuint");
                }
                paymentMethodAnimate = false;
                nextClickedElement.click();
                nextClickedElement = $();
            } else {
                nextClickedElement = $(this);
            }
        }
    })

    $(".card-method input").focusout(function () {
        $(this).val($(this).val().trim());
        let regex = new RegExp($(this).attr("regex"));
        if ($(this).val() == "") {
            $(this).parents(".field").first().find(".title-2 .required").css("display", "inline-block");
        } else if (!regex.test($(this).val())) {
            $(this).parents(".field").first().find(".title-2 .incorrect").css("display", "inline-block");
        } else {
            let secondField = $($(".card-method .field-2")[1 - $(this).parents(".field-2").first().index()]).find("input");
            let regex2 = new RegExp($(secondField).attr("regex"));

            if ($(secondField).val() == "") {
                $(this).parents(".field").first().find(".title-2 .required").css("display", "inline-block");
            } else if (!regex2.test($(secondField).val())) {
                $(this).parents(".field").first().find(".title-2 .incorrect").css("display", "inline-block");
            }
        }
        if ($(".card-method .annotation:visible").length == 0 &&
            $(".card-method input").filter(function () {
                return !this.value;
            }).length == 0) {
            $(".ticket-form .nav-item:nth-child(3)").removeClass("disabled");
            $("#next-tile").removeClass("disabled");
        } else {
            $(".ticket-form .nav-item:nth-child(3)").addClass("disabled");
            $("#next-tile").addClass("disabled");
        }
    })

    $("#card-number-field, #card-name-field, #card-month-field, #card-year-field").focus(function () {
        $(".card .card-rect").css("z-index", "2");
        $(".card .card-rect-back").css("z-index", "1");
        $(this).parents(".field").first().find(".title-2 .annotation").css("display", "none");
    })

    $("#card-cv-field").focus(function () {
        $(".card .card-rect").css("z-index", "1");
        $(".card .card-rect-back").css("z-index", "2");
        $(this).parents(".field").first().find(".title-2 .annotation").css("display", "none");
    })

    $("#card-number-field").keydown(function () {
        setTimeout(function () {
            $(".card .card-number").html($("#card-number-field").val().replaceAll(" ", "<span>_</span>"));
        }, 100)
    })

    $("#card-name-field").keydown(function () {
        setTimeout(function () {
            $(".card .card-name").text(!$("#card-name-field").val() ? "Card Name" : $("#card-name-field").val());
        }, 100)
    })

    $("#card-month-field, #card-year-field").keydown(function () {
        setTimeout(function () {
            $(".card .card-date").text((!$("#card-month-field").val() ? "mm" : $("#card-month-field").val()) + "/" +
                (!$("#card-year-field").val() ? "YY" : $("#card-year-field").val()));
        }, 100)
    })

    $(".ticket-form .nav-item").click(function () {
        if (!$(this).hasClass("selected") && !$(this).hasClass("disabled")) {
            $(this).parent().find(".selected").removeClass("selected");
            $(this).addClass("selected");
            $(".buy-ticket-container").animate({
                "left": "-" + $(".ticket-form").find(".nav-item").index($(this)) * 100 + "%"
            }, 500, "easeInOutQuint");

            if ($(this).attr("id") == "choose-places") {
                $("#next-tile").text("Next");
                $("#prev-tile").css("display", "none");
                if ($("#choose-payment-method").hasClass("disabled")) {
                    $("#next-tile").addClass("disabled");
                }
            } else if ($(this).attr("id") == "choose-payment-method") {
                $("#next-tile").text("Next");
                $("#prev-tile").css("display", "block");
                if ($("#confirm").hasClass("disabled")) {
                    $("#next-tile").addClass("disabled");
                }
            } else {
                $("#next-tile").text("Confirm");
                $("#prev-tile").css("display", "block");
            }

            if ($(this).attr("id") == "confirm") {
                $(".tickets-price .ticket").each(function () {
                    selectedDate = "" + $("#date-select .selected-date .date").text().trim();
                    selectedMonth = "" + monthsShort.indexOf($("#date-select .selected-date .month").text().trim()) + 1;
                    selectedYear = "" + $("#date-select .selected-date").attr("year");
                    seanceDate = (selectedDate.length == 1 ? "0" + selectedDate : selectedDate) + "." +
                        (selectedMonth.length == 1 ? "0" + selectedMonth : selectedMonth) + "." + selectedYear;
                    seanceTime = $("#time-select .selected-time").text().trim();
                    seanceHall = $("#hall-select .selected-hall").text().trim();
                    price = $(this).find(".price").text().trim().slice(0, -1);
                    row = $(this).find(".row").text().trim();
                    column = $(this).find(".column").text().trim();
                    id = $(this).attr("identifier");
                    let ticket = '<div class="ticket" identifier="' + id + '"><div class="ticket-info"><div class="info-items"><div class="info-item price-info">' +
                        '<span class="title">Price:</span><span class="space">_</span><span class="value">' + price + '</span>' +
                        '<span class="space"></span><span class="value">$</span></div><div class="info-item date-info">' +
                        '<span class="title">Date:</span><span class="space">_</span><span class="value">' + seanceDate +
                        '</span></div><div class="info-item row-info"><span class="title">Row:</span><span class="space">_</span>' +
                        '<span class="value">' + row + '</span></div><div class="info-item hall-info"><span class="title">Hall:</span>' +
                        '<span class="space">_</span><span class="value">' + seanceHall + '</span></div><div class="info-item time-info">' +
                        '<span class="title">Time:</span><span class="space">_</span><span class="value">' + seanceTime + '</span>' +
                        '</div><div class="info-item seat-info"><span class="title">Seat:</span><span class="space">_</span>' +
                        '<span class="value">' + column + '</span></div></div><div class="barcode"><div class="barcode-container">' +
                        '<svg class="barcode-value"></svg></div><div class="identifier"><span class="first-name">Avengers</span>' +
                        '<span class="space">_</span><span class="last-name">The First Part</span></div></div><div class="copyright">' +
                        'PlazaM</div></div><div class="picture"><img class="background-picture" src="' + $(".background img").attr("src") +
                        '" alt=""><div class="movie-name"><div class="first-name">Avengers</div><div class="last-name">The First Part' +
                        '</div></div><div class="blur"></div></div><div class="cross active"><div class="icon-cross"></div></div></div>';

                    $(".tickets-confirm .scroll .simplebar-content").append(ticket);
                })

                JsBarcode(".barcode-value", "Avengers The First Part", {
                    height: 40,
                    width: 2,
                    textMargin: 0,
                    displayValue: false,
                    lineColor: "#0D0E0D",
                    margin: 0
                })
            } else {
                setTimeout(function () {
                    $(".tickets-confirm .ticket").each(function () {
                        $(this).remove();
                    })
                }, 500);
            }
        }
    })

    $(".column").click(function () {
        if (!$(this).hasClass("disabled")) {
            if ($(this).hasClass("selected")) {
                $(this).removeClass("selected");
                let number = $(this);
                //todo optimize choosing big count of seats
                $($(this).parents(".scroll")[0]).find(".simplebar-content .row:not(:last-child) .seat.selected:not(.disabled)").each(function () {
                    if ($(this).index() == number.index()) {
                        $(this).click().mouseleave();
                    }
                });
                setTimeout(function () {
                    $(".tickets-price .scroll").stop().finish().css("height", calculateTicketsScrollHeight(false) + "px");
                }, 100);
                setTimeout(function () {
                    if ($(".tickets-price .ticket").length <= 0) {
                        $(".ticket-form .nav-item:first-child").click();
                        $(".ticket-form .nav-item:nth-child(2)").addClass("disabled");
                        $(".ticket-form .nav-item:nth-child(3)").addClass("disabled");
                        $("#next-tile").addClass("disabled");
                        $(".choose-payment .method .top").removeClass("selected");
                    }
                }, 200);
            } else {
                $(this).addClass("selected");
                let number = $(this);
                let timeout = 300 * (12 - $(".tickets-price .scroll .ticket").length);

                if ($(".tickets-price .scroll .ticket").length < 11) {
                    setTimeout(function () {
                        setTimeout(function () {
                            $(".tickets-price .scroll").stop().finish().css("height", calculateTicketsScrollHeight(false) + "px");
                        }, timeout);
                    }, 100);
                } else {
                    setTimeout(function () {
                        $(".tickets-price .scroll").stop().finish().css("height", calculateTicketsScrollHeight(false) + "px");
                    }, 100);
                }

                $($(this).parents(".scroll")[0]).find(".simplebar-content .row:not(:last-child) .seat:not(.selected):not(.disabled)").each(function () {
                    if ($(this).index() == number.index()) {
                        $(this).click().mouseleave();
                    }
                });
            }
        }
    })

    $(".row-number").click(function () {
        if (!$(this).hasClass("disabled")) {
            rowIndex = $(this).index();
            if ($(this).hasClass("selected")) {
                $(this).removeClass("selected");
                $($(".table .row")[rowIndex]).find(".seat.selected:not(.disabled)").each(function () {
                    $(this).click().mouseleave();
                });
                setTimeout(function () {
                    $(".tickets-price .scroll").stop().finish().css("height", calculateTicketsScrollHeight(false) + "px");
                }, 100);
                setTimeout(function () {
                    if ($(".tickets-price .ticket").length <= 0) {
                        $(".ticket-form .nav-item:first-child").click();
                        $(".ticket-form .nav-item:nth-child(2)").addClass("disabled");
                        $(".ticket-form .nav-item:nth-child(3)").addClass("disabled");
                        $("#next-tile").addClass("disabled");
                        $(".choose-payment .method .top").removeClass("selected");
                    }
                }, 200);
            } else {
                let timeout = 300 * (12 - $(".tickets-price .scroll .ticket").length);
                $(this).addClass("selected");

                if ($(".tickets-price .scroll .ticket").length < 11) {
                    setTimeout(function () {
                        setTimeout(function () {
                            $(".tickets-price .scroll").stop().finish().css("height", calculateTicketsScrollHeight(false) + "px");
                        }, timeout);
                    }, 100);
                } else {
                    setTimeout(function () {
                        $(".tickets-price .scroll").stop().finish().css("height", calculateTicketsScrollHeight(false) + "px");
                    }, 100);
                }

                $($(".table .row")[rowIndex]).find(".seat:not(.selected):not(.disabled)").each(function () {
                    $(this).click().mouseleave();
                });
            }
        }
    })

    $("#next-tile").click(function () {
        if (!$(this).hasClass("disabled")) {
            $(".ticket-form .nav-item.selected").next().click();
        }
    })

    $("#prev-tile").click(function () {
        if (!$(this).hasClass("disabled")) {
            $(".ticket-form .nav-item.selected").prev().click();
        }
    })

    $(".seat").click(function () {
        seatClickFunction($(this), false);
    })

    $(".seat").hover(function () {
            if (!$(this).hasClass("disabled")) {
                columnIndex = $(this).index();
                rowIndex = $(this).parent().index();
                $($(this).parents(".scroll")[0]).find(".simplebar-content .row:not(:last-child) .seat.selected:not(.disabled)").each(function () {
                    if ($(this).index() == columnIndex) {
                        columnEmpty++;
                    }
                });
                if ($(this).hasClass("selected")) {
                    if ($(this).parent().find(".seat.selected:not(.disabled)").length <= 1) {
                        $($(".table .rows .row-number")[rowIndex]).css("color", "#A3A3A3");
                    }
                    if (columnEmpty <= 1) {
                        $($(".table .numbers .column")[columnIndex]).css("color", "#A3A3A3");
                    }
                } else {
                    $($(".table .numbers .column")[columnIndex]).css("color", "#AF2341");
                    $($(".table .rows .row-number")[rowIndex]).css("color", "#AF2341");
                }
                columnEmpty = 0;
            }
        },
        function () {
            if (!$(this).hasClass("disabled")) {
                $($(this).parents(".scroll")[0]).find(".simplebar-content .row:not(:last-child) .seat.selected:not(.disabled)").each(function () {
                    if ($(this).index() == columnIndex) {
                        columnEmpty++;
                    }
                })
                if ($(this).hasClass("selected")) {
                    $($(".table .rows .row-number")[rowIndex]).css("color", "#AF2341");
                    $($(".table .numbers .column")[columnIndex]).css("color", "#AF2341");
                } else {
                    if ($(this).parent().find(".seat.selected:not(.disabled)").length < 1) {
                        $($(".table .rows .row-number")[rowIndex]).css("color", "#A3A3A3");
                    }
                    if (columnEmpty < 1) {
                        $($(".table .numbers .column")[columnIndex]).css("color", "#A3A3A3");
                    }
                }
                columnEmpty = 0;
            }
        })

    function calculateTotalPrice() {
        let value = 0;
        $(".tickets-price .ticket .price").each(function (index) {
            value += parseFloat($($(".tickets-price .ticket .price")[index]).text().slice(0, -1));
        });
        return value;
    }

    function calculateTicketsScrollHeight(removingTicket) {
        let value = ($(".tickets-price .scroll .ticket").length * 44 +
            ($(".tickets-price .scroll .ticket").length - 1) * 10) + 2;
        if (removingTicket) {
            if ($(".tickets-price .scroll .ticket").length === 1) {
                value -= 44;
            } else {
                value -= 54;
            }
        }
        return value > 620 ? 620 : value;
    }

    function hallLoad() {
        let width = parseFloat($(".table").css("width").slice(0, -2));
        let countCellsInRow = $(".table .row").first().find(".seat").length;
        let cellMargin = parseFloat($($(".table .seat")[1]).css("margin-left").slice(0, -2)) * countCellsInRow;
        let seatWidthInPercent = (100 * ((width - cellMargin) / countCellsInRow)) / width;
        // let seatWidthInVw = (100 * ((width - cellMargin) / countCellsInRow)) / 1920;
        $(".table .seat, .table .column").css("width", seatWidthInPercent + "%");
        if ($(".table .row").length - 1 >= 10) {
            $($(".table .row")[Math.floor(($(".table .row").length - 2) / 2)])
                .css("margin-top", "20px");
            $($(".table .row-number")[Math.floor(($(".table .row").length - 2) / 2)])
                .css("margin-top", "20px");
        }
        $($(".table .row")[$(".table .row").length - 2])
            .css("margin-top", "20px");
        $($(".table .row-number")[$(".table .row").length - 2])
            .css("margin-top", "20px");
        // $(".seat").css("height", seatWidthInVw + "vw");
    }

    function createTicket(row, column, price) {
        {
            id = "id";
            for (let i = 0; i < 19; i++) {
                id += Math.floor(Math.random() * 10);
            }

            let ticket = '<div class="ticket" identifier="' + id + '">' +
                '<div class="ticket-container">' +
                '<div><span class="row">' + row +
                '</span>row<span class="column">' +
                column + '</span>th seat</div>' +
                '<div><div class="price">' + price +
                '$</div><div class="icon-cross active"></div>' +
                '</div></div></div>';
            let parent = $(".tickets-price .simplebar-content").prepend(ticket);
            $($(parent).find(".ticket")[0]).attr("row", row).attr("seat", column).css({
                "top": "-44px",
                "height": "0"
            }).animate({
                "top": "0",
                "height": "44px"
            }, 200, "linear", function () {
                $(".total-price .price").text(calculateTotalPrice());
                if ($(".tickets-price .ticket").length > 0) {
                    $(".tickets-price .scroll").animate({
                        "margin-bottom": "24px"
                    }, 100, "linear");
                }
            });
            $(".tickets-price .scroll").animate({
                "height": calculateTicketsScrollHeight(false) + "px"
            }, 200, "linear");
        }
    }

    function ticketCrossClickFunction(crossElement) {
        attribute = ".ticket[identifier='" + $(crossElement).parents(".ticket").first().attr("identifier") + "']";
        $(".tickets-price .scroll").animate({
            "height": calculateTicketsScrollHeight(true) + "px"
        }, 200, "linear");
        $(crossElement).parents(".ticket").first().animate({
            "top": "-44px",
            "height": "0"
        }, 200, "linear", function () {
            $(this).remove();
            $(".total-price .price").text(calculateTotalPrice());
            if ($(".tickets-price .ticket").length === 0) {
                $(".tickets-price .scroll").animate({
                    "margin-bottom": "0"
                }, 100, "linear");
            }
        });
        $(".tickets-confirm").find(attribute).animate({
            "height": "0"
        }, 300, "easeInOutQuint", function () {
            $(this).remove();
        })
    }

    function noScroll() {
        window.scrollTo(0, currentScrollPosition);
    }

    function seatClickFunction(seatElement, crossClicked) {
        if (!$(seatElement).hasClass("disabled")) {
            columnIndex = parseInt($(seatElement).index());
            rowIndex = parseInt($(seatElement).parent().index());
            $($(seatElement).parents(".scroll")[0]).find(".simplebar-content .row:not(:last-child) .seat.selected:not(.disabled)").each(function () {
                if ($(this).index() == columnIndex) {
                    columnEmpty++;
                }
            });
            if ($(seatElement).hasClass("selected")) {
                $(seatElement).removeClass("selected");
                if ($(".tickets-price .ticket").length - 1 <= 0) {
                    $(".ticket-form .nav-item:first-child").click();
                    $(".ticket-form .nav-item:nth-child(2)").addClass("disabled");
                    $(".ticket-form .nav-item:nth-child(3)").addClass("disabled");
                    $("#next-tile").addClass("disabled");
                    $(".choose-payment .method .top").removeClass("selected");
                }
                if ($(seatElement).parent().find(".seat.selected:not(.disabled)").length == 0) {
                    $($(".table .rows .row-number")[rowIndex]).removeClass("selected");
                }
                if (columnEmpty <= 1) {
                    $($(".table .numbers .column")[columnIndex]).removeClass("selected");
                }
                if (!crossClicked) {
                    $(".tickets-price .ticket").each(function () {
                        if ($(this).attr("row") == rowIndex + 1 && $(this).attr("seat") == columnIndex + 1) {
                            ticketCrossClickFunction($(this).find(".icon-cross.active"));
                        }
                    })
                }
            } else {
                $(seatElement).addClass("selected");
                $(".ticket-form .nav-item:nth-child(2)").removeClass("disabled");
                $($(".table .rows .row-number")[rowIndex]).addClass("selected");
                $($(".table .numbers .column")[columnIndex]).addClass("selected");
                $("#next-tile").removeClass("disabled");
                createTicket(rowIndex + 1, columnIndex + 1, 15);
            }
            columnEmpty = 0;
            $(seatElement).mouseenter();
            if (!$(seatElement).is(":hover")) {
                $(seatElement).mouseleave();
            }
        }
    }
})