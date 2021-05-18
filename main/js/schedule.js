let lastPage = 1;

$(document).ready(function () {
    let calendarHidden = true;
    let calendarAnimate = false;
    let nextClickedElement = $();
    let calendarDateClick, stringDate;
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October",
        "November", "December"];

    {
        $("#footer-container").load("footer.html #footer", function () {
            $.getScript("../js/footer.js");
        });
        $("#header-container").load("header.html #header", function () {
            $.getScript("../js/header.js");
        });
        $("#filter").load("filter.html #filter > div", function () {
            $.getScript("../js/filter.js");
        });
        $.getScript("../js/calendar.js");
        $.getScript("../js/movie_schedule.js");
        $.getScript("../js/pages.js");
    }

    $(document).on("click", ".calendar-section .calendar .date", function () {
        if (!calendarHidden) {
            calendarDateClick = true;
            let newDate = new Date();
            newDate.setFullYear(parseInt($(".calendar-section .calendar .header-label").text().trim().slice(-4)));
            newDate.setMonth(parseInt(months.indexOf($(".calendar-section .calendar .header-label").text().trim().slice(0, -5))));
            newDate.setDate(parseInt($(this).text().trim()));

            stringDate = "" + (newDate.getDate() / 10 >= 1 ? newDate.getDate() : "0" + newDate.getDate());
            stringDate += "." + ((newDate.getMonth() + 1) / 10 >= 1 ? newDate.getMonth() + 1 : "0" + (newDate.getMonth() + 1));
            stringDate += "." + (newDate.getFullYear());

            $(".calendar-section .selected-date").text(stringDate);
            $(".date-top").click();
        }
    })

    $(".date-top").click(function () {
        if (!calendarAnimate) {
            calendarAnimate = true;

            if (calendarHidden) {
                $(".calendar-section").find(".triangle").addClass("triangle-0");
                $(".calendar-section .content").animate({
                    "width": "284px"
                }, 300, "easeInOutQuint").delay(300).animate({
                    "height": "218px"
                }, 300, "easeInOutQuint", function () {
                    calendarAnimate = false;
                    calendarHidden = false;
                    nextClickedElement.click();
                    nextClickedElement = $();
                });
            } else {
                let delay = calendarDateClick ? 200 : 0;
                $(".calendar-section").find(".triangle").delay(delay).removeClass("triangle-0");
                $(".calendar-section .content").delay(delay).animate({
                    "height": "34px"
                }, 300, "easeInOutQuint").delay(300).animate({
                    "width": "155px"
                }, 300, "easeInOutQuint", function () {
                    calendarAnimate = false;
                    calendarHidden = true;
                    calendarDateClick = false;
                    nextClickedElement.click();
                    nextClickedElement = $();
                });
            }
        } else {
            nextClickedElement = $(this);
        }
    })

    $(".calendar-section").mouseleave(function () {
        if (!calendarHidden && !calendarAnimate) {
            $(".date-top").click();
        }
    })
})