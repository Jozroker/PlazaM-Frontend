$(document).ready(function () {
    $("#filter .scroll").each(function (index) {
        new SimpleBar($("#filter .scroll")[index], {
            autoHide: false
        });
    })

    $(".genre, .tech").click(function () {
        if ($(this).is(".selected")) {
            $(this).removeClass("selected");
        } else {
            $(this).addClass("selected");
        }
    })
})