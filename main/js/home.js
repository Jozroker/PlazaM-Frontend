let lastPage = 1;

$(document).ready(function () {
    let selectedMovie = $("#movies-in-route .movie.selected").first();
    let selectedCircle = $("#movies-in-route .circle.selected").first();
    let index = $("#movies-in-route .circle").index($("#movies-in-route .circle.selected"));

    let timer;
    let movieRouteAnimate = false;
    let nextClickedElement = $();

    {
        $("#movies-in-route .movie.selected").find(".name").css("left", "9.38%");
        loop(true);
        $("#coming-soon").slick({
            slidesToShow: 5,
            slidesToScroll: 1,
            // autoplay: true,
            autoplaySpeed: 0,
            speed: 5000,
            pauseOnHover: false,
            cssEase: 'linear',
            arrows: false,
            draggable: false,
            touchMove: false,
            swipe: false,
            accessibility: false
        })

        $("#footer-container").load("footer.html #footer", function () {
            $.getScript("../js/footer.js");
        });
        $("#header-container").load("header.html #header", function () {
            $.getScript("../js/header.js");
        });
        $("#filter").load("filter.html #filter > div", function () {
            $.getScript("../js/filter.js");
        });
        $.getScript("../js/movie_schedule.js");
        $.getScript("../js/pages.js");
    }

    $("#movies-in-route .circle").click(function () {
        if (!$(this).hasClass("selected")) {
            index = $("#movies-in-route .circle").index($(this));
            loop(false);
            slide(true, true);
        }
    })

    $("#movies-in-route .borders").click(function () {
        loop(false);
        slide(false, true);
    })

    function slide(circleSelected, userClick) {
        if (!movieRouteAnimate) {
            movieRouteAnimate = true;
            if (!circleSelected) {
                if (selectedMovie.next().length == 0) {
                    index = 0;
                } else {
                    index++;
                }
            }

            $("#movies-in-route .movie.selected").find(".name").animate({
                "left": "-100vw"
            }, 300, "easeInOutQuint", function () {
                selectedMovie.removeClass("selected");
                selectedCircle.removeClass("selected");
                $($("#movies-in-route .movie")[index]).addClass("selected");
                $($("#movies-in-route .circle")[index]).addClass("selected");

                setTimeout(function () {
                    $("#movies-in-route .movie.selected").find(".name").animate({
                        "left": "9.38%"
                    }, 300, "easeInOutQuint", function () {
                        selectedMovie = $("#movies-in-route .movie.selected").first();
                        selectedCircle = $("#movies-in-route .circle.selected").first();
                        movieRouteAnimate = false;
                        // nextClickedElement.click();
                        // nextClickedElement = $();
                        if (userClick) {
                            loop(true);
                        }
                    });
                }, 1000);
            })
        } else {
            // if (circleSelected) {
            //     nextClickedElement = $($("#movies-in-route .circle")[index]);
            // } else {
            //     nextClickedElement = $("#movies-in-route .borders");
            // }
            //todo fix this trouble
        }
    }

    function loop(repeat) {
        if (repeat) {
            timer = setTimeout(function () {
                slide(false, false);
                loop(true);
            }, 10000);
        } else {
            clearTimeout(timer);
        }
    }
})