$(document).ready(function () {
    let scrollbar;
    let scrollbarPosition;
    let nextClickedElement = $();

    let yearFromHidden = true;
    let yearToHidden = true;
    let filterHidden = true;

    let yearFromAnimate = false;
    let yearToAnimate = false;
    let filterAnimate = false;

    {
        $(".sort .underline").css("width", $(".category.selected").first().width() + 14 + "px");
    }

    $(".scroll").each(function (index) {
        if (index === 0) {
            scrollbar = new SimpleBar($(".scroll")[index], {
                autoHide: false
            });
            scrollbar.getScrollElement().addEventListener("scroll", function () {
                if (!yearFromHidden || !yearToHidden) {
                    scrollbar.getScrollElement().scrollTop = scrollbarPosition;
                }
            })
        } else {
            new SimpleBar($(".scroll")[index], {
                autoHide: false
            });
        }
    })

    $(".year-from .simplebar-content-wrapper").scroll(function () {
        $(".year-from .simplebar-vertical .simplebar-scrollbar").css("transform", "translate3d(0px, " +
            ((Math.abs($(".year-from .simplebar-content").position().top) * ($(".year-from .simplebar-vertical").height() -
                $(".year-from .simplebar-vertical .simplebar-scrollbar").height())) / ($(".year-from .simplebar-content").height() -
                54)) + "px, 0px)");
    })

    $(".year-to .simplebar-content-wrapper").scroll(function () {
        $(".year-to .simplebar-vertical .simplebar-scrollbar").css("transform", "translate3d(0px, " +
            ((Math.abs($(".year-to .simplebar-content").position().top) * ($(".year-to .simplebar-vertical").height() -
                $(".year-to .simplebar-vertical .simplebar-scrollbar").height())) / ($(".year-to .simplebar-content").height() -
                54)) + "px, 0px)");
    })

    $(".category").click(function () {
        if (!$(this).hasClass("selected")) {
            $(".categories").find(".selected").removeClass("selected");
            $(this).addClass("selected");
            $(".sort .underline").animate({
                left: $(this).position().left + "px",
                width: $(this).width() + 14 + "px"
            }, 300, "easeInOutQuint")
        }
    })

    $(".like").click(function () {
        if ($(this).hasClass("selected")) {
            $(this).removeClass("selected");
        } else {
            $(this).addClass("selected");
        }
    })

    $(".genre").click(function () {
        if ($(this).hasClass("selected")) {
            $(this).removeClass("selected");
        } else {
            $(this).addClass("selected");
        }
    })

    $(".year-from").find(".selected").click(function () {
        if (!yearFromAnimate) {
            yearFromAnimate = true;
            scrollbarPosition = scrollbar.getScrollElement().scrollTop;

            if (yearFromHidden) {
                $(".year-from").addClass("selected").animate({
                    "height": "82px"
                }, 300, "linear", function () {
                    yearFromHidden = false;
                    yearFromAnimate = false;
                    $("#filter").find(".simplebar-vertical").last().css("display", "none");
                    nextClickedElement.click();
                })
            } else {
                $(".year-from").animate({
                    "height": "28px"
                }, 300, "linear", function () {
                    yearFromHidden = true;
                    yearFromAnimate = false;
                    $("#filter").find(".simplebar-vertical").last().css("display", "block");
                    $(this).removeClass("selected");
                    nextClickedElement.click();
                })
            }
        } else {
            nextClickedElement = $(this);
        }
    })

    $(".year-to").find(".selected").click(function () {
        if (!yearToAnimate) {
            yearToAnimate = true;
            scrollbarPosition = scrollbar.getScrollElement().scrollTop;

            if (yearToHidden) {
                $(".year-to").addClass("selected").animate({
                    "height": "82px"
                }, 300, "linear", function () {
                    yearToHidden = false;
                    yearToAnimate = false;
                    $("#filter").find(".simplebar-vertical").last().css("display", "none");
                    nextClickedElement.click();
                })
            } else {
                $(".year-to").animate({
                    "height": "28px"
                }, 300, "linear", function () {
                    yearToHidden = true;
                    yearToAnimate = false;
                    $("#filter").find(".simplebar-vertical").last().css("display", "block");
                    $(this).removeClass("selected");
                    nextClickedElement.click();
                })
            }
        } else {
            nextClickedElement = $(this);
        }
    })

    $(".year-from").mouseleave(function () {
        if (!yearFromHidden) {
            $(this).find(".selected").click();
        }
    })

    $(".year-to").mouseleave(function () {
        if (!yearToHidden) {
            $(this).find(".selected").click();
        }
    })

    $(".year").click(function () {
        $($(this).parents(".list")[0]).find(".selected div").first().text($(this).text());
        $($(this).parents(".list")[0]).find(".selected").click();
        compareYears();
    })

    $(".arrow").click(function () {
        if (!filterAnimate) {
            filterAnimate = true;

            if (filterHidden) {
                $("#filter").animate({
                    "left": "0"
                }, 400, "linear", function () {
                    filterAnimate = false;
                    filterHidden = false;
                    $("body").css("overflow-y", "hidden");
                    nextClickedElement.click();
                })

                $(this).addClass("viewed");
            } else {
                $("#filter").animate({
                    "left": "-300px"
                }, 400, "linear", function () {
                    filterAnimate = false;
                    filterHidden = true;
                    $("body").css("overflow-y", "auto");
                    nextClickedElement.click();
                })

                $(this).removeClass("viewed");
            }
        } else {
            nextClickedElement = $(this);
        }
    })

    $("#filter").mouseleave(function () {
        if (!filterHidden) {
            $(".arrow").click();
        } else {
            nextClickedElement = $(".arrow");
        }
    })
})

function compareYears() {
    if ($(".year-from .selected > div").first().text() > $(".year-to .selected > div").first().text()) {
        let temp = $(".year-from .selected > div").first().text();
        $(".year-from .selected > div").first().text($(".year-to .selected > div").first().text());
        $(".year-to .selected > div").first().text(temp);
    }
}