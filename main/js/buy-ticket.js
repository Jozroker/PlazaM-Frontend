$(document).ready(function () {

    {
        // $(".tickets-price .scroll").css("height", $(this).find(".ticket").length * 44 +
        //     ($(this).find(".ticket").length - 1) * 10 + "px");
        //todo check vertical scrollbar not showing by vertical visibility change
        $(".total-price .price").text(calculateTotalPrice());
    }

    $(".scroll").each(function (index) {
        new SimpleBar($(".scroll")[index], {
            autoHide: false
        });
    })

    $(".ticket .icon-cross").click(function () {
        $(this).parents(".ticket").first().animate({
            "top": $(this).position().top * (-1) - $(this).height() + "px",
            "height": "0"
        }, 200, "linear", function () {
            $(this).remove();
            $(".total-price .price").text(calculateTotalPrice());
            if ($(".ticket").length === 0) {
                $(".tickets-price .scroll").animate({
                    "margin-bottom": "0"
                }, 100, "linear");
            }
        });
    })

    $(".ticket-form .nav-item").click(function () {
        if (!$(this).hasClass("selected")) {
            $(this).parent().find(".selected").removeClass("selected");
            $(this).addClass("selected");
        }
    })

    function calculateTotalPrice() {
        let value = 0;
        $(".ticket .price").each(function (index) {
            value += parseFloat($($(".ticket .price")[index]).text().slice(0, -1));
        });
        return value;
    }
})