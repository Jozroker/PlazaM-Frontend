$(document).ready(function () {
    let locationHidden = true;
    let localHidden = true;
    let messagesHidden = true;
    let menuHidden = true;
    let settingsHidden = true;
    let scrollUserHidden = false;

    let searchLineAnimate = false;
    let locationAnimate = false;
    let localAnimate = false;
    let messagesAnimate = false;
    let menuAnimate = false;
    let settingsAnimate = false;

    let scrollBar;
    let settingsPosition = "-808px";

    {
        $("#menu-btn").css("position", "absolute")
            .parent().css("width", $("#menu-btn").width());
    }

    $(window).resize(function () {
        if ($(window).width() < 1770) {
            $("#menu-btn div").css("left", "-20px");
        } else {
            $("#menu-btn div").css("left", "-40px");
        }

        if (window.innerHeight === window.screen.height) {
            $("#menu-top").css("margin-bottom", "489px");
        } else {
            $("#menu-top").css("margin-bottom", "420px");
        }

        if ($(window).width() >= 1440) {
            if (window.innerHeight === window.screen.height) {
                settingsPosition = "-877px";
            } else {
                settingsPosition = "-808px";
            }
        } else if ($(window).width() < 960) {
            settingsPosition = "-788px";
        } else {
            settingsPosition = "-796px";
        }

        if (!settingsHidden) {
            $(".settings-btn").css("top", settingsPosition);
        }
    })

    $(document).mousemove(function () {
        if (!$("#menu").is(":hover") && !menuHidden && !$("#menu-btn").is(":hover")) {
            $($(".link")[6]).click();
        }
    })

    $("#user").mouseover(function () {
        $("#menu-btn .triangle").css("border-bottom-color", "#AF2341");
    })

    $("#user").mouseout(function () {
        $("#menu-btn .triangle").css("border-bottom-color", "");
    })

    $(".scroll").each(function (index) {
        if ($(this).attr("id") === "menu") {
            scrollBar = new SimpleBar($(".scroll")[index], {
                autoHide: false
            });
            scrollBar.getScrollElement().addEventListener("scroll", function () {
                if (!messagesAnimate && !settingsAnimate && messagesHidden && settingsHidden) {
                    $("#menu-btn").finish();
                    if (scrollBar.getScrollElement().scrollTop === 0) {
                        if (scrollUserHidden) {
                            scrollUserHidden = false;
                            $("#user").find("img").animate({
                                "top": "0"
                            }, 100, "linear");
                            $("#menu-btn").animate({
                                "top": "5px"
                            }, 100, "linear");
                        }
                    } else {
                        if (!scrollUserHidden) {
                            scrollUserHidden = true;
                            $("#user").find("img").animate({
                                "top": "-100px"
                            }, 100, "linear");
                            $("#menu-btn").animate({
                                "top": "-100px"
                            }, 100, "linear");
                        }
                    }

                } else {
                    scrollBar.getScrollElement().scrollTop = 0;
                }
            })
        } else {
            new SimpleBar($(".scroll")[index], {
                autoHide: false
            });
        }
    });

    $(".menu-item").mouseenter(function () {
        $(this).next(".line-between").addClass("selected-line");
        $(this).prev(".line-between").addClass("selected-line");
    }).mouseleave(function () {
        $(this).next(".line-between").removeClass("selected-line");
        $(this).prev(".line-between").removeClass("selected-line");
    })

    $("#user").click(function () {
        $($(".link")[6]).click();
    })

    $("#menu").mouseleave(function () {
        if (!$("#menu-btn").is(":hover")) {
            $($(".link")[6]).click();
        }
    })

    $($(".link")[6]).click(function () {
        if (!menuAnimate && !messagesAnimate && !settingsAnimate) {
            scrollBar.getScrollElement().scrollTop = 0;
            menuAnimate = true;
            if (menuHidden) {
                let leftPosition = $(window).width() >= 1770 ? 40 : 20;

                $("#menu").animate({
                    "right": "0"
                }, 1000, "easeInOutQuint", function () {

                    $("#menu").find(".menu-item").each(function (index) {
                        let wait = 100 * ($("#menu").find(".menu-item").length +
                            $("#menu").find(".line-between").length -
                            $("#messages").find(".line-between").length -
                            $("#settings").find(".line-between").length -
                            $("#settings").find(".menu-item").length);
                        let waiting = index * 100;

                        setTimeout(function () {
                            $($("#menu").find(".menu-item")[index]).animate({
                                "opacity": "1"
                            }, 100, "linear");
                        }, waiting);

                        setTimeout(function () {
                            menuAnimate = false;
                            menuHidden = false;
                        }, wait);
                    });

                    setTimeout(function () {
                        $("#menu").find(".line-between").each(function (index) {
                            if ($(this).parent("#menu-top").length
                                || $(this).parent("#menu-bottom").length) {
                                let waiting = index * 100;

                                setTimeout(function () {
                                    $($("#menu").find(".line-between")[index]).animate({
                                        "opacity": "1"
                                    }, 100, "linear");
                                }, waiting);
                            }
                        })
                    }, 50);
                });

                $("#menu-btn").animate({
                    "font-size": "20px",
                    "top": "5px"
                }, 1000, "easeInOutQuint");

                $("#menu-btn div").css({
                    "position": "relative",
                    "left": "0"
                }).animate({
                    "left": -leftPosition + "px"
                }, 1000, "easeInOutQuint");

                $("#menu-btn .triangle").css("transform", "rotate(90deg)");

            } else {

                $("#menu").animate({
                    "right": "-320px"
                }, 1000, "easeInOutQuint");

                $("#messages").animate({
                    "right": "-320px"
                }, 1000, "easeInOutQuint", function () {
                    $("#messages").find(".line-between").css("opacity", "0");

                    $("#messages").find(".messages").css("right", "-320px");

                    $(".messages-btn").css({
                        "position": "",
                        "top": ""
                    });

                    $("#menu").find(".menu-item").each(function () {
                        if (!$(this).hasClass("messages-btn")) {
                            $(this).css("opacity", "1");
                        }
                    });

                    $("#menu").find(".line-between").css("opacity", "1");

                    $("#user").find("img").css("top", "");

                    messagesAnimate = false;
                    messagesHidden = true;
                });

                $("#settings").animate({
                    "right": "-320px"
                }, 1000, "easeInOutQuint", function () {
                    $("#settings").find(".line-between").css("opacity", "0");

                    $("#settings").find(".menu-item").css("opacity", "0");

                    $(".settings-btn").css({
                        "position": "",
                        "top": ""
                    });

                    $("#menu").find(".menu-item").each(function () {
                        if (!$(this).hasClass("settings-btn")) {
                            $(this).css("opacity", "1");
                        }
                    });

                    $("#menu").find(".line-between").css("opacity", "1");

                    $("#user").find("img").css("top", "");

                    settingsAnimate = false;
                    settingsHidden = true;
                });

                $("#menu-btn").animate({
                    "font-size": $("#current-cinema").css("font-size"),
                    "top": ""
                }, 1000, "easeInOutQuint", function () {
                    $("#menu").find(".menu-item").css("opacity", "0");
                    $("#menu").find(".line-between").css("opacity", "0");
                    menuHidden = true;
                    menuAnimate = false;
                });

                $("#menu-btn div").animate({
                    "left": "0"
                }, 1000, "easeInOutQuint", function () {
                    $(this).css("position", "static");
                });

                $("#menu-btn .triangle").css("transform", "rotate(-90deg)");

                scrollBar.getScrollElement().scrollTop = 0;
            }
        }
    })

    $("#search-icon").click(function () {
        if (!searchLineAnimate) {
            searchLineAnimate = !searchLineAnimate;
            let elem = $("#search-line");
            let visible = elem.css("opacity");
            if (visible == 0) {
                $($('.link')[3]).css({
                    "width": "inherit",
                    "padding-left": "10px",
                    "padding-right": "0"
                }).animate({"background-position-x": "100%"}, 500, "easeInOutQuint");
                $($(".underline")[3]).delay(100).animate({"width": "100%"}, 500, "easeInOutQuint", function () {
                    elem.animate({
                        "opacity": "1"
                    }, 100, "linear").css("pointer-events", "auto");
                });
            } else {
                elem.animate({
                    "opacity": "0",
                }, 100, "linear", function () {
                    $($(".underline")[3]).animate({"width": "0"}, 500, "easeInOutQuint");
                    $($('.link')[3]).delay(100).animate({"background-position-x": "0%"}, 500, "easeInOutQuint", function () {
                        $(this).css({
                            "width": "0",
                            "padding-left": "0",
                            "padding-right": "32px"
                        })
                    })
                }).css("pointer-events", "none");
            }
            setTimeout(function () {
                searchLineAnimate = !searchLineAnimate;
            }, 1000);
        }
    })

    $("#current-cinema").click(function () {
        if (!locationAnimate) {
            locationAnimate = true;
            if (!locationHidden) {
                locationHidden = true;
                $($("#current-cinema .triangle")[0]).removeClass("triangle-0");
                $($(".link")[4]).animate({
                    "height": $(this).height() + 16 + "px"
                }, 300, "linear", function () {
                    $($(".link")[4]).find(".background").animate({
                        "height": "0"
                    }, 100, "linear");
                });
                setTimeout(function () {
                    $(".cinema-list").each(function () {
                        $(this).css("left", "100%");
                        $(".city").css("width", "100%");
                        $(".city-line").css("width", "75%");
                    })
                }, 500);
            } else {
                locationHidden = false;
                let newHeight = 16 + $("#location").outerHeight(true);
                $($("#current-cinema .triangle")[0]).addClass("triangle-0");
                $($(".link")[4]).find(".background").animate({
                    "height": "100%"
                }, 100, "linear", function () {
                    if ($($(".link")[4]).is(":hover")) {
                        $($(".link")[4]).animate({
                            "height": newHeight + "px"
                        }, 300, "linear");
                    }
                });
            }
            setTimeout(function () {
                locationAnimate = false;
            }, 500);
        }
    })

    $($(".link")[4]).mouseleave(function () {
        locationHidden = true;
        locationAnimate = true;
        let newHeight = $("#current-cinema").height() <= 18 ? 32 : 54;
        $($("#current-cinema .triangle")[0]).removeClass("triangle-0");
        $($(".link")[4]).animate({
            "height": newHeight + "px"
        }, 300, "linear", function () {
            $($(".link")[4]).find(".background").animate({
                "height": "0"
            }, 100, "linear", function () {
                locationAnimate = false;
            });
        });
        setTimeout(function () {
            $(".cinema-list").each(function () {
                $(this).css("left", "100%");
                $(".city").css("width", "100%");
                $(".city-line").css("width", "100%");
            })
        }, 500);
    })

    $(".cinema-list a").click(function () {
        locationHidden = false;
        $("#current-cinema a").text($(this).text());
        let newHeight = $("#current-cinema").height() <= 18 ? 32 : 54;
        let newPosition = $("#current-cinema").height() <= 18 ? 0 : -10;
        $($("#current-cinema .triangle")[0]).removeClass("triangle-0");
        $($(".link")[4]).find(".background").css("height", "0");
        $($(".link")[4]).css({
            "height": newHeight + "px"
        }).animate({
            "top": newPosition + "px"
        }, 200, "linear");
        setTimeout(function () {
            $(".cinema-list").each(function () {
                $(this).css("left", "100%");
                $(".city").css("width", "100%");
                $(".city-line").css("width", "100%");
            })
            locationHidden = true;
        }, 500);
    })

    $("#current-local").click(function () {
        if (!localAnimate) {
            localAnimate = true;
            if (!localHidden) {
                localHidden = true;
                $($("#current-local .triangle")[0]).removeClass("triangle-0");
                $($(".link")[5]).animate({
                    "height": $(this).height() + 16 + "px"
                }, 300, "linear", function () {
                    $($(".link")[5]).find(".background").animate({
                        "height": "0"
                    }, 100, "linear");
                });
            } else {
                localHidden = false;
                let newHeight = 16 + $("#local").outerHeight(true);
                $($("#current-local .triangle")[0]).addClass("triangle-0");
                $($(".link")[5]).find(".background").animate({
                    "height": "100%"
                }, 100, "linear", function () {
                    if ($($(".link")[5]).is(":hover")) {
                        $($(".link")[5]).animate({
                            "height": newHeight + "px"
                        }, 300, "linear");
                    }
                });
            }
            setTimeout(function () {
                localAnimate = false;
            }, 500);
        }
    })

    $($(".link")[5]).mouseleave(function () {
        localHidden = true;
        localAnimate = true;
        $($("#current-local .triangle")[0]).removeClass("triangle-0");
        $($(".link")[5]).animate({
            "height": "32px"
        }, 300, "linear", function () {
            $($(".link")[5]).find(".background").animate({
                "height": "0"
            }, 100, "linear", function () {
                localAnimate = false;
            });
        });
    })

    $("#locals li").click(function () {
        localHidden = false;
        let flag = $(this).find(".flag").attr("class").split(" ")[1];
        $("#current-local").find(".flag").removeClass().addClass("flag").addClass(flag);
        $("#current-local a").text($(this).find("a").text());
        $($("#current-cinema .triangle")[0]).removeClass("triangle-0");
        $($(".link")[5]).find(".background").css("height", "0");
        $($(".link")[5]).css({
            "height": "32px"
        });
        localHidden = true;
    })

    $(".city").each(function () {
        $(this).click(function () {
            $(".city").animate({
                "width": "0"
            }, 200, "linear");

            $(".city-line").animate({
                "width": "0",
                "margin": "0"
            }, 200, "linear");

            $(this).next(".cinema-list").delay(250).animate({
                "left": "0"
            }, 200, "linear");
        })
    })

    $(".cinema-back").each(function () {
        $(this).click(function () {
            $(".cinema-list").animate({
                "left": "100%"
            }, 200, "linear");

            $(".city").delay(250).animate({
                "width": "100%"
            }, 200, "linear");

            $(".city-line").animate({
                "width": "75%"
            }, 200, "linear", function () {
                $(".city-line").css("margin", "auto");
            });
        })
    })

    $(".messages-btn").click(function () {
        if (messagesHidden) {
            if (!messagesAnimate && !menuAnimate && !settingsAnimate) {
                messagesAnimate = true;
                $($("#menu .simplebar-vertical")[1]).css("opacity", "0");

                $("#user").find("img").animate({
                    "top": "-100px"
                }, 500, "easeInOutQuint");

                setTimeout(function () {
                    $("#menu-btn").animate({
                        "top": "-100px"
                    }, 500, "easeInOutQuint");
                }, 200);

                $("#menu").find(".line-between").animate({
                    "opacity": "0"
                }, 600, "linear");

                $("#menu").find(".menu-item").each(function () {
                    if (!$(this).hasClass("messages-btn")) {
                        $(this).animate({
                            "opacity": "0"
                        }, 700, "linear");
                    }
                })

                setTimeout(function () {
                    let elem = $(".messages-btn");
                    let position = (elem.outerHeight(true) - elem.height()) / 2 + elem.height();
                    elem.css({
                        "position": "absolute",
                        "top": position
                    }).animate({
                        "top": "-102px"
                    }, 500, "easeInOutQuint");
                }, 800);

                setTimeout(function () {
                    $("#messages").animate({
                        "right": "0"
                    }, 300, "easeInOutQuint");

                    setTimeout(function () {
                        $("#messages").find(".messages").animate({
                            "right": "0"
                        }, 300, "easeInOutQuint");

                        setTimeout(function () {
                            if ($("#messages").find(".line-between").length) {
                                $("#messages").find(".line-between").animate({
                                    "opacity": "1"
                                }, 300, "linear", function () {
                                    messagesHidden = false;
                                    messagesAnimate = false;
                                });
                            } else {
                                messagesHidden = false;
                                messagesAnimate = false;
                            }
                        }, 200);
                    }, 200);
                }, 900);
            }
        }
    })

    $("#messages .title").click(function () {
        if (!messagesHidden) {
            if (!messagesAnimate) {
                messagesAnimate = true;
                $("#messages").find(".line-between").animate({
                    "opacity": "0"
                }, 300, "linear")

                setTimeout(function () {
                    $("#messages").find(".messages").animate({
                        "right": "-320px"
                    }, 300, "easeInOutQuint");
                }, 200);

                setTimeout(function () {
                    let elem = $(".messages-btn");
                    let position = (elem.outerHeight(true) - elem.height()) / 2 + elem.height();
                    elem.animate({
                        "top": position
                    }, 500, "easeInOutQuint", function () {
                        $(this).css({
                            "position": "",
                            "top": ""
                        });
                    });
                }, 400);

                setTimeout(function () {
                    $("#messages").animate({
                        "right": "-320px"
                    }, 300, "easeInOutQuint");
                }, 500);

                setTimeout(function () {
                    $("#menu").find(".menu-item").each(function () {
                        if (!$(this).hasClass("messages-btn")) {
                            $(this).animate({
                                "opacity": "1"
                            }, 700, "linear");
                        }
                    });

                    $("#menu-btn").animate({
                        "top": "5px"
                    }, 500, "easeInOutQuint");

                    setTimeout(function () {
                        $("#menu").find(".line-between").animate({
                            "opacity": "1"
                        }, 600, "linear");
                    }, 100);

                    setTimeout(function () {
                        $("#user").find("img").animate({
                            "top": ""
                        }, 500, "easeInOutQuint", function () {
                            messagesAnimate = false;
                            messagesHidden = true;
                            $($("#menu .simplebar-vertical")[1]).css("opacity", "1");
                            scrollUserHidden = false;
                        });
                    }, 200);
                }, 900);
            }
        }
    })

    $(".cross").click(function () {
        if (!messagesAnimate) {
            messagesAnimate = true;
            let elem = $(this).parent();
            if (elem.prev(".line-between").length) {
                elem.prev(".line-between").remove();
            } else if (elem.next(".line-between").length) {
                elem.next(".line-between").remove();
            }
            elem.remove();
            messagesAnimate = false;
        }
    })

    $(".settings-btn").click(function () {
        if (settingsHidden) {
            if (!settingsAnimate && !menuAnimate && !messagesAnimate) {
                settingsAnimate = true;
                $($("#menu .simplebar-vertical")[1]).css("opacity", "0");
                $(window).resize();

                $("#user").find("img").animate({
                    "top": "-100px"
                }, 500, "easeInOutQuint");

                setTimeout(function () {
                    $("#menu-btn").animate({
                        "top": "-100px"
                    }, 500, "easeInOutQuint");
                }, 200);

                $("#menu").find(".line-between").animate({
                    "opacity": "0"
                }, 600, "linear");

                $("#menu").find(".menu-item").each(function () {
                    if (!$(this).hasClass("settings-btn")) {
                        $(this).animate({
                            "opacity": "0"
                        }, 700, "linear");
                    }
                })

                setTimeout(function () {
                    let elem = $(".settings-btn");
                    elem.css({
                        "position": "absolute",
                        "top": "-10px"
                    }).animate({
                        "top": settingsPosition
                    }, 500, "easeInOutQuint");
                }, 800);

                setTimeout(function () {
                    $("#settings").animate({
                        "right": "0"
                    }, 300, "easeInOutQuint", function () {
                        $("#settings").find(".menu-item").each(function (index) {
                            let wait = 100 * ($("#settings").find(".menu-item").length +
                                $("#settings").find(".line-between").length);
                            let waiting = index * 100;

                            setTimeout(function () {
                                $($("#settings").find(".menu-item")[index]).animate({
                                    "opacity": "1"
                                }, 100, "linear");
                            }, waiting);

                            setTimeout(function () {
                                settingsAnimate = false;
                                settingsHidden = false;
                            }, wait);
                        });

                        setTimeout(function () {
                            $("#settings").find(".line-between").each(function (index) {
                                let waiting = index * 100;

                                setTimeout(function () {
                                    $($("#settings").find(".line-between")[index]).animate({
                                        "opacity": "1"
                                    }, 100, "linear");
                                }, waiting);
                            })
                        }, 50);
                    });

                }, 900);
            }
        }
    })

    $("#settings .title").click(function () {
        if (!settingsHidden) {
            if (!settingsAnimate) {
                settingsAnimate = true;

                $("#settings").find(".menu-item").get().reverse().forEach(function (elem, index) {
                    let waiting = index * 100;

                    setTimeout(function () {
                        $(elem).animate({
                            "opacity": "0"
                        }, 100, "linear");
                    }, waiting);

                });

                setTimeout(function () {
                    $("#settings").find(".line-between").get().reverse().forEach(function (elem, index) {
                        let waiting = index * 100;

                        setTimeout(function () {
                            $(elem).animate({
                                "opacity": "0"
                            }, 100, "linear");
                        }, waiting);
                    })
                }, 50);

                setTimeout(function () {
                    let elem = $(".settings-btn");
                    elem.animate({
                        "top": "-10px"
                    }, 500, "easeInOutQuint", function () {
                        $(this).css({
                            "position": "",
                            "top": ""
                        });
                    });
                }, 300);

                setTimeout(function () {
                    $("#settings").animate({
                        "right": "-320px"
                    }, 300, "easeInOutQuint");
                }, 400);

                setTimeout(function () {
                    $("#menu").find(".menu-item").each(function () {
                        if (!$(this).hasClass("settings-btn")) {
                            $(this).animate({
                                "opacity": "1"
                            }, 700, "linear");
                        }
                    });

                    $("#menu-btn").animate({
                        "top": "5px"
                    }, 500, "easeInOutQuint");

                    setTimeout(function () {
                        $("#menu").find(".line-between").animate({
                            "opacity": "1"
                        }, 600, "linear");
                    }, 100);

                    setTimeout(function () {
                        $("#user").find("img").animate({
                            "top": ""
                        }, 500, "easeInOutQuint", function () {
                            settingsAnimate = false;
                            settingsHidden = true;
                            $($("#menu .simplebar-vertical")[1]).css("opacity", "1");
                            scrollUserHidden = false;
                        });
                    }, 200);
                }, 800);
            }
        }
    })
})