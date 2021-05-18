let lastPage = 1;

$(document).ready(function () {

    {
        $("#comments-container .sort .underline").css("width", $("#comments-container .category.selected")
            .first().width() + 14 + "px");
        $("#footer-container").load("footer.html #footer", function () {
            $.getScript("../js/footer.js");
        });
        $("#header-container").load("header.html #header", function () {
            $.getScript("../js/header.js");
        });
        $.getScript("../js/pages.js");
    }

    $("#comments-container .scroll").each(function (index) {
        new SimpleBar($("#comments-container .scroll")[index], {
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

    $(".delete-btn").click(function () {
        $(this).parents(".comment").animate({
            "opacity": "0"
        }, 500, "linear", function () {
            $(this).remove();
        })
    })

    $(document).on("input focus", "textarea", function () {
        $(this).css("height", "auto").delay(10).css("height",
            $(this).get(0).scrollHeight + "px");
    })

    $(document).on("focusout", "textarea", function () {
        let element = '<div class="value">' + $(this).val() + '</div>';
        $(this).parents(".comment").first().find(".change-btn").css("opacity", "1");
        $(this).replaceWith(element);
    })

    $(document).on("click", ".change-btn", function () {
        $(this).css("opacity", "0");
        let text = $(this).parents(".comment").first().find(".scroll .value").first().text();
        $(this).parents(".comment").first().find(".simplebar-content .value").replaceWith('<textarea spellcheck="false"></textarea>');
        $(this).parents(".comment").first().find("textarea").focus().val(text);
    })
})