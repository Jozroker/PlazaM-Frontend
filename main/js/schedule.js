$(document).ready(function () {
    let calendarHidden = true;
    let calendarAnimate = false;
    let nextClickedElement = $();

    $(".date-top").click(function () {
        console.log(calendarAnimate)
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
                $(".calendar-section").find(".triangle").removeClass("triangle-0");
                $(".calendar-section .content").animate({
                    "height": "34px"
                }, 300, "easeInOutQuint").delay(300).animate({
                    "width": "155px"
                }, 300, "easeInOutQuint", function () {
                    calendarAnimate = false;
                    calendarHidden = true;
                    nextClickedElement.click();
                    nextClickedElement = $();
                });
            }
        } else {
            nextClickedElement = $(this);
        }
    })
})