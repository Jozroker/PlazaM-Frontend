$(document).ready(function () {
    let inputValueLoop = false;
    let loop;
    let speed = 200;
    let element;
    let nextClickedElement = $();
    let fieldParent;
    let positionLeft;
    let userClick = true;

    let movieLanguageHidden = true;
    let mpaaRatingHidden = true;
    let genreCreationHidden = true;
    let actorCreationHidden = true;

    let movieLanguageAnimate = false;
    let mpaaRatingAnimate = false;
    let changeLanguageAnimate = false;
    let genreCreationAnimate = false;
    let actorCreationAnimate = false;

    {
        $(".movie-language, .mpaa-rating").each(function () {
            $(this).find(".field").css("width", parseInt($(this).find(".selected div")
                .first().css("width").slice(0, -2)) + 39 + "px");
        })
        let date = new Date();
        $("#day").val(date.getDate());
        $("#month").val(date.getMonth() + 1);
        $("#year").val(date.getFullYear());
        emptyGenres();

        $("#footer-container").load("footer.html #footer", function () {
            $.getScript("../js/footer.js");
        });
        $("#header-container").load("header.html #header", function () {
            $.getScript("../js/header.js");
        });
    }

    $(window).resize(function () {
        emptyGenres();
    })

    $("#movie .scroll").each(function (index) {
        new SimpleBar($("#movie .scroll")[index], {
            autoHide: false
        });
    })

    $(".wide-picture .button").click(function () {
        $("#change-wide-picture").trigger("click");
    })

    $(".poster-picture .button").click(function () {
        $("#change-poster-picture").trigger("click");
    })

    $(".avatar-picture .button").click(function () {
        $("#change-actor-avatar").trigger("click");
    })

    $("#change-actor-avatar").change(function () {
        if (this.files && this.files[0]) {
            if (this.files[0].size <= 5001708) {
                let reader = new FileReader();
                reader.addEventListener("load", function (e) {
                    $(".avatar-picture img").attr("src", e.target.result);
                });
                reader.readAsDataURL(this.files[0]);
            } else {
                alert("File is too large!");
            }
        }
    });

    $("#change-wide-picture").change(function () {
        if (this.files && this.files[0]) {
            if (this.files[0].size <= 5001708) {
                let reader = new FileReader();
                reader.addEventListener("load", function (e) {
                    $(".wide-picture img").attr("src", e.target.result);
                });
                reader.readAsDataURL(this.files[0]);
            } else {
                alert("File is too large!");
            }
        }
    });

    $("#change-poster-picture").change(function () {
        if (this.files && this.files[0]) {
            if (this.files[0].size <= 5001708) {
                let reader = new FileReader();
                reader.addEventListener("load", function (e) {
                    $(".poster-picture img").attr("src", e.target.result);
                });
                reader.readAsDataURL(this.files[0]);
            } else {
                alert("File is too large!");
            }
        }
    });

    $(".movie-language .selected").click(function () {
        if (!movieLanguageAnimate) {
            movieLanguageAnimate = true;

            if (movieLanguageHidden) {
                $(this).find(".triangle").addClass("triangle-0 selected-triangle");
                $(this).parents(".field").first().animate({
                    "width": "100%"
                }, 300, "easeInOutQuint").find(".list").animate({
                    "background-position-x": "100%"
                }, 300, "easeInOutQuint", function () {
                    $(this).animate({
                        "height": "112px"
                    }, 300, "easeInOutQuint", function () {
                        movieLanguageAnimate = false;
                        movieLanguageHidden = false;
                        nextClickedElement.click();
                        nextClickedElement = $();
                    })
                })
            } else {
                $(this).find(".triangle").removeClass("triangle-0 selected-triangle");
                $(this).parent(".list").animate({
                    "height": "22px"
                }, 300, "easeInOutQuint", function () {
                    $(this).animate({
                        "background-position-x": "200%"
                    }, 300, "easeInOutQuint").parent(".field").animate({
                        "width": parseInt($(this).find(".selected div").first().css("width")
                            .slice(0, -2)) + 39 + "px"
                    }, 300, "easeInOutQuint", function () {
                        movieLanguageAnimate = false;
                        movieLanguageHidden = true;
                        nextClickedElement.click();
                        nextClickedElement = $();
                    })
                })
            }
        } else {
            nextClickedElement = $(this);
        }
    })

    $(".movie-language .list").mouseleave(function () {
        if (!movieLanguageHidden && !movieLanguageAnimate) {
            $(this).find(".selected").click();
        }
    })

    $(".mpaa-rating .selected").click(function () {
        if (!mpaaRatingAnimate) {
            mpaaRatingAnimate = true;

            if (mpaaRatingHidden) {
                $(this).find(".triangle").addClass("triangle-0 selected-triangle");
                $(this).parents(".field").first().animate({
                    "width": "100%"
                }, 300, "easeInOutQuint").find(".list").animate({
                    "background-position-x": "100%"
                }, 300, "easeInOutQuint", function () {
                    $(this).animate({
                        "height": "152px"
                    }, 300, "easeInOutQuint", function () {
                        mpaaRatingHidden = false;
                        mpaaRatingAnimate = false;
                        nextClickedElement.click();
                        nextClickedElement = $();
                    })
                })
            } else {
                $(this).find(".triangle").removeClass("triangle-0 selected-triangle");
                $(this).parent(".list").animate({
                    "height": "22px"
                }, 300, "easeInOutQuint", function () {
                    $(this).animate({
                        "background-position-x": "200%"
                    }, 300, "easeInOutQuint").parent(".field").animate({
                        "width": parseInt($(this).find(".selected div").first().css("width")
                            .slice(0, -2)) + 39 + "px"
                    }, 300, "easeInOutQuint", function () {
                        mpaaRatingHidden = true;
                        mpaaRatingAnimate = false;
                        nextClickedElement.click();
                        nextClickedElement = $();
                    })
                })
            }
        } else {
            nextClickedElement = $(this);
        }
    })

    $(".mpaa-rating").mouseleave(function () {
        if (!mpaaRatingHidden && !mpaaRatingAnimate) {
            $(this).find(".selected").click();
        }
    })

    $(".movie-language li:not(.selected), .mpaa-rating li:not(.selected)").click(function () {
        let value = $(this).find("div").text();
        $(this).parent(".list").first().find(".selected").click().find("div:first-child").text(value);
    })

    $(".triangle-left").click(function () {
        //todo universal calculations
        if (!changeLanguageAnimate) {
            changeLanguageAnimate = true;

            fieldParent = $(this).next().find(".languages");
            switch (parseInt(fieldParent.css("left").slice(0, -2))) {
                case 0:
                    positionLeft = "-200%"
                    break;
                case parseInt(fieldParent.css("width").slice(0, -2)) * (-1):
                case parseInt(fieldParent.css("width").slice(0, -2)) * (-1) + 1:
                case parseInt(fieldParent.css("width").slice(0, -2)) * (-1) - 1:
                    positionLeft = "0";
                    break;
                case parseInt(fieldParent.css("width").slice(0, -2)) * (-2):
                case parseInt(fieldParent.css("width").slice(0, -2)) * (-2) + 1:
                case parseInt(fieldParent.css("width").slice(0, -2)) * (-2) - 1:
                    positionLeft = "-100%"
                    break;
                default:
                    break;
            }
            fieldParent.animate({
                "left": positionLeft
            }, 500, "easeInOutQuint", function () {
                changeLanguageAnimate = false;
            });
            fieldParent.parents(".top").first().next().find(".fields-container").animate({
                "left": positionLeft
            }, 500, "easeInOutQuint");
            fieldParent.parents(".create-genre").first().find(".fields-container").animate({
                "left": positionLeft
            }, 500, "easeInOutQuint");
            fieldParent.parents(".actor-form").first().find(".fields-container").animate({
                "left": positionLeft
            }, 500, "easeInOutQuint");
        }
    })

    $(".triangle-right").click(function () {
        //todo universal calculations
        if (!changeLanguageAnimate) {
            changeLanguageAnimate = true;

            fieldParent = $(this).prev().find(".languages");
            switch (parseInt(fieldParent.css("left").slice(0, -2))) {
                case 0:
                    positionLeft = "-100%"
                    break;
                case parseInt(fieldParent.css("width").slice(0, -2)) * (-1):
                case parseInt(fieldParent.css("width").slice(0, -2)) * (-1) + 1:
                case parseInt(fieldParent.css("width").slice(0, -2)) * (-1) - 1:
                    positionLeft = "-200%";
                    break;
                case parseInt(fieldParent.css("width").slice(0, -2)) * (-2):
                case parseInt(fieldParent.css("width").slice(0, -2)) * (-2) + 1:
                case parseInt(fieldParent.css("width").slice(0, -2)) * (-2) - 1:
                    positionLeft = "0";
                    break;
                default:
                    break;
            }
            fieldParent.animate({
                "left": positionLeft
            }, 500, "easeInOutQuint", function () {
                changeLanguageAnimate = false;
            });
            fieldParent.parents(".top").first().next().find(".fields-container").animate({
                "left": positionLeft
            }, 500, "easeInOutQuint");
            fieldParent.parents(".create-genre").first().find(".fields-container").animate({
                "left": positionLeft
            }, 500, "easeInOutQuint");
            fieldParent.parents(".actor-form").first().find(".fields-container").animate({
                "left": positionLeft
            }, 500, "easeInOutQuint");
        }
    })

    $("textarea").on("input", function () {
        $(this).css("height", "auto").delay(10).css("height",
            $(this).get(0).scrollHeight + "px");
    })

    $("#imdb-rating").focusout(function () {
        if (parseFloat($(this).val()) > 10) {
            $(this).val(10);
        } else if (parseFloat($(this).val()) <= 0) {
            $(this).val(0.1);
        }
    })

    $("#year").focusout(function () {
        if (parseInt($(this).val()) > 9999) {
            $(this).val(9999);
        } else if (parseInt($(this).val()) < 2020) {
            $(this).val(2020);
        }
    })

    $("#month").focusout(function () {
        if (parseInt($(this).val()) > 12) {
            $(this).val(12);
        } else if (parseInt($(this).val()) < 1) {
            $(this).val(1);
        }
    })

    $("#day").focusout(function () {
        let date = new Date(parseInt($("#year").val()), parseInt($("#month").val()), 0);
        if (parseInt($(this).val()) > date.getDate()) {
            $(this).val(date.getDate());
        } else if (parseInt($(this).val()) < 1) {
            $(this).val(1);
        }
    })

    $(".genre").click(function () {
        if ($(this).hasClass("selected")) {
            $(this).removeClass("selected").animate({
                "background-position-x": "100%"
            }, 300, "easeInOutQuint");
        } else {
            $(this).addClass("selected").animate({
                "background-position-x": "0%"
            }, 300, "easeInOutQuint");
        }
    })

    $(".actor").click(function () {
        if ($(this).hasClass("selected")) {
            $(this).removeClass("selected").animate({
                "background-position-x": "100%"
            }, 300, "easeInOutQuint");
        } else {
            $(this).addClass("selected").animate({
                "background-position-x": "0%"
            }, 300, "easeInOutQuint");
        }
    })

    $(".plus").mousedown(function () {
        element = $(this);
        element.parent("div").find("input").get()[0].stepUp();
        inputValueLoop = true;

        setTimeout(function () {
            if (inputValueLoop) {
                loopInputValue(true);
            }
        }, 100);

        setTimeout(function () {
            if (inputValueLoop) {
                speed = 100;
                setTimeout(function () {
                    if (inputValueLoop) {
                        speed = 10;
                        setTimeout(function () {
                            if (inputValueLoop) {
                                speed = 1;
                            }
                        }, 2000);
                    }
                }, 2000);
            }
        }, 2000);
    })

    $(".create-genre .button").click(function () {
        if (!genreCreationAnimate) {
            genreCreationAnimate = true;

            if (genreCreationHidden) {
                $(".create-genre").animate({
                    "bottom": "0px"
                }, 500, "easeInOutQuint", function () {
                    genreCreationHidden = false;
                    genreCreationAnimate = false;
                    nextClickedElement.click();
                    nextClickedElement = $();
                })
            } else {
                if (userClick) {
                    //todo if field is not empty create genre request start
                    $(".create-genre input").val("");
                } else {
                    userClick = true;
                }
                $(".create-genre").animate({
                    "bottom": "-57px"
                }, 500, "easeInOutQuint", function () {
                    genreCreationHidden = true;
                    genreCreationAnimate = false;
                    nextClickedElement.click();
                    nextClickedElement = $();
                })
            }
        } else {
            nextClickedElement = $(this);
        }
    })

    $(".create-genre").mouseleave(function () {
        if ((!genreCreationHidden && !genreCreationAnimate) || (genreCreationHidden && genreCreationAnimate)) {
            userClick = false;
            $(this).find(".button").click();
        }
    })

    $(".actor-form .button").first().click(function () {
        if (!actorCreationAnimate) {
            actorCreationAnimate = true;

            if (actorCreationHidden) {
                $(".actor-form").animate({
                    "bottom": "0px"
                }, 500, "easeInOutQuint", function () {
                    actorCreationHidden = false;
                    actorCreationAnimate = false;
                    nextClickedElement.click();
                    nextClickedElement = $();
                })
            } else {
                if (userClick) {
                    //todo if field is not empty create genre request start
                    $(".actor-form input").val("");
                } else {
                    userClick = true;
                }
                $(".actor-form").animate({
                    "bottom": "-148px"
                }, 500, "easeInOutQuint", function () {
                    actorCreationHidden = true;
                    actorCreationAnimate = false;
                    nextClickedElement.click();
                    nextClickedElement = $();
                })
            }
        } else {
            nextClickedElement = $(this);
        }
    })

    $(".actor-form").mouseleave(function () {
        if ((!actorCreationHidden && !actorCreationAnimate) || (actorCreationHidden && actorCreationAnimate)) {
            userClick = false;
            $(this).find(".button").first().click();
        }
    })

    $(".gallery .add-button").click(function () {
        $("#add-movie-picture").trigger("click");
    })

    $("#add-movie-picture").change(function () {
        //todo create multiple picture load
        if (this.files && this.files[0]) {
            if (this.files[0].size <= 5001708) {
                let reader = new FileReader();
                reader.addEventListener("load", function (e) {
                    let picture = '<div class="gallery-image editable">' +
                        '<img src="' + e.target.result + '" alt="">' +
                        '<div class="cross"><div class="icon-cross"></div></div></div>';
                    $(".gallery").prepend(picture).find(".cross").click(function () {
                        $(this).parents(".gallery-image").first().remove();
                    })
                });
                reader.readAsDataURL(this.files[0]);
            } else {
                alert("File is too large!");
            }
        }
    });

    $(".plus").mouseup(function () {
        inputValueLoop = false;
        speed = 200;
        clearTimeout(loop);
    })

    $(".minus").mousedown(function () {
        element = $(this);
        element.parent("div").find("input").get()[0].stepDown();
        inputValueLoop = true;

        setTimeout(function () {
            if (inputValueLoop) {
                loopInputValue(false);
            }
        }, 100);

        setTimeout(function () {
            if (inputValueLoop) {
                speed = 100;
                setTimeout(function () {
                    if (inputValueLoop) {
                        speed = 10;
                        setTimeout(function () {
                            if (inputValueLoop) {
                                speed = 1;
                            }
                        }, 2000);
                    }
                }, 2000);
            }
        }, 2000);
    })

    $(".minus").mouseup(function () {
        inputValueLoop = false;
        speed = 200;
        clearTimeout(loop);
    })

    //todo create validators for fields by creation event

    function loopInputValue(value) {
        loop = setTimeout(function () {
            // $("#price").val(parseFloat($("#price").val()) + value);
            if (value) {
                element.parent("div").find("input").get()[0].stepUp();
            } else {
                element.parent("div").find("input").get()[0].stepDown();
            }
            if (inputValueLoop) {
                loopInputValue(value);
            }
        }, speed);
    }

    function emptyGenres() {
        if ($(".genres-container").width() > 409) {
            if ($(".genre").length % 3 === 0) {
                $(".empty-genre").css("display", "none");
            } else if ($(".genre").length % 3 === 1) {
                $(".empty-genre").css("display", "block");
            } else {
                $(".empty-genre").first().css("display", "block");
                $(".empty-genre").last().css("display", "none");
            }
        } else if ($(".genres-container").width() <= 409 && $(".genres-container").width() > 266) {
            if ($(".genre").length % 2 === 0) {
                $(".empty-genre").css("display", "none");
            } else {
                $(".empty-genre").first().css("display", "block");
                $(".empty-genre").last().css("display", "none");
            }
        } else {
            $(".empty-genre").css("display", "none");
        }
    }
})