let lastPage = 1;

$(document).ready(function () {
    let scrollbar;
    let scrollbarPosition;
    let currentScrollPosition;
    let nextClickedElement = $();
    // let commentsScroll;

    let yearFromHidden = true;
    let yearToHidden = true;
    let filterHidden = true;

    let yearFromAnimate = false;
    let yearToAnimate = false;
    let filterAnimate = false;

    {
        $(".sort .underline").css("width", $(".category.selected").first().width() + 14 + "px");
        yearsGenerator(2018, 2021);
        genresGenerator(["action", "fantasy", "horror"]);

        $("#footer-container").load("footer.html #footer", function () {
            $.getScript("../js/footer.js");
        });
        $("#header-container").load("header.html #header", function () {
            $.getScript("../js/header.js");
        });
        $.getScript("../js/pages.js");
    }

    $("#filter .scroll").each(function (index) {
        if (index === 0) {
            scrollbar = new SimpleBar($("#filter .scroll")[index], {
                autoHide: false
            });
            scrollbar.getScrollElement().addEventListener("scroll", function () {
                if (!yearFromHidden || !yearToHidden) {
                    scrollbar.getScrollElement().scrollTop = scrollbarPosition;
                }
            })
        }
            // else if ($(this).hasClass("comments-scroll")) {
            //     commentsScroll = new SimpleBar($("#filter .scroll")[index], {
            //         autoHide: false
            //     });
        // }
        else {
            new SimpleBar($("#filter .scroll")[index], {
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
                    nextClickedElement = $();
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
                    nextClickedElement = $();
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
                    nextClickedElement = $();
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
                    nextClickedElement = $();
                })
            }
        } else {
            nextClickedElement = $(this);
        }
    })

    $(".year-from").mouseleave(function () {
        if ((!yearFromHidden && !yearFromAnimate) || (yearFromHidden && yearFromAnimate)) {
            $(this).find(".selected").click();
        }
    })

    $(".year-to").mouseleave(function () {
        if ((!yearToHidden && !yearToAnimate) || (yearToHidden && yearToAnimate)) {
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
                currentScrollPosition = window.scrollY;
                window.addEventListener("scroll", noScroll);
                $("#filter").animate({
                    "left": "0"
                }, 400, "linear", function () {
                    filterAnimate = false;
                    filterHidden = false;
                    $("body").css("overflow-y", "hidden");
                    nextClickedElement.click();
                    nextClickedElement = $();
                })
                $(this).addClass("viewed");
            } else {
                window.removeEventListener("scroll", noScroll);
                $("#filter").animate({
                    "left": "-300px"
                }, 400, "linear", function () {
                    filterAnimate = false;
                    filterHidden = true;
                    $("body").css("overflow-y", "auto");
                    nextClickedElement.click();
                    nextClickedElement = $();
                })
                $(this).removeClass("viewed");
            }
        }
    })

    $("#filter").mouseleave(function () {
        if ((!filterHidden && !filterAnimate) || (filterHidden && filterAnimate)) {
            $(".arrow").click();
        }
    })

    $(".apply-btn").click(function () {
        $(".arrow").click();
    })

    function noScroll() {
        window.scrollTo(0, currentScrollPosition);
    }

    function yearsGenerator(minYear, maxYear) {
        let yearsList = '<div class="year">Not Selected</div>';
        for (let i = maxYear; i >= minYear; i--) {
            yearsList += '<div class="year">' + i + '</div>';
        }
        $(".years-container").html(yearsList);
    }

    function compareYears() {
        if ($(".year-from .selected > div").first().text() > $(".year-to .selected > div").first().text()) {
            let temp = $(".year-from .selected > div").first().text();
            $(".year-from .selected > div").first().text($(".year-to .selected > div").first().text());
            $(".year-to .selected > div").first().text(temp);
        }
    }

    function genresGenerator(genresList) {
        let genres = "";
        for (const genre of genresList) {
            genres += '<div><div class="genre">' + genre + '</div></div>';
        }
        $(".genres").html(genres);
    }

    function moviesGenerator(moviesList) {
        let movies = "";
        for (const movie of moviesList) {

        }
    }
})