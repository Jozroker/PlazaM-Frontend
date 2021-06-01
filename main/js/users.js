let lastPage = 5;

$(document).ready(function () {
    let nextClickedElement = $();
    let currentScrollPosition;

    let filterHidden = true;
    let banListHidden = true;

    let filterAnimate = false;
    let banListAnimate = false;

    {
        $(".sort .underline").css("width", $(".category.selected").first().width() + 14 + "px");

        $("#footer-container").load("footer.html #footer", function () {
            $.getScript("../js/footer.js");
        });
        $("#header-container").load("header.html #header", function () {
            $.getScript("../js/header.js");
        });
        $.getScript("../js/pages.js");
    }

    $("#filter .scroll").each(function (index) {
        new SimpleBar($("#filter .scroll")[index], {
            autoHide: false
        });
    })

    $(".users-page-container .scroll").each(function (index) {
        new SimpleBar($(".users-page-container .scroll")[index], {
            autoHide: false
        });
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

    $(".selected-role").click(function () {
        if ($(this).parent().css("height") == "18px") {
            $(this).parent().find(".triangle").addClass("triangle-0");
            $(this).parent().css("background-color", "rgba(85, 85, 85, 0.2)").animate({
                "height": "75px"
            }, 300, "linear");
        } else {
            $(this).parent().find(".triangle").removeClass("triangle-0");
            $(this).parent().css("background-color", "transparent").animate({
                "height": "18px"
            }, 300, "linear");
        }
    })

    $(".user-right-side .role li:not(.selected-role)").click(function () {
        $(this).parent().find(".selected-role > div:first-child").text($(this).text().trim());
        $(this).parent().find(".selected-role").click();
    })

    $("#filter .country, #filter .ban-status, #filter .role").click(function () {
        if ($(this).hasClass("selected")) {
            $(this).removeClass("selected");
        } else {
            $(this).addClass("selected");
        }
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
                    // $("body").css("overflow-y", "hidden");
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
                    // $("body").css("overflow-y", "auto");
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

    $("#users .nav-item").click(function () {
        if (!$(this).hasClass("selected")) {
            $(this).parent().find(".selected").removeClass("selected");
            $(this).addClass("selected");
            $(".users-container").animate({
                "left": "-" + $("#users").find(".nav-item").index($(this)) * 100 + "%"
            }, 500, "easeInOutQuint");
        }
    })

    $(document).on("click", ".ban-button .text", function () {
        if (!banListAnimate) {
            banListAnimate = true;

            if (banListHidden) {
                $(this).parent().removeClass("selectable").addClass("selected").delay(200).addClass("selectable");
                $(this).parent().find(".selection").animate({
                    "height": "112px"
                }, 500, "easeInOutQuint", function () {
                    banListAnimate = false;
                    banListHidden = false;
                    nextClickedElement.click();
                    nextClickedElement = $();
                })
            } else {
                $(this).parent().removeClass("selectable selected").delay(200).addClass("selectable");
                $(this).parent().find(".selection").animate({
                    "height": "0"
                }, 500, "easeInOutQuint", function () {
                    banListAnimate = false;
                    banListHidden = true;
                    nextClickedElement.click();
                    nextClickedElement = $();
                })
            }
        } else {
            nextClickedElement = $(this);
        }
    })

    $(".ban-button").mouseleave(function () {
        if ($(this).hasClass("selected")) {
            $(this).find(".text").click();
        }
    })

    $(".skip-button").click(function () {
        //todo autoskip if user is already banned
        $(this).parents(".user").animate({
            "opacity": "0"
        }, 500, "linear", function () {
            $(this).remove();
        })
    })

    $(document).on("click", ".ban", function () {
        $(this).parents(".ban-button").find(".selection").animate({
            "height": "0"
        }, 500, "linear");

        //todo write trigger to database, and then, if writing is success - callback parameters and creating in Banned section
        let element = '<div class="button unban-button selectable"><div class="text">Unban</div></div>';
        let id = $(this).parents(".user").first().attr("identifier");
        let query = ".user[identifier='" + id + "']";
        let image = $("#users .all-users").find(query).first().find("img").attr("src");
        let username = $("#users .all-users").find(query).first().find(".username .value").text();
        let email = $("#users .all-users").find(query).first().find(".email .value").text();
        let phone = $("#users .all-users").find(query).first().find(".phone .value").text();
        let bannedToDate = new Date();
        switch ($(this).index()) {
            case 0:
                bannedToDate.setDate(bannedToDate.getDate() + 1);
                bannedToDate = bannedToDate.toLocaleDateString();
                break;
            case 1:
                bannedToDate.setDate(bannedToDate.getDate() + 7);
                bannedToDate = bannedToDate.toLocaleDateString();
                break;
            case 2:
                bannedToDate.setDate(bannedToDate.getDate() + 30);
                bannedToDate = bannedToDate.toLocaleDateString();
                break;
            case 3:
                bannedToDate.setDate(bannedToDate.getDate() + 365);
                bannedToDate = bannedToDate.toLocaleDateString();
                break;
            case 4:
                bannedToDate = "Forever"
                break;
            default:
                break;
        }
        $("#users .all-users, #users .banned-users").find(query).find(".user-left-side").first().append(element);
        $("#users .all-users, #users .banned-users").find(query).find(".ban-button").remove();

        let bannedUser = '<div identifier="' + id + '" class="user"><div class="user-left-side"><img src="' + image +
            '" alt=""><div class="button unban-button selectable"><div class="text">Unban</div></div></div>' +
            '<div class="user-right-side"><div class="fields"><div class="field username"><div class="title-2">Username</div>' +
            '<div class="value">' + username + '</div></div><div class="field email"><div class="title-2">Email</div>' +
            '<div class="value">' + email + '</div></div><div class="field phone"><div class="title-2">Phone</div>' +
            '<div class="value">' + phone + '</div></div><div class="field banned-to-date"><div class="title-2">Banned To</div>' +
            '<div class="value">' + bannedToDate + '</div></div></div></div></div>';
        $("#users .banned-users").prepend(bannedUser);

        if ($("#users .navbar .selected").index() == 1) {
            $(this).parents(".user").animate({
                "opacity": "0"
            }, 500, "linear", function () {
                $(this).remove();
            })
        } else {
            $("#users .reported-users").find(query).remove();
            banListHidden = true;
            banListAnimate = false;
        }
    })

    $(document).on("click", ".unban-button", function () {
        let element = '<div class="button ban-button selectable"><div class="text">Ban</div><div class="selection">' +
            '<div class="ban">1 Day</div><div class="ban">1 Week</div><div class="ban">1 Month</div>' +
            '<div class="ban">1 Year</div><div class="ban">Forever</div></div></div>';
        let query = ".user[identifier='" + $(this).parents(".user").first().attr("identifier") + "']";

        if ($("#users .navbar .selected").index() == 0) {
            $("#users .banned-users").find(query).remove();
            $(this).parents(".user-left-side").first().append(element);
            $(this).remove();
        } else {
            $(this).parents(".user").animate({
                "opacity": "0"
            }, 500, "linear", function () {
                $(this).remove();
            })
            $("#users .all-users").find(query).find(".user-left-side").first().append(element);
            $("#users .all-users").find(query).find(".unban-button").remove();
        }
    })

    function noScroll() {
        window.scrollTo(0, currentScrollPosition);
    }
})