$(document).ready(function () {
    let selectedMovie = $("#movies-in-route .movie.selected").first();
    let selectedCircle = $("#movies-in-route .circle.selected").first();
    let index = $("#movies-in-route .circle").index($("#movies-in-route .circle.selected"));

    let timer;
    let movieRouteAnimate = false;

    {
        $("#movies-in-route .movie.selected").find(".name").css("left", "9.38%");
        // loop(true);
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
    }

    $("#movies-in-route .circle").click(function () {
        index = $("#movies-in-route .circle").index($(this));
        // loop(false);
        slide(true, true);
    })

    $("#movies-in-route .borders").click(function () {
        // loop(false);
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
                        if (userClick) {
                            // loop(true);
                        }
                    });
                }, 1000);
            })
        }
    }

    function loop(repeat) {
        if (repeat) {
            timer = setTimeout(function () {
                slide(false, false);
                // loop(true);
            }, 10000);
        } else {
            clearTimeout(timer);
        }
    }
})